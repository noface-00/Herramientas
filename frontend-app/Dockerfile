FROM node:20-alpine AS build
WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV

COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
