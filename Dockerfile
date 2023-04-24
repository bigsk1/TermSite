# Base image
FROM node:18-alpine as base

WORKDIR /home/node/app
COPY package.json ./

# Development image
FROM base as development

RUN npm install -g npm-check-updates
RUN ncu -u
RUN npm install
COPY . .

# Production image
FROM base as production

COPY --from=development /home/node/app/node_modules /home/node/app/node_modules
RUN npm ci --only=production
COPY . .
ENV NODE_PATH=./build
RUN npm run build
