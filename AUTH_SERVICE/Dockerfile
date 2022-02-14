FROM node:14.10.1-alpine3.12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm cache clean --force
RUN npm install --unsafe-perm=true --allow-root
RUN npm install --save mysql2 pg sequelize sequelize-cli
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 9000
CMD [ "npm", "start" ]
