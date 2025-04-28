# Choose image
FROM node:alpine AS development

WORKDIR /usr/src/app

# Copy package.json, package-lock.json
COPY package*.json ./

# Copy pnpm-lock.yaml
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm i -g pnpm

# Install Dependency
RUN pnpm i

# Copy everything
COPY . .

# Start server
CMD ["pnpm", "start:dev", "user"]
