module.exports = {
  apps: [
    {
      name: 'JCWD-2000-01-BE', // Format JCWD-{batchcode}-{groupnumber}
      script: './packages/server/src/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 8000, //format groupnumber and batch ex: 8401
      },
      time: true,
    },
  ],
};
