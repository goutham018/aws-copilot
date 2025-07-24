# Frontend Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package.json .
RUN npm install --omit=dev
EXPOSE 3000
CMD ["npx", "vite", "preview", "--port", "3000", "--host"]
