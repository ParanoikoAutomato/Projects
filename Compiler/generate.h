		#include <stdio.h>

    extern struct funcstack *func_stack;
    void generate_relational (iopcode op, quad* q);
    typedef void (*generator_func_t)(quad* q);
	int flag=0;

	unsigned int i=0;

    void generate (vmopcode op, quad* q) {
        instruction *t = malloc(sizeof(instruction));
		t->arg1 = malloc(sizeof(vmarg));
        t->arg2 = malloc(sizeof(vmarg));
        t->result = malloc(sizeof(vmarg));
		
        t->opcode = op;
		
        make_operand(q->arg1, &t->arg1,0);
        make_operand(q->arg2, &t->arg2,0);
        make_operand(q->result, &t->result,1);
        q->taddress = nextinstructionlabel();
	
        emit_ins(t);
    }

    void generate_ADD (quad* q) { 
        generate(add_v, q); 
    }

    void generate_SUB (quad* q) { 
        generate(sub_v, q); 
    }

    void generate_MUL (quad* q) { 
        generate(mul_v, q); 
    }

    void generate_DIV (quad* q) { 
        generate(div_V, q); 
    }

    void generate_MOD (quad* q) { 
        generate(mod_v, q); 
    }

    void generate_NEWTABLE (quad* q) { 
        generate(newtable_v, q); 
    }

    void generate_TABLEGETELM (quad* q) { 
        generate(tablegetelem_v, q); 
    }

    void generate_TABLESETELEM (quad* q) { 
        generate(tablesetelem_v, q); 
    }

    void generate_ASSIGN (quad* q) { 
        generate(assign_v, q); 
    }

    void generate_NOP () { 
        instruction *t= malloc(sizeof(instruction));
        t->opcode=nop_v; 
        emit_ins(t); 
    }
	void generate_relational (iopcode op, quad* q) {
		
        instruction *t = malloc(sizeof(instruction));
		t->arg1 = malloc(sizeof(vmarg));
        t->arg2 = malloc(sizeof(vmarg));
        t->result = malloc(sizeof(vmarg));
        t->opcode = op;
        make_operand(q->arg1, &t->arg1,0);
        make_operand(q->arg2, &t->arg2,0);
        t->result->type = label_a;
		
        if (q->label < i){
            t->result->val = quads[q->label].taddress;
        }
        else{
            add_incomplete_jump(nextinstructionlabel(), q->label);
        }
        q->taddress = nextinstructionlabel();
        emit_ins(t);
    }

    void generate_JUMP (quad* q) { 
        generate_relational(jump_v, q); 
    }

    void generate_IF_EQ (quad* q) { 
        generate_relational(jeq_v, q); 
    }

    void generate_IF_NOTEQ(quad* q) { 
        generate_relational(jne_v, q); 
    }

    void generate_IF_GREATER (quad* q) { 
        generate_relational(jgt_v, q); 
    }

    void generate_IF_GREATEREQ(quad* q) { 
        generate_relational(jge_v, q); 
    }

    void generate_IF_LESS (quad* q) { 
        generate_relational(jlt_v, q); 
    }

    void generate_IF_LESSEQ (quad* q) { 
        generate_relational(jle_v, q); 
    }


    

    void generate_NOT (quad* q) {
        q->taddress = nextinstructionlabel();
        instruction *t = malloc(sizeof(instruction));
        t->opcode = jeq_v;
		 t->arg1 = malloc(sizeof(vmarg));
		  t->arg2 = malloc(sizeof(vmarg));
		   t->result = malloc(sizeof(vmarg));
        make_operand(q->arg1, &t->arg1,0);
        make_booloperand(t->arg2, false);
        t->result->type = label_a;
        t->result->val = nextinstructionlabel()+3;
        emit_ins(t);
        t->opcode = assign_v;
        make_booloperand(t->arg1, false);
        reset_operand(t->arg2);
        make_operand(q->result, &t->result,1);
        emit_ins(t); 
        t->opcode = jump_v;
        reset_operand (t->arg1);
        reset_operand(t->arg2);
        t->result->type = label_a;
        t->result->val = nextinstructionlabel()+2;
        emit_ins(t);
        t->opcode = assign_v;
        make_booloperand(t->arg1, true);
        reset_operand(t->arg2);
        make_operand(q->result, &t->result,1);
        emit_ins(t);
    } 

    void generate_OR (quad* q) {
        q->taddress = nextinstructionlabel();
        instruction *t = malloc(sizeof(instruction));
			 t->arg1 = malloc(sizeof(vmarg));
		  t->arg2 = malloc(sizeof(vmarg));
		   t->result = malloc(sizeof(vmarg));
        t->opcode = jeq_v;
        make_operand(q->arg1, &t->arg1,0);
        make_booloperand(t->arg2, true);
        t->result->type = label_a;
        t->result->val = nextinstructionlabel()+4;
        emit_ins(t);
        make_operand(q->arg2, &t->arg1,0);
        t->result->val = nextinstructionlabel()+3;
        emit_ins(t); 
        t->opcode = assign_v;
        make_booloperand(t->arg1, false);
        reset_operand(t->arg2);
        make_operand(q->result, &t->result,1);
        emit_ins(t);
        t->opcode = jump_v;
        reset_operand (t->arg1);
        reset_operand(t->arg2);
        t->result->type = label_a;
        t->result->val = nextinstructionlabel()+2;
        emit_ins(t);
        t->opcode = assign_v;
        make_booloperand(t->arg1, true);
        reset_operand(t->arg2);
        make_operand(q->result, &t->result,1);
        emit_ins(t);
    } 

    void generate_AND (quad* q) {
        q->taddress = nextinstructionlabel();
        instruction *t = malloc(sizeof(instruction));
			 t->arg1 = malloc(sizeof(vmarg));
		  t->arg2 = malloc(sizeof(vmarg));
		   t->result = malloc(sizeof(vmarg));
        t->opcode = jeq_v;
        make_operand(q->arg1, &t->arg1,0);
        make_booloperand(t->arg2, false);
        t->result->type = label_a;
        t->result->val = nextinstructionlabel()+4;
        emit_ins(t);
        make_operand(q->arg2, &t->arg1,0);
        t->result->val = nextinstructionlabel()+3;
        emit_ins(t); 
        t->opcode = assign_v;
        make_booloperand(t->arg1, true);
        reset_operand(t->arg2);
        make_operand(q->result, &t->result,1);
        emit_ins(t);
        t->opcode = jump_v;
        reset_operand (t->arg1);
        reset_operand(t->arg2);
        t->result->type = label_a;
        t->result->val = nextinstructionlabel()+2;
        emit_ins(t);
        t->opcode = assign_v;
        make_booloperand(t->arg1, false);
        reset_operand(t->arg2);
        make_operand(q->result, &t->result,1);
        emit_ins(t);
    } 

    void generate_PARAM(quad* q) {
        q->taddress = nextinstructionlabel();
        instruction *t = malloc(sizeof(instruction));
		
        t->result = malloc(sizeof(vmarg));
        
        t->opcode = pusharg_v;
        make_operand(q->arg1, &t->result,0);
        emit_ins(t);
    }

    void generate_CALL(quad* q) {
        q->taddress = nextinstructionlabel();
        instruction *t = malloc(sizeof(instruction));
		t->result = malloc(sizeof(vmarg));
        t->opcode = call_v;
		if(q->arg1->sym->type==libfunc)q->arg1->type=libraryfunc_e;
		else if(q->arg1->sym->type==userfunc) q->arg1->type=programfunc_e;
        make_operand(q->arg1, &t->result,0);
		
        emit_ins(t);
    }

    void generate_GETRETVAL(quad* q) {
        q->taddress = nextinstructionlabel();
        instruction *t = malloc(sizeof(instruction));
		t->arg1 = malloc(sizeof(vmarg));
        t->result = malloc(sizeof(vmarg));
        t->opcode = assign_v;
        make_operand(q->result, &t->result,0);
        make_retvaloperand(t->arg1);
        emit_ins(t);
    } 

    void generate_FUNCSTART(quad* q){

		flag=1;

 
		 
        q->taddress = nextinstructionlabel();

        


        instruction *t = malloc(sizeof(instruction));
        t->result = malloc(sizeof(vmarg));
        t->opcode = funcenter_v;
        make_operand(q->arg1, &t->result,1);
        emit_ins(t);
	
		
    }

    void generate_RETURN(quad* q){
			
        q->taddress = nextinstructionlabel();
        instruction *t = malloc(sizeof(instruction));
		t->arg1 = malloc(sizeof(vmarg));
       
        t->result = malloc(sizeof(vmarg));
        t->opcode = assign_v;
        make_retvaloperand(t->result);
        make_operand(q->result, &t->arg1,0);
        emit_ins(t);

     
        reset_operand(t->arg1);
        reset_operand(t->arg2);
        
       
    }

    void generate_FUNCEND(quad* q){
		
        q->taddress = nextinstructionlabel();
        instruction *t = malloc(sizeof(instruction));
		t->result = malloc(sizeof(vmarg));
        t->opcode = funcexit_v;
        make_operand(q->arg1, &t->result,0);
        emit_ins(t);
		flag=0;
    }
	void generate_UMINUS(quad* q){}

    generator_func_t generators[] = {
		generate_ASSIGN,
        generate_ADD,
        generate_SUB,
        generate_MUL,
        generate_DIV,
        generate_MOD,
		generate_UMINUS,
		generate_AND,
		generate_OR,
		generate_NOT,
		generate_IF_EQ,
        generate_IF_NOTEQ,
		generate_IF_LESSEQ,
		generate_IF_GREATEREQ,
		generate_IF_LESS,
        generate_IF_GREATER,
		generate_CALL,
		generate_PARAM,
		generate_RETURN,
		generate_GETRETVAL,
		generate_FUNCSTART,
		generate_FUNCEND,
        generate_NEWTABLE,
        generate_TABLEGETELM,
        generate_TABLESETELEM,
        generate_JUMP
    };
	

    void generate_code(){
        for(i=0; i<currQuad; i++){
            
            (*generators[quads[i].op])(quads+i);
	
            
        }
		patch_incomplete_jumps();
    }