'use strict';
/**
 * client controller
 */
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::client.client", ({ strapi }) => ({
  async create(ctx) {
    try {
      const user = ctx.state.user;
      ctx.request.body.data.users_permissions_user = user.id;
      const datas = await strapi.entityService.create("api::client.client", {
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
        "api::client.client",
        {
          filters: {
            users_permissions_user: {
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

      const datas = await strapi.entityService.update("api::client.client", id, {
        ...ctx.request.body,
      });
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
        "api::client.client",
        {
          filters: {
            users_permissions_user: {
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

      const datas = await strapi.entityService.delete("api::client.client", id);
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
        "api::client.client",
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

      const datas = await strapi.entityService.findOne("api::client.client", id, {
        populate: "*",
      });

      return datas;
    } catch (err) {
      ctx.body = err;
    }
  },
  async find(ctx) {
    try {
      const user = ctx.state.user;
      const datas = await strapi.entityService.findMany("api::client.client", {
        filters: {
          user: {
            id: user.id,
          },
        },
        populate: "*",
      });
      return datas;
    } catch (err) {
      ctx.body = err;
    }
  },
}));
