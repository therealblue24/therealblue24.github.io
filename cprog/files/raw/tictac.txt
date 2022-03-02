#include <stdio.h>
#include <stdlib.h>
#include <time.h>
void printWinner(char winner);

char board[3][3];
const char PLAYER = 'X';
const char COMPUTER = 'O';
char winner = ' ';

void resetBoard()
{
    for(int i=0;i<3;i++) {
        for(int j=0;j<3;j++) {
            board[i][j] = ' ';
        }
    }
}
void printBoard()
{
    //inefficent code but who cares
    printf(" %c | %c | %c", board[0][0], board[0][1], board[0][2]);
    printf("\n---|---|---\n");
    printf(" %c | %c | %c", board[1][0], board[1][1], board[1][2]);
    printf("\n---|---|---\n");
    printf(" %c | %c | %c", board[2][0], board[2][1], board[2][2]);
    printf("\n");
    printf("\n");
}
void playerMove()
{
    int x;
    int y;
    do
    {
        printf("Enter row #: ");
        scanf("%d",&x);
        x--;
        printf("Enter column #: ");
        scanf("%d",&y);
        y--;
        if(board[x][y] != ' ') {
            printf("Invaild Coordinates!\n");
            } else {
            board[x][y] = PLAYER;
            break;
            }
    } while (board[x][y] != ' ');
    
}
int checkFreeSpaces()
{
    int freeSpaces = 9;
    for(int i=0;i<3;i++) {
        for(int j=0;j<3;j++) {
            if(board[i][j] != ' ')
            {
                freeSpaces--;
            }
        }
    }
    return freeSpaces;
}
void computerMove()
{
    srand(time(0));
    int x;
    int y;

    if(checkFreeSpaces() > 0) {
        do
        {
            x = rand() % 3;
            y = rand() % 3;

        } while (board[x][y] != ' ');
        board[x][y] = COMPUTER;
    } else {
        printWinner(' ');
    }
}
void printWinner(char winner)
{
    if(winner == PLAYER)
    {    
        printf("You Won!\n");
    }
    else if(winner == COMPUTER)
    {
        printf("Better Luck Next Time!\n");
    }
    else{
        printf("A Tie! Wow!\n");
    }
}
char checkWinner()
{
    //check rows
    for(int i=0;i<3;i++) {
        if(board[i][0] == board[i][1] && board[i][0] == board[i][2]) {
            return board[i][0];
        }
    }
    //check columns
    for(int i=0;i<3;i++) {
        if(board[0][i] == board[1][i] && board[0][i] == board[2][i]) {
            return board[0][i];
        }
    }
    // check diagonal
    if(board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
        return board[0][0];
    }
    if(board[0][2] == board[1][1] && board[0][0] == board[2][0]) {
        return board[0][2];
    }
    return ' ';
}
int main()
{
    resetBoard();
    board[0][0] = ' ';
    printBoard();
    while(winner == ' ' && checkFreeSpaces() != 0) {
        //player move n' stuff
        playerMove();
        printBoard();
        winner = checkWinner();
        if(winner != ' ' || checkFreeSpaces() == 0) {
            break;
        }
        computerMove();
        printBoard();
        winner = checkWinner();
        if(winner != ' ' || checkFreeSpaces() == 0) {
            break;
        }
    }

    char temp;
    printWinner(winner);
    printf("Thanks for playing!");
    scanf("%c",&temp);
    printf("%c",temp);
    return 0;
}
