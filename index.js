const fs = require("fs");
const process = require("process");
const path = require("path");
const marked = require("marked");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
// Constante para obtener el directorio actual
const directorio = process.cwd();
// Constante con un objeto vacio, para llevarlo a los test
const mdLinks = {};
// Constante de prueba
const test = "./prueba";
// Constante de prueba para la lectura de archivos
const readFile = "README.md";
// Constante de prueba para la validación de links
const validFile =
  "https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e";
// Función para cambiar una ruta relativa a absoluta
const changeDirectory = (dir) => {
  try {
    return path.resolve(dir);
  } catch (err) {
    return "Se produjo un error mientras se cambiaba de directorio " + err;
  }
};
changeDirectory(directorio);
// Función para comprobar si el archivo o directorio existe
const existFile = (rut) =>
  fs.existsSync(rut) ? rut : "El archivo o directorio no existe";

existFile(test);
// Función para saber si es un archivo o un directorio
const typeRuta = (test) => {
  const typeRut = fs.statSync(test);
  return typeRut.isFile() === true
    ? "La ruta es un archivo: " + test
    : "La ruta es un directorio: " + test;
};
typeRuta(test);
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
// Función para extraer los links de un archivo html
const searchLinks = (HTML, path) => {
  const readHtml = cheerio.load(HTML, null, false);
  const allLinks = [HTML];
  readHtml("a").map(
    (el, i) =>
      (allLinks[el] = {
        href: readHtml(i).attr("href"),
        text: readHtml(i).text(),
        file: path,
      })
  );
  return allLinks;
};
// Función para cambiar un .md a html
const changeMdToHtml = (condicion) => {
  let readFile = marked(fs.readFileSync(condicion, "utf8"));
  return searchLinks(readFile, condicion);
};
// Función para validar los links
const validateLinks = (link) => {
  return fetch(link, { validate: true })
    .then(function (response) {
      return {
        href: link,
        ok: response.statusText,
        status: response.status,
      };
    })
    .catch(function (err) {
      console.log("Hola" + err);
    });
};
let linksValidate = validateLinks(validFile);

linksValidate.then(function (result) {
  return result;
});
changeMdToHtml(readFile).map((el) => {
  let erika = validateLinks(el.href);

  erika.then(function (result) {
    const marcasFinal = { ...el, ...result };
    console.log(marcasFinal);
    return marcasFinal;
  });
});

mdLinks.changeDirectory = changeDirectory;
mdLinks.existFile = existFile;
mdLinks.typeRuta = typeRuta;
mdLinks.directoryTour = directoryTour;
mdLinks.typeFile = typeFile;
mdLinks.readMd = readMd;
mdLinks.changeMdToHtml = changeMdToHtml;
mdLinks.searchLinks = searchLinks;
module.exports = mdLinks;
