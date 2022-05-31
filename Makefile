SRC = $(shell find src)

.DEFAULT_GOAL := help

.PHONY: clean demo prepack help

clean: ## Clean all build and install artifacts
	@git clean -dfX

demo: dist-esm dist-types
	@cd demo && pnpm exec parcel ./index.html

dist-esm: node_modules $(SRC)
	@pnpm exec swc ./src -d dist-esm

dist-types: node_modules $(SRC) tsconfig.json
	@pnpm exec tsc --emitDeclarationOnly --declaration --declarationMap false --declarationDir dist-types

node_modules: package.json
	@pnpm install

prepack: dist-esm dist-types

watch: node_modules
	@pnpm exec chokidar "src/**/*" -c "make dist-esm"

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
