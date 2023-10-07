FROM node:18.18.0-alpine3.17
COPY ./frontend/build /srv/frontend/build
COPY ./server /srv/server
WORKDIR /srv/server
RUN npm install
CMD [ "node", "src/index.js" ]

