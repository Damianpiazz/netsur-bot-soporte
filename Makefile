.PHONY: help install dev build test lint docker-up docker-down reset-db seed

help: ## Muestra esta ayuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Instala dependencias de backend y bot
	cd backend && npm install
	cd netsur-whatsap-bot && npm install

dev: ## Inicia backend y bot en modo desarrollo
	@echo "=== Iniciando Backend ==="
	cd backend && npm run dev &
	@sleep 2
	@echo "=== Iniciando Bot ==="
	cd netsur-whatsap-bot && npm run dev

build: ## Compila backend y bot
	cd backend && npx tsc --noEmit
	cd netsur-whatsap-bot && npm run build

test: ## Ejecuta tests de backend y bot
	cd backend && npx vitest run
	cd netsur-whatsap-bot && npx vitest run

test-watch: ## Ejecuta tests en modo watch
	cd backend && npx vitest

lint: ## Ejecuta ESLint en el bot
	cd netsur-whatsap-bot && npm run lint

docker-up: ## Levanta todos los servicios con Docker
	docker compose up -d

docker-down: ## Detiene todos los servicios
	docker compose down

docker-logs: ## Muestra logs de Docker
	docker compose logs -f

docker-rebuild: ## Reconstruye imágenes y reinicia
	docker compose build --no-cache
	docker compose up -d

reset-db: ## Reinicia la base de datos (elimina volúmenes)
	docker compose down -v
	docker compose up -d postgres
	@sleep 3
	@echo "Base de datos reiniciada"

seed: ## Puebla la base con datos de ejemplo (solo Docker)
	@echo "Los datos se insertan automáticamente al iniciar postgres"

status: ## Muestra el estado de los servicios
	@echo "=== Backend ==="
	-curl -s http://localhost:3001/api/health 2>/dev/null || echo "⚠️  No disponible"
	@echo ""
	@echo "=== Bot ==="
	-curl -s http://localhost:3008/v1/blacklist/list 2>/dev/null || echo "⚠️  No disponible"
	@echo ""
	@echo "=== Docker ==="
	-docker compose ps 2>/dev/null || echo "⚠️  Docker no disponible"
