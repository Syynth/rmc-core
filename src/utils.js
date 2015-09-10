
export const isString = o => typeof o === 'string' || typeof o === 'String';
export const isFunction = o => typeof o === 'function';
export const isObject = o => !isFunction(o) && !isString(o) && typeof o === 'object';
