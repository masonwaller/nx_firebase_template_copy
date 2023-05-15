export function utility(): string {
  return 'utility';
}

export function mapArrayGroupsWithKey(arr, key) {
  const map = {};
  for (let n = 0; n < arr.length; n++) {
    const element = arr[n];
    const elementKeyValue = element[key];
    if (map[elementKeyValue]) {
      map[elementKeyValue].push(element);
    } else {
      map[elementKeyValue] = [element];
    }
  }
  return map;
}

export function mapArrayWithKey(arr, key) {
  const map = {};

  for (let n = 0; n < arr.length; n++) {
    const element = arr[n];
    const elementKeyValue = element[key];
    map[elementKeyValue] = element;
  }

  return map;
}

export function mapObjectWithKeyAndValueKey(obj, _key, _valueKey) {
  const map = {};

  for (const property in obj) {
    const key = obj[property][_key];
    const valueKey = obj[property][_valueKey];
    map[key] = valueKey;
  }

  return map;
}

export function transformArrayWithObjectKey(arr, _key) {
  const map = [];

  for (let n = 0; n < arr.length; n++) {
    const element = arr[n];
    const elementKeyValue = element[_key];
    map.push(elementKeyValue);
  }

  return map;
}

export function transformArrayWithObjectOfArray(arr, _key) {
  const map = [];

  for (let n = 0; n < arr.length; n++) {
    const element = arr[n];
    const elementKeyValue = element[_key];
    elementKeyValue.forEach((x) => map.push(x));
  }

  return map;
}

export function transformArrayWithObjectOfArrayForKey(arr, _key) {
  const map = {};

  for (let n = 0; n < arr.length; n++) {
    const element = arr[n];
    const elementKeyValue = element[_key];
    elementKeyValue.forEach((x) => {
      map[x] = {
        ...element,
      };
    });
  }

  return map;
}
