const mdLinks = require("../index.js");

describe("describe la función checkFileExists", () => {
  it("is a function", () => {
    expect(typeof mdLinks.changeDirectory).toBe("function");
  });

  it("error al cambiar de ruta", () => {
    expect(mdLinks.changeDirectory()).toBe(
      'Se produjo un error mientras se cambiaba de directorio TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined'
    );
  });
  it("cambia la ruta de relativa a absoluta", () => {
    expect(mdLinks.changeDirectory("wwwroot")).toEqual(
      "C:\\Users\\ERIKA\\LIM014-mdlinks\\wwwroot"
    );
  });
});
describe("existFile debería mostrar si el archivo existe o no", () => {
  it("Devolver el mismo archivo si existe", () => {
    expect(mdLinks.existFile("README.md")).toEqual("README.md");
  });
  it("Devolver un mensaje si el archivo no existe", () => {
    expect(mdLinks.existFile("./erika")).toEqual(
      "El archivo o directorio no existe"
    );
  });
});
describe("typeRuta debería indicar si es un directorio o un archivo", () => {
  test("test que comprueba si es un directorio", () => {
    expect(mdLinks.typeRuta("./prueba")).toEqual(
      "La ruta es un directorio: ./prueba"
    );
  });

  test("test que comprueba si es un archivo", () => {
    expect(mdLinks.typeRuta("index.js")).toEqual(
      "La ruta es un archivo: index.js"
    );
  });
});
describe("directoryTour debería leer el directorio recursivamente", () => {
  test("test para mostrar los archivos dentro de un directorio", () => {
    expect(mdLinks.directoryTour("./prueba")).toEqual([
      "./prueba/erika.md",
      "./prueba/hola/hoy.md",
      "./prueba/hola/indexTwo.js",
      "./prueba/hola.js",
      "./prueba/styles.css",
    ]);
  });
});
describe("typeFile debería recorrer los archivos y mostrarme solo los .md", () => {
  test("al recibir un directorio busca solo los archivos .md", () => {
    expect(mdLinks.typeFile("./prueba")).toEqual(["prueba\\erika.md"]);
  });
});
describe("readMd debería recorrer los archivos y mostrarme solo los .md", () => {
  test("error al leer un archivo", () => {
    expect(mdLinks.readMd()).toEqual(
      'TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string or an instance of Buffer or URL. Received undefined'
    );
  });
});
