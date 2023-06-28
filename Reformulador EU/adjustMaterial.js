const adjustMaterial = (material) => {
    let nameMaterial = '';
    let materialList = ["S235JR", "PTFE", "AISI 304L", "AISI 316L", "COR-TEN B", "STRENX 700 E/F"];

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