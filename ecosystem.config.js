module.exports = {
    apps: [{
      name: 'my-express-app',
      script: './dist/app.js',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        MONGO_URI: process.env.MONGO_URI || '',
        EXPRESS_PORT: process.env.EXPRESS_PORT,
      },
    }],
  };
  