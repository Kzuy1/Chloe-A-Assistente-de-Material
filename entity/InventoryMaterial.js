const { EntitySchema } = require('typeorm');

const InventoryMaterial = new EntitySchema({
  name: 'InventoryMaterial',
  columns: {
    id: { 
      type: Number, 
      primary: true, 
      generated: true, 
    },
    position: {
      type: Number, 
      unique: true,
      nullable: false, 
    },
    modelDescription: { 
      type: String, 
      name: 'model_description',
      nullable: false, 
    },
    descriptionPTBR: {
      type: String, 
      name: 'description_ptbr',
      nullable: false, 
    },
    descriptionENUS: {
      type: String, 
      name: 'description_enus',
      nullable: false, 
    },
    unity: {
      type: String,
      nullable: false,
    },
    sectionArea: {
      type: 'decimal',
      precision: 10,
      scale: 3,
      nullable: false,
    }
  }
});

module.exports = { InventoryMaterial };