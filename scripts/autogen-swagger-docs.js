const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: '3000-lavender-moose-4g4y2m98.ws-eu11.gitpod.io',
  schemes: ['https'],
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./app/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);