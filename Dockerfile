FROM node:18-alpine AS base

FROM base AS deps

WORKDIR /app
RUN apk add --no-cache postgresql-client
RUN apk add --no-cache openssl
COPY . .

RUN npm update && npm install
RUN npx prisma migrate dev --name init
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

# ENV PORT 3000

CMD ["npm", "run", "start"]