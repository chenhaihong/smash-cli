export function add(a, b) {
  return a + b;
}

export function sum() {
  let num = 0;
  for (const i = 0, L = arguments.length; i < L; i++) {
    num = num + arguments[i];
  }
  return num;
}
