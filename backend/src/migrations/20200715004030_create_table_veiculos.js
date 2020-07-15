exports.up = (knex) =>
  knex.schema.createTable("veiculos", (table) => {
    table.increments("id");
    table.string("veiculo");
    table.string("marca");
    table.integer("ano");
    table.text("descricao");
    table.boolean("vendido");

    table.timestamp("created").defaultTo(knex.fn.now());
    table.timestamp("updated").defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("veiculos");
