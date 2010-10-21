#!/bin/bash
	 
	DIRs="./"
	 
	if [ $# -ne 0 ]
	then
	    DIRs=$@
	fi
	 
	for DIR in $DIRs; do
	 
	    JSs=`find $DIR -name "*.js"`
	 
	    for JS in $JSs; do
	        DOC=`echo $JS|sed 's/\(.*\)\.js/\1.cpp/g'`;
	        if [ $JS -nt $DOC ]; then
	            echo "rebuild $DOC"
	            grep -e '^\s*\(///\|//\*\|/\*\*\|//\!\| \* \| \*/\|^function.*\|^}\|.*\.prototype.*\)' $JS |  sed 's!=.*function!!' | sed 's!function!!' | sed 's!.*prototype\.!!' | sed 's/^\s*\/\/\*\(.*\)$/\1/g'> $DOC
	        fi
	    done
	 
	done
doxywizard.exe
for DIR in $DIRs; do
	CPPs=`find $DIR -name "*.cpp"`;
	for CPP in $CPPs; do
		rm $CPP;
	done
done

