import knex from "../database";

class VeiculoController {
  async create(req, res) {
    try {
      const { veiculo, marca, ano, descricao, vendido } = req.body;
      await knex("veiculos").insert({
        veiculo,
        marca,
        ano,
        descricao,
        vendido,
      });

      return res.status(201).json({
        message: "Veiculo cadastrado com sucesso!",
      });
    } catch {
      return res.status(400).json({
        message: "Erro ao cadastrar veiculo.",
      });
    }
  }

  async index(req, res) {
    try {
      const results = await knex.select().from("veiculos");
      return res.status(200).json({
        data: results,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Erro ao buscar veiculos.",
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const result = await knex.select().from("veiculos").where({
        id,
      });
      return res.status(200).json({
        data: result,
      });
    } catch (err) {
      return res.status(400).json({
        message: "Erro ao buscar veiculo.",
      });
    }
  }

  async update(req, res) {
    try {
      const { veiculo, marca, ano, descricao, vendido } = req.body;
      await knex("veiculos").update({
        veiculo,
        marca,
        ano,
        descricao,
        vendido,
      });

      return res.status(200).json({
        message: "Veiculo alterado com sucesso!",
      });
    } catch {
      return res.status(400).json({
        message: "Erro ao cadastrar veiculo.",
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await knex("veiculos")
        .where({
          id,
        })
        .del();

      return res.status(200).json({
        message: "Veiculo deletado com sucesso!",
      });
    } catch {
      return res.status(400).json({
        message: "Erro ao deletar veiculo.",
      });
    }
  }
}
export default new VeiculoController();
