#!/bin/bash

if [ ! -d src ] ; then
	echo "Start this script from the root directory of the repository"
	exit 1
fi

if [ ! -d out ] ; then
	mkdir out
else
	rm -rf out/*
fi

(
	cd src
	cp -r admin *.css css index_template.html ../out/
)
cat src/*.js src/elements/*.js > out/webengine_uncompressed.js
java -jar tools/closure/compiler.jar --js out/webengine_uncompressed.js --js_output_file out/webengine.js
