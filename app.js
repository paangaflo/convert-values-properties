require('typescript-require')({
    targetES5: true,
    exitOnError: true,
    emitOnError: true
});

const funcs = require("./converter.ts");

function converter(){
    return funcs.converter;
}

module.exports = { converter }
