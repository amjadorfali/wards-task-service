FROM node:20-slim
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /workspace
RUN yarn install
COPY package.json yarn.lock ./
COPY ./ ./
RUN npx prisma generate
CMD ["yarn", "start"]
