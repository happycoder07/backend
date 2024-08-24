# Use the official Node.js image as a base
FROM node:18-alpine

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies, including PM2
RUN npm install --production

# Copy the rest of the application code
COPY . .



# Change ownership of application files to the non-root user
RUN chown -R appuser:appgroup /usr/src/app

# Switch to the non-root user
USER appuser

ARG MONGO_URI
ARG EXPRESS_PORT



# Set environment variables
ENV MONGO_URI=$MONGO_URI
ENV EXPRESS_PORT=$EXPRESS_PORT



# Expose port 5001 to the outside world
EXPOSE $EXPRESS_PORT

# Start the application using PM2 and the ecosystem file
CMD ["npx", "pm2-runtime", "start", "ecosystem.config.js"]
