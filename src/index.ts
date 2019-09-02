import { callAlert } from "./other";

console.log("running script");

let playerRows = (): HTMLElement[] => {
  let playersTable = document.querySelector(
    "#espn-analytics > div > div.jsx-3010562182.shell-container > div.page-container.cf > div.layout.is-full > div > div > div > div.jsx-639395163.rosterContainer.relative > div > div > section > table > tbody > tr > td > div > div > div.Table2__shadow-scroller > table > tbody > tr > td > div > table"
  );

  return Array.prototype.slice.call(
    playersTable.querySelectorAll("tbody > tr")
  );
};

let availableSlots = (): HTMLElement[] => {
  console.log(playerRows());
  let openHereSlots = playerRows().filter(row =>
    row.querySelector('button[title="HERE"]')
  );
  console.log(openHereSlots);
  return openHereSlots;
};

let setLineup = () => {
  let dak = playerRows()[0];
  let dakButton = dak.querySelector(
    "td > div[title='Action'] button"
  ) as HTMLElement;
  dakButton.click();

  setTimeout(() => {
    let slotButton = availableSlots()[0].querySelector(
      'button[title="HERE"]'
    ) as HTMLElement;
    slotButton.click();
  }, 1000);
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

console.log("TODO: more cleverly wait for page load");
setTimeout(() => {
  enhancePage();
}, 8000);
