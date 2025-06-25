FROM nginx:latest

WORKDIR /etc/nginx

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/atlantisperfumaria.crt /etc/nginx/
COPY nginx/chave.pem /etc/nginx/

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
