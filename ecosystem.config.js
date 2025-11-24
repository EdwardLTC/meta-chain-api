module.exports = {
  apps: [
    {
      name: 'meta-chain-api',
      script: './dist/src/main.js',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      output: './logs/meta-chain-api/out.log',
      error: './logs/meta-chain-api/error.log',
    },
  ],
};
