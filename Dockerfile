FROM node:18.14.2-alpine AS build

WORKDIR /client

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

FROM nginx:latest

COPY --from=build /client/build /usr/share/nginx/html