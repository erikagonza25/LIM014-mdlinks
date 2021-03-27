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
// Función para cambiar una ruta relativa a absoluta
mdLinks.changeDirectory = (dir) => {
  try {
    return path.resolve(dir);
  } catch (err) {
    return "Se produjo un error mientras se cambiaba de directorio " + err;
  }
};
// Función para comprobar si el archivo o directorio existe
mdLinks.existFile = (rut) =>
  fs.existsSync(rut) ? rut : "El archivo o directorio no existe";

// Función para saber si es un archivo o un directorio
mdLinks.typeRuta = (test) => {
  const typeRut = fs.statSync(test);
  return typeRut.isFile() === true
    ? "La ruta es un archivo: " + test
    : "La ruta es un directorio: " + test;
};
//Función para recorrer un directorio y devolver solos los .md
mdLinks.directoryTour = (md) => {
  let containMd = [];
  if (fs.statSync(md).isFile()) {
    if (path.extname(md) === ".md") {
      containMd.push(md);
    }
  } else {
    fs.readdirSync(md).map((directory) => {
      containMd = containMd.concat(
        mdLinks.directoryTour(path.join(md, directory))
      );
    });
  }
  return containMd;
};
console.table(mdLinks.directoryTour(test));
// Función para extraer los links de un archivo html
mdLinks.searchLinks = (HTML, path) => {
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
mdLinks.changeMdToHtml = (condicion) => {
  let readFile = marked(fs.readFileSync(condicion, "utf8"));
  return mdLinks.searchLinks(readFile, condicion);
};
// Función para validar los links
mdLinks.validateLinks = (link) => {
  return fetch(link, { validate: true })
    .then(function (response) {
      return {
        href: link,
        ok: response.statusText,
        status: response.status,
      };
    })
    .catch(function (err) {
      return err;
    });
};
// Función en la cual se une changeMdToHtml y validateLinks para retorna href, file, text, status , ok
mdLinks.changeMdToHtml(readFile).map((el) => {
  let joinOfFunctions = mdLinks.validateLinks(el.href);

  joinOfFunctions.then(function (result) {
    const marcasFinal = { ...el, ...result };
    return marcasFinal;
  });
});

module.exports = mdLinks;
