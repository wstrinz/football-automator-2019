export const sleep = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

export const waitForCondition = (callback: { () }) => {
  return new Promise(async accept => {
    do {
      await sleep(500);
    } while (!callback());
    accept();
  });
};

export const waitForCss = async (selector: string) => {
  await waitForCondition(() => document.querySelector(selector));
};
