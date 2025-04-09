const { prompt, sleep } = require('../utils/input');

// TEMP Scoia'tael mock
const scoiatael = {
    stealth: () => 12
};

async function scoiataelEncounter(player) {
    console.log("=== Scoia'tael Encounter ===\n");
    let awareness = player.awareness() + player.modifier;
    console.log(awareness);
    if (awareness >= scoiatael.stealth()) {
        console.log("You notice a group of Scoia'tael archers, they haven't seen you yet.")
        const noticed = await prompt("Do you <attack>, <talk> or <sneak past>? ");

        if (noticed.includes("attack")) {
            console.log(`\nYou draw your ${player.weapon} and ambush the elves!`);
            player.ambush = true;
            return "combatScoiatael";
        } else if (noticed.includes("sneak") || noticed.includes("avoid")) {
            console.log("\nMoving swiftly and softly, you hurry past the elves.");
            return "camp";
        } else if (noticed.includes("talk")) {
            console.log("\nYou step into view, hands raised.");
            player.modifier = 2;
            // Fall through to next encounter phase
        } else {
            console.log("You hesitate, doing nothing...");
            player.modifier += -3;
            return await scoiataelEncounter(player);
        }
    } else {
        console.log("As you push through a patch of reeds near the Pontar, a voice snarls:");
        await sleep(1500);
    }

    if (player.race === "human") {
        console.log(`"That's far enough, dh'oine."`);
    } else {
        console.log(`"That's far enough, wanderer.`)
    }
    await sleep(1000);
    console.log("Several armed elves emerge from the brush, bows trained on you.\n");
    await sleep(1500);

    console.log("Their leader, a sharp-eyed elf with a scar down his cheek, steps forward.");
    console.log(`"What are you doing in Scoia'tael territory?"`);

    const answer = await prompt("Do you [explain], [lie], or [fight]? ");

    if (answer.includes("explain")) {
        console.log("\nYou raise your hands and calmly explain your situation—just passing through, trying to avoid Nilfgaardian patrols.");
        await sleep(1500);
        console.log("The leader narrows his eyes, but lowers his bow slightly.");
        console.log(`"Fine. But stay out of our way. If you're lying, you'll regret it."`);
        return 'safePath'; // next scene or event

    } else if (answer.includes("lie")) {
        console.log("\nYou try to bluff your way through, claiming you're with the Nilfgaardians on a secret mission.");
        await sleep(1500);
        console.log("The Scoia'tael react instantly—one fires an arrow into the ground at your feet.");
        console.log(`"Liar!" the leader hisses. "You're not leaving here."`);
        return 'combatScoiatael'; // triggers a combat scene

    } else if (answer.includes("fight")) {
        console.log("\nWithout waiting, you draw steel.");
        console.log("The Scoia'tael shout in their tongue and unleash arrows.");
        return 'combatScoiatael'; // also triggers combat
    } else {
        console.log("\nThey look confused by your response.");
        return await scoiataelEncounter(player); // reprompt
    }
}

module.exports = scoiataelEncounter;
