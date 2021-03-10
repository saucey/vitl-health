FROM node:8-alpine

COPY . /home/node/app

WORKDIR /home/node/app

ENTRYPOINT ["npm", "run", "serve:ssr"]