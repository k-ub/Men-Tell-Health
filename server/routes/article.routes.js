import express from "express";

import {
    createArticle,
    deleteArticle,
    getAllArticles,
    getArticleDetail,
    updateArticle,
} from "../controllers/article.controller.js";

const router = express.Router();

router.route("/").get(getAllArticles);
router.route("/:id").get(getArticleDetail);
router.route("/").post(createArticle);
router.route("/:id").patch(updateArticle);
router.route("/:id").delete(deleteArticle);

export default router;