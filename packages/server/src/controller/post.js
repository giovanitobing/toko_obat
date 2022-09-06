const { Post, User, Comment, Like } = require("../library/sequelize");

const postController = {
  getAllPost: async (req, res) => {
    try {
      const findPost = await Post.findAll({
        limit: 5,
        offset: 0,
        include: [User, Like, { model: Comment, include: [User] }],
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({
        message: "fatched all the post",
        result: findPost,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },

  getPostByUser: async (req, res) => {
    try {
      const { user_id } = req.params;

      const findUserPost = await Post.findAll({
        where: {
          user_id,
        },

        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json({
        message: `fatched all the post from user_id = ${user_id}`,
        result: findUserPost,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },

  addPost: async (req, res) => {
    try {
      const { user_id, caption, location } = req.body;
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = process.env.PATH_POST;
      const { filename } = req.file;

      await Post.create({
        image_url: `${uploadFileDomain}/${filePath}/${filename}`,
        caption,
        location,
        user_id,
      });

      return res.status(200).json({
        message: "new post edded",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
};

module.exports = postController;
