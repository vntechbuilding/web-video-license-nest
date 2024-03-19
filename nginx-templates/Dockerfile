FROM nginx:1.25.3
WORKDIR /etc/nginx
COPY ./default.conf.template ./templates/

RUN apt update
RUN apt install -y openssl apache2-utils