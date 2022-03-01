#include <stdio.h>
#include <string.h>


struct tar_header{
    char name[100];
    char mode[8];
    char owner[8];
    char group[8];
    char size[12];
    char modified[12];
    char checksum[8];
    char type[1];
    char link[100];
    char padding[255];
};

void fexpand(FILE* f, size_t amount, int value){
    while( amount-- ){
        fputc( value, f );
    }
}

void tar_add(FILE* tar_file, const char* file, const char* internal_name){
    //Get current position; round to a multiple of 512 if we aren't there already
    size_t index = ftell( tar_file );
    size_t offset = index % 512;
    if( offset != 0 ){
        fexpand( tar_file, 512 - offset, 0);
        printf("Expanded %s\n", file);
    }
    //Store the index for the header to return to later
    index = ftell( tar_file );
    //Write some space for our header
    fexpand( tar_file, sizeof(struct tar_header), 0 );
    printf("Creating header for %s\n", file);
    //Write the input file to the tar file
    FILE* input = fopen( file, "rb" );
    if( input == NULL ){
        fprintf( stderr, "Failed to open %s for reading\n", file);
        return;
    }
    //Copy the file content to the tar file
    long long j = 0;
    while( !feof(input) ){
        char buffer[512];
        size_t read = fread( buffer, 1, 512, input );
        fwrite( buffer, 1, read, tar_file);
        printf("Wrote file sector %lld of file %s\n", j*512, file);
        j++;
    }
    //Get the end to calculate the size of the file
    size_t end = ftell( tar_file );
    //Round the file size to a multiple of 512 bytes
    offset = end % 512;
    j = 0;
    if( end != 0 ){
        fexpand( tar_file, 512 - offset, 0);
        printf("Expanded %s (again)\n", file);
    }
    //Fill out a new tar header
    struct tar_header header;
    memset( &header, 0, sizeof( struct tar_header ) );
    snprintf( header.name, 100, "%s", internal_name  );
    snprintf( header.mode, 8, "%06o ", 0777 ); //You should probably query the input file for this info
    snprintf( header.owner, 8, "%06o ", 0 ); //^
    snprintf( header.group, 8, "%06o ", 0 ); //^
    snprintf( header.size, 12, "%011o", end - 512 - index );
    snprintf( header.modified, 12, "%011o ", time(0) ); //Again, get this from the filesystem
    memset( header.checksum, ' ', 8);
    header.type[0] = '0';
    printf("Loaded data into file %s\n", file);

    //Calculate the checksum
    size_t checksum = 0;
    int i;
    j = 0;
    const unsigned char* bytes = &header;
    for( i = 0; i < sizeof( struct tar_header ); ++i ){
        checksum += bytes[i];
    }

    snprintf( header.checksum, 8, "%06o ", checksum );

    //Save the new end to return to after writing the header
    end = ftell(tar_file);

    //Write the header
    fseek( tar_file, index, SEEK_SET );
    fwrite( bytes, 1, sizeof( struct tar_header ), tar_file );

    //Return to the end
    fseek( tar_file, end, SEEK_SET );
    fclose( input );
}

int main( int argc, char* argv[] ){
    if( argc > 1 ){
        FILE* tar = fopen( argv[1], "wb" );
        if( !tar ){
            fprintf( stderr, "Failed to open %s for writing\n", argv[1] );
            return 1;
        }
        int i;
        for( i = 2; i < argc; ++i ){
            tar_add( tar, argv[i], argv[i] );
        }
        //Pad out the end of the tar file
        fexpand( tar, 1024, 0);
        fclose( tar );
        return 0;
    }
    fprintf( stderr, "Please specify some file names!\n" );
    return 0;
}