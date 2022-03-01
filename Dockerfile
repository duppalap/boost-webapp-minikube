FROM node:16.14-alpine as boost-webapp-build
## set the working directory of the container
WORKDIR /boost-webapp-react
## COPY the package.json into the above defined working directory
COPY package.json ./
RUN npm install
## COPY the rest of the code into the working directory
COPY . .
RUN npm run build
EXPOSE 9000
# CMD ["npm", "start"]

CMD ["node", "server.js"]