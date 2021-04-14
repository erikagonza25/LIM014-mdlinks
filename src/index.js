const {
  existRut,
  directoryOrFail,
  getMd,
  readDirectory,
  searchLinks,
  joinFunction,
} = require("../src/md-links.js");
// Función md-links que une todas las demas
const mdLinks = (paths, option) => {
  return new Promise((resolve, reject) => {
    let containFile = [];
    let fileDirectory = directoryOrFail(paths);
    if (fileDirectory.isFile(paths)) {
      if (getMd(paths)) {
        containFile.push(existRut(paths));
        containFile.map((file) => {
          if (option && option.validate) {
            if (joinFunction(file) == 0) {
              reject("No hay links");
            } else {
              Promise.all(joinFunction(file)).then((values) => {
                resolve(values);
              });
            }
          } else {
            if (searchLinks(file) == 0) {
              reject("No hay links");
            } else {
              resolve(searchLinks(file));
            }
          }
        });
      } else {
        reject("No es un archivo .md");
      }
    } else {
      containFile = readDirectory(paths);
      const listAll = containFile.reduce((accumulator, file) => {
        if (option.stats || option.validate) {
          return accumulator.concat(joinFunction(file));
        } else {
          return accumulator.concat(searchLinks(file));
        }
      }, []);
      Promise.all(listAll).then((values) => {
        resolve(values);
      });
    }
  });
};

module.exports = { mdLinks };
