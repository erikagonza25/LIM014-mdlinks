const fs = require('fs');
const process = require('process');
const path = require('path');
// Constante para obtener el directorio actual
const directorio = process.cwd();
// Constante con un objeto vacio, para llevarlo a los test
const mdLinks = {};
// Función para cambiar una ruta relativa a absoluta
const changeDirectory = (dir) => {
  try {
    return path.resolve(dir);
  } catch (err) {
    return ('Se produjo un error mientras se cambiaba de directorio ' + err);
  }
};
changeDirectory(directorio);
// Función para saber si es un archivo o un directorio
const methods = ['isDirectory', 'isFile'];
const contentFiles = fs.readdirSync(__dirname, { withFileTypes: true }).map((isDirectory) => {
  const archivos = { name: isDirectory.name + path.extname(__filename) };
  for (const value of methods) archivos[value] = isDirectory[value]();
  return archivos;
});
console.table(contentFiles);

mdLinks.changeDirectory = changeDirectory;
// mdLinks.fileOrDirectory = fileOrDirectory;
module.exports = mdLinks;
