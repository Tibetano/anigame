FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm update caniuse-lite browserslist


ARG VITE_API_HOST=localhost
ARG VITE_API_PORT=8080

ENV VITE_API_HOST=${VITE_API_HOST}
ENV VITE_API_PORT=${VITE_API_PORT}



RUN npm run build

FROM nginx:alpine AS final

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx_config/default.conf /etc/nginx/conf.d/

RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html && chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]