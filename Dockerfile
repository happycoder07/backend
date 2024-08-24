FROM node:current-alpine3.20

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set the working directory inside the container
WORKDIR /usr/src/app

# Change ownership of application files to the non-root user
RUN chown -R appuser:appgroup /usr/src/app

# Switch to the non-root user
USER appuser

# Define build arguments
ARG MONGO_URI
ARG EXPRESS_PORT

# Set environment variables using the build arguments
ENV MONGO_URI="mongodb+srv://faltukam567:TcgIdesd4bKG5RO5@mongocluster.8o9t1.mongodb.net/?retryWrites=true&w=majority&appName=mongocluster"
ENV EXPRESS_PORT=${EXPRESS_PORT}

# Example command to check values during the build
RUN echo "Mongo URI: ${MONGO_URI}" && echo "Express Port: ${EXPRESS_PORT}"

# Copy the build artifacts from the GitHub Actions workflow
COPY /dist /usr/src/app/dist
COPY ecosystem.config.js /usr/src/app/
COPY package.json /usr/src/app/

# Switch to root to install global packages
USER root
RUN npm install -g pm2

# Switch back to non-root user
USER appuser

# Install only production dependencies
RUN npm install --only=production

# Expose the port that the app runs on
EXPOSE $EXPRESS_PORT

# Start the application using PM2 and the ecosystem file
CMD ["npx", "pm2-runtime", "start", "ecosystem.config.js"]
