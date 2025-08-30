    #include <stdio.h>
    #define EXPAND_SIZE 1024
	#define CURR_SIZE (total*sizeof(quad))
	#define NEW_SIZE (EXPAND_SIZE*sizeof(quad)+CURR_SIZE)

	#define EXPAND_INS_SIZE 1024
	#define CURR_INS_SIZE (total*sizeof(instruction))
	#define NEW_INS_SIZE (EXPAND_INS_SIZE*sizeof(instruction)+CURR_INS_SIZE)
	
	#define EXPAND_VARS_SIZE 1024
	#define CURR_VARS_SIZE (totalVars*sizeof(vari))
	#define NEW_VARS_SIZE (EXPAND_VARS_SIZE*sizeof(vari)+CURR_VARS_SIZE)
	
	#define EXPAND_FUNCS_SIZE 1024
	#define CURR_FUNCS_SIZE (totalUserFuncs*sizeof(userFunc))
	#define NEW_FUNCS_SIZE (EXPAND_FUNCS_SIZE*sizeof(userFunc)+CURR_FUNCS_SIZE)
	
	#define EXPAND_FORMAL_SIZE 1024
	#define CURR_FORMAL_SIZE (totalFormals*sizeof(formalarG))
	#define NEW_FORMAL_SIZE (EXPAND_FORMAL_SIZE*sizeof(formalarG)+CURR_FORMAL_SIZE)
	
	#define EXPAND_LOCAL_SIZE 1024
	#define CURR_LOCAL_SIZE (totalLocals*sizeof(localVar))
	#define NEW_LOCAL_SIZE (EXPAND_LOCAL_SIZE*sizeof(localVar)+CURR_LOCAL_SIZE)


	extern int flag;
	int yyerror (char* yaccProvidedMessage);
    int yylex (void);

    unsigned int total = 0;
	unsigned int currQuad = 0;
	unsigned int currIns = 0;
	unsigned int totalIns=0;
	unsigned int currVars=0;
	unsigned int totalVars=0;
	unsigned int currUserFuncs=0;
	unsigned int totalUserFuncs=0;
	unsigned int totalFormals=0;
	unsigned int currFormals=0;
	unsigned int totalLocals=0;
	unsigned int currLocals=0;
	
	extern unsigned int scope;
	extern struct SymbolTableEntry *tmp;
	struct expr* newexpr_conststring(char *s);
	int buff_num=1000, buff_str=1000, buff_lib=1000;
	int nextinstructionlabel();
	double *numConsts;
	
	unsigned int totalNumConsts=-1;

	unsigned consts_newnumber(double n){
		totalNumConsts++;
		if(totalNumConsts==0)numConsts = malloc(buff_num * sizeof(double));
		else if(totalNumConsts==buff_num){
			buff_num = buff_num*2;
			numConsts = realloc(numConsts, buff_num);
		}
		numConsts[totalNumConsts] = n;
		return totalNumConsts;
	}

	char ** stringConsts;
	unsigned int totalStringConsts=-1;

unsigned consts_newstring(char *s){
        totalStringConsts++;
        if(totalStringConsts==0)stringConsts = malloc(buff_str *sizeof(char*));
        else if(totalStringConsts==buff_str){
            buff_str = buff_str*2;
            stringConsts = realloc(stringConsts, buff_str);
        }
        stringConsts[totalStringConsts] = (char*)malloc((sizeof(char)*strlen(s))+1);
        stringConsts[totalStringConsts] = s;
		return totalStringConsts;
        
    }

	char ** namedLibfuncs;
	unsigned int totalNamedLibfuncs=-1;

	unsigned libfuncs_newused(const char *s){
        totalNamedLibfuncs++;
        if(totalNamedLibfuncs==0)namedLibfuncs = malloc(buff_lib *sizeof(char*));
        else if(totalNamedLibfuncs==buff_lib){
            buff_lib = buff_lib*2;
            namedLibfuncs = realloc(namedLibfuncs, buff_lib);
        }
        namedLibfuncs[totalNamedLibfuncs] = (char*)malloc(sizeof(s));
        namedLibfuncs[totalNamedLibfuncs] = (char*)s;
		return totalNamedLibfuncs;
       
    }
		typedef struct userfunc{
		unsigned int address;
		unsigned int localSize;
		char* id;	
	}userFunc;
	
	userFunc* userfuncs = (userFunc*) 0;
	
	void expand_userf(void){
		assert(totalUserFuncs==currUserFuncs);
		userFunc* i=(userFunc*) malloc(NEW_FUNCS_SIZE);
		if(userfuncs){
			memcpy(i, userfuncs, CURR_FUNCS_SIZE);
			free(userfuncs);
		}
		userfuncs = i;
		totalUserFuncs += EXPAND_FUNCS_SIZE;
	}

	
	unsigned userfuncs_newfuncs(SymbolTableEntry* sym){
		
		if(currUserFuncs == totalUserFuncs)
			expand_userf();

		userFunc* f =userfuncs+currUserFuncs++;
		sym->value.funcVal->taddress=nextinstructionlabel();
		f->address=sym->value.funcVal->taddress;
		f->localSize=sym->value.funcVal->totalLocals;
		f->id=(char*)sym->value.funcVal->name;
		
		return currUserFuncs-1;		
	}
	
	typedef struct vars{
		char* name;
	}vari;
	
		vari* vars = (vari*) 0;
		
	typedef struct formalarG{
			char* name;
	}formalarG;
	
		formalarG *formalargs=(formalarG*) 0;
		
		void expand_formals(){
			assert(totalFormals==currFormals);
		formalarG* fa=(formalarG*) malloc(NEW_FORMAL_SIZE);
		if(formalargs){
			memcpy(fa, formalargs, CURR_FORMAL_SIZE);
			free(formalargs);
		}
		formalargs = fa;
		totalFormals += EXPAND_FORMAL_SIZE;
			
			
		}
		
		void add_formals(unsigned int offset,struct SymbolTableEntry *sym){
			
			if(currFormals==totalFormals) expand_formals();
			formalarG* fa= formalargs+currFormals++;
			
			fa->name=(char*)strdup(sym->value.varVal->name);
		}
		
		
		typedef struct localVar{
			char* name;
	}localVar;
	
		localVar *localVars=(localVar*) 0;
		
		void expand_locals(){
			assert(totalLocals==currLocals);
		localVar* lv=(localVar*) malloc(NEW_LOCAL_SIZE);
		if(localVars){
			memcpy(lv, localVars, CURR_LOCAL_SIZE);
			free(localVars);
		}
		localVars = lv;
		totalLocals += EXPAND_LOCAL_SIZE;
			
			
		}
		
		void add_locals(unsigned int offset,struct SymbolTableEntry *sym){
			
			if(currLocals==totalLocals) expand_locals();
			localVar* lv= localVars+currLocals++;
			
			lv->name=(char*)strdup(sym->value.varVal->name);
		}
		
		
		

	struct incomplete_jump* ij_head=(struct incomplete_jump*) 0;
	unsigned int ij_total=0;
	
	
		
	typedef enum iopcode {
		assign,			add, 			sub,
		mul, 			div_v, 			mod,
		uminus, 		and, 			or,
		not, 			if_eq, 			if_noteq,
		if_lesseq,		if_greatereq,	if_less,
		if_greater,		call,			param,
		ret,			getretval,		funcstart,
		funcend,		tablecreate,	
		tablegetelem,	tablesetelem, jump    
	} iopcode ;

	typedef enum expr_t{
		var_e,
		tableitem_e,
		
		programfunc_e,
		libraryfunc_e,
		
		arithexpr_e,
		boolexpr_e,
		assignexpr_e,
		newtable_e,
		
		constnum_e,
		constbool_e,
		conststring_e,
		nil_e
	
	}expr_t;
	
	//div_v logo redecl
	typedef enum vmopcode{
		assign_v,  add_v,  sub_v,
		mul_v,     div_V,  mod_v,
		uminus_v,  and_v,  or_v,
		not_v,     jeq_v,  jne_v,
		jle_v,     jge_v,  jlt_v,
		jgt_v,     call_v, pusharg_v,
		funcenter_v, funcexit_v, newtable_v,
		tablegetelem_v, tablesetelem_v, nop_v, jump_v
		}vmopcode;
	
	typedef enum vmarg_t{
		label_a=0,
		global_a=1,
		formal_a=2,
		local_a=3,
		number_a=4,
		string_a=5,
		bool_a=6,
		nil_a=7,
		userfunc_a=8,
		libfunc_a=9,
		retval_a=10
		
	}vmarg_t;
	
	

	typedef struct vmarg {
		vmarg_t type;
		unsigned int val; 
	}vmarg;

	typedef struct instruction{
		vmopcode opcode;
		vmarg *result;
		vmarg *arg1;
		vmarg *arg2;
		unsigned int srcLine;
	}instruction;
	
	instruction* instructions = (instruction*) 0;

	
	struct incomplete_jump{
		
		unsigned int instrNo;
		unsigned int iaddress;
		struct incomplete_jump* next;
	};
	
	
		
	
	
	
//prosthesa auta gia statements
	struct stmt_t {           
	int breakList, contList;
	};
	
	//prosthesa auta gia statements
   struct for_stmt{
		int test;
		int enter;
   };
   
   struct call {
			struct expr* elist;
			unsigned char method;
			char* name;
		};
   
	struct expr{
		expr_t type;
		struct SymbolTableEntry * sym;
		struct expr * index;
		double numConst;
		char * strConst;
		unsigned char boolConst;
		struct expr * next;
		
	};


	struct expr* add_expr(expr_t type){
        struct expr *new_expr = malloc(sizeof(struct expr));

        new_expr->type = type;
        new_expr->next = NULL;
        new_expr->sym = NULL;
		return new_expr;
    }

	

	typedef struct quad {
		iopcode op;
		struct expr* result;
		struct  expr* arg1;
		struct  expr* arg2;
		unsigned int label;
		unsigned int line;
		unsigned int taddress;
	} quad ;

	quad* quads = (quad*) 0;

	void add_incomplete_jump(unsigned int instrNo,unsigned int iaddress){
		struct incomplete_jump* new_ij=malloc(sizeof(struct incomplete_jump));
		new_ij->instrNo=instrNo;
		new_ij->iaddress=iaddress;
		struct incomplete_jump* current;
		if(ij_head==NULL){
			new_ij->next=ij_head;
			ij_head=new_ij;
		}else{
			current=ij_head;
			while(current->next!=NULL){ 
			current=current->next;
			}
		new_ij->next=current->next;
		current->next=new_ij;
		}
	}
	
	struct returnList{
		quad *jumpq;
		struct returnList *next;
	};
	
	struct funcstack{
		struct returnList *retList;
		unsigned int jumpcnt;
		struct funcstack *next;
	};
	
	
	
	struct funcstack* newnode(unsigned int data){
		struct funcstack* funcstack = (struct funcstack*) malloc(sizeof(struct funcstack));
		funcstack->jumpcnt = data;
		funcstack->next = NULL;
		return funcstack;
	}

	void push_jump(struct funcstack** root, unsigned int data){
		struct funcstack* funcstack = newnode(data);
		funcstack->next = *root;
		*root = funcstack;
	}
	
	struct funcstack* top_jump(struct funcstack* root)
{
   
    return root;
}
	
  
			
	unsigned int pop_jump(struct funcstack **root){
		
	struct funcstack* temp = *root;
    *root = (*root)->next;
    int popped = temp->jumpcnt;
    //free(temp);
  
    return popped;
		
	}
	
	void returnListInsert(quad *q,struct funcstack *ret){
		struct returnList *new_list=malloc(sizeof(struct returnList));
		new_list->jumpq=q;
		new_list->next=ret->retList;
		ret->retList=new_list;
		
	}
	
	void patch(struct funcstack *f){
		
		while(f->retList!=NULL){
			
			f->retList->jumpq->label=currQuad;
			f->retList=f->retList->next;
		}
		
	}
	
	union value {
		struct expr* e;
		SymbolTableEntry* s;
	};
	
	struct SymbolTableEntry **Table;
	int buff=1000;
	
	void expand_ins(void){
		assert(totalIns==currIns);
		instruction* i=(instruction*) malloc(NEW_INS_SIZE);
		if(instructions){
			memcpy(i, instructions, CURR_INS_SIZE);
			free(instructions);
		}
		instructions = i;
		totalIns += EXPAND_INS_SIZE;
	}
	
	void expand(void){
		assert(total==currQuad);
		quad* p=(quad*) malloc(NEW_SIZE);
		if(quads){
			memcpy(p, quads, CURR_SIZE);
			free(quads);
		}
		quads = p;
		total += EXPAND_SIZE;
	}


	void emit_ins(instruction *t){
	
		if(currIns==totalIns) expand_ins();
		instruction* i=instructions+currIns++;
		i->opcode=t->opcode;
		i->result=t->result;
		i->arg1=t->arg1;
		i->arg2=t->arg2;
		i->srcLine=t->srcLine;
		}
		
		void expand_vars(){
			assert(totalVars==currVars);
		vari* v=(vari*) malloc(NEW_VARS_SIZE);
		if(vars){
			memcpy(v, vars, CURR_VARS_SIZE);
			free(vars);
		}
		vars = v;
		totalVars += EXPAND_VARS_SIZE;
			
			
		}
		
		void add_vars(unsigned int offset,struct SymbolTableEntry *sym){
			
			if(currVars==totalVars) expand_vars();
			vari* v= vars+currVars++;
			
			v->name=(char*)strdup(sym->value.varVal->name);

		
			
			
		}

	void emit( iopcode op, struct expr* result, struct  expr* arg1,struct  expr* arg2,unsigned int label,	unsigned int line){
	
		if(currQuad == total)
			expand();

		quad* p =quads+currQuad++;
		p->op=op;
		p->arg1=arg1;
		p->arg2=arg2;
		p->result=result;
		p->label=label;
		p->line=line;
	}
	struct expr* emit_iftableitem(struct expr* e, int line, SymTable oSymTable){    /*table */
		if(e->type != tableitem_e)
			return e;
		else {
			struct expr* result = add_expr(var_e);
			char *tempname=newtempname();
			result->sym = SymTable_insert(oSymTable, tempname, scope, tempvar);
			emit(tablegetelem, result, e, e->index, 0, line);
			return result;
		}
	}
struct expr* member_item(struct expr* lval, char* name, int line, SymTable oSymTable){     /*new member item*/
		lval = emit_iftableitem(lval, line, oSymTable);
		struct expr* item = add_expr(tableitem_e);
		item->sym = lval->sym;
		item->index = newexpr_conststring(name);
		return item;
	} 
struct expr* make_call (struct expr* lv, struct expr* reversed_elist,int line,SymTable oSymTable ){
					struct expr* func = emit_iftableitem (lv,line,oSymTable);
					while (reversed_elist ){
					emit(param,NULL,reversed_elist,NULL,0,line);
					reversed_elist= reversed_elist->next;
				}
					emit(call,NULL,func,NULL,0,line);
					struct expr* result =add_expr(var_e);
					char *tempname=newtempname(); 
					result->sym=SymTable_insert(oSymTable, tempname, scope, tempvar); 
					emit(getretval,result, NULL, NULL,0,line);
					return result;
			}	
		
	
	int currscope(){
		return scope;	
	}
	 int nextquadlabel(){ return currQuad;}
	 int nextinstructionlabel(){return currIns;}
	
	void patchlabel(unsigned int quadNo,unsigned label){  //gia if stmt
		assert(quadNo<currQuad && !quads[quadNo].label);
		quads[quadNo].label = label;
	}
	
	void patch_incomplete_jumps(){
		struct incomplete_jump* tmp=ij_head;
		while(tmp!=NULL){
			if(tmp->iaddress==currQuad) instructions[tmp->instrNo].result->val=currIns;
			else instructions[tmp->instrNo].result->val=quads[tmp->iaddress].taddress;
			tmp=tmp->next;
		}
	}	

	char* enumtoString(iopcode op){
        char* tmp;
        switch(op){
            case assign:
                tmp="assign";
                return tmp;

            case add:
                tmp="add";
                return tmp;

            case sub:
                tmp="sub";
                return tmp;

            case mul:
                tmp="mul";
                return tmp;

            case div_v:
                tmp="div_v";
                return tmp;

            case mod:
                tmp="mod";
                return tmp;

            case uminus:
                tmp="uminus";
                return tmp;

            case and:
                tmp="and";
                return tmp;

			case or:
                tmp="or";
                return tmp;

            case not:
                tmp="not";
                return tmp;

            case if_eq:
                tmp="if_eq";
                return tmp;

            case if_noteq:
                tmp="if_noteq";
                return tmp;

            case if_lesseq:
                tmp="if_lesseq";
                return tmp;

            case if_greatereq:
                tmp="if_greatereq";
                return tmp;

            case if_less:
                tmp="if_less";
                return tmp;

            case if_greater:
                tmp="if_greater";
                return tmp;

            case call:
                tmp="call";
                return tmp;

            case param:
                tmp="param";
                return tmp;
			case ret:
                tmp="ret";
                return tmp;

            case getretval:
                tmp="getretval";
                return tmp;

            case funcstart:
                tmp="funcstart";
                return tmp;

            case funcend:
                tmp="funcend";
                return tmp;

            case tablecreate:
                tmp="tablecreate";
                return tmp;

            case tablegetelem:
                tmp="tablegetelem";
                return tmp;

            case tablesetelem:
                tmp="tablesetelem";
                return tmp;
				
			case jump:
				tmp="jump";
				return tmp;
        }
    }


	struct expr* newexpr_constnum(double i){
        struct expr *e = add_expr(constnum_e);
        e->numConst=i;
        return e;
    }
	
	struct expr* newexpr_conststring(char *s){ //prosthesa auto logika tha xreaistei argotera
        struct expr *e = add_expr(conststring_e);
        e->strConst=strdup(s);
        return e;
    }
	
	struct expr* newexpr_constbool(unsigned int b){ //kai auto gia relop expr
        struct expr *e = add_expr(constbool_e);
        e->boolConst=!!b;
        return e;
    }

	int isConst(expr_t type,int line){
        if(type==constnum_e) return 0;
        else {
			return 1;
			}
    }
	
	int ex_op_ex(expr_t type,int line){
		if(type==constnum_e || type==assignexpr_e || type==arithexpr_e || type==var_e || type==tableitem_e) return 0; //prosthesa kai to table item
        else {
			printf("Error incompatible expr type at line %d\n",line);
			return 1;
		}
		
	}
	void patchlist (int list, int label) {
		while (list) {
		int next = quads[list].label;
		quads[list].label = label;
		list = next;
		}
	}
	


	void check_arith (expr_t type, int line) {
		if ( type == constbool_e ||
			type == conststring_e ||
			type == nil_e ||
			type == newtable_e ||
			type == programfunc_e ||
			type == libraryfunc_e ||
			type == boolexpr_e )
		printf("Error incompatible expr type at line %d\n",line);
	}
	
	struct expr* reversed_elist(struct expr* exprs){
		struct expr* prev = NULL;
    struct expr* current = exprs;
    struct expr* next = NULL;
    while (current != NULL) {
        // Store next
        next = current->next;
 
        // Reverse current node's pointer
        current->next = prev;
 
        // Move pointers one position ahead.
        prev = current;
        current = next;
    }
    exprs = prev;
	
	return exprs;
}

		
	 //prosthesa auta gia statements
	void make_stmt (struct stmt_t* s){   
		s->breakList = s->contList = 0; }
		
		 //prosthesa auta gia statements
		int newlist (int i){      
		quads[i].label = 0; return i; }
		
		int mergelist (int l1, int l2) {
				if (!l1) return l2;
				else
				if (!l2) return l1;
				else {
				int i = l1;
				while (quads[i].label)
				i = quads[i].label;
				quads[i].label = l2;
				return l1;
			}
		}
		
		void make_operand(struct expr* e,vmarg** vm,int kys){
			vmarg *arg=NULL;
			if(e==NULL){
				*vm=NULL;
			return;}
            else arg=*vm;
			switch (e->type){
				case var_e:
				case tableitem_e:
				case arithexpr_e:
				case boolexpr_e:
				case newtable_e:{
					assert(e->sym);
					arg->val=e->sym->offset;
					switch(e->sym->space){
						case programvar: arg->type=global_a; if(kys==1 && flag==0) add_vars(arg->val,e->sym); break;
						case localfunc:  arg->type=local_a; if((kys==1 || kys==0) && flag==1) add_locals(arg->val,e->sym); break;
						case formalarg:  arg->type=formal_a; if(kys==0 && flag==1) add_formals(arg->val,e->sym); break;
						default: assert(0);
					}
					break;
				}
				
				case constbool_e:{
					arg->val=e->boolConst;
					arg->type=bool_a; break;
				}
				
				case conststring_e:{
					arg->val=consts_newstring(e->strConst);
					arg->type=string_a; break;
				}
				
				case constnum_e:{
					arg->val=consts_newnumber(e->numConst);
					arg->type=number_a; break;
				}
				
				case nil_e: arg->type=nil_a; break;
				
				case programfunc_e:{
					arg->type=userfunc_a;
					arg->val=userfuncs_newfuncs(e->sym); break;
				}
				
				case libraryfunc_e:{
					arg->type=libfunc_a;
					arg->val= libfuncs_newused(e->sym->value.funcVal->name); break;
				}
				default: assert(0);
			}
				
		}
		
			
	void make_numberoperand(vmarg* arg, double val){
		arg->val = consts_newnumber(val);
		arg->type = number_a;
	}

	void make_booloperand(vmarg* arg, unsigned val){
		arg->val = val;
		arg->type = bool_a;
	}
	
	void make_retvaloperand(vmarg* arg){
		arg->type = retval_a;
	}
		
		
	void reset_operand(vmarg* arg){
		arg=NULL;
	}
		
		
		
		


	void print_quads(){
		
		printf("\n\n");
		printf  ("%-20s","quad");
		printf("%-20s","opcode");
		printf("%-20s","result");
		printf("%-20s","arg1");
		printf("%-20s","arg2");
		printf("%-20s","label");
		printf("\n");
		printf("-----------------------------------------------------------------------------------------------------------------\n");
		char * tr="true";
		char * fl="false";
		char *empt="";
		
			for(int i=0; i<currQuad;i++){
				char* op=enumtoString(quads[i].op);
				
				int j=i+1;
				printf("%-20d",j);
				printf("%-20s",op);
				if(quads[i].result==NULL) printf("%-20s",empt);
				else if(quads[i].result->sym!=NULL)printf("%-20s",quads[i].result->sym->value.varVal->name);
				else if(quads[i].result->type==constnum_e) printf("%-20f",quads[i].result->numConst);
					else if(quads[i].result->type==conststring_e)printf("%-20s",quads[i].result->strConst);
					else if(quads[i].result->type==constbool_e) {
						if(quads[i].result->boolConst==1) printf("%-20s",tr);
					else printf("%-20s",fl);}
				 
				
				if(quads[i].arg1==NULL)  printf("%-20s",empt);
					else if(quads[i].arg1->sym!=NULL)printf("%-20s",quads[i].arg1->sym->value.varVal->name);
					else if(quads[i].arg1->type==constnum_e) printf("%-20f",quads[i].arg1->numConst);
					else if(quads[i].arg1->type==conststring_e)  printf("%-20s",quads[i].arg1->strConst);
					else if(quads[i].arg1->type==constbool_e) {
						if(quads[i].arg1->boolConst==1) printf("%-20s",tr);
						else printf("%-20s",fl);
					}
				
				if(quads[i].arg2==NULL) printf("%-20s",empt);
					else if(quads[i].arg2->sym!=NULL)printf("%-20s",quads[i].arg2->sym->value.varVal->name);
					else if(quads[i].arg2->type==constnum_e) printf("%-20f",quads[i].arg2->numConst);
					else if(quads[i].arg2->type==conststring_e) printf("%-20s",quads[i].arg2->strConst);
					else if(quads[i].arg2->type==constbool_e) {
						if(quads[i].arg2->boolConst==1) printf("%-20s",tr);
						else printf("%-20s",fl);
					
				}
				if(quads[i].label!=0 || quads[i].op==jump) printf("%d",quads[i].label +1);
				printf("\n\n");		
				

			}
			//for(int j=0;j<currVars;j++) printf("%s\n",vars[j].name);
			
	//printf("%d\n\n",currVars);
			
    }
	
	void print_quads_file(){
			
			FILE *file = fopen("quads.txt", "w"); 
			if (file == NULL){  
              printf("Error! Could not open file\n");
              exit(0); 
            }
			fprintf(file,"\n\n");
			fprintf(file,"%-20s","quad");
			fprintf(file,"%-20s","opcode");
			fprintf(file,"%-20s","result");
			fprintf(file,"%-20s","arg1");
			fprintf(file,"%-20s","arg2");
			fprintf(file,"%-20s","label");
			fprintf(file,"\n");
			fprintf(file,"-----------------------------------------------------------------------------------------------------------------\n");
			char * tr="true";
			char * fl="false";
			char *empt="";
			
				for(int i=0; i<currQuad;i++){
					char* op=enumtoString(quads[i].op);
					
					int j=i+1;
					fprintf(file,"%-20d",j);
					fprintf(file,"%-20s",op);
					if(quads[i].result==NULL) fprintf(file,"%-20s",empt);
					else if(quads[i].result->sym!=NULL)fprintf(file,"%-20s",quads[i].result->sym->value.varVal->name);
					else if(quads[i].result->type==constnum_e) fprintf(file,"%-20f",quads[i].result->numConst);
						else if(quads[i].result->type==conststring_e)fprintf(file,"%-20s",quads[i].result->strConst);
						else if(quads[i].result->type==constbool_e) {
							if(quads[i].result->boolConst==1) fprintf(file,"%-20s",tr);
						else fprintf(file,"%-20s",fl);}
					
					
					if(quads[i].arg1==NULL)  fprintf(file,"%-20s",empt);
						else if(quads[i].arg1->sym!=NULL)fprintf(file,"%-20s",quads[i].arg1->sym->value.varVal->name);
						else if(quads[i].arg1->type==constnum_e) fprintf(file,"%-20f",quads[i].arg1->numConst);
						else if(quads[i].arg1->type==conststring_e)  fprintf(file,"%-20s",quads[i].arg1->strConst);
						else if(quads[i].arg1->type==constbool_e) {
							if(quads[i].arg1->boolConst==1) fprintf(file,"%-20s",tr);
							else fprintf(file,"%-20s",fl);
						}
					
					if(quads[i].arg2==NULL) fprintf(file,"%-20s",empt);
						else if(quads[i].arg2->sym!=NULL)fprintf(file,"%-20s",quads[i].arg2->sym->value.varVal->name);
						else if(quads[i].arg2->type==constnum_e) fprintf(file,"%-20f",quads[i].arg2->numConst);
						else if(quads[i].arg2->type==conststring_e) fprintf(file,"%-20s",quads[i].arg2->strConst);
						else if(quads[i].arg2->type==constbool_e) {
							if(quads[i].arg2->boolConst==1) fprintf(file,"%-20s",tr);
							else fprintf(file,"%-20s",fl);
						
					}
					if(quads[i].label!=0 || quads[i].op==jump) fprintf(file,"%d",quads[i].label +1);
					fprintf(file,"\n\n");		
				

			}
	
			
    }
	
	
    char* vmoptoString(vmopcode op){
        char* tmp;
        switch(op){
            case assign_v:
                tmp="assign_v";
                return tmp;

            case add_v:
                tmp="add_v";
                return tmp;

            case sub_v:
                tmp="sub_v";
                return tmp;

            case mul_v:
                tmp="mul_v";
                return tmp;

            case div_V:
                tmp="div_V";
                return tmp;

            case mod_v:
                tmp="mod_v";
                return tmp;

            case uminus_v:
                tmp="uminus_v";
                return tmp;

            case and_v:
                tmp="and_v";
                return tmp;

			case or_v:
                tmp="or_v";
                return tmp;

            case not_v:
                tmp="not_v";
                return tmp;

            case jeq_v:
                tmp="jeq_v";
                return tmp;

            case jne_v:
                tmp="jne_v";
                return tmp;

            case jle_v:
                tmp="jle_v";
                return tmp;

            case jge_v:
                tmp="jge_v";
                return tmp;

            case jlt_v:
                tmp="jlt_v";
                return tmp;

            case jgt_v:
                tmp="jgt_v";
                return tmp;

            case call_v:
                tmp="call_v";
                return tmp;

            case pusharg_v:
                tmp="pusharg_v";
                return tmp;

			case funcenter_v:
                tmp="funcenter_v";
                return tmp;

            case funcexit_v:
                tmp="funcexit_v";
                return tmp;

            case newtable_v:
                tmp="newtable_v";
                return tmp;

            case tablegetelem_v:
                tmp="tablegetelem_v";
                return tmp;

            case tablesetelem_v:
                tmp="tablesetelem_v";
                return tmp;

            case nop_v:
                tmp="nop_v";
                return tmp;

            case jump_v:
                tmp="jump_v";
                return tmp;
				
        }
    }

   char* typetoString(vmarg_t type){
        char* tmp;
        switch(type){
            case label_a:
                tmp="00(label_a)";
                return tmp;

            case global_a:
                tmp="01(global_a)";
                return tmp;

            case formal_a:
                tmp="02(formal_a)";
                return tmp;

            case local_a:
                tmp="03(local_a)";
                return tmp;

            case number_a:
                tmp="04(number_a)";
                return tmp;

            case string_a:
                tmp="05(string_a)";
                return tmp;

            case bool_a:
                tmp="06(bool_a)";
                return tmp;

            case nil_a:
                tmp="07(nil_a)";
                return tmp;

			case userfunc_a:
                tmp="08(userfunc_a)";
                return tmp;

            case libfunc_a:
                tmp="09(libfunc_a)";
                return tmp;

            case retval_a:
                tmp="10(retval_a)";
                return tmp;
        }
    }

    void print_instruction(){
			
		
        printf("\n\n");
        printf("-----------------------------------------------------------------INSTRUCTIONS--------------------------------------------------------------------------------\n\n");
        printf  ("%-30s","taddress");
		printf("%-30s","opcode");
		printf("%-30s","result");
		printf("%-30s","arg1");
		printf("%-30s","arg2");
		printf("\n");
		printf("-------------------------------------------------------------------------------------------------------------------------------------------------------------\n");
		char *empt="";
		
	   for(int i=0; i<currIns; i++){
           char* op= vmoptoString(instructions[i].opcode);
		    
		   
		   int j=i+1;
		   printf("%-30d",j);
		   printf("%-30s",op);
           if(instructions[i].result==NULL) printf("%-30s",empt);
			else if(instructions[i].result->type==global_a){ 
				printf("%s,%d:",typetoString(instructions[i].result->type),instructions[i].result->val);
				printf("%s",vars[instructions[i].result->val].name);}
				
			else if(instructions[i].result->type==local_a){ 
				printf("%s,%d:",typetoString(instructions[i].result->type),instructions[i].result->val);
				printf("%s",localVars[instructions[i].result->val].name);}

			else if(instructions[i].result->type==userfunc_a){
				
			printf("%s,%d:",typetoString(instructions[i].result->type),instructions[i].result->val);
				printf("%s",userfuncs[instructions[i].result->val].id);}
				
				else if(instructions[i].result->type==number_a) {
					
					printf("%s,%d:",typetoString(instructions[i].result->type),instructions[i].result->val);
					printf("%f",numConsts[instructions[i].result->val]);
					}
				else if(instructions[i].result->type==string_a) {
					
					printf("%s,%d:",typetoString(instructions[i].result->type),instructions[i].result->val);
					printf("%s",stringConsts[instructions[i].result->val]);
					}
				else if(instructions[i].result->type==libfunc_a) {
					
					printf("%s,%d:",typetoString(instructions[i].result->type),instructions[i].result->val);
					printf("%s",  namedLibfuncs[instructions[i].result->val]);
					}
					
				else if(instructions[i].result->type==label_a){
                printf("%s,%d",typetoString(instructions[i].result->type),instructions[i].result->val+1);}
				
				else {
					printf("%s,%d:",typetoString(instructions[i].result->type),instructions[i].result->val);}

      
            if(instructions[i].arg1==NULL) printf("%-30s",empt);
				else if(instructions[i].arg1->type==number_a) {
					printf("%-14s",empt); 
					printf("%s,%d:",typetoString(instructions[i].arg1->type),instructions[i].arg1->val);
					printf("%f",numConsts[instructions[i].arg1->val]);
					}
				else if(instructions[i].arg1->type==string_a) {
					printf("%-14s",empt); 
					printf("%s,%d:",typetoString(instructions[i].arg1->type),instructions[i].arg1->val);
					printf("%s",stringConsts[instructions[i].arg1->val]);
					}
					
				else if(instructions[i].arg1->type==formal_a){ 
				printf("%-14s",empt);
				printf("%s,%d:",typetoString(instructions[i].arg1->type),instructions[i].arg1->val);
				printf("%s",formalargs[instructions[i].arg1->val].name);}	
				
				else if(instructions[i].arg1->type==local_a){ 
				printf("%-14s",empt); 
				printf("%s,%d:",typetoString(instructions[i].arg1->type),instructions[i].arg1->val);
				printf("%s",localVars[instructions[i].arg1->val].name);}
				
				else if(instructions[i].arg1->type==libfunc_a) {
					printf("%-14s",empt); 
					printf("%s,%d:",typetoString(instructions[i].arg1->type),instructions[i].arg1->val);
					printf("%s",  namedLibfuncs[instructions[i].arg1->val]);
					}
				
				else{printf("%-14s",empt); 
				printf("%s,%d:",typetoString(instructions[i].arg1->type),instructions[i].arg1->val);}
					
				



			 if(instructions[i].arg2==NULL) printf("%-30s",empt);
			 
			 	else if(instructions[i].arg2->type==number_a) {
					printf("%-14s",empt); 
					printf("%s,%d:",typetoString(instructions[i].arg2->type),instructions[i].arg2->val);
					printf("%f",numConsts[instructions[i].arg2->val]);
					}
			 
			 else if(instructions[i].arg2->type==formal_a){ 
			 printf("%-14s",empt); 
				printf("%s,%d:",typetoString(instructions[i].arg2->type),instructions[i].arg2->val);
				printf("%s",formalargs[instructions[i].arg2->val].name);}
			 
			 else{printf("%-14s",empt); 
					printf("%s,%d:",typetoString(instructions[i].arg2->type),instructions[i].arg2->val);
					}
				
            printf("\n\n");
        }
    }
	
	
			
    
	

	
	

	