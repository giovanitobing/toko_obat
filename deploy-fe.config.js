module.exports = {
  apps: [
    {
      name: 'JCWD-2102-01-FE', // Format JCWD-{batchcode}-{groupnumber}
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3201, //format groupnumber and batch ex: 3401
      },
    },
  ],
};
