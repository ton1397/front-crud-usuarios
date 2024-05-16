# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:16-alpine as build-stage
WORKDIR /app
COPY ./ /app/
COPY package*.json /app/
RUN npm install
RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15-alpine
COPY --from=build-stage /app/dist/spa/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80