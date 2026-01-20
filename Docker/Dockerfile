FROM alpine:latest

RUN apk update && apk add --no-cache \
    nginx \
    openssl \
    bash \
    curl

RUN mkdir -p \
    /etc/nginx/certs \
    /etc/nginx/conf.d \
    /run/nginx

COPY ./Docker/nginx.conf /etc/nginx/nginx.conf
COPY ./Docker/default.conf /etc/nginx/conf.d/default.conf
COPY ./Docker/ssl.conf /etc/nginx/conf.d/ssl.conf


EXPOSE 80
EXPOSE 443

WORKDIR /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

