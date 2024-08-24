FROM node:latest

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set the working directory inside the container
WORKDIR /usr/src/app

# Change ownership of application files to the non-root user
RUN chown -R appuser:appgroup /usr/src/app

# Switch to the non-root user
USER appuser

ARG MONGO_URI
ARG EXPRESS_PORT



# Set environment variables
ENV MONGO_URI=$MONGO_URI
ENV EXPRESS_PORT=$EXPRESS_PORT


# Copy the build artifacts from the GitHub Actions workflow
COPY --from=builder /dist /usr/src/app/dist
COPY --from=builder ecosystem.config.js /usr/src/app/
COPY --from=builder package.json /usr/src/app/

# Install PM2 globally
RUN npm install -g pm2

# Install only production dependencies
RUN npm install --only=production

# Expose the port that the app runs on

# Expose port 5001 to the outside world
EXPOSE $EXPRESS_PORT

# Start the application using PM2 and the ecosystem file
CMD ["npx", "pm2-runtime", "start", "ecosystem.config.js"]
