FROM node:20-alpine

RUN apk add --no-cache \
    openssh-client \
    curl \
    ca-certificates \
    bash

WORKDIR /app

COPY package.json ./
RUN npm install --production

COPY index.js info ./
RUN chmod +x /app/info

ENV APIKEY=""
ENV TOKEN=""

EXPOSE 3000

CMD ["/app/info"]
