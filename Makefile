TESTS = ./tests/main.less
TESTS_COMPILED = ./tests/main.css
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔ Done\033[39m
HR=\033[37m--------------------------------------------------\033[39m
PATH := ./node_modules/.bin:$(PATH)

# Compile test css

build:
	@echo -e ""
	@printf "${DATE} . \033[35mCompiling ZweLess...\033[39m"
	@recess --compile ${TESTS} > ${TESTS_COMPILED}
	@echo -e "\033[32mSuccess!\033[39m\n"

# Watch less files

watch: 
	@echo -e "Watching less files..."
	@watchr -e "watch('less/.*\.less') { system 'make' }"