export function splitEvery(arr, n) {
  const result = [];
  const len = arr.length;
  let i = 0;
  while (i < len) {
    result.push(arr.slice(i, i += n));
  }
  return result;
}

export function classnames(obj) {
  return Object.keys(obj).reduce((acc, key) => {
    if (obj[key]) {
      acc += ` ${key}`;
    }
    return acc;
  }, '');
}
export function toDate(d) {
  const date = new Date(d);
  return date.getHours() + ':' + (date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds());
}

export function debounce(fn, wait) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      fn.apply(context, args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
}

export function sortBy(objKeys) {
  let keys = Object.keys(objKeys)
    .reduce((acc, k) => {
      acc.push([k, objKeys[k]]);
      return acc;
    }, []);
  return (a, b) => {
    let result = 0;
    let i = 0;
    let len = keys.length;
    while (result === 0 && i < len) {
      let key = keys[i][0];
      let reverse =  keys[i][1] === -1;
      result = a[key] < b[key] ? (reverse ? -1 : 1) : a[key] > b[key] ? (reverse ? 1 : -1) : 0;
      i += 1;
    }
    return result;
  }
}
