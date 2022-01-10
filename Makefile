start:
	docker-compose up --detach
build:
	docker-compose up --detach --build
cron:
	docker-compose exec webapi npm run cron
shell:
	docker-compose exec webapi bash
logs:
	docker-compose logs --follow webapi
test:
	docker-compose exec webapi npm run test
stop:
	docker-compose stop
destroy:
	docker-compose down --volumes
list:
	docker-compose ps
lint:
	docker-compose exec webapi npm run lint