import {
  activePlayers,
  availableBenchSlots,
  scrapePlayerRow
} from "./utils/rosterScaping";
import { waitForCss, waitForCondition } from "./utils/steps";
import { PlayerWithRow } from "./interfaces/player";
import { maxBy } from "./utils/collections";

let trySwapPlayer = async (playerRow: HTMLElement) => {
  let actionButton = playerRow.querySelector(
    "td > div[title='Action'] button"
  ) as HTMLElement;
  actionButton.click();

  await waitForCss('button[title="HERE"]');

  let playerInfos = availableBenchSlots().map(row => {
    const pdata = {} as PlayerWithRow;
    pdata.row = row;
    pdata.info = scrapePlayerRow(row);

    return pdata;
  });

  let bestChoice = maxBy(playerInfos, p => p.info.projected);

  if (
    bestChoice &&
    bestChoice.info.projected > scrapePlayerRow(playerRow).projected
  ) {
    let slotButton = bestChoice.row.querySelector(
      'button[title="HERE"]'
    ) as HTMLElement;
    slotButton.click();
  } else {
    let slotButton = playerRow.querySelector(
      'button[title="MOVE"]'
    ) as HTMLElement;
    slotButton.click();
  }

  await waitForCondition(() => !document.querySelector('button[title="HERE"]'));
};

export const setLineup = async () => {
  // For each player, see if there's any beneficial swaps to bench
  // maybe keep track of swaps and run until no change or timeout

  for (let pr of activePlayers()) {
    await trySwapPlayer(pr);
  }
};
