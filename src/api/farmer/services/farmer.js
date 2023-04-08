'use strict';

/**
 * farmer service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::farmer.farmer');
