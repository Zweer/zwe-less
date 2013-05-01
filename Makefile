TESTS = ./tests/main.less
TESTS_COMPILED = ./tests/main.css

DOCS = ../gh-pages/less/main.less
DOCS_COMPILED = ../gh-pages/css/main.css

HR=\033[37m--------------------------------------------------\033[39m
PATH := ./node_modules/.bin:$(PATH)

# Compile test css
build:
	@echo -e ""
	@printf "\033[35mCompiling ZweLess...\033[39m"
	@recess --compile ${TESTS} > ${TESTS_COMPILED}
	@echo -e "\033[32mSuccess!\033[39m\n"

# Compile docs
gh-pages: build
	@echo -e ""
	@printf "\033[35mCopying less files into gh-pages directory...\033[39m"
	@cp -r less/* ../gh-pages/less
	@echo -e "\033[32mSuccess!\033[39m\n"
	@printf "\033[35mCompiling less files in the gh-pages directory...\033[39m"
	@recess --compile ${DOCS} > ${DOCS_COMPILED}
	@echo -e "\033[32mSuccess!\033[39m\n"	

# Watch less files changes
watch:
	@echo -e "Watching less files..."
	@supervisor --watch less --no-restart-on exit --quiet --extensions 'less' --exec make --