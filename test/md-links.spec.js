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
/* describe('describe la función fileOrDirectory', () => {
  it('', () => {
    expect(mdLinks.obtenerLinks('.editorconfig.js')).toEqual('isFile');
  });
  it('', () => {
    expect(mdLinks.obtenerLinks('.git.js')).toBe('isDirectory');
  });
});
describe('describe la función prueba', () => {
  it('', () => {
    expect(mdLinks.prueba('index.js')).toEqual('index.js');
  });

  it('', () => {
    expect(mdLinks.prueba('')).toEqual('El archivo no existe, verifique la información proporcionada');
  });
});
describe('describe la función pruebaTwo', () => {
  it('', () => {
    expect(mdLinks.pruebaTwo('erika')).toEqual('El directorio no existe, verifique la información proporcionada');
  });
  it('', () => {
    expect(mdLinks.pruebaTwo('test')).toBe('test');
  });
});

 describe('describe la función checkFileExists', () => {
  it('debe devolver la ruta del archivo (./README.md) si el archivo existe', () => {
    expect(mdLinks.fileExists('./README.md')).toEqual('./README.md');
  });
});
describe('describe la función checkExtension', () => {
  it('Si es un archivo Markdown (.md ), se da el mismo archivo', () => {
    expect(mdLinks.checkExtension('./README.md')).toEqual('./README.md');
  });
});
describe('describe la función checkExtension', () => {
  it('No es un archivo Markdown (.md ), se le avisa que no lo es', () => {
    expect(mdLinks.checkExtension('./package.json')).toEqual('No es un archivo(.md)');
  });
});
/* describe('describe la función checkExtension', () => {
  it('No es un archivo Markdown (.md ), se le avisa que no lo es', () => {
    expect(mdLinks.prueba('./package.json')).toEqual('No es un archivo(.md)');
  });
}); */
/* describe('mdLinks', () => {
  it('es una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
}); */
