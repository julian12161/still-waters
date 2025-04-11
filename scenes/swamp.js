const { sleep, w, prompt, sceneTitle } = require('../utils/input');

async function swamp(player) {
  sceneTitle("The Swamp");

  console.log(w(`Finally you can rest easy... Or at least rest... As mosquitoes buzz around your head and shadows move in the underbrush you clamber up onto an island of dry ground on the edge of the Pontar River. It’s not large but it’ll give you a bit of respite. The Black Ones shouldn’t be passing through here. They’ll take the clearer routes into Redania once they finish tearing Temeria apart. The question is: How to cross the Pontar? Aside from your island of dry dirt, the ground is all mud and fetid water. Who knows how deep the Pontar is... or what you might encounter crossing it. Maybe there’s a ferry still running? A bridge? Something?`, {width: 100}));
  console.log("");

  const decision = (await prompt(w("You are surrounded by swamp and the sun is setting. Will you investigate the <river>? <look> at your surroundings? Or something else? ", {width: 100, indent: ""}))).toLowerCase();

  if (decision.includes("river") || decision.includes("cross")) {
    console.log("\nYou decide to investigate the river. The ground is wet and soggy, evasion will prove difficult here.");
    console.log("Suddenly, you hear a slight rustling in the reeds...");
    await sleep(5000);
    return 'scoiataelEncounter';
  } else if (decision.includes("look") || decision.includes("around")) {
    console.log("\nYou glance around. You're on a small patch of higher ground.");
    console.log("Reeds sway in the wind. Something might be watching.");
    await sleep(5000);
    return await swamp(player);
  } else {
    console.log("\nYou are unsure how to proceed with that action.");
    await sleep(5000);
    return await swamp(player);
  }
}

module.exports = swamp;
