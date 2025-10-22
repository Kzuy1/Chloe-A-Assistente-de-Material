const { DataSource } = require('typeorm');
const { InventoryMaterial } = require('../entity/InventoryMaterial.js');
const { Material } = require('../entity/Material.js');

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [InventoryMaterial, Material],
});

AppDataSource.initialize()
  .then(() => console.log(' ✔️  => Conectado ao banco com sucesso!'))
  .catch((err) => console.error(' ❌ => Erro ao conectar ao banco:', err));

module.exports = { AppDataSource };