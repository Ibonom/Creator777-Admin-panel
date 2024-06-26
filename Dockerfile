FROM node:alpine3.18 AS api-panel
WORKDIR /usr/code/panel_admin
COPY package*.json ./
RUN npm install 
COPY . .
ENTRYPOINT [ "/bin/sh" ]
