# Use an official node.js runtime as a parent image
FROM node:22-alpine

RUN apk add --no-cache libc6-compat
RUN apk add --no-cache openssl
# Set the working directory in the container
WORKDIR /app

# Copy the package.json and the package-lock.json files to the container
COPY package.json .

RUN npm install pnpm -g

RUN pnpm install

COPY . .

EXPOSE 3000
RUN  pnpm  prisma generate

RUN pnpm  prisma migrate dev


RUN pnpm  prisma migrate reset

CMD [ "pnpm run dev" ]

# CMD [ "sh","-c", "pnpm dlx prisma migrate dev && pnpm dlx prisma generate && pnpm dlx prisma migrate reset  && pnpm run dev" ]