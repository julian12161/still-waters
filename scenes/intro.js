const { sleep, w, prompt, sceneTitle } = require('../utils/input');

async function intro(player) {
  sceneTitle("Still Waters");

  console.log(w(`The Temerian capital of Vizima has fallen under a tidal wave of black and gold. You were there. You saw everything. The Black Ones didn’t even bother lobbing rotten cows and soldier’s heads over the walls. The Nilfgaardian war machine hit the walls of the capital and suddenly everything was blood and steel. Screaming and death. You managed to drag yourself out of that hell and head north. With Nilfgaardian scouting patrols hounding the few survivors of the massacre you’ve stopped recognizing the deep forest and rural towns you’re passing through. Only when you hit the swamp did you realize you were near the Pontar River. Now all that’s left is to cross and look for shelter in Redania.`, {width: 100}));

  const name = await prompt("\nBefore we begin, what is your name? ");
  player.name = name || "Witcher";
  console.log(`\nWelcome, ${player.name}. The swamp awaits...`);

  await sleep(5000);
  return 'swamp'; // return the next scene's key
}

module.exports = intro;
