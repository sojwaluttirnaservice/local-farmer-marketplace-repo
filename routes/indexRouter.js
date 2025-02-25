var express = require('express');
const apiRouter = require('./apiRoutes/apiRouter');
const viewsRouter = require('./viewsRoutes/viewsRouter');
const asyncHandler = require('../application/utils/asyncHandler');
const { renderPage } = require('../application/utils/responses/ApiResponse');
var indexRouter = express.Router();


// VIEWS  CALLS
indexRouter.use('/', viewsRouter)

// PURE BACKEND CALLS
indexRouter.use('/api/v1', apiRouter);


// REgistering at the last
indexRouter.use('/*', asyncHandler(async (req, res) => {
    renderPage(res, '404')
}))


module.exports = indexRouter;
