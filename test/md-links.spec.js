const mdLinks = require("../index.js");

describe("describe la función changeDirectory cambia una ruta relativa a absoluta", () => {
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
  it("test que comprueba si es un directorio", () => {
    expect(mdLinks.typeRuta("./prueba")).toEqual(
      "La ruta es un directorio: ./prueba"
    );
  });

  it("test que comprueba si es un archivo", () => {
    expect(mdLinks.typeRuta("index.js")).toEqual(
      "La ruta es un archivo: index.js"
    );
  });
});
describe("directoryTour debería leer el directorio recursivamente y retornar solos los .md", () => {
  it("test para mostrar los archivos dentro de un directorio", () => {
    expect(mdLinks.directoryTour("./prueba")).toEqual([
      "prueba\\erika.md",
      "prueba\\hola\\hoy.md",
    ]);
  });
});
describe("validateLinks debería validar el enlace", () => {
  test("Deberia retornar un objeto con el href, ok, status", () => {
    return mdLinks
      .validateLinks(
        "https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e"
      )
      .then((res) => {
        expect(res).toEqual({
          href:
            "https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e",
          ok: "OK",
          status: 200,
        });
      });
  });
});
/*describe("", () => {
  it("", () => {
    expect(mdLinks.changeMdToHtml("prueba.md")).toEqual(
      '[{"file": "prueba.md", "href":"https://nodejs.org/es/about/", "text": "Acerca de Node.js - Documentación oficial"}]'
    );
  });
}); */
/*describe("readMd debería recorrer los archivos y mostrarme solo los .md", () => {
  it("error al leer un archivo", () => {
    expect(mdLinks.readMd()).toEqual(
      'TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string or an instance of Buffer or URL. Received undefined'
    );
  });
  it("error al leer un archivo", () => {
    expect(mdLinks.readMd()).toEqual(
      'TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string or an instance of Buffer or URL. Received undefined'
    );
  });
}); */
/*describe("", () => {
  test("", () => {
    expect(mdLinks.changeMdToHtml("pruebaREADME.md")).toEqual(
      "<h1 id='prueba-para-test-changemdtohtml'>Prueba para test changeMdToHtml</h1>"
    );
  });
});
describe("función searchLinks lee un archivo y obtiene los links", () => {
  test("lee el archivo y obten los links", () => {
    expect(mdLinks.searchLinks("pruebaREADME.md")).toEqual([]);
  });
}); */
/* TEST PARA CAMBIAR UN ARCHIVO DE .MD A HTML*/
/* describe("mdToHtml debería ser una función", () => {
  it("es una función", () => {
    expect(typeof mdLinks.mdToHtml).toBe("function");
  });
  test("debería cambiar un archivo con extensión .md a .html", () => {
    expect(
      mdLinks.mdToHtml().toEqual(`<h1 id="markdown-links">Markdown Links</h1>`)
    );
  });
});
describe("typeFile debería recorrer los archivos y mostrarme solo los .md", () => {
  it("Al recibir un directorio busca solo los archivos .md", () => {
    expect(mdLinks.typeFile("./prueba")).toEqual(["prueba\\erika.md"]);
  });
}); */
