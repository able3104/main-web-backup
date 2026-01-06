const toCamel = (str: string): string =>
  str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());

const toSnake = (str: string): string =>
  str.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`);

// 객체 키를 재귀적으로 변환
export const keysToCamel = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(keysToCamel);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [toCamel(key), keysToCamel(val)])
    );
  }
  return obj;
};

export const keysToSnake = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(keysToSnake);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [toSnake(key), keysToSnake(val)])
    );
  }
  return obj;
};
