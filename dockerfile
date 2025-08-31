# Stage 1: Build the application
FROM node:22-alpine AS build

WORKDIR /usr/src/app

# Copy package files and install all dependencies for building
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Production image
FROM node:22-alpine

WORKDIR /usr/src/app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the built application from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose port 3000 (a common default, update if different)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
