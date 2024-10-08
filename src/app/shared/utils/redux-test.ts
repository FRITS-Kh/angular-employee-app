export const range = (start: number, end: number): number[] =>
  [...Array(end - start).keys()].map((el) => el + start);

export const pluck = (elements: any[], field: string) =>
  elements.map((el) => el[field]);
