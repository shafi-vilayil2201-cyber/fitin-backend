const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "..", "db.json"));
const middlewares = jsonServer.defaults();

// CORS (important for frontend requests)
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.end();
  }
  next();
});

server.use(middlewares);
server.use(router);

// Vercel serverless handler
module.exports = (req, res) => {
  server(req, res);
};
