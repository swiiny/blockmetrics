dev:
	cp .env frontend/.env
	docker-compose up --build -V

down:
	docker-compose down -v

install:
	cd frontend && npm install && cd ..
	cd server && npm install && cd ..
	cd api/rest && npm install && cd ../..
	cd api/ws && npm install && cd ../..

reset: 
	docker system prune -a -f
	docker volume prune -f
	