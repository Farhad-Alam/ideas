import { Post } from "../models/Post.js";
import cloudinary from "cloudinary";

export const createPost = async (req, res) => {
  try {
    const { title, message, tags, selectedFile } = req.body;

    if (!selectedFile) {
      return res.status(400).json({
        success: false,
        msg: "Add ur Image",
      });
    } else if (!title || !message || !tags) {
      return res.status(400).json({
        success: false,
        msg: "Please Enter all the Field",
      });
    } else {
      const myCloud = await cloudinary.v2.uploader.upload(selectedFile, {
        folder: "Ideas/post",
      });

      const post = await Post.create({
        ...req.body,
        owner: req.user._id,
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });

      res.status(201).json({
        success: true,
        msg: "Post Created Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const resultPerPage = 8;
    const currentPage = req.query.page || 1;
    const skip = resultPerPage * (currentPage - 1);
    const postCount = await Post.countDocuments();

    const posts = await Post.find()
      .populate("owner")
      .sort("-createdAt")
      .limit(resultPerPage)
      .skip(skip);

    if (!posts) {
      return res.status(404).json({
        success: false,
        msg: "Posts not Found",
      });
    }

    res.status(200).json({
      success: true,
      postCount,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const getPostsQuery = async (req, res) => {
  try {
    const title = {
      $regex: new RegExp(req.query.title, "i"),
    };
    const posts = await Post.find({
      $or: [
        { title },
        { tags: { $in: req.query.tags ? req.query.tags.split(",") : null } },
      ],
    })
      .populate("owner")
      .sort("-createdAt");

    if (!posts) {
      return res.status(404).json({
        success: false,
        msg: "Posts not Found",
      });
    }

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("owner comments.user");

    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not Found",
      });
    }

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const postLikeOrUnlike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user._id;

    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not Found",
      });
    }
    if (post.likes.includes(userId)) {
      const index = post.likes.indexOf(userId);
      post.likes.splice(index, 1);
      await post.save();

      return res.status(200).json({
        success: true,
        msg: "Post Unliked SuccessFully",
      });
    } else {
      post.likes.push(userId);
      await post.save();

      return res.status(200).json({
        success: true,
        msg: "Post Liked SuccessFully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not Found",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Post Deleted SuccessFully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not Found",
      });
    }

    res.status(200).json({
      success: true,
      post,
      msg: "Post Updated SuccessFully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
export const postComment = async (req, res) => {
  try {
    const userId = req.user._id;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not Found",
      });
    }

    post.comments.push({
      user: userId,
      comment: req.body.comment,
    });
    await post.save();

    res.status(200).send({
      success: true,
      msg: "Comment Added Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
export const postCommentDelete = async (req, res) => {
  try {
    const userId = req.user._id;
    const post = await Post.findById(req.params.id);
    console.log(post);

    if (!post) {
      return res.status(404).json({
        success: false,
        msg: "Post not Found",
      });
    }
    // Checking if Owner of the Post wants to delete Comment
    if (post.owner.toString() === userId.toString()) {
      post.comments.forEach((item, index) => {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      return res.status(200).json({
        success: true,
        mess: "Selected comment has deleted",
      });
    } else {
      post.comments.forEach((item, index) => {
        if (item.user.toString() === userId.toString()) {
          return post.comments.splice(index, 1);
        }
      });
      await post.save();
      return res.status(200).json({
        success: true,
        mess: "Your comment has deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};
