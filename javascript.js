// Use Object.keys(obj).length to check if it is empty.
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

// Arrays: finding

if (vendors.filter(e => e.Name === 'Magenic').length > 0) {
  /* vendors contains the element we're looking for */
}
// or, better yet:
if (vendors.some(e => e.Name === 'Magenic')) {
  /* vendors contains the element we're looking for */
}
// EDIT: If you need compatibility with lousy browsers then your best bet is:
if (vendors.filter(function(e) { return e.Name === 'Magenic'; }).length > 0) {
  /* vendors contains the element we're looking for */
}

// or using a loop
var found = false;
for(var i = 0; i < vendors.length; i++) {
    if (vendors[i].Name == 'Magenic') {
        found = true;
        break;
    }
}

// what about includes?
[1, 2, 3].includes(2);     // true
// This will return false
[{name:'john',age:21},{name:'betty',age:23}].includes({name:'john',age:21})
