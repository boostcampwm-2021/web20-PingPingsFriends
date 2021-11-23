function convertStringToNumber<T>(entity: T, ...props: string[]): void {
  props.forEach((prop: string) => (entity[prop] = +entity[prop]));
}

export { convertStringToNumber };
