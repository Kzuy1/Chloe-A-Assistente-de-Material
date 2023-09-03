const adjustMaterial = (material) => {
    let nameMaterial = '';
    let materialList = ["S235JR", "S275JR", "S3555JR", "S32205", "AISI 304L", "AISI 316L", "PTFE", "COR-TEN B", "STRENX 700", "P265GH", "SAE 1045"];

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
