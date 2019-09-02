import { Player } from "../interfaces/player";

export const scrapePlayerRow = (row: HTMLElement): Player => {
  const player = {} as Player;

  player.currentPosition = row.querySelector("td:nth-child(1)").textContent;

  let projText = row.querySelector("td:nth-child(6)").textContent;
  if (projText != "--") {
    player.projected = parseFloat(projText);
  }

  return player;
};

export const playersTable = () => {
  return document.querySelector(
    "#espn-analytics > div > div.jsx-3010562182.shell-container > div.page-container.cf > div.layout.is-full > div > div > div > div.jsx-639395163.rosterContainer.relative > div > div > section > table > tbody > tr > td > div > div > div.Table2__shadow-scroller > table > tbody > tr > td > div > table"
  );
};

export const playerRows = (): HTMLElement[] => {
  return Array.prototype.slice.call(
    playersTable().querySelectorAll("tbody > tr")
  );
};

export const activePlayers = (): HTMLElement[] => {
  return playerRows().filter(
    r => scrapePlayerRow(r).currentPosition != "Bench"
  );
};

export const benchPlayers = (): HTMLElement[] => {
  return playerRows().filter(
    r => scrapePlayerRow(r).currentPosition == "Bench"
  );
};

export const availableBenchSlots = (): HTMLElement[] => {
  let openHereSlots = benchPlayers().filter(row =>
    row.querySelector('button[title="HERE"]')
  );
  return openHereSlots;
};
