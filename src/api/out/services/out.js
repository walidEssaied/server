'use strict';

/**
 * out service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::out.out');
