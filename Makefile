.PHONY: runserver
runserver:
	python manage.py runserver

.PHONY: test
test:
	python manage.py test -v 2

.PHONY: docker_test
docker_test:
	docker-compose run web python manage.py test -v 2

.PHONY: docker_debug_runserver
docker_debug_runserver:
	docker-compose run --service-ports web

.PHONY: docker_collectstatic
docker_collectstatic:
	docker-compose run web python manage.py collectstatic --noinput

.PHONY: docker_shell
docker_shell:
	docker-compose run web python manage.py shell
