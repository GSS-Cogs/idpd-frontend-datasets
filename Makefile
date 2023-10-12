BUILD_TIME=$(shell date +%s)
GIT_COMMIT=$(shell git rev-parse HEAD)
VERSION ?= $(shell git tag --points-at HEAD | grep ^v | head -n 1)
ALL_ENV_VARS = NEXT_PUBLIC_BUILD_TIME=$(BUILD_TIME) NEXT_PUBLIC_GIT_COMMIT_SHA=$(GIT_COMMIT) NEXT_PUBLIC_GIT_VERSION=$(VERSION)

.PHONY: build
build:
	@echo "Building Next.js app..."
	@echo "Build time: $(BUILD_TIME)"
	@$(ALL_ENV_VARS) yarn build

.PHONY: start
start:
	@echo "Starting Next.js app..."
	@yarn start

.PHONY: debug
debug:
	@echo "Starting Next.js app..."
	@$(ALL_ENV_VARS) yarn dev