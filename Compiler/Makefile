#to trexoume sto mixanima frapa kai kiwi

calc:
	bison --yacc --defines --output=parser.c parser.y

	flex --outfile=al.c al.l

	gcc -o calc al.c parser.c -lm
	
clean:
	rm -f al.c
	rm -f *.o al
	rm -f parser.h
	rm -f parser.c
	rm -f *.o parser
	rm -f calc
	rm -f *.o calc
	
	