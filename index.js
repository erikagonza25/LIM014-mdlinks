const fs = require("fs");
const process = require("process");
const path = require("path");
const marked = require("marked");
const cheerio = require("cheerio");
// Constante para obtener el directorio actual
const directorio = process.cwd();
// Constante con un objeto vacio, para llevarlo a los test
const mdLinks = {};
// Constante de prueba
const test = "./prueba";
// Constante de prueba para la lectura de archivos
const readFile = "README.md";
//Constante de prueba para la lectura de archivos y obtener los links
const fileHtml = "hola.html";

// Función para cambiar una ruta relativa a absoluta
const changeDirectory = (dir) => {
  try {
    return path.resolve(dir);
  } catch (err) {
    return "Se produjo un error mientras se cambiaba de directorio " + err;
  }
};
changeDirectory(directorio);
console.log(changeDirectory(directorio));
// Función para comprobar si el archivo o directorio existe
const existFile = (rut) =>
  fs.existsSync(rut) ? rut : "El archivo o directorio no existe";

existFile(test);
console.log(existFile(test));
// Función para saber si es un archivo o un directorio
const typeRuta = (test) => {
  const typeRut = fs.statSync(test);
  return typeRut.isFile() === true
    ? "La ruta es un archivo: " + test
    : "La ruta es un directorio: " + test;
};
typeRuta(test);
console.log(typeRuta(test));
// Función para recorre un diretorio y sus carpetas
const directoryTour = (test) => {
  return fs
    .readdirSync(test)
    .map((file) => {
      const subpath = test + "/" + file;
      return fs.lstatSync(subpath).isDirectory()
        ? directoryTour(subpath)
        : subpath;
    })
    .flat();
};
directoryTour(test);
console.log(directoryTour(test));
// Función para recorre un archivo y devolver solo los .md
const typeFile = (test) => {
  const fileType = fs
    .readdirSync(test)
    .map((file) => path.join(test, file))
    .filter((path) => fs.statSync(path).isFile())
    .filter((file) => {
      return path.extname(file) == ".md" ? file : false;
    });
  return fileType;
};
typeFile(test);
console.log(typeFile(test));
// Función para leer un archivo .md
const readMd = (read) => {
  try {
    const data = fs.readFileSync(read, "utf8");
    return data;
  } catch (err) {
    return "" + err;
  }
};
readMd(readFile);
// Función para cambiar un .md a html
const changeMdToHtml = (condicion) => marked(condicion);
console.log(changeMdToHtml(readFile));
// Función para extraer los links de un archivo html
const searchLinks = (condicion) => {
  const readHtml = cheerio.load(fs.readFileSync(condicion, "utf8"));
  const allLinks = [condicion];
  readHtml("a").map((i, el) => (allLinks[i] = readHtml(el).attr("href")));
  return allLinks;
};
console.log(searchLinks(fileHtml));

mdLinks.changeDirectory = changeDirectory;
mdLinks.existFile = existFile;
mdLinks.typeRuta = typeRuta;
mdLinks.directoryTour = directoryTour;
mdLinks.typeFile = typeFile;
mdLinks.readMd = readMd;
mdLinks.changeMdToHtml = changeMdToHtml;
mdLinks.searchLinks = searchLinks;
module.exports = mdLinks;
