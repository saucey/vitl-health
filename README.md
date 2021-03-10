# README #

### What is this repository for? ###

* This repository holds the front end angular code for vitl.com

### How do I get set up? ###

* Install node modules with "npm install"
* Run "npm start" to start a local server on https://local.vitl.com:4200/

### Ideal folder structure ###

```
|-- app
 |-- modules
    |-- shared
        |-- [+] components
        |-- [+] directives
        |-- [+] pipes
    |-- home
        |-- [+] components
        |-- [+] pages
        |-- home-routing.module.ts
        |-- home.module.ts
 |-- core
   |-- [+] authentication
   |-- [+] footer
   |-- [+] guards
   |-- [+] http
   |-- [+] interceptors
   |-- [+] mocks
   |-- [+] services
   |-- [+] header
   |-- core.module.ts
   |-- ensureModuleLoadedOnceGuard.ts
   |-- logger.service.ts
 |
 |-- [+] configs
```
