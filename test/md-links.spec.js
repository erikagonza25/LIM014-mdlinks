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
    expect(existRut(__dirname + "/prueba")).toEqual(
      "C:\\Users\\ERIKA\\LIM014-mdlinks\\test\\prueba"
    );
  });

  it("deberia retornar un mensaje si se pasa una ruta no existente", () => {
    expect(existRut(__dirname + "./pruebaT")).toEqual("La ruta no existe");
  });
});
describe("readDirectory deberia leer un directorio recursivamente", () => {
  it("deberia leer el directorio y sus subdirectorios, filtra y devuelve solo los .md", () => {
    expect(readDirectory(__dirname + "/prueba")).toEqual([
      "C:\\Users\\ERIKA\\LIM014-mdlinks\\test\\prueba\\hola\\hoy.md",
      "C:\\Users\\ERIKA\\LIM014-mdlinks\\test\\prueba\\prueba.md",
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
  it("Deberia retornar el mensaje del catch", () => {
    return validateLinks(
      "https://raw.githubusercontent.com/erikagonza25/LIM014-mdlinks/main/img/links_404"
    ).then((res) => {
      expect(res).toEqual({
        status: 404,
        statusText: "FAIL",
      });
    });
  });
});
describe("searchLinks debería retornar los links de los enlace y convertir un archivo a html", () => {
  it("debería retornar los links de los enlace ", () => {
    expect(searchLinks(__dirname + "/prueba/prueba.md")).toEqual([
      {
        file: "C:\\Users\\ERIKA\\LIM014-mdlinks\\test/prueba/prueba.md",
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
  it("debería retornar un array de objetos file, href, text", () => {
    return mdLinks(__dirname + "/prueba/prueba.md").then((result) => {
      expect(result).toEqual([
        {
          file: "C:\\Users\\ERIKA\\LIM014-mdlinks\\test\\prueba\\prueba.md",
          href: "https://nodejs.org/es/about/",
          text: "Acerca de Node.js - Documentación oficial",
        },
      ]);
    });
  });
  it("debería retornar un array de objetos ok, status de un archivo ", () => {
    return mdLinks(__dirname + "/prueba/prueba.md", {
      validate: true,
    }).then((result) => {
      expect(result).toEqual([
        {
          file: "C:\\Users\\ERIKA\\LIM014-mdlinks\\test\\prueba\\prueba.md",
          href: "https://nodejs.org/es/about/",
          status: 200,
          statusText: "OK",
          text: "Acerca de Node.js - Documentación oficial",
        },
      ]);
    });
  });
  it("debería retornar un array de objetos ok, status de un directorio ", () => {
    return mdLinks(__dirname + "/prueba", {
      validate: true,
    }).then((result) => {
      expect(result).toEqual([
        {
          file: "C:\\Users\\ERIKA\\LIM014-mdlinks\\test\\prueba\\hola\\hoy.md",
          href: "https://nodejs.org/es/about/",
          status: 200,
          statusText: "OK",
          text: "Acerca de Node.js - Documentación oficial",
        },
        {
          href: "https://nodejs.org/es/about/",
          text: "Acerca de Node.js - Documentación oficial",
          file: "C:\\Users\\ERIKA\\LIM014-mdlinks\\test\\prueba\\prueba.md",
          statusText: "OK",
          status: 200,
        },
      ]);
    });
  });
  it("debería retornar un array de objetos file,href,text si el stats es igual a false", () => {
    return mdLinks(__dirname + "/prueba", { stats: false }).then((result) => {
      expect(result).toEqual([
        {
          file: "C:\\Users\\ERIKA\\LIM014-mdlinks\\test\\prueba\\hola\\hoy.md",
          href: "https://nodejs.org/es/about/",
          text: "Acerca de Node.js - Documentación oficial",
        },
        {
          href: "https://nodejs.org/es/about/",
          text: "Acerca de Node.js - Documentación oficial",
          file: "C:\\Users\\ERIKA\\LIM014-mdlinks\\test\\prueba\\prueba.md",
        },
      ]);
    });
  });
  it("deberia retornar un mensaje de error No es un archivo .md", () => {
    return expect(mdLinks("./src/index.js")).rejects.toEqual(
      "No es un archivo .md"
    );
  });
  it("deberia retornar un mensaje de error No contiene links", () => {
    return expect(mdLinks("README.md", { validate: false })).rejects.toEqual(
      "No hay links"
    );
  });
  it("deberia retornar un mensaje de error No contiene links{validate:true}", () => {
    return expect(mdLinks("README.md", { validate: true })).rejects.toEqual(
      "No hay links"
    );
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
