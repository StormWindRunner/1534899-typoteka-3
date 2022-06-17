'use strict';

const defineRole = require(`./role`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);
const defineCategory = require(`./category`);
const defineUser = require(`./user`);
const Aliase = require(`./aliase`);
const {Model} = require(`sequelize`);

class ArticleCategory extends Model {}

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);
  const Role = defineRole(sequelize);
  const User = defineUser(sequelize);
  ArticleCategory.init({}, {sequelize, timestamps: false, modelName: Aliase.ARTICLE_CATEGORIES, tableName: `article_categories`});

  Role.hasMany(User, {as: Aliase.USERS, foreignKey: `roleId`, onDelete: `cascade`});
  User.belongsTo(Role, {as: `roles`, foreignKey: `roleId`});

  User.hasMany(Article, {as: Aliase.ARTICLES, foreignKey: `userId`, onDelete: `cascade`});
  Article.belongsTo(User, {foreignKey: `userId`});

  User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `userId`, onDelete: `cascade`});
  Comment.belongsTo(User, {foreignKey: `userId`, as: Aliase.USERS});

  Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `articleId`, onDelete: `cascade`});
  Comment.belongsTo(Article, {foreignKey: `articleId`});

  Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES});
  Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES});
  Category.hasMany(ArticleCategory, {as: Aliase.ARTICLE_CATEGORIES});

  return {Article, Category, Comment, Role, User, ArticleCategory};
};

module.exports = define;
