// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      database: "oncar",
      user: "root",
      password: "09251029",
    },
    migrations: {
      tableName: "knex_migration",
      directory: `${__dirname}/src/migrations`,
    },
  },
};
