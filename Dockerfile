FROM node:16-alpine as build-stage

WORKDIR /app

COPY ./ /app/

COPY .env.production /app/.env

COPY package*.json /app/

RUN npm install

RUN npm run build

FROM nginx:1.15-alpine

COPY --from=build-stage /app/dist/spa/ /usr/share/nginx/html

COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
