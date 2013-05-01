DOCS = ./less/main.less
DOCS_COMPILED = ./css/main.css

HR=\033[37m--------------------------------------------------\033[39m
PATH := ./node_modules/.bin:$(PATH)

# Compile docs
build:
	@echo -e ""
	@printf "\033[35mCompiling main.less...\033[39m"
	@recess --compile ${DOCS} > ${DOCS_COMPILED}
	@echo -e "\033[32mSuccess!\033[39m\n"

# Watch less files changes
watch:
	@echo -e "Watching less files..."
	@supervisor --watch less --no-restart-on exit --quiet --extensions 'less' --exec make --