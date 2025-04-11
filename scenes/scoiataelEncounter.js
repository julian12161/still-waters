const { prompt, w, sleep, sceneTitle } = require('../utils/input');

// TEMP Scoia'tael mock
const scoiatael = {
    stealth: () => 12
};

async function scoiataelEncounter(player) {
    sceneTitle("Scoia'tael Encounter");

    const awareness = player.awareness() + player.modifier;
    console.log(w(`You rolled a total of: ${awareness}`));

    if (awareness >= scoiatael.stealth()) {
        console.log(w("You notice a group of Scoia'tael archers in the distance. They haven't seen you yet."));
        const noticed = await prompt(w("Do you <attack>, <talk>, or <sneak past>? "));

        if (noticed.includes("attack")) {
            console.log(w(`You draw your ${player.weapon} and ambush the elves!`));
            player.ambush = true;
            return "combatScoiatael";
        } else if (noticed.includes("sneak") || noticed.includes("avoid")) {
            console.log(w("Moving swiftly and softly, you hurry past the elves."));
            return "campAttackDay";
        } else if (noticed.includes("talk")) {
            console.log(w("You step into view, hands raised."));
            player.modifier = 2;
            // Fall through to encounter
        } else {
            console.log(w("You hesitate, doing nothing..."));
            player.modifier -= 3;
            await sleep(1500);
            return await scoiataelEncounter(player);
        }
    } else {
        console.log(w("As you push through a patch of reeds near the Pontar, a voice snarls..."));
        await sleep(1500);
    }

    if (player.race === "human") {
        console.log(w(`"That's far enough, dh'oine."`));
    } else {
        console.log(w(`"That's far enough, wanderer."`));
    }

    await sleep(1000);
    console.log(w("Several armed elves emerge from the brush, bows trained on you."));
    await sleep(1500);
    console.log(w("Their leader, a sharp-eyed elf with a scar down his cheek, steps forward."));
    console.log(w(`"What are you doing in Scoia'tael territory?"`));

    const answer = await prompt(("Do you <explain> or <fight>? "));

    if (answer.includes("explain") || answer.includes("tell")) {
        console.log(("You raise your hands and try to talk with the elves."));
        await sleep(1500);
        console.log(("The leader narrows his eyes, but lowers his bow slightly."));
        console.log((`"Fine. Speak."`));
        await sleep(2500);
        return 'meeting';
    } else if (answer.includes("fight")) {
        console.log((`Without waiting, you draw your ${player.weapon}.`));
        console.log(("The Scoia'tael shout in their tongue and unleash arrows."));
        await sleep(2500);
        return 'combatScoiatael';
    } else {
        console.log(("They look confused by your response."));
        await sleep(2500);
        return await scoiataelEncounter(player);
    }
}

module.exports = scoiataelEncounter;
