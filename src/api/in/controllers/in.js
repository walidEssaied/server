("use strict");

/**
 * in controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::in.in", ({ strapi }) => ({
  async create(ctx) {
    try {
      const user = ctx.state.user;
      ctx.request.body.data.users_permissions_user = user.id;
      const datas = await strapi.entityService.create("api::in.in", {
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

      const experienceData = await strapi.entityService.findMany("api::in.in", {
        filters: {
          user: {
            id: user.id,
          },
          id: id,
        },
      });

      if (experienceData.length === 0) {
        return {
          data: null,
          error: {
            message: "",
          },
        };
      }

      const datas = await strapi.entityService.update("api::in.in", id, {
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

      const experienceData = await strapi.entityService.findMany("api::in.in", {
        filters: {
          user: {
            id: user.id,
          },
          id: id,
        },
      });

      if (experienceData.length === 0) {
        return {
          data: null,
          error: {
            message: "",
          },
        };
      }

      const datas = await strapi.entityService.delete("api::in.in", id);
      return datas;
    } catch (err) {
      ctx.body = err;
    }
  },
  async findOne(ctx) {
    try {
      const user = ctx.state.user;
      const { id } = ctx.params;

      const experienceData = await strapi.entityService.findMany("api::in.in", {
        filters: {
          user: {
            id: user.id,
          },
        },
      });

      if (experienceData.length === 0) {
        return {
          data: null,
          error: {
            message: "",
          },
        };
      }

      const datas = await strapi.entityService.findOne("api::in.in", id, {
        populate: "*",
      });

      return datas;
    } catch (err) {
      ctx.body = err;
      console.log({ err });
    }
  },
  async find(ctx) {
    console.log("------------------------------------------------------------");
    try {
      const user = ctx.state.user;
      const datas = await strapi.entityService.findMany("api::in.in", {
        filters: {
          user: {
            id: user.id,
          },
        },
        populate: "*",
      });
      console.log(
        "---------------------------TRY---------------------------------"
      );
      console.log({ datas });
      return datas;
    } catch (err) {
      ctx.body = err;
    }
  },
}));
