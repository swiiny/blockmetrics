FROM mysql:8.0

COPY ./packages/database .

VOLUME [ "blockmetrics-db:/var/lib/mysql", "./database/query:/docker-entrypoint-initdb.d"]

EXPOSE 3306

CMD ["--default-authentication-plugin=mysql_native_password", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]