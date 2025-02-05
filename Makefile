.PHONY: install start dev test docker-build docker-up docker-down db-up db-migrate lint clean

# Version for docker image
VERSION ?= 0.1.0

# Variables
DOCKER_IMAGE_NAME=student-crud-api
DOCKER_TAG=$(VERSION)

install:
	npm install

start:
	npm start

dev:
	npm run dev

test:
	npm test

lint:
	npm run lint

clean:
	rm -rf node_modules
	rm -rf coverage

# Docker commands
docker-build:
	docker build -t $(DOCKER_IMAGE_NAME):$(DOCKER_TAG) .

docker-up: db-up db-migrate
	docker-compose up -d

docker-down:
	docker-compose down

# Database commands
db-up:
	@echo "Starting MongoDB container..."
	@docker-compose up -d mongo
	@echo "Waiting for MongoDB to be ready..."
	@until docker-compose exec -T mongo mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do \
		echo "Waiting for MongoDB to be ready..."; \
		sleep 2; \
	done

db-migrate:
	@echo "Running database migrations..."
	@NODE_ENV=development node migrations/create-student-collection.js

# Development setup
setup: install db-up db-migrate
	@echo "Development environment setup complete!"
