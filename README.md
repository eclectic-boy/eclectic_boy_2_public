# www.eclecticboy.xyz

This website is built using Python3 and [Django 3](https://www.djangoproject.com/) framework.

The integration with [Prismic CMS](https://prismic.io/) allows to amend the static copy rendered avoiding to touch the code itself.

The frontend is simple and based on Django templates, the JsvaScript logic is implemented using [jQuery](https://jquery.com/).

From a development point of view the coding is run through PyLint by pre-commits hooks and tested using unittest. The whole application is dockerized defining a database and a web-server container.

CI/CD is implemented using [GitHub actions](https://github.com/features/actions).


## Development

[Development](./docs/development.md)

## CMS

The copy shown in this website is stored in and provided by [Prismic CMS](https://prismic.io/). The small client `PrismicClient` in `main/static/main/js/base.js` is responsible for the communication with Prismic via its API.
