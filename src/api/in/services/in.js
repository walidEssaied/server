'use strict';

/**
 * in service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::in.in');
