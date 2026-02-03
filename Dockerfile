# Stage 1: React 애플리케이션 빌드
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# 빌드 시 환경변수를 ARG로 받음
ARG VITE_NAVER_MAP_CLIENT_ID=tb9ayjajhk

# 환경변수를 빌드에 사용
ENV VITE_NAVER_MAP_CLIENT_ID=$VITE_NAVER_MAP_CLIENT_ID

RUN npm run build
# RUN npm run build:production

# Stage 2: Nginx로 애플리케이션 배포
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]