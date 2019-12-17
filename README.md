# www.eclecticboy.xyz

This website is built using Python3 and [Django 3](https://www.djangoproject.com/) framework.

The integration with [Prismic CMS](https://prismic.io/) allows to amend the static copy rendered avoiding to touch the code itself.

The frontend is simple and based on Django templates, the JsvaScript logic is implemented using [jQuery](https://jquery.com/).

From a development point of view the coding is run through PyLint by pre-commits hooks and tested using unittest. The whole application is dockerized defining a database and a web-server container.

CI/CD is implemented using [GitHub actions](https://github.com/features/actions).


## Development

### Set Up

Create and enable a Python3 environment:
```bash
$ sudo virtualenv -p python3 .venv
$ source .venv/bin/activate
```

Install all the requirements:
```bash
$ pip install -r requirements.dev.txt
```

### pre-commit hooks

This projects makes use of pre-commit hooks, the available hooks are defined in `.pre-commit-config.yaml`. For more info go to https://pre-commit.com/.

In order to enable the hooks you need to install them:
```bash
$ pre-commit install
```

### Docker

You can run the application using Docker. Refer to the files `docker-compose.yml` and `Dockerfile` for more details.

https://docs.docker.com/compose/django/

#### Useful commands

Rebuild all the containers after changes to Dockerfiles are made:
```bash
$ sudo docker-compose build
```

Bootstrap the application (all services):
```bash
$ sudo docker-compose up
```

Stop the application (all services):
```bash
$ sudo docker-compose stop
```

Stop and clear the application (all services):
```bash
$ sudo docker-compose stop
```

Run Django server ion `web` container (it catches pdb):
```bash
$ sudo docker-compose run web
```

Open shell inside `web` container:
```bash
$ sudo docker-compose run web sh
```

### PDB

In order to use _pdb_ you need to place you breakpoint in the code (`import pdb;pdb.set_trace()`) and then instruct the swarm to listen to it.
If you have your swarm up and running you need to stop the `web` container and run it using the `--service-ports` option:
```bash
$ docker-compose up
$ docker-compose stop web
$ docker-compose run --service-ports web
```
When done and you need to reuse the swarm as a whole you can reboot everything as follows:
Stop the current swarm by pressing `Ctrl+c` and then
```bash
$ docker-compose up
```


## CMS

The copy shown in this website is stored in and provided by [Prismic CMS](https://prismic.io/). The small client `PrismicClient` in `main/static/main/js/base.js` is responsible for the communication with Prismic via its API.
