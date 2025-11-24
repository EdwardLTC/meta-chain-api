module.exports = {
  apps: [
    {
      name: 'meta-chain-api',
      script: 'npm',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_restarts: 10,
      restart_delay: 5000,
      output: './logs/meta-chain-api/out.log',
      error: './logs/meta-chain-api/error.log',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
