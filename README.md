# fyler

![version](https://img.shields.io/badge/version-0.0.2--alpha-brightgreen)

A simple yet efficient self hosted file sharing server !

## Planned features

- Share: link, image, media, file, document
- Optional account system
- Password protected links
- File cheksum support
- Optional admin panel
- Link expiration

## How to use

### Docker

You can clone the project and then build the Docker image using the provided Dockerfile.

```bash
git clone https://github.com/ToolReaz/fyler.git

cd fyler

docker build -t fyler .

docker run -d --name fyler -e ... fyler
```

### Docker compose

The simpliest way is to use the provided docker-compose.yml solution.

```bash
git clone https://github.com/ToolReaz/fyler.git

docker-compose up -d
```

## Configure

There is severals environment variables available to customize your application. Some of them are mandatory to make it works.

`DB_HOST` Default to localhost

`DB_NAME` Default to fyler

`DB_USER` Default to root

`DB_PASS` Default to root

`DB_TYPE` Default to mariadb. Accepts one of the follwings: `mssql`, `mysql`, `postgres` or `mariadb`
