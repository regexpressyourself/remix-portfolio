# Use official Node.js LTS image
FROM node:20-alpine as base

# Set working directory
WORKDIR /app

# Install build dependencies for native modules
RUN apk add --no-cache python3 make g++

# Install dependencies only (for better caching)
COPY package.json package-lock.json* yarn.lock* ./
# Ensure cross-env is installed as a production dependency
RUN npm install cross-env --save
RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; elif [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy the rest of the app
COPY . .


# Install sass for SCSS compilation
RUN npm install -g sass

# Compile SCSS to CSS
RUN sass styles:app/styles --no-source-map

# Build the Remix app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]
