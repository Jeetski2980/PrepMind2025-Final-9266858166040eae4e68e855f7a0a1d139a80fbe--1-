# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# Copy only root manifests first for caching
COPY package*.json ./

# Install deps (root manages both client & server)
RUN npm ci

# Copy the rest of the source
COPY . .

# Build (your root "build" should build client + server)
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Bring in only what's needed to run
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built artifacts from the build stage
COPY --from=build /app/dist ./dist

# Cloud Run will provide $PORT; your server must use process.env.PORT
EXPOSE 8080
CMD ["node", "dist/server/node-build.mjs"]
