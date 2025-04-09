const { sleep, prompt } = require('../utils/input');

async function intro(player) {
  console.clear();
  console.log("=== STILL WATERS ===");
  console.log("\nTemeria has fallen. Vizima is in ruins. You barely escaped with your life...");
  console.log("You’ve traveled for days, wounded and lost, chased by Nilfgaardian scouts.");
  console.log("Now, you stumble into the Pontar swamp... and hope to cross the river into Redania.\n");

  const name = await prompt("Before we begin, what is your name? ");
  player.name = name || "Witcher";
  console.log(`\nWelcome, ${player.name}. The swamp awaits...`);

  await sleep(5000);
  return 'swamp'; // return the next scene's key
}

module.exports = intro;
