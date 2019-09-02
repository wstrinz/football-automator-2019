import { callAlert } from "./other";

console.log("running script");

// Extract to step/action utils

let sleep = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time));
};

let waitForCondition = (callback: { () }) => {
  return new Promise(async accept => {
    do {
      await sleep(500);
    } while (!callback());
    accept();
  });
};

let waitForCss = async (selector: string) => {
  await waitForCondition(() => document.querySelector(selector));
};

let maxBy = <T>(array: T[], callback: { (x: any): number }): T => {
  let max = Math.max(...array.map(o => callback(o)).filter(v => !isNaN(v)));

  return array.find(o => callback(o) == max);
};

// extract to player file

interface Player {
  currentPosition: String;
  projected?: number;
}

interface PlayerWithRow {
  row: HTMLElement;
  info: Player;
}

let scrapePlayerRow = (row: HTMLElement): Player => {
  const player = {} as Player;

  player.currentPosition = row.querySelector("td:nth-child(1)").textContent;

  let projText = row.querySelector("td:nth-child(6)").textContent;
  if (projText != "--") {
    player.projected = parseFloat(projText);
  }

  return player;
};

let playersTable = () => {
  return document.querySelector(
    "#espn-analytics > div > div.jsx-3010562182.shell-container > div.page-container.cf > div.layout.is-full > div > div > div > div.jsx-639395163.rosterContainer.relative > div > div > section > table > tbody > tr > td > div > div > div.Table2__shadow-scroller > table > tbody > tr > td > div > table"
  );
};

let playerRows = (): HTMLElement[] => {
  return Array.prototype.slice.call(
    playersTable().querySelectorAll("tbody > tr")
  );
};

let activePlayers = (): HTMLElement[] => {
  return playerRows().filter(
    r => scrapePlayerRow(r).currentPosition != "Bench"
  );
};

let benchPlayers = (): HTMLElement[] => {
  return playerRows().filter(
    r => scrapePlayerRow(r).currentPosition == "Bench"
  );
};

let availableBenchSlots = (): HTMLElement[] => {
  let openHereSlots = benchPlayers().filter(row =>
    row.querySelector('button[title="HERE"]')
  );
  return openHereSlots;
};

// Extract to optimizers

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

let setLineup = async () => {
  // For each player, see if there's any beneficial swaps to bench
  // maybe keep track of swaps and run until no change or timeout

  for (let pr of activePlayers()) {
    await trySwapPlayer(pr);
  }
};

let enhancePage = () => {
  let button = document.createElement("button");
  let span = document.createElement("span");
  span.appendChild(document.createTextNode("Set Lineup"));
  button.setAttribute("role", "button");
  button.setAttribute("class", "btn btn--custom ml4 action-buttons btn--alt");
  button.appendChild(span);
  button.onclick = () => setLineup();
  document.querySelector("div.myTeamButtons").appendChild(button);
};

waitForCss("div.myTeamButtons").then(() => enhancePage());
