What is react-lib-module?
===
It's an open-source project written with React.

This project represents my standard library for generic react components that I use in various other projects. This package usually has to be distributed to the other react repositories in order for them to work.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Packages used 📦:
- @material-ui/core
- @material-ui/icons
- recharts
- typescript

## How to deploy 🔮:
- Use the "npm run devbuild" script to deploy the package to the other cloned react repositories.
- The package is stored under "**/node_modules/@mymodules/react-lib-module" on the cloned target repositories.
- ***Check the "Relies upon" section in its README if the package is needed.***

## Relies upon 🧲:
- [ts-lib-module](https://github.com/xSNOWM4Nx/ts-lib-module) -> This repository must be cloned to the same directory level. See into the README how the deployment works.

## License ✌️:
MIT © [xSNOWM4Nx](https://github.com/xSNOWM4Nx)

---
This project was bootstrapped with [create-react-library](https://github.com/transitive-bullshit/create-react-library).
