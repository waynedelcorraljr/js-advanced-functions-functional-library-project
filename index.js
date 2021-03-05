const fi = (function() {
  return {
    each: function(collection, callback) {
      for (const [item, value] of Object.entries(collection)) {
        callback(value);
      }
      return collection;
    },

    map: function(collection, callback) {
      let newArr = [];
      for (const [item, value] of Object.entries(collection)) {
        newArr.push(callback(value));
      }
      return newArr;
    },

    reduce: function(collection,callback, acc = 0) {
      let newVal = acc;
      for (const element of collection) {
        newVal = callback(newVal, element, collection);
      }
      return newVal;
    },

    find: function(collection, predicate) {
      for (const element of collection) {
        if (predicate(element) === true) {
          return element;
        } 
      }
    },

    filter: function(collection, predicate) {
      let filteredArray = [];
      for (const element of collection) {
        if (predicate(element) === true) {
          filteredArray.push(element);
        } 
      }
      return filteredArray;
    },

    size: function(collection) { 
      return Object.entries(collection).length
    },

    first: function(collection, i = 0) { 
      if (i === 0) {
        return collection[0]
      } else {
        return collection.slice(0, i)
      }
    },

    last: function(collection, i = 0) { 
      if (i === 0) {
        return collection[(collection.length - 1)]
      } else {
        return collection.slice(((collection.length - i)), (collection.length))
      }
    },

    compact: function(array) {
      let compArr = [];
      for (const element of array) {
        if (element) {
          compArr.push(element);
        }
      }
      return compArr;
    },

    sortBy: function(array, callback) {
      return [...array].sort((a, b) => callback(a) - callback(b))
    },

    flatten: function(array, shallow = false) {
      if (array.length === 0) {
        return [];
      } else if (shallow) {
        let flatArr = [];
        for (const element of array) {
          if (Array.isArray(element)){
            for (const elem of element) {flatArr.push(elem);}
          } else {flatArr.push(element);}
        }
        return flatArr; // not currently working due to this line 
      } else if (Array.isArray(array[0])) {
        return fi.flatten(array[0]).concat(fi.flatten(array.slice(1)));
      } else {
        return [array[0]].concat(fi.flatten(array.slice(1)));
      }
    },
    
    uniq: function (array, isSorted = false, callback = false) {
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      if (array.length === 0) {
        return [];
      } else if (callback) {
        return array.filter(callback).filter(onlyUnique);
      } else {
        return array.filter(onlyUnique);
      }
    },
    
    keys: function(object) {
      let retArr = [];
      for (const [key, value] of Object.entries(object)) {
        retArr.push(key);
      }
      return retArr;
    },

    values: function(object) {
      let retArr = [];
      for (const [key, value] of Object.entries(object)) {
        retArr.push(value);
      }
      return retArr;
    },

    functions: function(object) {
      let retArr = [];
      for (const [key, value] of Object.entries(object)) {
        if (value) {
          retArr.push(fi[key]);
        }
      }
      return fi.sortBy(retArr, (func) => { return func.keys });
    }, 


  }
})()


