# electron-quick-start
Proyecto simple ejemplo de "electron-quick-start", listo para clonar y modificar

Desarrollado en Linux (Debian10), VSCode

- Rodrigo Centurión
(Asunción, Paraguay)

## Clonar el proyecto y abrir desde VSCode
```sh
git clone https://github.com/Centurion95/electron-quick-start.git
cd electron-quick-start
code .
```

## Antes de ejecutar por primera vez, instalar las dependencias
```sh
npm i
```

## Ejecutar el proyecto
```sh
npm start
```

## Package and distribute your application
1. Add Electron Forge as a development dependency of your app, and use its `import` command to set up Forge's scaffolding:
```sh
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

2. Create a distributable using Forge's `make` command:
```sh
npm run make
```


## Acerca de
rc95 - 12/08/2022 03:38
- Primera versión del proyecto
- Se agrega .gitignore
- Cambios en el readme de la plantilla original
    - https://github.com/electron/electron-quick-start
- Se reestructuran las carpetas
- Se agrega la instrucción `--no-sandbox` para el `npm start`
- La plantilla implementa sqlite (para mas adelante)
- Implementamos `/src/utils/getDate.js`
- Implementamos modo oscuro
- Obtenemos dinamicamente el username
- Emitimos un mensaje (`dialog.showMessageBoxSync`) por acceso denegado y cerramos el aplicativo
