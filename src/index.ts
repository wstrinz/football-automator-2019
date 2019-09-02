import { waitForCondition, waitForCss } from "./utils/steps";
import { maxBy } from "./utils/collections";
import { setLineup } from "./benchOptimizer";

console.log("running script");

let enhancePage = () => {
  let span = document.createElement("span");
  span.appendChild(document.createTextNode("Set Lineup"));

  let button = document.createElement("button");
  button.setAttribute("role", "button");
  button.setAttribute("class", "btn btn--custom ml4 action-buttons btn--alt");
  button.appendChild(span);
  button.onclick = () => setLineup();

  document.querySelector("div.myTeamButtons").appendChild(button);
};

waitForCss("div.myTeamButtons").then(() => enhancePage());
