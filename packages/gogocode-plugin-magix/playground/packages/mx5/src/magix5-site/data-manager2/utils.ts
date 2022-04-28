export function isPrimitive(args: any) {
  return args => !args || typeof args !== 'object';
}

export function throwErr(msg: string) {
  throw TypeError(msg);
}
