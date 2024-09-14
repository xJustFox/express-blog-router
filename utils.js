const fs = require('fs');
const path = require('path');

const readJSON = (nameFile) => {
    const filePath = path.join(__dirname, 'db', `${nameFile}.json`);
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
};

// Funzione per scrivere dentro norrisDb.js
const writeJSON = (nameFile, newData) => {
    const filePath = path.join(__dirname,'db', `${nameFile}.json`);
    const fileString = JSON.stringify(newData);
    fs.writeFileSync(filePath, fileString);
};

module.exports = {
    readJSON,
    writeJSON
}