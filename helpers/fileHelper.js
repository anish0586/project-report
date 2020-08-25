const fs = require('fs');
const path = require('path');

const readFile = async function(docPath) {
    return await fs.readFileSync(path.resolve(__dirname, `../projects/${docPath}`), 'utf-8');
}

module.exports = {
    readFile
}