SHELL := bash
SRC = $(shell find src -type f)

.DEFAULT_GOAL := help

.PHONY: clean demo prepack watch help

clean: ## Clean all build and install artifacts
	@git clean -dfX

demo: prepack ## Start a live development server
	@cd demo && pnpm exec parcel ./index.html

dist-cjs: node_modules $(SRC) tsconfig.json
	@pnpm exec swc ./src -d dist-cjs --config module.type=commonjs
	@pnpm exec tsc --emitDeclarationOnly --declaration --declarationMap false --declarationDir dist-cjs
	@touch dist-cjs

dist-esm: node_modules $(SRC) tsconfig.json
	@pnpm exec swc ./src -d dist-esm
	@pnpm exec tsc --emitDeclarationOnly --declaration --declarationMap false --declarationDir dist-esm
	@touch dist-esm

node_modules: package.json pnpm-lock.yaml
	@pnpm install --frozen-lockfile --prefer-offline --reporter=silent
	@touch node_modules

prepack: dist-cjs dist-esm ## Package for distribution

watch: node_modules ## Watch for src changes and rebuild
	@pnpm exec chokidar "src/**/*" -c "make prepack"

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
