const getRouter = require("../utils/getRouter");
const authApiRouter = require("./routes/authApiRouter");
const distributionsApiRouter = require("./routes/distributionApiRouter");
const donationsApiRouter = require("./routes/donationsApiRouter");
const donorsApiRouter = require("./routes/donorsApiRouter");
const recipientsApiRouter = require("./routes/recipientsApiRouter");
const requestsApiRouter = require("./routes/requestsApiRouters");

const apiRouter = getRouter();

apiRouter.use("/auth", authApiRouter);

apiRouter.use("/donors", donorsApiRouter);

apiRouter.use("/recipients", recipientsApiRouter);

// apiRouter.use("/admin", );

apiRouter.use("/distribution", distributionsApiRouter);

apiRouter.use("/requests", requestsApiRouter);

apiRouter.use("/donations", donationsApiRouter);

module.exports = apiRouter;
