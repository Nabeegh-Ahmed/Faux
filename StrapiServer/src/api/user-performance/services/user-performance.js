'use strict';

/**
 * user-performance service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-performance.user-performance');
