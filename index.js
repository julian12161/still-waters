const { prompt, close } = require('./utils/input');
const intro = require('./scenes/intro');
const swamp = require('./scenes/swamp');
const scoiataelEncounter = require('./scenes/scoiataelEncounter');
const meeting = require('./scenes/meeting');
const swamp2 = require('./scenes/swamp2');

// Player object
let player = {
  name: '',
  race: "human",
  weapon: "steel sword",
  ambush: false,
  modifier: 0,
  awareness: () => Math.round(Math.random() * 10 + 14),
  health: 30,
  stamina: 20,
  inventory: [],
};

const scenes = {
  intro,
  swamp,
  scoiataelEncounter,
  meeting,
  swamp2,
  // camp, ferry, outcome will be added later
};

async function gameLoop(sceneKey) {
  if (!sceneKey) {
    close();
    return;
  }

  const nextScene = await scenes[sceneKey](player);
  await gameLoop(nextScene);
}

gameLoop('intro');
