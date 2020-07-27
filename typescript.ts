// Silly function, but has base64 deconversion and conversion again, it's just catching the error
function isBase64silly(str) {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

export function isBase64better(text: string): boolean {
  const regex = new RegExp(
    "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$"
  );
  return regex.test(text);
}

// Use Object.keys(obj).length to check if it is empty.
// Also works for javascript
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function regexMotherFucker() {
  // Like this (with the / / )
  const regexp: RegExp = /ab+c/;
  // Or
  const regexpConstructor = new RegExp('ab+c');
  // Finally
  console.log(regexp.test('12345'));
}
