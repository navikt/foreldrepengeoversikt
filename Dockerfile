FROM node:17.4-slim

WORKDIR /usr/src/app

COPY dist ./dist

COPY server.js .
COPY node_modules ./node_modules
COPY package.json .
COPY src/build/scripts/decorator.js ./src/build/scripts/decorator.js
COPY .env .

EXPOSE 8080
CMD ["npm", "run", "start-express"]