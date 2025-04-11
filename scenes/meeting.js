const { sleep, prompt, sceneTitle } = require('../utils/input');
const scoiataelEncounter = require('./scoiataelEncounter');

async function meeting(player) {
  sceneTitle("Meeting the Scoia'tael");

  const dialogue = await prompt("What do you ask the commando? For <help>? For <safe passage>? ");

  if (dialogue.includes("help")) {
    console.log("The Commando regards you warily...");
    console.log("You want to cross the Pontar? We have a ferry but...");
    if (player.race === "human") {
        console.log(`"What possible reason would we help a dh'oine?"`);
        player.modifier = -3;
    } else {
        console.log(`"What would we get from helping you?"`);
    }

    const convince = await prompt("You could try to <persuade> him? Or you could try using <charisma> or even try <seduction>? ");

    let roll;
    if (convince.includes("persuade") || convince.includes("persuasion")) {
        console.log("You try persuading the commando");
        roll = player.persuade + player.modifier;
    } else if (convince.includes("charisma")) {
        console.log("You try charming the commando");
        roll = player.charisma + player.modifier;
    } else if (convince.includes("seduce") || convince.includes("seduction")) {
        console.log("You try seducing the commando");
        if (player.sex === "male") {
            player.modifier += -6
        }
        roll = player.seduce + player.modifier;
    } else if (!roll) {
        console.log("They stare blankly. That didn’t work.");
        await sleep(2000);
        return "swamp2";
    }
    console.log(`You rolled a total of: ${roll}`);
    if (roll > scoiatael.resistCoercion()) {
        await sleep(1500);
        console.log(`"Very well. I suggest a trade. Mend the camp gate for us and you may use the ferry... or I guess you could pay us..."`);
        const trade = await prompt("What will you trade? Your <skills> or your <crowns>");
        if (trade.includes("skills") || trade.includes("skill") || trade.includes("gate")) {
            console.log(`"Excellent. Follow us."`);
            await sleep(2500);
            return "camp";
        } else {
            console.log("You try to bribe the elves.");
            let roll = player.business + player.modifier;
            console.log(`You rolled a total of: ${roll}`);
            let bribeAmount;
            if (roll > scoiatael.resistCoercion()) {
                bribeAmount = 150;
            } else {
                bribeAmount = 300;
            }

            if (player.crowns < bribeAmount) {
                console.log("You cannot afford to pay the bribe, they won't help you.");
                return "swamp2";
            }

            player.crowns -= bribeAmount;
            console.log(`The commando accepts a bribe of ${bribeAmount} crowns.`);
            return "camp";
            }
        }
    } else if (dialogue.includes("safe") || dialogue.includes("passage")) {
        console.log(`"We have no interest in helping your kind. But we shan't harm you. Go!"`);
        await sleep(2500);
        return "swamp2";
    } else {
        console.log("He stares at you blankly");
        await sleep(2500);
        return await meeting(player);
    }
  }

module.exports = meeting;
