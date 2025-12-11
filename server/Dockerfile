FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Generate Prisma client
RUN npx prisma generate

# Copy built files
COPY dist ./dist/

# Expose port
EXPOSE 3001

# Start the server
CMD ["node", "dist/index.js"]
