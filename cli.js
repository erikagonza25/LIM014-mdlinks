#!/usr/bin/env node
const chalk = require("chalk");
const { mdLinks } = require("./src/index.js");
const { message } = require("./image/imagenes.js");
const figlet = require("figlet");
const program = require("commander");

// Mostrar un banner con un mensaje formado por caracteres.
const msn = (msn) => {
  console.log(
    chalk.hex("#EB8A90").bold(
      figlet.textSync(msn, {
        font: "Larry 3D",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};
program
  .arguments("<path-to-file>")
  .option("-v, --validate", "Valida si los status de los links")
  .option(
    "-s, --stats",
    "Muestra estadisticas de los links(Total, Unique y Broken)"
  )
  .option(
    "-s,-v --stats --validate",
    "Devuelve estadísticas que necesiten de los resultados de la validación."
  )

  .action((path) => {
    let options = {
      validate: false,
      stats: false,
    };

    options.validate = program.validate;
    options.stats = program.stats;

    mdLinks(path, options).then((arrayLinks) => {
      if (!options.validate && !options.stats) {
        arrayLinks.forEach((link) => {
          console.log(
            chalk.hex("#7D53DE").bold(link.href) +
              "  " +
              chalk.hex("#DAFFEF").dim(link.text) +
              "  " +
              chalk.hex("#E3BAC6").dim(link.file)
          );
          /*console.log(
            `${chalk.hex("#7D53DE").bold(link.href)}\t ${chalk
              .hex("#DAFFEF")
              .dim(link.text)}\t ${chalk.hex("#E3BAC6").dim(link.file)}\t`
          ); */
        });
        console.log(chalk.hex("#FFCAD4")(message));
      }
    });
  })
  .parse(process.argv);

// IIFE (Immediately Invoked Function Expression)

(() => {
  return new Promise((resolve) => {
    resolve(msn("MD-LINKS"));
  });
})();

/*#!/usr/bin/env node
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const program = require("commander");

// Mostrar un banner con un mensaje formado por caracteres.
const msn = (msn) => {
  console.log(
    chalk.bold.magenta(
      figlet.textSync(msn, {
        font: "Larry 3D",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};
//

// Preguntas que se van a realizar y que más tarde usaremos
const queryParams = () => {
  const qs = [
    {
      name: "componentName",
      type: "input",
      message: "Ingrese la ruta",
    },

    {
      name: "type",
      type: "list",
      message: "Options: ",
      choices: ["--no options", "--validate", "--stats", "--stats y validate"],
    },
  ];

  return inquirer.prompt(qs);
};

const createFile = (data) => {};
// IIFE (Immediately Invoked Function Expression)
(() => {
  return new Promise((resolve) => {
    msn("MD-LINKS");
    createFile(resolve(queryParams()));
  });
})();
*/
