const { sleep, w, prompt, sceneTitle } = require('../utils/input');

// TEMP character
const commanderCiara = {
    name: "Ciara",
    roll: (skill) => Math.floor(Math.random() * 10 + 8) // placeholder roll
  };


async function commander(player) {
    sceneTitle("The Commander");

    console.log(w(`You are brought to the ferry, and the Scoia'tael begin preparing it for travel. A few moments after they've begun, a young female elf interrupts them turning to you.`));
    await sleep(1500);
    console.log(w(`"Who are you and what are you doing in my camp? I have little time for banter and very little patience left for liars"`));

    const response = await prompt("\nHow will you respond? Will you <lie>? Or will you be <truthful>? ");

    if (response.includes("lie")) {
        let roll = player.roll("deceit");
        console.log(`You rolled a total of: ${roll}`);
        if (commanderCiara.roll("humanPerception") > roll) {
            if (player.race === "human") {
                console.log(`She hisses sharply and draws her Elven Messer. "Liar!"`);
                await sleep(3000);
                return "campCombat";
            } else {
                console.log(`She lifts a hand, and the archers in the area lift their bows.`);
                console.log(`"Are you sure that's your answer?"`);
                const lastChance = await prompt("Will you try to <lie> again? Or tell the truth?");

                if (lastChance.includes("lie")) {
                    player.modifiers.deceit = -3
                    if (commanderCiara.roll("humanPerception") > player.roll("deceit")) {
                        console.log(`"Fool! You try to deceive me again. Die Dh'oine!"`);
                        await sleep(3000);
                        player.flags.enemiesReadied = true;
                        return "campCombat";
                    } else {
                        console.log(`"Very well, I shall trust you... for now."`);
                        await sleep(3000);
                        return "ferryRide";
                    }
                } else {
                    console.log(`"Good, I believe you. You may go."`);
                    await sleep(3000);
                    return "ferryRide";
                }
            }
        } else {
            console.log(`"Fine. I’ll believe you. But I’ll be watching."`);
            await sleep(3000);
            return "ferryRide";
        }
    } else if (response.includes("intimidate")) {
        let roll = player.roll("intimidation");
        if (roll > commanderCiara.roll("resistCoercion")) {
            console.log(`"You will let me pass," you growl. Her eyes narrow, but she relents.`);
            console.log(`"Fine, just go..."`);
            await sleep(3000);
            return "ferryRide";
        } else {
            console.log(`She scoffs. "You think you're scary, dh'oine?"`);
            await sleep(3000);
            return "campCombat";
        }
    } else {
        console.log(`"Very well, I understand your plight against the black ones. You may use our ferry."`);
        await sleep(3000);
        return "ferryRide"
    }
}

module.exports = commander;
