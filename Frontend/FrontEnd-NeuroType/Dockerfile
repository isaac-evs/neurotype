# Angular
FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Nginx
FROM nginx:alpine

COPY --from=build /app/dist/front-end-neuro-type /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
