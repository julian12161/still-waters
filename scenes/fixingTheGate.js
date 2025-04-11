const { sleep, w, prompt, sceneTitle } = require('../utils/input');

function payElves(player, amount = 100) {
        const taken = Math.min(player.crowns, amount);
        player.crowns -= taken;
        console.log(w(`The elves take ${taken} crowns off you instead.`));
    }

async function fixingTheGate(player) {
    sceneTitle("Fixing the Gate");

    let oneFixed = false;   // hinge
    let twoFixed = false;   // split door
    let threeFixed = false; // fire damage

    console.log(w(`You are taken to the gate. The Scoia'tael hand you a few makeshift tools and tell you to fix it.`));

    const question = await prompt("\nDo you <ask> about the damage or <start> working?");
    if (question.includes("ask")) {
        console.log(w(`"A few months back we stole the bombs from a military convoy. We used them to break down the gate and take the town."`));
        console.log(w(`"When we broke the gate down, they were already fleeing into the river. None made it across though, soon as they were waist deep, the drowners got them."`));
    }

    while (!(oneFixed && twoFixed && threeFixed)) {
        console.log("\nCurrent gate problems:");
        if (!oneFixed) console.log("  1. The left hinge is bent and warped.");
        if (!twoFixed) console.log("  2. The right door is split down the middle.");
        if (!threeFixed) console.log("  3. Fire has damaged a big section of the left door.");

        const choice = await prompt("\nWhich part will you fix? [hinge / split / fire] > ");

        if (choice.includes("hinge") && !oneFixed) {
            const roll = player.roll("crafting");
            console.log(`You roll Crafting: ${roll}`);
            if (roll >= 16) {
                console.log(w(`With a few strikes and a makeshift wedge, you realign the hinge expertly.`));
            } else {
                console.log(w(`You do your best, but it hasn't helped much.`));
                payElves(player);
            }
            oneFixed = true;
        } else if (choice.includes("split") && !twoFixed) {
            const roll = player.roll("physique");
            console.log(`You roll Physique: ${roll}`);
            if (roll >= 15) {
                console.log(w(`You wedge the crowbar tightly`));
                const roll = player.roll("crafting");
                console.log(`You roll Crafting: ${roll}`);
                if (roll > 13) {
                    console.log(`You manage to set the crowbar`)
                } else {
                    console.log(`The crowbar is securely wedged... but in the wrong place. It's unusable now.`);
                }
            } else {
                console.log(w(`You managed to widen the split.`));
                payElves(player);
            }
            twoFixed = true;
        } else if (choice.includes("fire") && !threeFixed) {
            let roll;
            // Use the better of alchemy or crafting to fix the burnt section
            if (player.stats.alchemy > player.stats.crafting) {
                roll = player.roll("alchemy");
                console.log(`You roll Alchemy: ${roll}`);
            } else {
                roll = player.roll("crafting");
                console.log(`You roll Crafting: ${roll}`);
            }
            if (roll >= 15) {
                console.log(w(`You scrape away the scorched wood and reinforce the gap.`));
            } else {
                console.log(w(`It's functional, but it may not last long under pressure.`));
                payElves(player);
            }
            threeFixed = true;
        } else {
            console.log("That part is either already fixed, cannot be fixed or you didn't specify clearly.");
        }
    }


    console.log(w(`A grizzled elf with half a mustache eyes the gate, then nods slowly.`));

    if (player.crowns >= 100) {
      console.log(`"Not bad, for someone who couldn't even hold onto their purse."`);
    } else {
      console.log(`"Could've been worse. It'll hold until spring, maybe."`);
    }

    await sleep(2000);
    return "ferryRide";
}

module.exports = fixingTheGate;
