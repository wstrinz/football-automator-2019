export const maxBy = <T>(array: T[], callback: { (x: any): number }): T => {
  let max = Math.max(...array.map(o => callback(o)).filter(v => !isNaN(v)));

  return array.find(o => callback(o) == max);
};
