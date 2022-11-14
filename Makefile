SHELL := bash
SRC = $(shell find src -type f)

.DEFAULT_GOAL := help

.PHONY: clean demo prepack watch help

clean: ## Clean all build and install artifacts
	@git clean -dfX

demo: prepack demo/node_modules ## Start a live development server
	@cd demo && pnpm exec parcel ./src/index.html --no-cache

demo/node_modules: demo/package.json demo/pnpm-lock.yaml
	@cd demo && pnpm install --frozen-lockfile --prefer-offline --reporter=silent
	@cd demo && touch node_modules

dist-cjs: node_modules $(SRC) tsconfig.json
	@pnpm exec swc ./src -d dist-cjs --config module.type=commonjs  --config jsc.transform.react.runtime=automatic --config jsc.target=es2019 --config sourceMaps=true
	@pnpm exec tsc --emitDeclarationOnly --declaration --declarationMap false --declarationDir dist-cjs
	@touch dist-cjs

dist-esm: node_modules $(SRC) tsconfig.json
	@pnpm exec swc ./src -d dist-esm --config jsc.transform.react.runtime=automatic --config jsc.target=es2020 --config sourceMaps=true
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
