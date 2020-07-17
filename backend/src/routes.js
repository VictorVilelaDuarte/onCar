import { Router } from "express";

import VeiculoController from "./controllers/VeiculoController";

const routes = new Router();

routes.get("/", (req, res) => {
  return res.json({ server_status: "ok" });
});

routes.post("/veiculo", VeiculoController.create);
routes.get("/veiculo", VeiculoController.index);
routes.put("/veiculo/:id", VeiculoController.update);
routes.get("/veiculo/:id", VeiculoController.show);
routes.delete("/veiculo/:id", VeiculoController.delete);

export default routes;
