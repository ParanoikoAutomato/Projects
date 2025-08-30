#include <stdlib.h>
#include <string.h>
#include <assert.h>
#include <stdio.h>
#include <stdbool.h>

extern int yylineno;

#define HASH_MULTIPLIER 65599
#define BUCKETS 509
	#define size 100 //size of stack
//mpikan edo
	unsigned int programVarOffset = 0;
	unsigned int functionLocalOffset = 0;
	unsigned int formalArgOffset = 0;
	unsigned int scopeSpaceCounter = 1;
	int tempcounter = 0;
	unsigned int scopeoffsetStack[size];
    int top=-1;
void push(unsigned int curr);

	void resetfunctionlocalsoffset();

typedef enum {
    global,local,formal,
    userfunc, libfunc, tempvar
}SymbolType;

typedef enum {
	programvar,localfunc,
	formalarg
}scopespace_t;

scopespace_t currscopespace(void);
unsigned int currscopeoffset(void);
void incurrscopeoffset(void);
int resettemp();
char *newtempname();
int resettemp();

typedef struct Variable{
    const char *name;
    unsigned int scope;
    unsigned int line; 
}Variable;

typedef struct Function{
    const char *name;
    SymbolType type;
    unsigned int scope;
    unsigned int line; 
	unsigned int isFuncActive; 
	unsigned int iaddress;
	unsigned int taddress;
	unsigned int totalLocals;
}Function;


typedef struct SymbolTableEntry{
    bool isActive;
    union{
        Variable *varVal;
        Function *funcVal;
    }value;
	scopespace_t space; //extra pedio
	unsigned int offset; //extra pedio
    SymbolType type;
	struct SymbolTableEntry *next_scope;
    struct SymbolTableEntry *next;

}SymbolTableEntry;

struct SymbolTable{
	struct SymbolTableEntry *hash_table[BUCKETS];
};

struct stackloop{
int loopcounter;
struct 	stackloop *next;
	
};

typedef struct SymbolTable *SymTable ;

struct SymbolTableEntry **scopeTable;
int buff_size=100;

static unsigned int SymTable_hash(const char *name){
	size_t i;
    unsigned int hash = 0U;
    for (i = 0; name[i] != '\0'; i++) {
        hash = hash * (unsigned int) HASH_MULTIPLIER + (unsigned int) name[i];
    }
    return hash % (unsigned int) BUCKETS;
}

SymTable SymTable_new(void){
	int i=0;
	SymTable temptable =malloc(sizeof(struct SymbolTable));
	
	scopeTable = malloc(sizeof( SymbolTableEntry*)*buff_size);
	for(i=0;i<buff_size;i++){
		scopeTable[i]=NULL;
	}
    assert(temptable);

	for (i=0; i<BUCKETS; i++){
		temptable->hash_table[i] = NULL;
	}
	
	return temptable;
}

int SymTable_lookup(SymTable oSymTable, char *name){
    int hash = SymTable_hash(name);
    struct SymbolTableEntry *temp = oSymTable->hash_table[hash];
    assert(oSymTable);
    assert(name);
	
    while(temp!= NULL){
		if((strcmp(temp->value.varVal->name,name)==0)){
			if(temp->isActive==true)return 1;          //epistrefei ena an uparxei
		}else if( (strcmp(temp->value.funcVal->name,name)==0))return 1;
		temp = temp->next;
	}
	return 0;
}

 SymbolTableEntry* look_up(SymTable oSymTable, char *name){
    int hash = SymTable_hash(name);
    struct SymbolTableEntry *temp = oSymTable->hash_table[hash];
    assert(oSymTable);
    assert(name);
	
    while(temp!= NULL){
	 if( (strcmp(temp->value.varVal->name,name)==0))return temp;
		temp = temp->next;
	}
	return NULL;
}

int SymTable_lookup_var(SymTable oSymTable, char *name){
	int hash = SymTable_hash(name);
    struct SymbolTableEntry *temp = oSymTable->hash_table[hash];
    assert(oSymTable);
    assert(name);
	while(temp!= NULL){
		if((strcmp(temp->value.varVal->name,name)==0)){
			if(temp->isActive==true)return temp->value.varVal->scope;
		temp = temp->next;
		}
	}
}

int SymTable_lookup_Scope(unsigned int scope,const char *name,SymbolType type){
	
    struct SymbolTableEntry *temp = scopeTable[scope];	

    if(temp==NULL){
		return 0;	
	}

    while(temp){
		if((strcmp(temp->value.varVal->name,name)!=0) || (strcmp(temp->value.funcVal->name,name)!=0)){
			temp = temp->next_scope;
		}else{
			if((strcmp(temp->value.varVal->name,name)==0) || (strcmp(temp->value.funcVal->name,name)==0)){
				if(temp->isActive==false){
					temp = temp->next_scope;  //epistrefei 0 an den to vrei
				}
				else return 1; //epistrefei 1 an vrei global i local stin idia func
			}
		}
	}
	if(temp==NULL) return 0;
}


SymbolTableEntry* SymTable_insert(SymTable oSymTable,const char *name,unsigned int scope,SymbolType type){
	
    SymbolTableEntry *new_node;
	int state,found;
	SymbolTableEntry *temp;
	assert(oSymTable);
	assert(name);

	new_node = malloc(sizeof(SymbolTableEntry));	   

	
    new_node->isActive = true;   
	
	
	
    if(type==global || type==local || type==formal){
		new_node->value.varVal = malloc(sizeof (Variable));
		new_node->value.varVal->name = name;
		new_node->value.varVal->scope = scope;
		new_node->value.varVal->line = yylineno;
		new_node->space=currscopespace();
		new_node->offset=currscopeoffset();
		incurrscopeoffset();
	
		
	}else if(type==tempvar){
		new_node->value.varVal = malloc(sizeof (Variable));
		new_node->value.varVal->name = name;
		new_node->value.varVal->scope = scope;
		new_node->value.varVal->line = yylineno;
		new_node->space=currscopespace();
		new_node->offset=currscopeoffset();
		incurrscopeoffset();
	}else{	
	    new_node->value.funcVal = malloc(sizeof (Function));
		new_node->value.funcVal->name = name;
		new_node->value.funcVal->scope = scope;
		new_node->value.funcVal->line = yylineno;
		new_node->value.funcVal->isFuncActive = 1;
		new_node->value.funcVal->totalLocals=0;
	}
	new_node->type = type;
	state = SymTable_hash(name);
    new_node->next = oSymTable->hash_table[state];
    oSymTable->hash_table[state] = new_node;
	if(scope>=100){
		buff_size=scope*2;
		scopeTable= realloc(scopeTable,sizeof(SymbolTableEntry*)*buff_size);
	}

	if(scopeTable[scope]==NULL){ 
		scopeTable[scope]=new_node;
		new_node->next_scope=NULL;
	}
	else{
		temp = scopeTable[scope];
		while(temp->next_scope!=NULL){
			temp = temp->next_scope;
		}
		temp->next_scope=new_node;
		new_node->next_scope=NULL;
	}
	return new_node;
}

int hideFunc(unsigned int tscope){
	struct SymbolTableEntry *temp = scopeTable[tscope];	
	struct SymbolTableEntry *lastfunc=NULL;
    if(temp==NULL){
		return 0;	
	}
    while(temp!=NULL){
		if(temp->type==userfunc && temp->value.funcVal->isFuncActive==1){
			lastfunc = temp;
		}
		temp = temp->next_scope;
	}
	if(lastfunc!=NULL)lastfunc->value.funcVal->isFuncActive=0;
	return 0;
}

int findIfFuncActive(SymTable oSymTable, char *name, unsigned int tscope){
	int a=0;
	int i = SymTable_lookup_var(oSymTable, name);
	struct SymbolTableEntry *temp = scopeTable[i];
	if(temp==NULL){
		return 0;	
	}
	while((strcmp(temp->value.varVal->name,name)!=0)){
		temp = temp->next_scope;
	}
	for(i; i<=tscope; i++){
		while(temp!=NULL){
			if(temp->type==userfunc && temp->value.funcVal->isFuncActive==1){
				a++;
			}
			temp = temp->next_scope;
		}
		temp=scopeTable[i+1];
	}
	return a;
}

SymbolType isFunc(SymTable oSymTable, const char *name){
	int hash = SymTable_hash(name);
    struct SymbolTableEntry *temp = oSymTable->hash_table[hash];
    assert(oSymTable);
    assert(name);
	if(temp==NULL) return 0;
	while(temp!=NULL){
		if(temp->type==userfunc){
			if(strcmp(temp->value.funcVal->name,name)==0)break;
		}
		else if(temp->type==local || temp->type==global){
			if(strcmp(temp->value.varVal->name,name)==0)break;
		}
		temp = temp->next;
	}
	if(temp==NULL) return 0;
	return temp->type;
}

SymbolType isLibfunc(SymTable oSymTable,const char *name){
	int hash = SymTable_hash(name);
    struct SymbolTableEntry *temp = oSymTable->hash_table[hash];
    assert(oSymTable);
    assert(name);
	if(temp==NULL) return 0;
	while(temp!=NULL){
		if(temp->type==libfunc){
			if(strcmp(temp->value.funcVal->name,name)==0)break;
		}
		temp= temp->next;
	}
	if(temp==NULL) return 0;
	return temp->type;
}

int SymTable_hide(unsigned int scope){
	struct SymbolTableEntry *temp = scopeTable[scope];
	while(temp!=NULL){
		temp->isActive=false;
	
	   temp = temp->next_scope;
	}
	return 1;
}

//apo do kai kato einai copy paste apo diafaneies gia offset kai space;
scopespace_t currscopespace(){
		if(scopeSpaceCounter==1) return programvar;
		else{
			if(scopeSpaceCounter%2==0) return formalarg;
			else return localfunc;
		}
	}


	unsigned int currscopeoffset(void){
		switch(currscopespace()){
			case programvar : return programVarOffset;
			case localfunc : return functionLocalOffset;
			case formalarg : return formalArgOffset;
			default: assert(0);
		}
	}

	void incurrscopeoffset(void){
		switch(currscopespace()){
			case programvar: ++programVarOffset; break;
			case localfunc: ++functionLocalOffset; break;
			case formalarg: ++formalArgOffset; break;
			default: assert(0);
		}
	}

	void enterscopespace(void){
		++scopeSpaceCounter;
	}

	void exitscopespace(void){
		assert(scopeSpaceCounter>1);
		--scopeSpaceCounter;
	}
char *newtempname() {
		char *tmp;
		tmp=malloc(sizeof(char)*30);
		sprintf(tmp,"_t%d",tempcounter);	
		
		tempcounter++;			
		return tmp; 
	}
	
	int resettemp() {
		tempcounter = 0; 
	}
	
	void resetformalargsoffset(){formalArgOffset=0;}
	
	void resetfunctionlocalsoffset(){functionLocalOffset=0;}
	
	void restorecurrscopeoffset(unsigned int n){
		switch(currscopespace()){
			case programvar: programVarOffset=n; break;
			case localfunc:  functionLocalOffset=n; break;
			case formalarg:  formalArgOffset=n; break;
			default:assert(0);
		}
	}
	void push(unsigned int curr){
        if(top==size-1){
            printf("Stack overflow.\n");
            return;
        }
        else{
            top++;
            scopeoffsetStack[top]=curr;
        }
    }

		
	struct stackloop* newNode(int data)
{
    struct stackloop* stackloop = (struct stackloop*) malloc(sizeof(struct stackloop));
    stackloop->loopcounter = data;
    stackloop->next = NULL;
    return stackloop;
}

void push_loop(struct stackloop** root, int data)
{
    struct stackloop* stackloop = newNode(data);
    stackloop->next = *root;
    *root = stackloop;
}
  
		
		
	
	int pop_loop(struct stackloop **root){
		
		  struct stackloop* temp = *root;
    *root = (*root)->next;
    int popped = temp->loopcounter;
    
  
    return popped;
		
	}

    unsigned int pop_and_top(){
        if(top==-1){
            printf("Stack empty");
            return 0;
        }else{
            top = top - 1;
            return scopeoffsetStack[top];
        }
    }
	
	
	
void print_token_value(SymTable oSymTable, unsigned int scope){
	struct SymbolTableEntry *temp;
	unsigned int i=0;
	SymbolType type;
	for(i;i<=scope;i++){
		printf("-----------------------     Scope #%d     -----------------------\n",i);
		temp=scopeTable[i];
		while(temp!=NULL){
			type=temp->type;
			switch (type){
				case libfunc: printf("\"%s\" [library function] (line 0) (scope %d)\n",temp->value.funcVal->name, temp->value.funcVal->scope); break;
				case global: printf("\"%s\" [global variable] (line %d) (scope %d)\n",temp->value.varVal->name, temp->value.varVal->line, temp->value.varVal->scope);break;
				case local: printf("\"%s\" [local variable] (line %d) (scope %d)\n",temp->value.varVal->name, temp->value.varVal->line, temp->value.varVal->scope);break;
				case formal: printf("\"%s\" [formal argument] (line %d) (scope %d)\n",temp->value.varVal->name, temp->value.varVal->line, temp->value.varVal->scope);break;
				case userfunc: printf("\"%s\" [user function] (line %d) (scope %d)\n",temp->value.funcVal->name, temp->value.funcVal->line, temp->value.funcVal->scope);break;
				
			}
			temp=temp->next_scope;
		}
	
	}
	
	
}