/**
 * Generates a pseudo unique id - is not guaranteed to be unique, however there are 16^10
 * possible ids it can generate.
 */
export const generateId = () => {
    let str = '';
    for (let i = 0; i < 16; i++) {
        str += Math.floor(Math.random() * 10).toString();
    }
    return str;
} 

/**
 * Deeply copy an object while removing any references from the original such that the object returned 
 * can be altered without mutating the input object in any way. 
 * @param {object} original - the original object you want to copy.
 * @returns {object} - the new deep copy of the object.
 */
export const deepCopy = (original) => {
    const copy = {}
    for (let key in original) {
        // should also modify to be able to handle arrays for the sake of future proofing, but for now
        // it doesn't need to be able to handle arrays.
        if (typeof original[key] === 'object') {
            copy[key] = deepCopy(original[key]);
        } else {
            copy[key] = original[key]
        }
    }
    return copy;
}

/**
 * 
 * @param {Object} obj - the object to update
 * @param {Array} pathArray - array of the properties that have to be traversed to reach the nested
 * property we want to update
 * @param {*} value - the value to update the property with
 * @returns {Object} - the updated object
 * Solution from https://stackoverflow.com/questions/18936915/dynamically-set-property-of-nested-object
 */
export const updatePropAtPath = (obj, pathArray, value) => {
    const key = pathArray.pop();
    const pointer = pathArray.reduce((accumulator, currentValue) => {
        if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
        return accumulator[currentValue];
    }, obj);
    pointer[key] = value;
    return obj;
}