FROM node:20-alpine
WORKDIR /app

# Copy only package files first (better for caching)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy actual application code
COPY src ./src
EXPOSE 3000

# Run container as non-root user for security
USER node

CMD ["npm", "start"]