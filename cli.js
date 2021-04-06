#!/usr/bin/env node

const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const fs = require("fs");
const pathBase = process.cwd();

// Template que usaremos para la creación del contenido del fichero
let templateVUE = require("./template/templateVUE");

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
