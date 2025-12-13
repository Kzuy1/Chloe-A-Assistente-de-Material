const { EntitySchema } = require('typeorm');

const InventoryMaterialReplacement = new EntitySchema({
  name: 'InventoryMaterialReplacement',
  columns: {
    id: { 
      type: Number, 
      primary: true, 
      generated: true, 
    },
    materialName: { 
      type: String, 
      name: 'material_name',
      unique: true,
      nullable: false, 
    },
    inventoryMaterialMatch: {
      type: String, 
      name: 'inventory_material_match',
      nullable: false, 
    },
    inventoryMaterialReplacement: {
      type: String, 
      name: 'inventory_material_replacement',
      nullable: false, 
    }
  }
});

module.exports = { InventoryMaterialReplacement };