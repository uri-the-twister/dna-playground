const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'DNA Playground',
    description: 'Upload a DNA sequence. See what happens!',
  },
  host: '3000-beige-salmon-xzm6vc5n.ws-eu11.gitpod.io',
  schemes: ['https'],
};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./app/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);