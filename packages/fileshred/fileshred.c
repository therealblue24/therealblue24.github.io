#include <stdio.h>


int shredFile(char *name) {
    FILE *f;
    f = fopen(name, "w+");
    for(int i=0;i<444;i++) {
        fprintf(f, "hdushdiasgdyuasdgdufguiadhduisgfuydgfyuadgfagdfyudsiafgydasgfi");
        fprintf(f, "%s%s%sdjioahasiu%sHUDgyugsss%sHUISheusgeuysg%s", name, name, name, name, name, name);
    }
    remove(name);
}

int main(int argc, char *argv[]) {
    if(argc == 2) {
        shredFile(argv[1]);
    } else {
        printf("usage: %s <file>", argv[0]);
        return 1;
    }
}