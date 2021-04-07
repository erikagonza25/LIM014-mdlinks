const {
  existRut,
  directoryOrFail,
  getMd,
  readDirectory,
  searchLinks,
  joinFunction,
  statsLinks,
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
      if (!option.stats && option.validate) {
        Promise.all(joinFunction(file)).then((values) => {
          resolve(values);
        });
      } else if (!option.validate && option.stats) {
        Promise.all(joinFunction(file)).then((values) => {
          resolve(statsLinks(values));
        });
      } else if (option.validate && option.stats) {
        Promise.all(joinFunction(file)).then((values) => {
          resolve(statsLinks(values));
        });
      } else {
        resolve(searchLinks(file));
      }
    });
  });
};
/*
mdLinks("hello.md", { stats: true })
  .then((result) => console.log(result))
  .catch(console.error); */
module.exports = { mdLinks };
