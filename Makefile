.PHONY: all
BUILD_TIME=$(shell date +%s)
GIT_COMMIT=$(shell git rev-parse HEAD)
VERSION ?= $(shell git tag --points-at HEAD | grep ^v | head -n 1)
ALL_ENV_VARS = export NEXT_PUBLIC_BUILD_TIME=$(BUILD_TIME) NEXT_PUBLIC_GIT_COMMIT_SHA=$(GIT_COMMIT) NEXT_PUBLIC_GIT_VERSION=$(VERSION)


build:
	@echo "Building Next.js app..."
	@echo "Build time: $(BUILD_TIME)"
	$(ALL_ENV_VARS) && yarn build

start:
	@echo "Starting Next.js app..."
	yarn start

debug:
	@echo "Starting Next.js app..."
	@$(ALL_ENV_VARS) && yarn dev