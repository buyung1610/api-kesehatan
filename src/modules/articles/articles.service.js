const { getByUserId } = require("./articles.controller");
const Article = require("./articles.model");

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

  getArticleById: async (id) => {
    const article = await Article.findOne({ _id: id }).populate(
      "userId",
    );

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
};

module.exports = articlesService;
