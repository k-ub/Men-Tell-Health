import Article from "../mongodb/models/article.js";
import User from "../mongodb/models/user.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllArticles = async (req, res) => {
  const { _end, _order, _start, _sort, title_like = "", articleType = "" } = req.query;

  const query = {};

  if (articleType) {
    query.articleType = articleType;
  }

  if (title_like) {
    query.title = { $regex: title_like, $options: "i" };
  }

  try {
    const count = await Article.countDocuments(query);

    const articles = await Article.find(query)
      .limit(_end - _start)
      .skip(_start)
      .sort({ [_sort]: _order });

    res.set("x-total-count", count);
    res.set("Access-Control-Expose-Headers", "x-total-count");

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticleDetail = async (req, res) => {
  const { id } = req.params;
  const articleExists = await Article.findById(id).populate("creator");

  if (articleExists) {
    res.status(200).json(articleExists);
  } else {
    res.status(404).json({ message: "Article not found" });
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, description, articleType, price, photo, email } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    const user = await User.findOne({ email }).session(session);

    if (!user) throw new Error("User not found");

    const photoUrl = await cloudinary.uploader.upload(photo);

    const newArticle = await Article.create({
      title,
      description,
      articleType,
      price,
      photo: photoUrl.url,
      creator: user._id,
    });

    user.allArticles.push(newArticle._id);
    await user.save({ session });

    await session.commitTransaction();

    res.status(200).json({ message: "Article created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, articleType, price, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    await Article.findByIdAndUpdate(id, {
      title,
      description,
      articleType,
      price,
      photo: photoUrl.url || photo,
    });

    res.status(200).json({ message: "Article updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
      const { id } = req.params;

      const articleToDelete = await Article.findById({ _id: id }).populate(
          "creator",
      );

      if (!articleToDelete) throw new Error("Article not found");

      const session = await mongoose.startSession();
      session.startTransaction();

      await Article.deleteOne({ _id: id }, { session });
      await articleToDelete.creator.allArticles.pull(articleToDelete);

      await articleToDelete.creator.save({ session });
      await session.commitTransaction();

      res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};



export {
    getAllArticles,
    getArticleDetail,
    createArticle,
    updateArticle,
    deleteArticle,
};