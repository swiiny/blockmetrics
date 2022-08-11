FROM node:16.13.1-alpine as deps

RUN apk add --update npm git

# Create app directory
WORKDIR /app

# Installing dependencies
COPY ./packages/frontend/package.json /app

RUN npm install

FROM node:16.13.1-alpine as builder
WORKDIR /app
# Copying source files
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV production

# Building app
RUN npm run build

FROM node:16.13.1-alpine AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Running the app
CMD "npm" "run" "start"
