FROM mysql:8.0

VOLUME [ "blockmetrics-db:/var/lib/mysql", "./database/query:/docker-entrypoint-initdb.d"]

EXPOSE 3306