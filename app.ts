import * as _ from 'lodash';
const translate = require("translate");

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

const getNestedValue =  (obj, path) => {
    return _.get(obj, path, undefined);
}

const setNestedValue = (obj, path, value) => {
    _.set(obj, path, value);
}

const getRule = function (rules, value) {
    return rules.find(rule => rule.type === typeof value);
};

const getTranslate: (parameters) => Promise<string> = async (parameters) => {
    try {
        return await translate(
            parameters.value, 
            { 
                from: parameters.from, 
                to: parameters.to,
                engine: 'libre'
            }
        );
    } catch (e) {
        return parameters.value;
    }
};

export async function converter(obj, rules, operations) {
    const rulesUser: Rule[] = rules;
    const operationsUser: Operation[] = operations;

    for (var i = 0; i < operationsUser.length; i++) {
        const operation = operationsUser[i];
        const value = getNestedValue(obj, operation.path);

        if (value !== undefined) {
            const rule = getRule(rulesUser, value);

            if ("string" === typeof value) {
                operation.parameters.value = value;
                const newValue = await getTranslate(operation.parameters);
                setNestedValue(obj, operation.path, newValue); 
            } else if (rule) {
                operation.parameters.value = value;
                const newValue = rule.func(operation.parameters);
                setNestedValue(obj, operation.path, newValue); 
            } else {
                console.log("Rule not found for type: " + typeof value);
            }

        } else {
            console.log("Operation path incorrect: " + operation.path);
        }
    }

    return obj;
};
