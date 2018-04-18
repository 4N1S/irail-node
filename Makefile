REPORTER = spec

all: jshint test

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive --reporter $(REPORTER) --timeout 3000

jshint:
	jshint lib examples test index.js

jslint:
	jslint --edition=latest test/test.js index.js

eslint:
	eslint test/test.js index.js

tests: test

tap:
	@NODE_ENV=test ./node_modules/.bin/mocha -R tap > results.tap

cover:
	@NODE_ENV=test ./node_modules/.bin/tap test/*.js --cov --coverage-report=lcov

unit:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive -R xunit > results.xml --timeout 3000

skel:
	if [ ! -d "examples" ]; then mkdir examples ; fi
	if [ ! -d "lib" ]; then mkdir lib ; fi
	if [ ! -d "test" ]; then mkdir test ; fi
	touch index.js
	@NODE_ENV=test npm install 

.PHONY: test tap cover unit jshint skel jslint eslint
