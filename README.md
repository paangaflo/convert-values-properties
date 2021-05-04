# Object property converter

Library that allows an arbitrary object to transform its properties through rules and operations.

## Getting Started

Clone repository to local environment.

## Prerequisites

Before start you need to have installed:

* [Node.js](https://nodejs.org/download/) (preferable version ^12.0.0)
* [NPM](https://www.npmjs.com/) (preferable version ^6.0.0)

## Installation

Inside root folder of your project run the following command:

```bash
npm install convert-values-properties --save
```

## Getting started

This package can be used in Node.js. Then import it to use it:

```javascript
const translate = require("convert-values-properties");
```

Declare the arbitrary object to transform, example:

```javascript
const obj = {
    "list": {
        "company": [
            {
                "name": "Alguna compañia",
                "employees": 8,
                "earnings": 10389.05,
                "active": false
            },
            {
                "name": "otra compañia",
                "employees": 3,
                "earnings": 7389.05,
                "active": true
            }
        ],
        "name" : "Nombre de la lista"
    },
    "test": "Esta es una prueba"
};
```

Declare rules that apply for each property type, example:

```javascript
/*
We define two rules: 
number: multiply property value by the parameter defined in the operation. In this case the parameter is called "multiplication". 
boolean: change property value by the parameter defined in the operation. In this case the parameter is called "bool".
*/
let rules = [
    {
        "type": "number",
        "func": (parameters) => { 
            return parameters.value * parameters.multiplication; 
        }
    },
    {
        "type": "boolean",
        "func": (parameters) => {
            return parameters.bool;
        }
    }
];
```

Declare operations that apply to the property, example:

```javascript
/*
Definition of operations:
path: path to the property
parameters: list of parameters to use within the "func" attribute of the rule. You can have n parameters with any name.
*/
let operations = [
    {
        "path": "list.company.0.name",
        "parameters" : {
            from: "es",
            to: "en"
        }
    },
    {
        "path": "list.company.0.employees",
        "parameters": {
            multiplication: 2
        }
    },
    {
        "path": "list.company.0.earnings",
        "parameters": {
            multiplication: 10
        }
    },
    {
        "path": "list.company.0.active",
        "parameters": {
            bool: true
        }
    },
    {
        "path": "list.name",
        "parameters" : {
            from: "es",
            to: "fr"
        }
    },
    {
        "path": "test",
        "parameters" : {
            from: "es",
            to: "ru"
        }
    },
];
```

Use an asynchronous function to run the converter, example:

```javascript
const getObjectConversion = async () => {
   return await converterObjects.converter(obj, rules, operations);
}

console.log(JSON.stringify(getObjectConversion()));
```

Applying the rules and operations previously defined, we would have the following result:

```javascript
{
  "list": {
    "company": [
      {
        "name": "any company", // translated from Spanish to English
        "employees": 16, // multiplication 8 * 2
        "earnings": 103890.5, //multiplication 10389.05 * 10
        "active": true // change value from false to true
      },
      {
        "name": "otra compañia", // no registered operation
        "employees": 3, // no registered operation
        "earnings": 7389.05, // no registered operation
        "active": true // no registered operation
      }
    ],
    "name": "nom de la liste" // translated from Spanish to French
  },
  "test": "Это тест." // translated from Spanish to Russian
}
```

## Built With

* [Node.js](https://nodejs.org/download/)
* [NPM](https://www.npmjs.com/)

## External libraries

* [translate](https://www.npmjs.com/package/translate)
* [typescript](https://www.npmjs.com/package/typescript)
* [lodash](https://www.npmjs.com/package/lodash)
* [typescript-require](https://www.npmjs.com/package/typescript-require)

## Authors

* **Pablo Galvis** - [paangaflo](https://github.com/paangaflo)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
