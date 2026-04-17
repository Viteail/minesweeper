export const cn = (
  classes: Record<string, string>,
  appendClasses: string[],
) => {
  const classNames = appendClasses.reduce((acc, curr) => {
    if (Object.values(classes).includes(curr)) return acc + " " + curr;
    return acc;
  }, "");

  return classNames;
};
