"use strict";

/**
 * out controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::out.out", ({ strapi }) => ({
  async create(ctx) {
    try {
      const user = ctx.state.user;
      ctx.request.body.data.users_permissions_user = user.id;
      const datas = await strapi.entityService.create("api::out.out", {
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
        "api::out.out",
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

      const datas = await strapi.entityService.update("api::out.out", id, {
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
        "api::out.out",
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

      const datas = await strapi.entityService.delete("api::out.out", id);
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
        "api::out.out",
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

      const datas = await strapi.entityService.findOne("api::out.out", id, {
        populate: "*",
      });

      return datas;
    } catch (err) {
      ctx.body = err;
    }
  },
  // async find(ctx) {
  //   try {
  //     const user = ctx.state.user;
  //     const datas = await strapi.entityService.findMany("api::out.out", {
  //       filters: {
  //         user: {
  //           id: user.id,
  //         },
  //       },
  //       populate: "*",
  //     });
  //     return datas;
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // },
  // async find(ctx) {
  //   console.log({ ctx });
  //   try {
  //     const { filters, pagination, sort, populate } = ctx.query;

  //     const baseQuery = {
  //       user: {
  //         id: ctx.state.user.id,
  //       },
  //     };

  //     const page = pagination?.page || 1;
  //     const pageSize = pagination?.pageSize || 10;
  //     const sortField = sort || "createdAt";
  //     const sortOrder = sortField.endsWith(":asc") ? "asc" : "desc";

  //     const filterCriteria = filters || {};

  //     const query = {
  //       filters: { ...baseQuery, ...filterCriteria },
  //       populate: populate || "*",
  //       start: (page - 1) * pageSize,
  //       limit: pageSize,
  //       sort: sortField,
  //     };

  //     console.log({ query });

  //     const entries = await strapi.entityService.findMany(
  //       "api::out.out",
  //       query
  //     );

  //     ctx.body = entries;
  //   } catch (error) {
  //     ctx.status = 500;
  //     ctx.body = {
  //       error: `An error occurred while fetching data. ${error.message}`,
  //     };
  //     console.error(error);
  //   }
  // },
  
  async find(ctx) {
    try {
      const { filters, pagination, sort, populate } = ctx.query;
  
      const baseQuery = {
        user: {
          id: ctx.state.user.id,
        },
      };
  
      const page = pagination?.page || 1;
      const pageSize = pagination?.pageSize || 10;
      const sortField = sort || "createdAt";
      const sortOrder = sortField.endsWith(":asc") ? "asc" : "desc";
  
      const filterCriteria = filters || {};
  
      const query = {
        filters: { ...baseQuery, ...filterCriteria },
        populate: populate || "*",
        start: (page - 1) * pageSize,
        limit: pageSize,
        sort: sortField,
      };
  
      const entries = await strapi.entityService.findMany("api::out.out", query);
  
      const totalCount = await strapi.entityService.count("api::out.out", {
        filters: baseQuery,
      });
  
      const meta = {
        pagination: {
          page,
          pageSize,
          total: totalCount,
        },
      };
  
      ctx.body = {
        data: entries,
        meta,
      };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        error: `An error occurred while fetching data. ${error.message}`,
      };
      console.error(error);
    }
  }
  
}));
