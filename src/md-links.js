const fs = require("fs");
const path = require("path");
const marked = require("marked");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
// Función para saber si la ruta existe y convertirla en absoluta
const existRut = (rut) =>
  fs.existsSync(rut) ? path.normalize(path.resolve(rut)) : "La ruta no existe";
// Función para saber si es un directorio o archivo
const directoryOrFail = (rut) => fs.statSync(rut);
// Filtra los archivos .md
const getMd = (md) => path.extname(md) === ".md";
// Recorre un directorio de forma recursiva
const readDirectory = (rut) => {
  let filelist = [];
  fs.readdirSync(rut).map(function (file) {
    const subpath = rut + "/" + file;
    if (fs.statSync(subpath).isDirectory()) {
      return filelist.push(readDirectory(existRut(subpath)));
    } else if (getMd(subpath)) {
      return filelist.push(existRut(subpath));
    }
  });

  return filelist.flat();
};
// Función para cambiar un archivo a html y extraer los links de un archivo html
const searchLinks = (HTML) => {
  const readFile = marked(fs.readFileSync(HTML, "utf8"));
  const readHtml = cheerio.load(readFile);
  const allLinks = [];
  readHtml("a").map(
    (el, i) =>
      (allLinks[el] = {
        href: readHtml(i).attr("href"),
        text: readHtml(i).text(),
        file: HTML,
      })
  );
  return allLinks;
};
// Función para validar los links
const validateLinks = (link) => {
  return fetch(link, { validate: true })
    .then((response) => {
      if (response.status >= 200 && response.status < 400) {
        return {
          href: link,
          statusText: response.statusText,
          status: response.status,
        };
      } else {
        return { statusText: "FAIL", status: response.status };
      }
    })
    .catch(() => ({
      status: 500,
      statusText: "FAIL",
    }));
};
// Función en la cual se une searchLinks y validateLinks para retorna href, file, text, status , ok
const joinFunction = (file) => {
  return searchLinks(file).map((el) => {
    let joinOfFunctions = validateLinks(el.href);

    return joinOfFunctions.then(function (result) {
      const finalObject = { ...el, ...result };
      return finalObject;
    });
  });
};
//Funcion para validar los stats
const statsLinks = (links) => {
  const stats = {};
  const allStats = [];
  links.map((link) => {
    allStats.push(link);
  });
  stats.Total = allStats.length;
  stats.Unique = unique(allStats);
  stats.Broken = broken(allStats).length;
  return stats;
};
const unique = (linkstats) => {
  const mySet = new Set();
  linkstats.forEach((ele) => mySet.add(ele.href));
  return mySet.size;
};
const broken = (linkstats) => {
  return linkstats.filter((href) => href.statusText === "FAIL");
};
module.exports = {
  existRut,
  directoryOrFail,
  getMd,
  readDirectory,
  searchLinks,
  validateLinks,
  joinFunction,
  statsLinks,
};
