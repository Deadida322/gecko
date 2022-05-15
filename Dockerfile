FROM node:16.8-alpine
RUN mkdir -p /usr/stg/client
WORKDIR /usr/stg/client
RUN apk update && apk upgrade
COPY . /usr/stg/client/
RUN npm install
RUN npm run build
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
