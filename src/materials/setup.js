var getCode = (source, name) => {
    const propertyMap = source.split("\n")
        .map(item => {
            return item.trim()
            .replace(/(;.*$)|(^this\.)/ig, '')
            .split('=').map(_item => _item.trim())
        })
        .filter(item => item.length > 1);
    let info = propertyMap.map(item => {
        const key = item[0];
        const express = item[1];
        let match;
        if(express === "null") {
            return {
                key: key,
                type: "any",
                express: express
            }
        } else if(match = express.match(/^new\s(.*)\(/)) {
            return {
                key: key,
                type: match[1],
                express: express
            }
        } else if(match = express.match(/^('[^']*')|("[^"]*")$/)) {
            return {
                key: key,
                type: "string",
                express: express
            }
        } else if(express === "true" || express === "false") {
            return {
                key: key,
                type: "boolean",
                express: express
            }
        } else if(!isNaN(parseFloat(express))){
            return {
                key: key,
                type: "number",
                express: express
            }
        } else {
            return {
                key: key,
                type: "unknown",
                express: express
            }
        }
    });

    info = info.sort((a, b) => {
        return a.key > b.key ? 1 : -1;
    });

    console.log(info);

    const interface = "export interface I" + name + " extends IMaterialParameters {\n" + info.map(item => {
        return "    " + item.key + "?: " + item.type + ";";
    }).join("\n") + "\n}";

    const classCode = "export class " + name + " extends Material {\n" + info.map(item => {
        return "    public " + item.key + ": " + item.type + " = " + item.express + ";";
    }).join("\n") + "\n\n    constructor(parameters: I" + name + ") {\n        super();\n        this.setValues(parameters);\n    }\n\n    public copy(source: " + name + "): this {\n        super.copy(source);\n        return this;\n    }\n}";

    return interface + "\n\n" + classCode;
};