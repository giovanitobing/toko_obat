module.exports = {
  apps: [
    {
      name: 'JCWD-2102-04-FE', // Format JCWD-{batchcode}-{groupnumber}
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3204, //format groupnumber and batch ex: 3401
      },
    },
  ],
};
