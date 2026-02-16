module.exports = {
  apps: [
    {
      name: "alexgap-website-preview",
      script: "yarn",
      args: "preview",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
