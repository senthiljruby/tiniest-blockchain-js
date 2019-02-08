FROM node:latest

RUN \
    apt-get update && \
    apt-get install -y build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Install PM2
RUN npm install -g node-gyp @angular/cli

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Bundle app source
COPY . .

USER root

RUN npm install --unsafe-perm
# If you are building your code for production
# RUN npm install --only=production

RUN cd frontend && npm install --unsafe-perm  && npm rebuild node-sass && ng build --prod

WORKDIR /usr/src/app

EXPOSE 3000

CMD [ "node", "index.js" ]