dev:
	cp .env frontend/.env
	docker-compose up --build -V

down:
	docker-compose down -v

reset: 
	docker system prune -a -f
	docker volume prune -f
	