module.exports = {
  apps: [{
    name: 'alexgap-website',
    script: '/home/lagap/.yarn/bin/serve',
    args: '-s dist -l 5173',
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
}