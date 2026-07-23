# Builder
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production
FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copy dependency files
COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

# Copy compiled application
COPY --from=builder --chown=node:node /app/dist ./dist

# Copy OpenAPI specification
COPY --from=builder --chown=node:node /app/openapi.yaml ./openapi.yaml

# Run as non-root user
USER node

EXPOSE 3000

# Start
CMD ["npm", "start"]