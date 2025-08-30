%{
    #include <stdio.h>
	#include "symtable.h"
	#include "quads.h"
	#include <math.h>
	#include "generate.h"

    int yyerror (char* yaccProvidedMessage);
    int yylex (void);
	    
	extern int yylineno;
    extern char* yytext;
    extern FILE* yyin;
	unsigned int scope=0,max_scope=0,anonym_cnt=0;
	SymTable oSymTable;  
	char *anonymousFunc;
	struct SymbolTableEntry *tmp = NULL;
	int loopcounter=0;
	struct expr* inlist = NULL;
	struct stackloop *loop_stack=NULL;
	int retcnt=0;
	struct funcstack *func_stack = NULL;
	unsigned int quadcounter=0;
%}

%start program

%union{
	char* stringValue;
	int intValue;
	double realValue;
	struct expr *exprValue;
	struct stmt_t *stmtValue; //prosthesa kai auto
	struct for_stmt *forValue; //kai auto
	struct call *callValue;
}

%token IF
%token ELSE
%token WHILE
%token FOR
%token FUNCTION
%token RETURN
%token BREAK;
%token CONTINUE
%token AND 
%token NOT
%token OR
%token LOCAL
%token TRUE
%token FALSE
%token NILL

%token ASSIGN
%token EQUAL
%token PLUS
%token PLUS_PLUS
%token MINUS
%token MINUS_MINUS
%token MULTI
%token DIV
%token MOD
%token NOT_EQUAL
%token LESS_THAN
%token GREATER_THAN
%token LESS_EQUAL
%token GREATER_EQUAL

%token <intValue> INTEGER
%token <realValue> REAL

%token <stringValue> STRING

%token OPENED_BRACES
%token CLOSED_BRACES
%token OPENED_BRACKETS
%token CLOSED_BRACKETS
%token OPENED_PARENTHESES
%token CLOSED_PARENTHESES
%token SEMICOLON
%token COMMA
%token COLON
%token DOUBLE_COLON
%token DOT
%token DOUBLE_DOT

%token <stringValue> ID

%token UNDEFINED_CHAR

%token COMMENT1
%token COMMENT2

%right ASSIGN /*=*/
%left OR /*or*/
%left AND /*and*/
%nonassoc EQUAL NOT_EQUAL /* == != */
%nonassoc GREATER_THAN GREATER_EQUAL LESS_THAN LESS_EQUAL /* > <= < <= */
%left PLUS MINUS								/*+ -*/
%left MULTI DIV MOD 							/* * / % */
%right NOT PLUS_PLUS MINUS_MINUS UMINUS 		/*not ++ -- -*/
%left DOT DOUBLE_DOT                       		/*. ..*/
%left OPENED_BRACKETS CLOSED_BRACKETS       	/*[ ]*/
%left OPENED_PARENTHESES CLOSED_PARENTHESES		/*( )*/

%type <intValue> whilecond whilestart ifprefix elseprefix N M funcbody
%type <exprValue> lvalue const expr assignexpr term member elist call objectdef primary exprs funcprefix funcdef 
%type <stmtValue> stmts stmt break continue block loopstmt 
%type <forValue> forprefix
%type <callValue> methodcall normcall callsuffix 



%%
program:  stmts 

          ;    
stmts:stmt{$$=$1;}
		  ;	
stmts: stmts stmt{$$->breakList=mergelist($1->breakList,$2->breakList);$$->contList=mergelist($1->contList,$2->contList);}		
		  ;
stmt:     expr SEMICOLON {resettemp();$$=malloc(sizeof(struct stmt_t));}
          |ifstmt {resettemp(); $$=malloc(sizeof(struct stmt_t));}
          |whilestmt  {resettemp(); $$=malloc(sizeof(struct stmt_t));}
          |forstmt {resettemp(); $$=malloc(sizeof(struct stmt_t));}
          |returnstmt {resettemp(); $$=malloc(sizeof(struct stmt_t));}
          |break {resettemp();$$=$1;}
          |continue {resettemp();$$=$1;}
          |block { resettemp();$$=$1;}
          |funcdef {resettemp(); $$=malloc(sizeof(struct stmt_t));}
          |SEMICOLON {resettemp(); $$=malloc(sizeof(struct stmt_t));}
		  ;
		  

expr:     assignexpr 
          |expr PLUS expr { if((ex_op_ex($1->type, yylineno)==1) && (ex_op_ex($3->type, yylineno)==1))break;
							 if((isConst($1->type, yylineno)==0) && (isConst($3->type, yylineno)==0)){
								$$=add_expr(constnum_e); char *tempname=newtempname(); 
								$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
								$$->numConst = $1->numConst + $3->numConst; 
								emit(add, $$, $1, $3, 0, yylineno);
		  					}else{
								$$=add_expr(arithexpr_e); char *tempname=newtempname(); 
								$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar);
								emit(add, $$, $1, $3, 0, yylineno);
							}
						}
		  |expr MINUS expr { if((ex_op_ex($1->type, yylineno)==1) && (ex_op_ex($3->type, yylineno)==1))break;
							 if((isConst($1->type, yylineno)==0) && (isConst($3->type, yylineno)==0)){
								$$=add_expr(constnum_e); char *tempname=newtempname(); 
								$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
								$$->numConst = $1->numConst - $3->numConst; 
								emit(sub, $$, $1, $3, 0, yylineno);
		  					}else{
								$$=add_expr(arithexpr_e); char *tempname=newtempname(); 
								$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar);
								emit(sub, $$, $1, $3, 0, yylineno);
							}
						}
		  |expr MULTI expr { if((ex_op_ex($1->type, yylineno)==1) && (ex_op_ex($3->type, yylineno)==1))break;
							 if((isConst($1->type, yylineno)==0) && (isConst($3->type, yylineno)==0)){
								$$=add_expr(constnum_e); char *tempname=newtempname(); 
								$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
								$$->numConst = $1->numConst * $3->numConst; 
								emit(mul, $$, $1, $3, 0, yylineno);
		  					}else{
								$$=add_expr(arithexpr_e); char *tempname=newtempname(); 
								$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
								emit(mul, $$, $1, $3, 0, yylineno);
							}
						}
		  |expr DIV expr { if((ex_op_ex($1->type, yylineno)==1) && (ex_op_ex($3->type, yylineno)==1))break;
						   if((isConst($1->type, yylineno)==0) && (isConst($3->type, yylineno)==0)){
								if($3->numConst!=0){
									$$=add_expr(constnum_e); char *tempname=newtempname(); 
									$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
									$$->numConst = $1->numConst / $3->numConst; 
									emit(div_v, $$, $1, $3, 0, yylineno);
									}
								else{
									printf("Error div with 0 at line %d\n",yylineno);
								}
		  					}else{
									$$=add_expr(arithexpr_e); char *tempname=newtempname(); 
									$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar);
									emit(div_v, $$, $1, $3, 0, yylineno);
							}
						}
		  |expr MOD expr { if((ex_op_ex($1->type, yylineno)==1) && (ex_op_ex($3->type, yylineno)==1))break;
						   if((isConst($1->numConst, yylineno)==0) && (isConst($3->type, yylineno)==0)){
								if($3->numConst!=0){
									$$=add_expr(constnum_e); char *tempname=newtempname(); 
									$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
									$$->numConst = fmod($1->numConst, $3->numConst); 
									emit(mod, $$, $1, $3, 0, yylineno);
									}
								else{
									printf("Error mod with 0 at line %d\n",yylineno);
								}
		  					}else{
									$$=add_expr(arithexpr_e); char *tempname=newtempname(); 
									$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar);
									emit(mod, $$, $1, $3, 0, yylineno);
							}
						}
		  |expr GREATER_THAN expr {	if((ex_op_ex($1->type, yylineno)==1) && (ex_op_ex($3->type, yylineno)==1))break; //apo edo kai kato ta simerina
									$$ = add_expr(boolexpr_e);
									char *tempname=newtempname(); 
									$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
									emit(if_greater,NULL,$1,$3,nextquadlabel()+3,yylineno);
									emit(assign,$$,newexpr_constbool(0),NULL,0,yylineno);
									emit(jump,NULL,NULL,NULL,nextquadlabel()+2,yylineno);
									emit(assign,$$,newexpr_constbool(1),NULL,0,yylineno);}
									
		  |expr GREATER_EQUAL expr{ if((ex_op_ex($1->type, yylineno)==1) && (ex_op_ex($3->type, yylineno)==1))break; //apo edo kai kato ta simerina
									$$ = add_expr(boolexpr_e);
									char *tempname=newtempname(); 
									$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
									emit(if_greatereq,NULL,$1,$3,nextquadlabel()+3,yylineno);
									emit(assign,$$,newexpr_constbool(0),NULL,0,yylineno);
									emit(jump,NULL,NULL,NULL,nextquadlabel()+2,yylineno);
									emit(assign,$$,newexpr_constbool(1),NULL,0,yylineno);}
									
		  |expr LESS_THAN expr { 	if((ex_op_ex($1->type, yylineno)==1) && (ex_op_ex($3->type, yylineno)==1))break; //apo edo kai kato ta simerina
									$$ = add_expr(boolexpr_e);
									char *tempname=newtempname(); 
									$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
									emit(if_less,NULL,$1,$3,nextquadlabel()+3,yylineno);
									emit(assign,$$,newexpr_constbool(0),NULL,0,yylineno);
									emit(jump,NULL,NULL,NULL,nextquadlabel()+2,yylineno);
									emit(assign,$$,newexpr_constbool(1),NULL,0,yylineno);}
									
		  |expr LESS_EQUAL expr { 	if((ex_op_ex($1->type, yylineno)==1) && (ex_op_ex($3->type, yylineno)==1))break; //apo edo kai kato ta simerina
									$$ = add_expr(boolexpr_e);
									char *tempname=newtempname(); 
									$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
									emit(if_lesseq,NULL,$1,$3,nextquadlabel()+3,yylineno);
									emit(assign,$$,newexpr_constbool(0),NULL,0,yylineno);
									emit(jump,NULL,NULL,NULL,nextquadlabel()+2,yylineno);
									emit(assign,$$,newexpr_constbool(1),NULL,0,yylineno);}
									
		  |expr EQUAL expr      {   if((ex_op_ex($1->type, yylineno)==1) && (ex_op_ex($3->type, yylineno)==1))break; //apo edo kai kato ta simerina
		  
									$$ = add_expr(boolexpr_e);
									char *tempname=newtempname(); 
									$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
									emit(if_eq,NULL,$1,$3,nextquadlabel()+3,yylineno);
									emit(assign,$$,newexpr_constbool(0),NULL,0,yylineno);
									emit(jump,NULL,NULL,NULL,nextquadlabel()+2,yylineno);
									emit(assign,$$,newexpr_constbool(1),NULL,0,yylineno);}
									
		  |expr NOT_EQUAL expr  {   if((ex_op_ex($1->type, yylineno)==1) && (ex_op_ex($3->type, yylineno)==1))break; //apo edo kai kato ta simerina
									$$ = add_expr(boolexpr_e);
									char *tempname=newtempname(); 
									$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
									emit(if_noteq,NULL,$1,$3,nextquadlabel()+3,yylineno);
									emit(assign,$$,newexpr_constbool(0),NULL,0,yylineno);
									emit(jump,NULL,NULL,NULL,nextquadlabel()+2,yylineno);
									emit(assign,$$,newexpr_constbool(1),NULL,0,yylineno);}
									
		  |expr AND expr        {
									$$ = add_expr(boolexpr_e);
									char *tempname=newtempname(); 
									$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
									emit(and,$$,$1,$3,0,yylineno);}
									
		  |expr OR expr         {	$$ = add_expr(boolexpr_e);
									char *tempname=newtempname(); 
									$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
									emit(or,$$,$1,$3,0,yylineno);}
          |term {$$=$1;}
		  ;


term:     OPENED_PARENTHESES  expr CLOSED_PARENTHESES {$$=$2;}
          |MINUS expr %prec UMINUS {
					check_arith($2->type,yylineno);
					$$=add_expr(arithexpr_e); 
					char *tempname=newtempname(); 
					$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar);
					emit(uminus, $$, $2, NULL, 0, yylineno);
					
		  }
          |NOT  expr {
						$$ = add_expr(boolexpr_e);
						char *tempname=newtempname(); 
						$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar);  
						emit(not, $$, $2, NULL, 0, yylineno);
		  }
          |PLUS_PLUS lvalue {if(isFunc(oSymTable, $2->sym->value.varVal->name)==userfunc)yyerror("Error: UserFunc as an lvalue");
					 if (isLibfunc(oSymTable, $2->sym->value.varVal->name)==libfunc)yyerror("Error: LibFunc as an lvalue");}
					 { check_arith($2->type,yylineno);
						if($2->type==tableitem_e){
							$$ = emit_iftableitem($2, yylineno, oSymTable);
							emit(add, $$, $$, newexpr_constnum(1), 0, yylineno);
							emit(tablesetelem, $2, $2->index,$$, 0, yylineno);
					 	}
						else{
							struct expr *const1 = newexpr_constnum(1);
							$$=add_expr(arithexpr_e); 
							char *tempname=newtempname(); 
							$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
							emit(add, $2, $2, const1, 0, yylineno);
							emit(assign, $$, $2, NULL, 0, yylineno);
		  				}
					}
          |lvalue {if(isFunc(oSymTable, $1->sym->value.varVal->name)==userfunc)yyerror("Error: UserFunc as an lvalue");
					 if (isLibfunc(oSymTable,$1->sym->value.varVal->name)==libfunc)yyerror("Error: LibFunc as an lvalue");} 
					PLUS_PLUS
						{ check_arith($1->type,yylineno);
						  $$=add_expr(var_e);
						  struct expr *const1 = newexpr_constnum(1);
						  char *tempname=newtempname(); 
						  $$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
					 	if($1->type==tableitem_e){
						struct expr *val = emit_iftableitem($1, yylineno, oSymTable);
								emit(assign, $$, val, NULL, 0, yylineno);
								emit(add, val,val, newexpr_constnum(1), 0, yylineno);
							    emit(tablesetelem, $1, $1->index,val, 0, yylineno);
						}else{
						emit(assign, $$, $1, NULL, 0, yylineno);
						
						emit(add, $1, $1, const1, 0, yylineno);
						}
						
					
					}
          |MINUS_MINUS lvalue {if(isFunc(oSymTable, $2->sym->value.varVal->name)==userfunc)yyerror("Error: UserFunc as an lvalue");
					 if (isLibfunc(oSymTable, $2->sym->value.varVal->name)==libfunc)yyerror("Error: LibFunc as an lvalue");}
					 { check_arith($2->type,yylineno);
						if($2->type==tableitem_e){
							$$ = emit_iftableitem($2, yylineno, oSymTable);
							emit(sub, $$, $$, newexpr_constnum(1), 0, yylineno);
							emit(tablesetelem, $2, $2->index,$$, 0, yylineno);
					 	}
						else {
							struct expr *const1;
						  	const1=newexpr_constnum(1);
							$$=add_expr(arithexpr_e); 
							char *tempname=newtempname(); 
							$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
							emit(sub, $2, $2, const1, 0, yylineno);
							emit(assign, $$, $2, NULL, 0, yylineno);
		  				}
					}
          |lvalue {if(isFunc(oSymTable, $1->sym->value.varVal->name)==userfunc)yyerror("Error: UserFunc as an lvalue");
					 if (isLibfunc(oSymTable, $1->sym->value.varVal->name)==libfunc)yyerror("Error: LibFunc as an lvalue");} 
					 MINUS_MINUS
					 { 	check_arith($1->type,yylineno);
						struct expr *const1=newexpr_constnum(1);
						$$=add_expr(var_e); 
						char *tempname=newtempname();
						$$->sym=SymTable_insert(oSymTable, tempname, scope, tempvar);
						if($1->type==tableitem_e){
							struct expr *val = emit_iftableitem($1, yylineno, oSymTable);
							emit(assign, $$, val, NULL, 0, yylineno);
							emit(sub, val,val, newexpr_constnum(1), 0, yylineno);
						    emit(tablesetelem, $1, $1->index, val,0, yylineno);
					 	}
						else{
							emit(assign, $$, $1, NULL, 0, yylineno);
							emit(sub, $1, $1, const1, 0, yylineno); 
		  				}
					}
          |primary {$$=$1;}
		  ;

assignexpr:  lvalue ASSIGN {if(isFunc(oSymTable,  $1->sym->value.varVal->name)==userfunc)yyerror("Error: UserFunc as an lvalue");
							if(isLibfunc(oSymTable,  $1->sym->value.varVal->name)==libfunc)yyerror("Error: LibFunc as an lvalue");
			 ;} expr {	if($1->type == tableitem_e){							//gia member
							emit(tablesetelem, $1, $1->index,$4, 0 , yylineno);
							$$ = emit_iftableitem($1, yylineno, oSymTable);
							$$->type = assignexpr_e;
			 			}else{
						
						emit(assign, $1, $4, NULL, 0, yylineno); 
						$$=add_expr(assignexpr_e); 
						char *tempname=newtempname();
						struct expr *temp=add_expr(var_e);						
						
						temp->sym=SymTable_insert(oSymTable, tempname, scope, tempvar);
						$$=temp;
						emit(assign, $$, $1, NULL, 0, yylineno);}
			 		}
			 |call ASSIGN expr	{printf("Error: line %d func call is not lvalue\n",yylineno);} 
			 ;

primary:     lvalue {$$ = emit_iftableitem($1, yylineno, oSymTable);}
             |call    {$$=$1;}
             |objectdef {$$=$1;}
             |OPENED_PARENTHESES funcdef CLOSED_PARENTHESES {$$=add_expr(programfunc_e); $$->sym=$2->sym;}
             |const {$$=$1;}
			 ;

lvalue:      ID {	tmp = NULL;
					if(SymTable_lookup(oSymTable,$1)==0){
                        if(scope==0) {
							tmp = SymTable_insert(oSymTable,$1 ,scope,global); 
							$$ = add_expr(var_e); $$->sym = tmp;}
                        else {
							tmp = SymTable_insert(oSymTable,$1 ,scope,local);
							$$ = add_expr(var_e); $$->sym = tmp;}
					}else if(SymTable_lookup(oSymTable,$1)==1){
						tmp =look_up(oSymTable, $1);
						$$ = add_expr(var_e); $$->sym = tmp;
						if(SymTable_lookup_var(oSymTable,$1)==0)break;
						int x = findIfFuncActive(oSymTable,$1, scope);
						if(findIfFuncActive(oSymTable,$1, scope)>0){
							yyerror("Cannot access ID");
						}
					}
					}
             |LOCAL ID {tmp = NULL;
					if(SymTable_lookup_Scope(scope,$2,local)==0 && isLibfunc(oSymTable,$2)!=libfunc){
					if(scope==0){ tmp = SymTable_insert(oSymTable,$2 ,scope,global);$$ = add_expr(var_e); $$->sym = tmp;}
					else{ tmp = SymTable_insert(oSymTable,$2 ,scope,local); $$ = add_expr(var_e); $$->sym = tmp;}}
				else if(SymTable_lookup_Scope(scope,$2,local)==0 && isLibfunc(oSymTable,$2)==libfunc) yyerror("Collision with LibFunc");
				else if(SymTable_lookup_Scope(scope,$2,local)==1){tmp =look_up(oSymTable, $2); $$ = add_expr(var_e); $$->sym = tmp;}}
             |DOUBLE_COLON ID {if (SymTable_lookup_Scope(0,$2,global)==0 )yyerror("Error");}
             |member {$$=$1;}
			 ;

member:      lvalue DOT ID   {
								$$ = member_item($1, $3, yylineno, oSymTable);
							
							}
             |lvalue OPENED_BRACKETS expr CLOSED_BRACKETS { 
																$1 = emit_iftableitem($1, yylineno, oSymTable);
																$$ = add_expr(tableitem_e);
																$$->sym = $1->sym; 
																$$->index = $3;
															
			 											}
             |call DOT ID 
             |call OPENED_BRACKETS expr CLOSED_BRACKETS
			 ;
			 
call:        call OPENED_PARENTHESES exprs CLOSED_PARENTHESES	{
																	$$=make_call($1,reversed_elist($3),yylineno,oSymTable); 
																	}
																
             |lvalue callsuffix {$1=emit_iftableitem($1,yylineno,oSymTable);
							
								if($2->method){
									struct expr *t=$1;
										$1=emit_iftableitem(member_item(t, $2->name, yylineno,oSymTable), yylineno, oSymTable);
										$2->elist->next=t;
										
									
								}
								$$=make_call($1,reversed_elist($2->elist),yylineno,oSymTable);
			 
			 					}
             |OPENED_PARENTHESES funcdef CLOSED_PARENTHESES OPENED_PARENTHESES exprs CLOSED_PARENTHESES {struct expr *func=add_expr(programfunc_e);func->sym=$2->sym; $$=make_call(func,reversed_elist($5),yylineno,oSymTable);}
			 ;
			 
callsuffix:  normcall {$$=$1;}
             |methodcall {$$=$1;}
			 ;


normcall:    OPENED_PARENTHESES exprs CLOSED_PARENTHESES { $$=malloc(sizeof(struct call)); $$->elist=$2; $$->method=0; $$->name=NULL;}
			 ;

methodcall:  DOUBLE_DOT ID  OPENED_PARENTHESES exprs CLOSED_PARENTHESES {$$=malloc(sizeof(struct call));$$->elist=$4; $$->method=1; $$->name=strdup($2);} //This function returns a pointer to a null-terminated byte string, which is a duplicate of the string pointed to by s. The memory obtained is done dynamically using malloc and hence it can be freed using free(). 
//It returns a pointer to the duplicated string s. Spasmeni
			 ;

elist:       expr {$$=$1; $$->next=NULL;}	
            ;

exprs:       elist {$$=$1;}
			|exprs COMMA elist {struct expr* list = $1;
								while(list->next!=NULL)list=list->next;
								list->next = $3;
								$3->next = NULL;
								$$=$1;
								}
			|	{$$=NULL;}
            ;

objectdef:   OPENED_BRACKETS  exprs   CLOSED_BRACKETS {struct expr *t = add_expr(newtable_e);				//elist 
														char *tempname=newtempname();
														t->sym=SymTable_insert(oSymTable, tempname, scope, tempvar);
														emit(tablecreate, NULL, t, NULL, 0, yylineno);
														for (int i=0; $2; $2=$2->next){
														emit(tablesetelem,t,newexpr_constnum(i++),$2,0,yylineno);
														}
														$$ = t;
														}
			 |OPENED_BRACKETS indexed CLOSED_BRACKETS {struct expr *t = add_expr(newtable_e);				//elist
														char *tempname=newtempname();
														t->sym=SymTable_insert(oSymTable, tempname, scope, tempvar);
														emit(tablecreate, NULL, t, NULL, 0, yylineno);
														int i=0;
														struct expr* tmp=inlist;
														while(tmp){
														    emit(tablesetelem,t ,tmp,tmp->next, 0, yylineno);
															tmp=tmp->next->next;
															i++;
														}
														$$=t;
														inlist=NULL;
			 											}
			 ;	

indexed:     indexedelems
             ;

indexedelems:   indexedelem
                |indexedelems COMMA indexedelem
                ;

indexedelem: OPENED_BRACES expr COLON expr CLOSED_BRACES {struct expr* tmp=inlist;
															if(tmp!=NULL){
																while(tmp->next){
																	tmp=tmp->next;
																}
																tmp->next=malloc(sizeof(struct expr*));
																tmp->next=$2;
																tmp->next->next = malloc(sizeof(struct expr*));
																tmp->next->next = $4;
																tmp->next->next->next=NULL;
															}else{
																inlist=malloc(sizeof(struct expr*));
																inlist=$2;
																inlist->next = malloc(sizeof(struct expr*));
																inlist->next = $4;
																inlist->next->next=NULL;
															}
															
															}
			 ; 	

block:       OPENED_BRACES {++scope;if(max_scope<scope)max_scope=scope;}stmts CLOSED_BRACES {SymTable_hide(scope);scope--; $$=$3;}
			| OPENED_BRACES {++scope;if(max_scope<scope)max_scope=scope;} CLOSED_BRACES {SymTable_hide(scope);scope--;}
			 ;	


funcprefix: FUNCTION ID{ tmp=NULL;

				if(SymTable_lookup_Scope(scope,$2,userfunc)==1 || isLibfunc(oSymTable,$2)==libfunc ) yyerror("Name already taken");
				else{
				struct expr* tmp = add_expr(programfunc_e);
				tmp->sym=SymTable_insert(oSymTable,$2,scope,userfunc);
				tmp->sym->value.funcVal->iaddress=nextquadlabel();
				$$=tmp;
				
				emit(jump,NULL,NULL,NULL,0,yylineno);
				push_jump(&func_stack,currQuad-1);
				
				
				emit(funcstart,NULL,$$,NULL,0,yylineno);
				push(currscopeoffset());
				enterscopespace();
				resetformalargsoffset();
				
				}
				}
			| FUNCTION{  anonymousFunc=malloc(sizeof(char)*30);sprintf(anonymousFunc,"$%d", anonym_cnt);anonym_cnt++;
                struct expr* tmp = add_expr(programfunc_e);
				tmp->sym=SymTable_insert(oSymTable,anonymousFunc,scope,userfunc);
				tmp->sym->value.funcVal->iaddress=nextquadlabel();
				$$=tmp;
				emit(jump,NULL,NULL,NULL,0,yylineno);
				push_jump(&func_stack,currQuad-1);
				emit(funcstart,NULL,$$,NULL,0,yylineno);
				push(currscopeoffset());
				enterscopespace();
				resetformalargsoffset();
				 }  
             
		;	
funcargs: OPENED_PARENTHESES{
				++scope;
				 if(max_scope<scope)max_scope=scope; } idlists CLOSED_PARENTHESES{--scope;enterscopespace();resetfunctionlocalsoffset(); push_loop(&loop_stack,loopcounter); loopcounter=0; retcnt++;}
				 ;
funcbody: block{$$=currscopeoffset(); exitscopespace(); loopcounter=pop_loop(&loop_stack); retcnt--; patch(func_stack);}
				;
				
funcdef:     funcprefix funcargs funcbody{


							exitscopespace();
							$1->sym->value.funcVal->totalLocals=$3;
							int offset=pop_and_top();
                            restorecurrscopeoffset(offset);
							$$=$1;
							
							emit(funcend,NULL,$1,NULL,0,yylineno);
							quadcounter=pop_jump(&func_stack);
							quads[quadcounter].label=currQuad;
							 hideFunc(scope);
							 
							 
			}
			 ;				 
			 
const:      INTEGER {$$=add_expr(constnum_e); $$->numConst=$1;}
			|REAL {$$=add_expr(constnum_e); $$->numConst=$1;}
			|STRING {$$=add_expr(conststring_e); $$->strConst=$1;}
			|NILL {$$=add_expr(nil_e); $$->strConst=NULL;}
			|TRUE {$$=add_expr(constbool_e); $$->boolConst=1; }
			|FALSE {$$=add_expr(constbool_e); $$->boolConst=0; }
			 ;
			 
idlist:      ID  {
				if(SymTable_lookup_Scope(scope,$1,formal)==1){
					yyerror("Error: redecleration");
				}
				else if(isLibfunc(oSymTable,$1)==libfunc)yyerror("Formal is libfunc");
				else SymTable_insert(oSymTable,$1,scope,formal); 
				}
			|COMMA ID  {
				if(SymTable_lookup_Scope(scope,$2,formal)==1){
					yyerror("Error: redecleration");
				}
				else if(isLibfunc(oSymTable,$2)==libfunc)yyerror("Formal is libfunc");
				else SymTable_insert(oSymTable,$2 ,scope,formal);  }
			 ;

idlists:	idlists idlist 
			|
			;
			 
ifprefix:      IF OPENED_PARENTHESES expr CLOSED_PARENTHESES{
														   emit(if_eq,NULL,$3,newexpr_constbool(1),nextquadlabel()+2,yylineno);
														   $$=nextquadlabel();
														   emit(jump,NULL,NULL,NULL,0,yylineno);}
			 ;
		 
ifstmt:      ifprefix stmt{patchlabel($1,nextquadlabel());}
			 ;
			 
elseprefix: ELSE{$$=nextquadlabel(); emit(jump,NULL,NULL,NULL,0,yylineno);}
		     ;
ifstmt:     ifprefix stmt elseprefix stmt{patchlabel($1,$3+1); patchlabel($3,nextquadlabel());}
			 ;
whilestart: WHILE{$$ = nextquadlabel();}
			 ;
whilecond:  OPENED_PARENTHESES expr CLOSED_PARENTHESES{emit(if_eq,NULL,$2,newexpr_constbool(1),nextquadlabel()+2,yylineno);
													   $$=nextquadlabel();
													   emit(jump,NULL,NULL,NULL,0,yylineno);}
			 ;
whilestmt:   whilestart whilecond  loopstmt {;	 
											emit(jump,NULL,NULL,NULL,$1,yylineno);
											patchlabel($2,nextquadlabel());
											patchlist($3->breakList,nextquadlabel());
											patchlist($3->contList,$1);
											}
		     ;
N:{$$=nextquadlabel();emit(jump,NULL,NULL,NULL,0,yylineno);}	
	;
M:{$$=nextquadlabel();}		
	;

forprefix: FOR OPENED_PARENTHESES elist SEMICOLON M expr SEMICOLON {$$=malloc(sizeof(struct for_stmt));$$->test=$5; $$->enter=nextquadlabel();emit(if_eq,NULL,$6,newexpr_constbool(1),0,yylineno);}
	;
forstmt:    forprefix N elist CLOSED_PARENTHESES N loopstmt N{patchlabel($1->enter,$5+1);
														patchlabel($2,nextquadlabel());
														patchlabel($5,$1->test);
														patchlabel($7,$2+1);
														patchlist($6->breakList,nextquadlabel());
														patchlist($6->contList,$2+1);}
			 ;
loopstart: {++loopcounter;}
		;
loopend: {--loopcounter;}
		;
loopstmt: loopstart stmt loopend{$$=$2;}
		;
returnstmt:  RETURN  expr  SEMICOLON{if(scope==0||retcnt==0) printf("Error return is out of func at line %d\n",yylineno);else{ emit(ret,$2,NULL,NULL,0,yylineno); emit(jump,NULL,NULL,NULL,0,yylineno); returnListInsert(quads+currQuad-1,func_stack);}}
			| RETURN SEMICOLON{if(scope==0||retcnt==0)printf("Error return is out of func at line %d\n",yylineno);else{ emit(ret,NULL,NULL,NULL,0,yylineno); emit(jump,NULL,NULL,NULL,0,yylineno); returnListInsert(quads+currQuad-1,func_stack);}}
			 ;
break: BREAK SEMICOLON{if(loopcounter!=0){$$=malloc(sizeof(struct stmt_t));make_stmt($$);$$->breakList=newlist(nextquadlabel());emit(jump,NULL,NULL,NULL,0,yylineno);}else if(scope==0 || loopcounter==0) {printf("Error break out of loop at line %d\n",yylineno); exit(0);}}
	;
continue: CONTINUE SEMICOLON{if(loopcounter!=0){$$=malloc(sizeof(struct stmt_t));make_stmt($$);$$->contList=newlist(nextquadlabel());emit(jump,NULL,NULL,NULL,0,yylineno);} else if(scope==0 || loopcounter==0) {printf("Error continue out of loop at line %d\n",yylineno); exit(0);}}
	;	
			 
%%

int yyerror (char* yaccProvidedMessage){
    fprintf(stderr, "%s: at line %d, at token: %s\n", yaccProvidedMessage, yylineno, yytext);
    //fprintf(stderr, "INPUT NOT VALID\n");
}

int main(int argc, char** argv){
    if(argc>1){
		if(!(yyin=fopen(argv[1],"r"))){
		
			fprintf(stderr,"Error%s\n",argv[1]);
			
			return 1;
		}
	}
	else yyin=stdin;
	 

	 
	
	oSymTable =SymTable_new();
	
	
	/*arxikopoihsh pinka gia tis libfuncs*/
	SymTable_insert(oSymTable,"print" ,0,libfunc);
	SymTable_insert(oSymTable,"input" ,0,libfunc);
	SymTable_insert(oSymTable,"objectmemberkeys" ,0,libfunc);
	SymTable_insert(oSymTable,"objecttotalmembers" ,0,libfunc);
	SymTable_insert(oSymTable,"objectcopy" ,0,libfunc);
	SymTable_insert(oSymTable,"totalarguments" ,0,libfunc);
	SymTable_insert(oSymTable,"argument" ,0,libfunc);
	SymTable_insert(oSymTable,"typeof" ,0,libfunc);
	SymTable_insert(oSymTable,"strtonum" ,0,libfunc);
	SymTable_insert(oSymTable,"sqrt" ,0,libfunc);
	SymTable_insert(oSymTable,"cos" ,0,libfunc);
	SymTable_insert(oSymTable,"sin" ,0,libfunc);
       
	yyparse(); 
	
	
    print_token_value(oSymTable,max_scope); 
	
	
	print_quads();
	generate_code();
	print_instruction();
	
	print_quads_file();
	return 0;

  }
