export function time(func: () => any) {
  const start = new Date().getTime();

  const result = func();

  return { elapsed: new Date().getTime() - start, result };
}
