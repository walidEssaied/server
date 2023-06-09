"use strict";
/**
 * produit controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::produit.produit", ({ strapi }) => ({
  async create(ctx) {
    try {
      const user = ctx.state.user;
      ctx.request.body.data.users_permissions_user = user.id;
      const datas = await strapi.entityService.create("api::produit.produit", {
        ...ctx.request.body,
      });
      return datas;
    } catch (err) {
      ctx.body = err;
    }
  },
  async update(ctx) {
    try {
      const user = ctx.state.user;
      ctx.request.body.data.users_permissions_user = user.id;
      const { id } = ctx.params;

      const experienceData = await strapi.entityService.findMany(
        "api::produit.produit",
        {
          filters: {
            user: {
              id: user.id,
            },
            id: id,
          },
        }
      );

      if (experienceData.length === 0) {
        return {
          data: null,
          error: {
            message: "",
          },
        };
      }

      const datas = await strapi.entityService.update(
        "api::produit.produit",
        id,
        {
          ...ctx.request.body,
        }
      );
      return datas;
    } catch (err) {
      ctx.body = err;
    }
  },
  async delete(ctx) {
    try {
      const user = ctx.state.user;
      const { id } = ctx.params;

      const experienceData = await strapi.entityService.findMany(
        "api::produit.produit",
        {
          filters: {
            user: {
              id: user.id,
            },
            id: id,
          },
        }
      );

      if (experienceData.length === 0) {
        return {
          data: null,
          error: {
            message: "",
          },
        };
      }

      const datas = await strapi.entityService.delete(
        "api::produit.produit",
        id
      );
      return datas;
    } catch (err) {
      ctx.body = err;
    }
  },
  async findOne(ctx) {
    try {
      const user = ctx.state.user;
      const { id } = ctx.params;

      const experienceData = await strapi.entityService.findMany(
        "api::produit.produit",
        {
          filters: {
            user: {
              id: user.id,
            },
          },
        }
      );

      if (experienceData.length === 0) {
        return {
          data: null,
          error: {
            message: "",
          },
        };
      }

      const datas = await strapi.entityService.findOne(
        "api::produit.produit",
        id,
        {
          populate: "*",
        }
      );

      return datas;
    } catch (err) {
      ctx.body = err;
    }
  },
  async find(ctx) {
    try {
      const user = ctx.state.user;
      const datas = await strapi.entityService.findMany(
        "api::produit.produit",
        {
          filters: {
            user: {
              id: user.id,
            },
          },
          populate: "*",
        }
      );
      return datas;
    } catch (err) {
      ctx.body = err;
    }
  },
}));
