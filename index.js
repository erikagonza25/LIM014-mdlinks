const fs = require("fs");
const process = require("process");
const path = require("path");
// Constante para obtener el directorio actual
const directorio = process.cwd();
// Constante con un objeto vacio, para llevarlo a los test
const mdLinks = {};
// Constante de prueba
const test = "./prueba";
// Función para cambiar una ruta relativa a absoluta
const changeDirectory = (dir) => {
  try {
    return path.resolve(dir);
  } catch (err) {
    return `Se produjo un error mientras se cambiaba de directorio ${err}`;
  }
};
changeDirectory(directorio);
// Función para comprobar si el archivo o directorio existe
const existFile = (pru) => {
  fs.stat(test, function (err) {
    if (err == null) {
      console.log(pru);
      return pru;
    } else if (err.code == "ENOENT") {
      console.log("El archivo o directorio no existe");
      return "El archivo o directorio no existe";
    } else {
      console.log(err);
      return err; // ocurrió algún error
    }
  });
};
existFile(test);
// Función para saber si es un archivo o un directorio
const typeFile = () => {
  return fs.readdir(test, (err, files) => {
    if (err) {
      throw err;
    }
    files
      .map((file) => path.join(test, file))
      .filter((path) => fs.statSync(path).isDirectory())
      .forEach((file) => {
        if (path.extname(file) == ".md") {
          return file;
        } else {
          return "No es un archivo(.md)";
        }
      });
    console.log(files);
  });
};
typeFile(test);
// Función para saber si es un archivo o un directorio
typeRuta = fs.statSync(test);
if (typeRuta.isFile() === true) {
  console.log("La ruta es un archivo" + test);
} else {
  console.log("La ruta es un directorio " + test);
}

mdLinks.changeDirectory = changeDirectory;
mdLinks.typeFile = typeFile;
mdLinks.existFile = existFile;
module.exports = mdLinks;
