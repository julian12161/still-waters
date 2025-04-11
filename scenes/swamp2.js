const { sleep, w, prompt, sceneTitle } = require('../utils/input');

async function swamp2(player) {
  sceneTitle("The Swamp");

  console.log(w(`Mosquitoes buzz around your head as you clamber back up onto an island of dry ground on the edge of the Pontar River. It’s not large but it’ll give you a bit of respite. You still have no way to cross the Pontar. Aside from your island of dry dirt, the ground is all mud and fetid water. You still don't know how deep the Pontar is... or what you might encounter crossing it. Did those elves mention a ferry?`, {width: 100}));
  console.log("");

  const decision = (await prompt(w("It is dark and you are in the swamp. Will you <rest> for the night? Or will you try <searching> where those elves came from? Or maybe, just try <crossing> the river on foot? ", {width: 100, indent: ""}))).toLowerCase();

  if (decision.includes("river") || decision.includes("cross")) {
    console.log("\nYou decide to try crossing the river. The ground is wet and soggy, evasion will prove difficult here.");
    console.log("Suddenly, you hear a soft splash...");
    await sleep(3000);
    return 'drownerFight';
  } else if (decision.includes("search") || decision.includes("elves")) {
    console.log("\nYou try to head back to where you were.");
    console.log("You notice torchlight from deeper in the forest.");
    await sleep(3000);
    return "campAttackNight";
  } else if (decision.includes("rest")) {
    console.log("You find a patch of ground that seems safe enough for the night");
    await sleep(3000);
    return "campAttackDay"
  } else {
    console.log("\nYou are unsure how to proceed with that action.");
    await sleep(5000);
    return await swamp2(player);
  }
}

module.exports = swamp2;
