const { sleep, w, prompt, sceneTitle } = require('../utils/input');

async function camp(player) {
    sceneTitle("The Camp");

    console.log(w(`After a few minutes trek through swamp and bramble, you come out into a small clearing on the banks of the Pontar. Most of the clearing is surrounded by a crude-looking wooden wall, made from stripped tree trunks and bound together with rope. The wall stands about 8m high and atop it you can see painted elven faces regarding you suspiciously from behind the makeshift parapets. The Scoia’tael lead you around to a gate opposite the water’s edge. While it’s been propped up, it’s easy to see that the gates were heavily damage and are charred and cracked.`));
    console.log(w(`Crossing the threshold of the camp you are met with the eyes of several bedraggled looking elves. Each one is carrying a strung bow and many are fiddling with the fletching of their arrows as they watch you enter.`));

    if (player.race === "human") {
        let roll;
        if (player.stats.awareness > player.stats.humanPerception) {
            roll = player.roll("awareness");
        } else {
            roll = player.roll("humanPerception");
        }
        if (roll > 10) {
            console.log(w(`You notice the scoia'tael keeping a close eye on you, never lowering their weapons. Some seem worried other humans may be lurking nearby, while others are clearly wanting to kill you.`));
        }
    }

    let roll = player.roll("awareness");
    if (roll > 18) {
        console.log(w(`For a brief moment, you glimpse inside a tent and see ${Math.round(Math.random() * 2 + 2)} wounded scoia'tael. They look gravely injured and would likely be unable to take part in any battle.`));
    } else if (roll > 16) {
        console.log(w(`On one wall of the fortification, you spot a row of spikes upon which sit skulls clad in various armoured helmets.`));
    } else if (roll > 14) {
        console.log(w(`The camp used to be a small thorp. You spot blood splatters and damage on the buildings.`));
    } else if (roll > 12) {
        console.log(w(`You notice many scoia'tael archers. You spot at least 3`));
    }

    const explore = await prompt("Do you want to <talk> to the Scoia'tael? <attack> the camp? Or just <wait>?");
    if (explore.includes("talk") || explore.includes("ask")) {
        console.log(`The smirk and converse with one another in elder tongue.`);
        if (player.roll("language: elderSpeech" >= 14)) {
            console.log(`You recognize their speech — they're making fun of you.`);
        } else {
            console.log(`You feel lost by their speech.`)
        }
    } else if (explore.includes("attack")) {
        console.log(`Feeling the threat from the elves, you draw your ${player.weapon} and get ready to attack`);
        await sleep(3000);
        player.flags.enteredPeacefully = true;
        return "campAttackDay";
    } else {
        console.log(`You decide to wait for the elves to decide.`);
        await sleep(2000);
        const tension = Math.floor(Math.random() * 10);
        if (tension > 6) {
            console.log("One of the archers lowers his bow slightly.");
        } else {
            console.log("A scoia'tael sneers and mutters something under his breath.");
        }
    }

    if (player.flags.bribedScoiatael) {
        console.log(w(`You are led through the camp to a rickety looking dock, beside which is a damaged but intact ferry.`));
        await sleep(3000);
        return "Commander";
    } else {
        console.log(w(`You are led to the gate.`));
        await sleep(3000);
        return "FixingTheGate";
    }
}

module.exports = camp;
