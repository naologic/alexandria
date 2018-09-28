# :fireworks: Alexandria 
[![Build Status](https://travis-ci.org/naologic/alexandria.svg?branch=master)](https://travis-ci.org/naologic/alexandria)
[![Known Vulnerabilities](https://snyk.io/test/github/naologic/alexandria/badge.svg?targetFile=package.json)](https://snyk.io/test/github/naologic/alexandria?targetFile=package.json)

_This is a collection of [naologic](https://naologic.com) public [angular 6](https://angular.io/) libraries. Each one is published as an individual npm package_


## :page_with_curl: Forms

```bash
npm install --save @naologic/forms
```
[![NPM](https://nodei.co/npm/@naologic/forms.png)](https://nodei.co/npm/@naologic/forms/)


## :page_with_curl: Pipes

```bash
npm install --save @naologic/pipes
```
[![NPM](https://nodei.co/npm/@naologic/pipes.png)](https://nodei.co/npm/@naologic/pipes/)


## Publishing a package

Build all packages
```bash
npm run package
```

Navigate to the package you want to publish/update in npm
```$xslt
cd dist/naologic/{package}asda
```

Login to the npm user
```
npm whoami // << test if you are logged in
npm adduser // << authorize local machine
npm login // << duhh
```

``

Publish the package 
```$xslt
npm publish --access public
```

### License 
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)

_Made with :heart: in San Francisco :us:_ by [naologic](https://naologic.com)
