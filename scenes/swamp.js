const { sleep, prompt } = require('../utils/input');

async function swamp(player) {
  console.log("=== The Swamp ===");
  console.log("\nYou clamber onto a small, dry island by the Pontar, swarmed by mosquitoes and surrounded by shifting shadows.");
  console.log("The Black Ones won’t come this way—they’ll stick to the roads.");
  console.log("But how will you cross the river? It’s all mud, muck, and mystery from here.\n");

  const decision = (await prompt("You are surrounded by swamp and the sun is setting. What will you do? ")).toLowerCase();

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
