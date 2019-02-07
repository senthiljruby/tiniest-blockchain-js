FROM alpine:3.8
RUN apk update && apk upgrade
RUN apk add npm
RUN rm -rf /var/cache/apk/*

COPY . /src
RUN cd /src; npm install
EXPOSE 3000
CMD ["node", "index.js"]
