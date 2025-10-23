const { EntitySchema } = require('typeorm');

const Material = new EntitySchema({
  name: 'Material',
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
    density: {
      type: 'decimal',
      precision: 10,
      scale: 3,
      nullable: false,
    }
  }
});

module.exports = { Material };