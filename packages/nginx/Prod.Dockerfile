FROM nginx:latest

RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./packages/nginx/nginx.conf /etc/nginx