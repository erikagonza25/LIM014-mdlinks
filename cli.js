#!/usr/bin/env node
const chalk = require("chalk");
const { mdLinks } = require("./src/index.js");
const { statsLinks } = require("./src/md-links.js");
const {
  message,
  messageCat,
  messaCat,
  prueba,
} = require("./image/imagenes.js");
const figlet = require("figlet");
const program = require("commander");

// Mostrar un banner con un mensaje formado por caracteres.
const msn = "MD-LINKS";
console.log(
  chalk.hex("#EB8A90").bold(
    figlet.textSync(msn, {
      font: "Larry 3D",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  )
);
program.addHelpText(
  "after",
  chalk.hex("#FFCAD4")(
    `

  ╔==========================================================================╗
  |                                  HELP!!                                  |
  |==========================================================================|
  |                             -v, --validate                               |
  |                      "Valida el status de los links"                     |
  |                              -s, --stats                                 |
  |       "Muestra estadisticas de los links(Total, Unique)"                 |
  |                         -s,-v --stats --validate                         |
  | "Devuelve estadísticas que necesiten de los resultados de la validación" |
  '--------------------------------------------------------------------------'
`
  )
);
program
  .arguments("<path-to-file>")
  .option("-v, --validate")
  .option("-s, --stats")
  .option("-s,-v --stats --validate")

  .action((path) => {
    const options = program.opts();

    mdLinks(path, options)
      .then((arrayLinks) => {
        if (!options.validate && !options.stats) {
          arrayLinks.map((link) => {
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
            if (link.status >= 200 && link.status < 400) {
              console.log(
                chalk.hex("#7D53DE").bold(link.href) +
                  "  " +
                  chalk.hex("#DAFFEF").dim(link.text) +
                  "  " +
                  chalk.hex("#E3BAC6").dim(link.file) +
                  "  " +
                  chalk.hex("#91F5AD").dim(link.status) +
                  "  " +
                  chalk.hex("#00A878").dim(link.statusText)
              );
            } else {
              console.log(
                chalk.hex("#7D53DE").bold(link.href) +
                  "  " +
                  chalk.hex("#DAFFEF").dim(link.text) +
                  "  " +
                  chalk.hex("#E3BAC6").dim(link.file) +
                  "  " +
                  chalk.hex("#ED6A5A").dim(link.status) +
                  "  " +
                  chalk.hex("#D62839").dim(link.statusText)
              );
            }
          });
          console.log(chalk.hex("#FFCAD4")(messageCat));
        } else if (!options.validate && options.stats) {
          const link = statsLinks(arrayLinks);
          console.log(
            chalk.hex("#7D53DE").bold("Total:") +
              " " +
              chalk.hex("#DAFFEF").dim(link.Total) +
              "\n" +
              chalk.hex("#7D53DE").bold("Unique:") +
              " " +
              chalk.hex("#DAFFEF").dim(link.Unique)
          );

          console.log(chalk.hex("#FFCAD4")(messaCat));
        } else if (options.validate && options.stats) {
          const link = statsLinks(arrayLinks);
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
          console.log(chalk.hex("#FFCAD4")(messaCat));
        }
      })
      .catch(() => console.log(chalk.red(prueba)));
  })
  .parse(process.argv);
