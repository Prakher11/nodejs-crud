
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD ["yarn", "start"]


# FROM node:18-alpine

# WORKDIR /app

# COPY package.json yarn.lock ./


# COPY . . 
# RUN npm i

# RUN npm uninstall bcrypt
# RUN npm install bcryptjs
# RUN yarn add bcryptjs

# EXPOSE 5001

# CMD ["yarn", "start"]

