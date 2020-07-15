import { Router } from "express";

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ server_status: "ok" });
});

export default routes;
