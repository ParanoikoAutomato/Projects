%{
	#include "parser.h"
	
	struct alpha_token_t {
	  unsigned int numline;
	  unsigned int numToken;
	  char *content;
	  char *type;
	  char *sub_type;
	  char *category;
	  struct alpha_token_t *next;
	};
	
	struct alpha_token_t *head = NULL;
	
	int counterToken=0;
	
	void add_token(char* content, char* typeOfToken,char* sub,char* cat){
		struct alpha_token_t *new_token=malloc(sizeof(struct alpha_token_t));
		struct alpha_token_t *temp_token;		
	
		new_token->content = malloc(strlen(content)+1);
		
		new_token->type = malloc(strlen(typeOfToken)+1);
		new_token->sub_type = malloc(strlen(sub)+1);
		new_token->category = malloc(strlen(cat)+1);
		
		if ( head==NULL){
			head=new_token;
			new_token->next=NULL;	
			new_token->numline=yylineno;
						
            strcpy(new_token->content,content);
			strcpy(new_token->type,typeOfToken);
			strcpy(new_token->sub_type, sub);
			strcpy(new_token->category,cat);
			
			if (strcmp(new_token->type, "UNDEFINED")==0){
				  head->numToken=counterToken;
			}else{
				counterToken++;
				new_token->numToken=counterToken;
			}
			
			
		}else{
			temp_token=head;
			while(temp_token->next!=NULL){
				temp_token=temp_token->next;
			}
			temp_token->next=new_token;
			new_token->next=NULL;
			new_token->numline=yylineno;
			
			
			strcpy(new_token->content,content);
			strcpy(new_token->type,typeOfToken);
			strcpy(new_token->sub_type, sub);
			strcpy(new_token->category,cat);
			
			if (strcmp(new_token->type, "UNDEFINED")==0){
				new_token->numToken=counterToken;
			}else{
				counterToken++;
				new_token->numToken=counterToken;
			}
		}
		
		
	}

	
	
	void print_token(){
		struct alpha_token_t *temp=head;
		printf("\n-------------------------------   LEXICAL ANALYSIS   -------------------------------\n\n");
		while(temp!=NULL){
			if(strcmp(temp->type, "ID")==0 || strcmp(temp->type, "STRING")==0){
				printf("%d: #%d    \"%s\"     %s    \"%s\"     <-%s \n", temp->numline, temp->numToken, temp->content, temp->type, temp->sub_type, temp->category);
			}else if (strcmp(temp->type, "UNDEFINED")==0){
				printf("%d: Error: undefined character %s \n",temp->numline,temp->content);
			}else {
				printf("%d: #%d    \"%s\"     %s    %s     <-%s \n", temp->numline, temp->numToken, temp->content, temp->type, temp->sub_type, temp->category);
			}
			temp=temp->next;
		
		}
	}
	void fprint_token(FILE *output){
        
        struct alpha_token_t *temp=head;
		fprintf(output,"\n-------------------------------   LEXICAL ANALYSIS   -------------------------------\n\n");
		while(temp!=NULL){
			if(strcmp(temp->type, "ID")==0 || strcmp(temp->type, "STRING")==0){
				fprintf(output,"%d: #%d    \"%s\"     %s    \"%s\"     <-%s \n", temp->numline, temp->numToken, temp->content, temp->type, temp->sub_type, temp->category);
			}else if (strcmp(temp->type, "UNDEFINED")==0){
				fprintf(output,"%d: Error: undefined character %s \n",temp->numline,temp->content);
			}else{
				fprintf(output,"%d: #%d    \"%s\"     %s    %s     <-%s \n", temp->numline, temp->numToken, temp->content, temp->type, temp->sub_type, temp->category);
			}
			temp=temp->next;
		
		}
        fclose(output);
    }
	
%}

%option yylineno
%option noyywrap

IF "if" 
ELSE "else"
WHILE "while"
FOR "for"
FUNCTION "function"
RETURN "return"
BREAK "break"
CONTINUE "continue"
AND "and"
NOT "not"
OR "or"
LOCAL "local"
TRUE "true"
FALSE "false"
NILL "nill"

ASSIGN "="
EQUAL "=="
PLUS "+"
PLUS_PLUS "++"
MINUS "-"
MINUS_MINUS "--"
MULTI "*"
DIV "/"
MOD "%"
NOT_EQUAL "!="
LESS_THAN "<"
GREATER_THAN ">"
LESS_EQUAL "<="
GREATER_EQUAL ">="

INTEGER [0-9]+
REAL [0-9]+"."[0-9]+

STRING \"

OPENED_BRACES "{"
CLOSED_BRACES "}"
OPENED_BRACKETS "["
CLOSED_BRACKETS "]"
OPENED_PARENTHESES "("
CLOSED_PARENTHESES ")"
SEMICOLON ";"
COMMA ","
COLON ":"
DOUBLE_COLON "::"
DOT "."
DOUBLE_DOT ".."

ID [a-zA-Z][a-zA-Z_0-9]*

UNDEFINED_CHAR [$!@#&_$~?^|]*

COMMENT1 "//".*
COMMENT2 "/*"



%%
{UNDEFINED_CHAR} {return UNDEFINED_CHAR;}

{IF} {return IF;}  
{ELSE} {return ELSE;}  
{WHILE} {return WHILE;}  
{FOR} {return FOR;}  
{FUNCTION} {return FUNCTION;}  
{RETURN} {return RETURN;}  
{BREAK} {return BREAK;}  
{CONTINUE} {return CONTINUE;}  
{AND} {return AND;}  
{NOT} {return NOT;}  
{OR} {return OR;}  
{LOCAL} {return LOCAL;}  
{TRUE} {return TRUE;}  
{FALSE} {return FALSE;}  
{NILL} {return NILL;}  


{ASSIGN} {return ASSIGN;}  
{EQUAL} {return EQUAL;}  
{PLUS} {return PLUS;} 
{PLUS_PLUS} {return PLUS_PLUS;}  
{MINUS} {return MINUS;}  
{MINUS_MINUS} {return MINUS_MINUS;}  
{MULTI} {return MULTI;}  
{DIV} {return DIV;} 
{MOD} {return MOD;} 
{NOT_EQUAL} {return NOT_EQUAL;} 
{LESS_THAN} {return LESS_THAN;} 
{GREATER_THAN} {return GREATER_THAN;} 
{LESS_EQUAL} {return LESS_EQUAL;} 
{GREATER_EQUAL} {return GREATER_EQUAL;} 

{INTEGER} {yylval.intValue=atoi(yytext); return INTEGER;} 
{REAL} {yylval.realValue=atof(yytext); return REAL;} 



"\"" {

	 
	 int c, counter=0,quotecnt=1;
	 char* string;
	 int buff_size=100;
	 string = malloc(sizeof(char*)*buff_size);
		while((c=input())!=-1 && c!=0){
			if(c=='\\'){
				c=input();
				if(c!=EOF && c=='n'){
					string[counter]='\n';
					counter++;
				}
				else if(c!=EOF && c=='t'){
					string[counter]='\t';
					counter++;
				}
				else if(c!=EOF && c=='\\'){
					string[counter]='\\';
					counter++;
				}
				else if(c!=EOF && c=='\"'){
					string[counter]='"';
					counter++;
				}
			}
			else if (c=='\"'){
				quotecnt++;
				add_token(string,"STRING",string,"char*");
				break;
				}
			else{
				string[counter]=c;
				counter++;
			}	
			if(buff_size<counter){
				buff_size=counter*2;
				string= realloc(string,buff_size);
			}
		}
		if((quotecnt % 2 !=0) && (c==0 || c==-1)){
			print_token();
			printf("ERROR:Missing quotes\n");
			exit(0);
		}
		yylval.stringValue=strdup(string); return STRING;
	}


{OPENED_BRACES} {return OPENED_BRACES;}
{CLOSED_BRACES} {return CLOSED_BRACES;}
{OPENED_BRACKETS} {return OPENED_BRACKETS;}
{CLOSED_BRACKETS} {return CLOSED_BRACKETS;}
{OPENED_PARENTHESES} {return OPENED_PARENTHESES;}
{CLOSED_PARENTHESES} {return CLOSED_PARENTHESES;} 
{SEMICOLON} {return SEMICOLON;}
{COMMA} {return COMMA;} 
{COLON} {return COLON;} 
{DOUBLE_COLON} {return DOUBLE_COLON;} 
{DOT} {return DOT;} 
{DOUBLE_DOT} {return DOUBLE_DOT;} 

{ID} {yylval.stringValue=strdup(yytext); return ID;}

"//" {
	int c;
	c=input();
	add_token("","COMMENT","LINE_COMMENT","enumerated");
	while(c!=0 && c!=-1){
		if(c=='\n') break;
		c=input();
		if(c=='\n' || c==-1 || c==0){
			break;
		}
	}
	
}

"/*" {
	int c, cnt=1;
	
	while((c=input())!= 0 && c!=-1) {
		if(c=='/'){
			if((c=input())=='*'){
			cnt++;
			}
			else{
				unput(c);
			}
		}
		else if(c=='*'){
			if((c=input())=='/'){
			cnt--;
			if(cnt>0){
				add_token("","NESTED_COMMENT","BLOCK_COMMENT","enumerated");	
			}else{
				add_token("","COMMENT","BLOCK_COMMENT","enumerated");
				break;
			}
			}else{
				unput(c);
			}
		}
	}

	if(cnt>0){
		print_token();
		printf("ERROR:Missing */\n");
		exit(0);
	}
}

\n { yylineno; }
[\n\t ' '] {};

%%
/**
int main(int argc,char** argv){	
	if(argc>1){
		if(!(yyin=fopen(argv[1],"r"))){
		
			fprintf(stderr,"Error%s\n",argv[1]);
			
			return 1;
		}
	}else{
		yyin=stdin;
	}	
	
	alpha_yylex(NULL);
	
	if(argc==2){
        print_token();
    }else{
		FILE *output;
        output = fopen (argv[2], "w");
		fprint_token(output);
    }
	
	return 0;
}
*/