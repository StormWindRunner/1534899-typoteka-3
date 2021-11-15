'use strict';

const defineRole = require(`./role`);
const defineComment = require(`./comment`);
const defineArticle = require(`./article`);
const defineCategory = require(`./category`);
const defineUser = require(`./user`);
const Aliase = require(`./aliase`);

const define = (sequelize) => {
  const Category = defineCategory(sequelize);
  const Comment = defineComment(sequelize);
  const Article = defineArticle(sequelize);
  const Role = defineRole(sequelize);
  const User = defineUser(sequelize);

  return {Category, Comment, Article, Role, User};
};

class ArticleCategory extends Model {}

ArticleCategory.init({}, {sequelize});

Role.hasMany(User, {as: Aliase.USERS, foreignKey: `roleId`, onDelete: `cascade`});
User.belongsTo(Role, {foreignKey: `roleId`});

User.hasMany(Article, {as: Aliase.ARTICLES, foreignKey: `userId`, onDelete: `cascade`});
Article.belongsTo(User,  {foreignKey: `roleId`});

User.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `userId`, onDelete: `cascade`});
Comment.belongsTo(User, {foreignKey: `userId`});

Article.hasMany(Comment, {as: Aliase.COMMENTS, foreignKey: `articleId`, onDelete: `cascade`});
Comment.belongsTo(Aritcle, {foreignKey: `articleId`});

Article.belongsToMany(Category, {through: ArticleCategory, as: Aliase.CATEGORIES});
Category.belongsToMany(Article, {through: ArticleCategory, as: Aliase.ARTICLES});
Category.hasMany(ArticleCategory, {as: Aliase.ARTICLES_CATEGORIES});

module.exports = define;