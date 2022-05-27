/**
 * Utility functions which are not part of core application logic but used as helpers
 */

// convert object's property names from underscore format to camelCase
export function transformObjPropNamesToCamelCase(obj) {
  const transformFromUnderscore = keyName => {
    // if provided keyName invalid or doesn't contain underscore
    if (!keyName || !keyName?.includes('_')) return keyName;
    return keyName
      .split('_')
      .map((el, index) =>
        index > 0
          ? el.charAt(0).toUpperCase() + el.slice(1)
          : el.charAt(0).toLowerCase() + el.slice(1)
      )
      .join('');
  };

  let newObj = {};

  for (const key in obj) newObj[transformFromUnderscore(key)] = obj[key];

  return newObj;
}
