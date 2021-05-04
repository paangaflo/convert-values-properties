import * as _ from 'lodash';
const translate = require('translate');

interface Operation {
  path: string;
  parameters: Parameters;
}

interface Parameters {
  [key: string]: any;
}

interface Rule {
  type: string;
  func(...args: any[]): any;
}

const getNestedValue = (obj: object, path: string) => {
  return _.get(obj, path, undefined);
};

const setNestedValue = (obj: object, path: string, value: any) => {
  _.set(obj, path, value);
};

const getRule = (rules: Rule[], value: any) => {
  return rules.find(function (rule) {
    return rule.type === typeof value;
  });
};

const getTranslate: (parameters: Parameters) => Promise<string> = async (parameters) => {
  try {
    return await translate(parameters.value, {
      from: parameters.from,
      to: parameters.to,
      engine: 'libre',
    });
  } catch (e) {
    return parameters.value;
  }
};

export const converter = async (obj: object, rules: Rule[], operations: Operation[]) => {
  const rulesUser: Rule[] = rules;
  const operationsUser: Operation[] = operations;

  for (const operation of operationsUser) {
    const value = getNestedValue(obj, operation.path);

    if (value !== undefined) {
      const rule = getRule(rulesUser, value);

      if ('string' === typeof value) {
        operation.parameters.value = value;
        const newValue = await getTranslate(operation.parameters);
        setNestedValue(obj, operation.path, newValue);
      } else if (rule) {
        operation.parameters.value = value;
        const newValue = rule.func(operation.parameters);
        setNestedValue(obj, operation.path, newValue);
      } else {
        console.log('Rule not found for type: ' + typeof value);
      }
    } else {
      console.log('Operation path incorrect: ' + operation.path);
    }
  }

  return obj;
};
