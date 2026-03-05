const Article = require("./articles.model");
const mongoose = require("mongoose");

const articlesService = {
  getAll: async ({ page, limit, search }) => {
    const skip = (page - 1) * limit;

    const query = {
      title: { $regex: "^" + search, $options: "i" },
    };

    const articles = await Article.find(query)
      .populate("userId")
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    const totalData = await Article.countDocuments(query);
    const totalPages = Math.ceil(totalData / limit);

    const result = articles.map((article) => ({
      id: article._id,
      title: article.title,
      date: article.date.toISOString().split("T")[0],
      image: `uploads/${article.image}`,
      description: article.description,
      name: article.userId.name,
    }));

    return {
      articles: result,
      totalData,
      totalPages,
    };
  },

  getByUserId: async ({ page, limit, search, userId }) => {
    const skip = (page - 1) * limit;

    const query = {
      title: { $regex: "^" + search, $options: "i" },
      userId: userId,
    };

    const articles = await Article.find(query)
      .populate("userId")
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    const totalData = await Article.countDocuments(query);
    const totalPages = Math.ceil(totalData / limit);

    const result = articles.map((article) => ({
      id: article._id,
      title: article.title,
      date: article.date.toISOString().split("T")[0],
      image: `uploads/${article.image}`,
      description: article.description,
      name: article.userId.name,
    }));

    return {
      articles: result,
      totalData,
      totalPages,
    };
  },

  getById: async (id) => {
    const article = await Article.findOne({ _id: id }).populate("userId");

    if (!article) {
      return null;
    }

    return {
      id: article._id,
      title: article.title,
      date: article.date.toISOString().split("T")[0],
      image: `uploads/${article.image}`,
      description: article.description,
      name: article.userId?.name || null,
    };
  },

  createArticle: async ({
    userId,
    title,
    description,
    category,
    date,
    image,
  }) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("User tidak valid");
    }

    if (!image) {
      throw new Error("Gambar wajib diisi");
    }

    const newArticle = new Article({
      userId,
      title,
      description,
      category,
      date: date || new Date(),
      image,
    });

    return await newArticle.save();
  },

  updateArticle: async ({
    id,
    userId,
    title,
    description,
    category,
    date,
    image,
  }) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID artikel tidak valid");
    }

    const article = await Article.findById(id);

    if (!article) {
      throw new Error("Article tidak ditemukan");
    }

    if (article.userId.toString() !== userId) {
      throw new Error("Anda tidak memiliki akses");
    }

    article.title = title || article.title;
    article.description = description || article.description;
    article.category = category || article.category;
    article.date = date || article.date;

    if (image) {
      article.image = image;
    }

    return await article.save();
  },

  deleteArticle: async ({ id, userId }) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("ID artikel tidak valid");
    }

    const article = await Article.findById(id);

    if (!article) {
      throw new Error("Article tidak ditemukan");
    }

    if (article.userId.toString() !== userId) {
      throw new Error("Anda tidak memiliki akses");
    }

    await Article.findByIdAndDelete(id);

    return true;
  },
};

module.exports = articlesService;
