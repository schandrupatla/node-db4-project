
const express = require("express");
// const actionsRouter = require("./actions/actions-router");
// const {
//     logger ,
//     errorHandling
//   } = require('./actions/actions-middlware');
//  const projectsRouter = require("./projects/projects-router");

const server = express();
server.use(express.json());

// server.use("/api/actions", logger, actionsRouter);
// server.use("/api/projects",logger, projectsRouter);

// server.use(errorHandling);

module.exports = server;
