# :fireworks: Alexandria

_This is a collection of [naologic](https://naologic.com) public [angular 6](https://angular.io/) libraries. Each one is published as an individual npm package_


## :page_with_curl: Forms

```bash
npm install --save @naologic/forms
```

## Publishing a package

Build all packages
```bash
npm run package
```

Navigate to the package you want to publish/update in npm
```$xslt
cd dist/naologic/{package}
```

Login to the npm user
```
npm whoami // << test if you are logged in
npm adduser // << authorize local machine
npm login // << duhh
```

Publish the package 
```$xslt
npm publish --access public
```


_Made with :heart: in San Francisco :us:_
