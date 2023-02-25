const adjustMaterial = (material) => {
    let nameMaterial = '';
    let materialList = ["ASTM A-36", "ASTM A572 Gr. 50", "ASTM A53 Gr.B"];

    for(c = 0; c < materialList.length; c++){
        if(material.includes(materialList[c])){
            if(nameMaterial != ''){
                nameMaterial = `${nameMaterial} / ${materialList[c]}`;
            } else {
                nameMaterial = materialList[c];
            }
        };
    };
    
    return nameMaterial;
}

module.exports = {adjustMaterial}