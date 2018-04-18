const prefixer = '^';

const process = (decode) => {
    const map = {};
    const inverse = {};
    const objs = [];
    const saveObject = (object, prefix) => {
        const index = objs.push(object)-1;
        map[`${index}`] = prefix;
        inverse[prefix] = object;
    }
    const inner = (object, prefix) => {
        if ( decode && typeof object === 'string' && inverse[object]){
            return inverse[object];
        }
        let index = objs.indexOf(object);
        if (index > -1) {
            return map[`${index}`];
        }
        saveObject(object, prefix);
        if (Array.isArray(object)){
            // Using an old for structure to be able to overwrite items in the same array object
            for (let i = 0; i < object.length; i++){
                object[i] = inner(object[i], `${prefix}[${i}]^`);
            }
            return object;
        } else if (typeof object === 'object'){
            Object.keys(object).forEach( key => object[key] = inner(object[key], `${prefix}${key}^`));
            return object;
        }
        return object;
    }
    return inner;
}

const encode = (object, prefix) => process(false)(object, prefix);
const decode = (object, prefix) => process(true)(object, prefix);


export function stringify(object:any){
    return JSON.stringify(encode(object, prefixer));
}

export function parse(stringified:string){
    return decode(JSON.parse(stringified), prefixer);
}

export default {
    stringify,
    parse
};





