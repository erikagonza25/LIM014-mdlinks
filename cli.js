#!/usr/bin/env node
const chalk = require("chalk");
const { mdLinks } = require("./src/index.js");
const { message, messageCat, messaCat } = require("./image/imagenes.js");
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
    const options = program.opts();

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
        });
        console.log(chalk.hex("#FFCAD4")(message));
      } else if (options.validate && !options.stats) {
        arrayLinks.forEach((link) => {
          console.log(
            chalk.hex("#7D53DE").bold(link.href) +
              "  " +
              chalk.hex("#DAFFEF").dim(link.text) +
              "  " +
              chalk.hex("#E3BAC6").dim(link.file) +
              "  " +
              chalk.hex("#31AFD4").dim(link.status) +
              "  " +
              chalk.hex("#F7CB15").dim(link.statusText)
          );
        });
        console.log(chalk.hex("#FFCAD4")(messageCat));
      } else if (!options.validate && options.stats) {
        [arrayLinks].forEach((link) => {
          console.log(
            chalk.hex("#7D53DE").bold("Total:") +
              " " +
              chalk.hex("#DAFFEF").dim(link.Total) +
              "\n" +
              chalk.hex("#7D53DE").bold("Unique:") +
              " " +
              chalk.hex("#DAFFEF").dim(link.Unique)
          );
        });
        console.log(chalk.hex("#FFCAD4")(messaCat));
      } else if (options.validate && options.stats) {
        [arrayLinks].forEach((link) => {
          console.log(
            chalk.hex("#7D53DE").bold("Total:") +
              " " +
              chalk.hex("#DAFFEF").dim(link.Total) +
              "\n" +
              chalk.hex("#7D53DE").bold("Unique:") +
              " " +
              chalk.hex("#DAFFEF").dim(link.Unique) +
              "\n" +
              chalk.hex("#7D53DE").bold("Broken:") +
              " " +
              chalk.hex("#DAFFEF").dim(link.Broken)
          );
        });
        console.log(chalk.hex("#FFCAD4")(messaCat));
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
/*console.log(
            `${chalk.hex("#7D53DE").bold(link.href)}\t ${chalk
              .hex("#DAFFEF")
              .dim(link.text)}\t ${chalk.hex("#E3BAC6").dim(link.file)}\t`
          ); */