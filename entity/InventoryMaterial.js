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
      unique: true,
      nullable: false, 
    },
    descriptionPTBR: {
      type: String, 
      name: 'description_ptbr',
      unique: true,
      nullable: false, 
    },
    descriptionENUS: {
      type: String, 
      name: 'description_enus',
      unique: true,
      nullable: false, 
    },
    unity: {
      type: String,
      nullable: false,
    },
    volume: {
      type: 'decimal',
      precision: 10,
      scale: 3,
      nullable: false,
      transformer: {
        to: (value) => value,
        from: (value) => parseFloat(value),
      },
    }
  }
});

module.exports = { InventoryMaterial };