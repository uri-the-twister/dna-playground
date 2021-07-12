const express = require('express');
const swaggerUi = require('swagger-ui-express');

const logger = require('./utils/logger');
const dnaRoutes = require('./dna');


// Create our app
const app = express();
// app.use(express.json());


// Setup routes
app.use('/api/dna', dnaRoutes);


// Swagger Setup
const SWAGGER_DOCS = require('../docs/swagger.json');
app.use(
    swaggerUi.serve,
    swaggerUi.setup(SWAGGER_DOCS)
);


// Start our app
app.listen(3000, () => {
    logger.log('App listening on port 3000');
});