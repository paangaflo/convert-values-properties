import { converter } from '../index';

let obj = {
  foo: {
    bar: [
      {
        string: 'Hola mundo',
        number: 10,
        boolean: false,
      },
    ],
  },
};

const rules = [
  {
    type: 'number',
    func: (parameters: any) => {
      return parameters.value * parameters.multi;
    },
  },
  {
    type: 'boolean',
    func: (parameters: any) => {
      return parameters.bool;
    },
  },
];

const operations = [
  {
    path: 'foo.bar.0.string',
    parameters: {
      from: 'es',
      to: 'en',
    },
  },
  {
    path: 'foo.bar.0.number',
    parameters: {
      multi: 3,
    },
  },
  {
    path: 'foo.bar.0.boolean',
    parameters: {
      bool: false,
    },
  },
];

test('Converter', async () => {
  expect(await converter(obj, rules, operations)).toStrictEqual({
    foo: { bar: [{ boolean: false, number: 30, string: 'Hello.' }] },
  });
});
