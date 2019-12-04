FROM node:10.17.0-alpine

LABEL maintainer wxq

WORKDIR /app/

COPY . .

RUN yarn

RUN yarn build

RUN mv ./dist/* ./

EXPOSE 8080