export function shuffle(arr = []) {
  const newArr = [...arr];
  return newArr
    ?.map((value) => ({ value, sort: Math.random() }))
    ?.sort((a, b) => a.sort - b.sort)
    ?.map(({ value }) => value);
}

export function firstOf(val: string[] | string) {
  const firstValue = Array.isArray(val) ? val[0] : val;
  return firstValue || null;
}
