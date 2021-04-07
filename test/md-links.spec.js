const {
  existRut,
  searchLinks,
  validateLinks,
  statsLinks,
  readDirectory,
} = require("../src/md-links.js");
const { mdLinks } = require("../src/index.js");

describe("existRut deberia determinar si existe la ruta y cambiarla a absoluta", () => {
  it("deberia retornar la ruta existente y convertirla a absoluta", () => {
    expect(existRut("./prueba")).toEqual(
      "C:\\Users\\ERIKA\\LIM014-mdlinks\\prueba"
    );
  });

  it("deberia retornar un mensaje si se pasa una ruta no existente", () => {
    expect(existRut("./pruebaT")).toEqual("La ruta no existe");
  });
});
describe("readDirectory deberia leer un directorio recursivamente", () => {
  it("deberia leer el directorio y sus subdirectorios, filtra y devuelve solo los .md", () => {
    expect(readDirectory("./prueba")).toEqual([
      "C:\\Users\\ERIKA\\LIM014-mdlinks\\prueba\\hola\\hoy.md",
      "C:\\Users\\ERIKA\\LIM014-mdlinks\\prueba\\prueba.md",
    ]);
  });
});
describe("validateLinks debería validar el enlace", () => {
  it("Deberia retornar un objeto con el href, ok, status", () => {
    return validateLinks(
      "https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e"
    ).then((res) => {
      expect(res).toEqual({
        href:
          "https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e",
        status: 200,
        statusText: "OK",
      });
    });
  });
  it("Deberia retornar un objeto con el ok, status = Fail", () => {
    return validateLinks(
      "#5-criterios-de-aceptación-mínimos-del-proyecto"
    ).then((res) => {
      expect(res).toEqual({
        status: 500,
        statusText: "FAIL",
      });
    });
  });
});
describe("searchLinks debería retornar los links de los enlace y convertir un archivo a html", () => {
  it("debería retornar los links de los enlace ", () => {
    expect(searchLinks("./prueba/prueba.md")).toEqual([
      {
        file: "./prueba/prueba.md",
        href: "https://nodejs.org/es/about/",
        text: "Acerca de Node.js - Documentación oficial",
      },
    ]);
  });
});
describe("mdLinks debería retornar un array de objetos con las propiedades: file, href y text ", () => {
  it("es una función", () => {
    expect(typeof mdLinks).toBe("function");
  });
  it("debería retornar un array de objetos", () => {
    return mdLinks("../LIM014-mdlinks/prueba/prueba.md", {
      stats: false,
    }).then((result) => {
      expect(result).toEqual([
        {
          file: "C:\\Users\\ERIKA\\LIM014-mdlinks\\prueba\\prueba.md",
          href: "https://nodejs.org/es/about/",
          text: "Acerca de Node.js - Documentación oficial",
        },
      ]);
    });
  });
  it("debería retornar un array de objetos ok, status ", () => {
    return mdLinks("../LIM014-mdlinks/prueba/prueba.md", {
      validate: true,
    }).then((result) => {
      expect(result).toEqual([
        {
          file: "C:\\Users\\ERIKA\\LIM014-mdlinks\\prueba\\prueba.md",
          href: "https://nodejs.org/es/about/",
          status: 200,
          statusText: "OK",
          text: "Acerca de Node.js - Documentación oficial",
        },
      ]);
    });
  });
  it("debería retornar total, unique y broken al colocarle stats true", () => {
    return mdLinks("hello.md", {
      stats: true,
    }).then((result) => {
      expect(result).toEqual({
        Total: 5,
        Unique: 4,
        Broken: 1,
      });
    });
  });
  it("debería retornar total, unique y broken al colocarle stats true y validate true", () => {
    return mdLinks("hello.md", {
      stats: true,
      validate: true,
    }).then((result) => {
      expect(result).toEqual({
        Total: 5,
        Unique: 4,
        Broken: 1,
      });
    });
  });
});
describe("statsLinks función valida los Total, Unique y Broken", () => {
  it("deberia retornar total, unique, broken", () => {
    expect(
      statsLinks([
        {
          file: "C:\\Users\\ERIKA\\LIM014-mdlinks\\prueba\\prueba.md",
          href: "https://nodejs.org/es/about/",
          status: 200,
          statusText: "OK",
          text: "Acerca de Node.js - Documentación oficial",
        },
      ])
    ).toEqual({
      Total: 1,
      Unique: 1,
      Broken: 0,
    });
  });
});
