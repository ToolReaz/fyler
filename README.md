| !x PROJET DROPPED 
At the beginning this project was a playground to learn NextJS but I decided to drop it due to difficulties achieving my goals with NextJS.
|

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

### Docker compose

The simpliest way is to use the provided docker-compose.yml solution.

```bash
git clone https://github.com/ToolReaz/fyler.git

cd fyler/

docker-compose up -d
```

## Configure

There is severals environment variables available to customize your application. Some of them are mandatory to make it works.

`DB_HOST` Default to localhost

`DB_NAME` Default to fyler

`DB_USER` Default to root

`DB_PASS` Default to root

`DB_TYPE` Default to mariadb. Accepts one of the follwings: `mssql`, `mysql`, `postgres` or `mariadb`
