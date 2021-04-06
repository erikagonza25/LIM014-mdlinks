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
      getMd(paths) ? containFile.push(existRut(paths)) : "Error";
    } else {
      containFile = readDirectory(paths);
    }
    containFile.map((file) => {
      if (option && option.validate) {
        Promise.all(joinFunction(file)).then((values) => {
          resolve(values);
        });
      } else {
        resolve(searchLinks(file));
      }
    });
  });
};
mdLinks("./prueba", { validate: true })
  .then((result) => console.log(result))
  .catch(console.error);
module.exports = { mdLinks };
