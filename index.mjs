import { OpenAI } from "openai";
import { pool, user_chat_array, usermsg, botmsg, delpool } from "./database/db.mjs"
import { BaseGuildEmojiManager, Client, GatewayIntentBits, InteractionType, TextChannel } from "discord.js";
import { ChatGPT } from "discord-chat-gpt";
import { commands } from "./slash_commands/register_command.mjs";
import { dataxp, dataSkill, qs, diaryJSON, ironJSON, miscJSON, iron, misc, diary } from "./imports/json_imports.mjs"
import { baseConversation } from "./machine_learning/base_conversation.mjs"
import { openai_functions } from "./imports/functions/openai_functions.mjs"

import { config } from "dotenv";
config({ path: process.ENV })

// initializePool()


//INITIALIZATIONS OF VARIABLES
let lvlPrice, xp, total, semiPrice, check, totalxp = 0, completionResponse, quoteskillResponse, functionCallName, gen_prompt, questString, questResponse, string = '', strings = '', history = "", response, conversationHistory = [], userId, chathistory = [], user_name;


conversationHistory = baseConversation;

//-----------------------------
//DISCORD APPLICATION START
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,

    ],
    allowedMentions: {

        repliedUser: false,
    }
});
//-------------------------
//OPEN AI API
let API = process.env.OPENAI_API_KEY
const gptClient = new OpenAI({
    apiKey: API
});
//------------------------
//STARTING THE BOT
client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});
//-----------------------
//Recieving messages and send the response through openai
let input;
async function runCompletion(message) {
    history = JSON.stringify(message);

    //FLUSHING THE ARRAY
    chathistory = [];
    // console.log("FLUSHED ARRAY ------> ", chathistory)
    //STORING THE NEW DATA IN ARRAY
    // console.log("user chat : ----->", user_chat_array)
    chathistory = baseConversation.concat(user_chat_array);
    chathistory.push({ role: 'user', content: history });



    try {
        if (history.includes("rs3") || history.includes("agility") || history.includes("cooking") || history.includes("farming") || history.includes("attacks") || history.includes("crafting") || history.includes("defence") || history.includes("construction") || history.includes("firemaking") || history.includes("fishing") || history.includes("fletching") || history.includes("herblore") || history.includes("hunter") || history.includes("magic") || history.includes("mining") || history.includes("runecrafting") || history.includes("smithing") || history.includes("strength") || history.includes("thieving") || history.includes("woodcutting") || history.includes(" black knight fortress ") ||
            history.includes("cook assistant") || history.includes("corsair curse") || history.includes("demon slayer") || history.includes("doric quest") || history.includes("dragon slayer") || history.includes("ernest the chicken") || history.includes("goblin diplomacy") || history.includes("imp catcher") || history.includes("knight sword") || history.includes("misthalin mystery") || history.includes("pirate treasure") || history.includes("prince ali rescue") || history.includes("restless ghost") ||
            history.includes("romeo & juliet") || history.includes("rune mysteries") || history.includes("below ice mountain") || history.includes("sheep shearer") || history.includes("shield of arrav") || history.includes("vampyre slayer") || history.includes("witch potion") || history.includes("x marks the spot") || history.includes("animal magnetism") || history.includes("another slice of ham") || history.includes("ascent of arceuus") || history.includes("between a rock") || history.includes("big chompy bird hunting") || history.includes("biohazard") || history.includes("bone voyage") || history.includes("cabin fever") || history.includes("client of kourend") || history.includes("clock tower") || history.includes("cold war") || history.includes("contact") || history.includes("creature of fenkenstrain") || history.includes("darkness of hallowvale") ||
            history.includes("death plateau") || history.includes("death to the dorgeshuun") || history.includes("depths of despair") || history.includes("desert treasure") || history.includes("devious minds") || history.includes("dig site") || history.includes("dragon slayer 2") || history.includes("dream mentor") || history.includes("druidic ritual") || history.includes("dwarf cannon") || history.includes("eadgar ruse") || history.includes("eagles' peak") || history.includes("elemental workshop i") || history.includes("elemental workshop ii") || history.includes("enakhra lament") || history.includes("enlightened journey") || history.includes("eyes of glouphrie") || history.includes("fairytale i - growing pains") || history.includes("fairytale ii - cure a queen") || history.includes("family crest") || history.includes("porcine of interest") || history.includes("feud") || history.includes("fight arena") || history.includes("fishing contest") || history.includes("forgettable tale") || history.includes("forsaken tower") || history.includes("fremennik exiles") || history.includes("fremennik isles") || history.includes("fremennik trials") || history.includes("garden of tranquillity") || history.includes("gertrude cat") || history.includes("ghosts ahoy") || history.includes("giant dwarf") || history.includes("grand tree") || history.includes("great brain robbery") || history.includes("grim tales") || history.includes("hand in the sand") || history.includes("haunted mine") || history.includes("mage arena II") || history.includes("mage arena") || history.includes("hazeel cult") || history.includes("heroes' quest") || history.includes("holy grail") || history.includes("horror from the deep") || history.includes("icthlarin little helper") || history.includes("in aid of the myreque") || history.includes("in search of the myreque") || history.includes("jungle potion") || history.includes("king ransom") || history.includes("kingdom divided") || history.includes("legends' quest") || history.includes("lost city") || history.includes("lost tribe") || history.includes("lunar diplomacy") || history.includes("making friends with my arm") || history.includes("making history") || history.includes("merlin crystal") || history.includes("monk friend") || history.includes("monkey madness i") || history.includes("monkey madness ii") || history.includes("mountain daughter") || history.includes("mournings' end part i") || history.includes("mourning end part ii") ||
            history.includes("murder mystery") || history.includes("my arm big adventure") || history.includes("nature spirit") || history.includes("observatory quest") || history.includes("olaf quest") || history.includes("one small favour") || history.includes("plague city") || history.includes("priest in peril") || history.includes("rag and bone man") || history.includes("rag and bone man ii") || history.includes("ratcatchers") || history.includes("recruitment drive") || history.includes("regicide") || history.includes("roving elves") || history.includes("royal trouble") || history.includes("rum deal") || history.includes("scorpion catcher") || history.includes("sea slug") || history.includes("shades of mort'ton") || history.includes("shadow of the storm") || history.includes("sheep herder") || history.includes("shilo village") || history.includes("sins of the father") || history.includes("song of the elves") || history.includes("a soul bane") || history.includes("spirits of the elid") || history.includes("swan song") || history.includes("a taste of hope") || history.includes("tai bwo wannai trio") || history.includes("a tail of two cats") || history.includes("tale of the righteous") || history.includes("tears of guthix") || history.includes("temple of ikov") || history.includes("golem") || history.includes("queen of thieves") || history.includes("slug menace") || history.includes("tourist trap") || history.includes("throne of miscellania") || history.includes("tower of life") || history.includes("tree gnome village") || history.includes("tribal totem") || history.includes("troll romance") || history.includes("troll stronghold") || history.includes("underground pass") || history.includes("wanted!") || history.includes("watchtower") || history.includes("waterfall quest") || history.includes("what lies below") || history.includes("witch house") || history.includes("zogre flesh eaters") || history.includes("another cook quest") || history.includes("defeating the culinaromancer") || history.includes("freeing evil dave") || history.includes("freeing king awowogei") || history.includes("freeing pirate pete") || history.includes("freeing sir amik varze") || history.includes("freeing skrach uglogwee") || history.includes("freeing the goblin generals") || history.includes("freeing the lumbridge guide") || history.includes("freeing the mountain dwarf") || history.includes("alfred grimhand barcrawl") || history.includes("architectural alliance") ||
            history.includes("bear your soul") || history.includes("curse of the empty lord") || history.includes("enchanted key") || history.includes("enter the abyss") || history.includes("family pest") || history.includes("general shadow") || history.includes("in search of knowledge") || history.includes("lair of tarn razorlor") || history.includes("skippy and the mogres") || history.includes("daddys home") || history.includes("getting ahead") || history.includes("all fired up") ||
            history.includes("carnillean rising") || history.includes("curse of the black stone") || history.includes("dimension of disaster") || history.includes("dishonor among thieves") || history.includes("fate of the gods") || history.includes("fur n seek") || history.includes("fur n seek 2") || history.includes("smoking kills") || history.includes("curse of arrav") ||
            history.includes("tale of the muspah") || history.includes("diamond in the rough") || history.includes("temple at sennestien") || history.includes("whats mine is yours") || history.includes("missing my mummy") || history.includes("defender of varrock") || history.includes("stolen hearts") || history.includes("back to my roots") || history.includes("back to the freezer") || history.includes("blood runs deep") || history.includes("branches of darkmeyer") || history.includes("children of mah") || history.includes("chosen commander") || history.includes("clockwork syringe") || history.includes("crocodile tears") || history.includes("elemental workshop 3") || history.includes("elemental workshop 4") || history.includes("glorius memories") || history.includes("heart of stone") || history.includes("hero welcome") || history.includes("hunt for red raktuber") || history.includes("kennith concerns") || history.includes("land of goblins") || history.includes("legacy of seergaze") || history.includes("river of blood") || history.includes("lord of vampyrium") || history.includes("mighty fall") || history.includes("nomad elegy") || history.includes("our man in the north") || history.includes("prisoner of glouphrie") || history.includes("salt in the wound") || history.includes("some like it cold") || history.includes("toktz-ket-dill") || history.includes("violet is blue") || history.includes("desperate times") || history.includes("violet is blue too") || history.includes("you are it") || history.includes("desperate measures") || history.includes("in pyre need") || history.includes("call of the ancestors") || history.includes("chef assistant") || history.includes("deadliest catch") || history.includes("do no evil") || history.includes("evil dave big day out") || history.includes("gower quest") ||
            history.includes("kindred spirits") || history.includes("nomad requiem") || history.includes("once upon a slime") ||
            history.includes("needle skips") || history.includes("bringing home the bacon") || history.includes("benedict world tour") || history.includes("boric task i") || history.includes("boric task ii") || history.includes("boric task iii") ||
            history.includes("curse of zaros") || history.includes("damage control") || history.includes("desert slayer dungeon") ||
            history.includes("doric task i") || history.includes("doric task ii") || history.includes("doric task iii") || history.includes("doric task iv") || history.includes("doric task v") || history.includes("doric task vi") || history.includes("doric task vii") || history.includes("doric task viii") || history.includes("eye for an eye") || history.includes("father and son") || history.includes("final destination") || history.includes("flag fall") || history.includes("flashback") || history.includes("foreshadowing") || history.includes("fortunes") || history.includes("from tiny acorns") ||
            history.includes("ghosts from the past") || history.includes("a guild of our own") || history.includes("harbinger") ||
            history.includes("head of the family") || history.includes("helping laniakea") || history.includes("hopespear will") ||
            history.includes("hunt for surok") || history.includes("in memory of the myreque") || history.includes("koschei troubles") || history.includes("lost her marbles") || history.includes("lost toys") || history.includes("mahjarrat memories") || history.includes("nadir") || history.includes("one foot in the grave") || history.includes("raksha, the shadow colossus") || history.includes("rebuilding edgeville") || history.includes("purple cat") || history.includes("spiritual enlightenment") || history.includes("sins of the father (miniquest)") || history.includes("tales of nomad") || history.includes("tales of the god wars") || history.includes("thok it to 'em") || history.includes("thok your block off") ||
            history.includes("three company") || history.includes("tortle combat") || history.includes("tuai leit own") ||
            history.includes("vengeance") ||
            history.includes("wandering ga'al") || history.includes("jed hunter") || history.includes("as a first resort") || history.includes("azzanadra quest") || history.includes("beneath cursed tides") || history.includes("blood pact") || history.includes("branches of darkmeyer") || history.includes("brink of extinction") || history.includes("broken home") || history.includes("buyers and cellars") || history.includes("city of senntisten") || history.includes("dealing with scabaras") || history.includes("death of chivalry") || history.includes("dishonour among thieves") || history.includes("elder kiln") || history.includes("elemental workshop III") || history.includes("elemental workshop IV") || history.includes("fairytale iii - battle at ork rift") || history.includes("firemaker curse") || history.includes("forgiveness of a chaos dwarf") || history.includes("glorious memories") || history.includes("gunnar ground") || history.includes("heartstealer") || history.includes("hunt for the red raktuber") || history.includes("impressing the locals") || history.includes("jack of spades") || history.includes("king of the dwarves") || history.includes("land of the goblins") || history.includes("let them eat pie") || history.includes("light within") || history.includes("love story") || history.includes("meeting history") || history.includes("missing presumed death") || history.includes("myths of the white land") || history.includes("one of a kind") || history.includes("one piercing note") || history.includes("path of glouphrie") || history.includes("perils of ice mountain") || history.includes("phite club") || history.includes("pieces of hate") || history.includes("plagues end") || history.includes("prisoner of glouphrie") || history.includes("quiet before the swarm") || history.includes("ritual of the mahjarrat") || history.includes("rocking out") || history.includes("rune mechanics") || history.includes("rune memories") || history.includes("shadow over ashdale") || history.includes("sliskes endgame") || history.includes("song from the depths") || history.includes("spirit of summer") || history.includes("summers end") || history.includes("swept away") || history.includes("temple of senntisten") || history.includes("void dance") || history.includes("void stares back") || history.includes("what mine is yours") || history.includes("while guthix sleeps") || history.includes("within the light") || history.includes("wolf whistle") ||
            history.includes("night at the theatre") || history.includes("vault of shadows") || history.includes("battle of the monolth ")

        ) {
            try {

                console.log("skill and quest function run")
                const completion = await gptClient.chat.completions.create({
                    model: "gpt-3.5-turbo-16k",
                    messages: chathistory,
                    functions: openai_functions,
                    max_tokens: 500,
                    function_call: "auto",
                });
                let functionreason = completion.choices[0].finish_reason;
                // console.log("completion.choices[0]=  ", completion.choices[0]);
                completionResponse = completion.choices[0].message.content;
                // console.log("completionResponse  ", completionResponse);

                if (!completionResponse) {
                    functionCallName = completion.choices[0].message.function_call.name;
                    const functionArguments = JSON.parse(completion.choices[0].message.function_call.arguments);
                    console.log("FunctionCallName:   ", functionCallName);
                    console.log("FunctionArguments:   ", functionArguments);
                }
                if (functionCallName === "quoteskill") {

                    const completionArguments = JSON.parse(completion.choices[0].message.function_call.arguments);
                    console.log("completionArguments", completionArguments);


                    try {
                        quoteskillResponse = await quoteskill(completionArguments.skillName, completionArguments.lvlStart, completionArguments.lvlEnd);
                        console.log("Quote Skill response: ", quoteskillResponse);

                        completionResponse = quoteskillResponse;
                        console.log("COMPLETION RESPONSE Inside the function: ", completionResponse);
                        // conversationHistory.push({role:"system" , content: completionResponse})
                    } catch (error) {
                        if (error.code == 503) {
                            channel.send("Retry! and ask for prices one by one. One single item at a time. Like price for corsair curse ");
                        } else if (error.code === 'insufficient_quota') {
                            // Send a message automatically
                            channel.sendTyping().then(() => {
                                channel.send(`OpenAI billing Required`);
                            }).catch((err) => {
                                console.error("Error sending message:", err);
                            });
                        }
                    }
                    console.log("quote skill response: ", quoteskillResponse);
                    // Handle the sales_manager response and assign it to completionResponse
                    completionResponse = quoteskillResponse; // Convert the array to a string
                    // completionResponse = JSON.stringify(salesManagerResponse.price);
                    console.log("COMPLETION RESPONSE Inside the function: ", completionResponse)
                    chathistory.push({ role: 'user', content: completionResponse });
                    // conversationHistory.push({ role: 'user', content: completionResponse });
                }
                else if (functionCallName === "quest") {

                    const completionArguments = JSON.parse(completion.choices[0].message.function_call.arguments);
                    console.log("completionArguments", completionArguments);


                    try {
                        questResponse = await quest(completionArguments.questName, completionArguments.quantity);
                        console.log(" quest response: ", questResponse);


                        // Handle the sales_manager response and assign it to completionResponse
                        completionResponse = questResponse;
                        console.log("COMPLETION RESPONSE Inside the function: ", completionResponse);
                        chathistory.push({ role: "system", content: completionResponse })
                    } catch (error) {
                        console.error("Error in  quest:", error);
                    }


                    console.log(" quest response: ", questResponse);
                    // Handle the sales_manager response and assign it to completionResponse
                    completionResponse = questResponse; // Convert the array to a string
                    // completionResponse = JSON.stringify(salesManagerResponse.price);
                    console.log("COMPLETION RESPONSE Inside the function: ", completionResponse)
                    chathistory.push({ role: 'user', content: completionResponse });
                }
            }
            catch (error) {
                if (error.code == 503) {
                    channel.send("Retry! and ask for prices one by one. One single item at a time. Like price for corsair curse ");
                } else if (error.code === 'insufficient_quota') {
                    // Send a message automatically
                    channel.sendTyping().then(() => {
                        channel.send(`OpenAI billing Required`);
                    }).catch((err) => {
                        console.error("Error sending message:", err);
                    });
                }
                else{
                    completionResponse = "Please enter each category seperately like if you want skill level up then just ask for skills not any other item like quest or misc etc. "
                }
            }
        }
        else {

            console.log("prompt function run")
            try {
                history = message;
                console.log("DICTIONARY: ", message);
                const completion = await gptClient.chat.completions.create({
                    // model: "gpt-3.5-turbo",
                    model: "gpt-3.5-turbo-16k",
                    messages: chathistory,
                    max_tokens: 500,
                });

                // Extract the assistant' s reply from the completion
                completionResponse = completion.choices[0].message.content;
                console.log("Completion Response : ", completionResponse)
                chathistory.push({ role: ' system', content: completionResponse });
                // console.log("user chat : ----->", chathistory)

            }
            catch (error) {
                console.log("Error in general prompt : ", error); 
                
                if (error.code == 503) {
                    console.log("Retry! and ask for prices one by one. One single item at a time. Like price for corsair curse ");
                } else if (error.code === 'insufficient_quota') {
                    console.log("Insufficient quota")
                    completionResponse = "Insufficient Quota pay bill for OpenAI"
                    // Send a message automatically
                    channel.sendTyping().then(() => {
                        channel.send(`OpenAI billing Required`);
                    }).catch((err) => {
                        console.error("Error sending message:", err);
                    });
                }

            }
        }
        chathistory = [];
        console.log("FLUSHED HISTORY : ----->", chathistory)
    } catch (error) {
        console.log("Error in main try catch block above if condition.")
    }
};


//------------------------
// Event handler for incoming messages
client.on("messageCreate", async function handleMessage(message) {
    try{

    
    // Empty the chathistory array
    if (!message.guild || message.author.bot) return;
    const channel = message.guild.channels.cache.get(process.env.RUNESCAPE);
    if (!channel) return;
    let channelid = message.channel.id;
    let category = message.channel.parentId;

    if (category === process.env.TICKET_CATEGORY) {

        const channel = message.guild.channels.cache.get(channelid);
        if (!channel) return;
        if (message.channel.id === channel.id) {
            userId = message.author.id;
            console.log("Message created by : ", userId)
            console.log(message.author.username);
            user_name = message.author.username;
            const input = message.content;
            // Send the user' s message to the assistant
            await runCompletion(input);
            console.log("Latest: ", completionResponse);
            channel.sendTyping().then((resolve) => {
                resolve;
                message.reply({
                    content: ` ${completionResponse}`,

                });
            });
            //Connecting the database
            pool(userId, history, completionResponse);
            //-------------------------
        }
    }
}
catch(error){
    console.log(error.code)
if(error.code === 40060 ){
    console.log("Database of this user is deleted")
}
}
});

//------------------------
//USING SLASH COMMANDS
client.on('interactionCreate', async interaction => {
    try{

        if (!interaction.isChatInputCommand()) return;
        
        if (interaction.commandName === 'close') {
        conversationHistory = [];
        conversationHistory.length = 0;
        conversationHistory = baseConversation;
        await interaction.reply('Your Chat ticket is closed');
    }
    else if (interaction.commandName === 'delete') {
        delpool(userId);
        await interaction.reply(`${user_name} Chat history from database deleted`);
    }
}catch(error){
    console.log(error.code)
if(error.code === 40060 ){
    console.log("Database of this user is deleted")
}
}
});
//------------------------




//LOGINTO THE BOT
client.login(process.env.BOT_TOKEN);
//----------------------------------------------------------------------

//FUNCTION BODIES AND DECLARATION
// async function quoteskill(skillName, lvlStart, lvlEnd) {
//     let resp;
//     for (let i = lvlStart; i >= 1; i--) {
//         let stlvlPrice = dataSkill.skills[skillName].default[i];
//         if (stlvlPrice == undefined) {
//             console.log("undefined")
//         }
//         else if (dataSkill.skills[skillName].default[1] == false) {
//             resp = "Please message <#837416583684685864> for a quote."
//             return resp;
//         }
//         else {
//             lvlPrice = dataSkill.skills[skillName].default[i];
//             console.log("lvlPrice0:", lvlPrice);
//             break;
//         }
//     }
//     xp = dataxp.experience[lvlStart + 1].experience_difference;
//     totalxp += xp;
//     total = lvlPrice * xp;
//     console.log("lvlPrice: ", lvlPrice);
//     console.log("xp:", xp);
//     for (let j = lvlStart + 2; j <= lvlEnd; j++) {
//         check = dataSkill.skills[skillName].default[j];
//         if (check == undefined) {
//             xp = dataxp.experience[j].experience_difference;
//             totalxp += xp;
//             semiPrice = lvlPrice * dataxp.experience[j].experience_difference;
//             total += semiPrice;
//         }
//         else {
//             xp = dataxp.experience[j].experience_difference;
//             totalxp += xp;
//             lvlPrice = dataSkill.skills[skillName].default[j];
//             semiPrice = lvlPrice * dataxp.experience[j].experience_difference;
//             total += semiPrice;
//         }
//     }
//     console.log("TOTAL PRICE =>  ", total);
//     console.log("TOTAL XP =>  ", totalxp);
//     // return total;
//     resp = `Total experience required: ${totalxp}. The total price of skill ${skillName} from level ${lvlStart} to level ${lvlEnd} is ${total}$`
//     return resp;
// };




async function quoteskill(skillName, lvlStart, lvlEnd) {
    let resp;
    for (let i = lvlStart; i >= 1; i--) {
        let stlvlPrice = dataSkill.skills[skillName].default[i];
        if (stlvlPrice == undefined) {
            console.log("undefined")
        }
        else if (dataSkill.skills[skillName].default[1] == false) {
            resp = "Please message <#837416583684685864> for a quote."
            return resp;
        }
        else {
            lvlPrice = dataSkill.skills[skillName].default[i];
            console.log("lvlPrice0:", lvlPrice);
            break;
        }
    }
    xp = dataxp.experience[lvlStart + 1].experience_difference;
    totalxp += xp;
    total = lvlPrice * xp;
    console.log("lvlPrice: ", lvlPrice);
    console.log("xp:", xp);
    for (let j = lvlStart + 2; j <= lvlEnd; j++) {
        check = dataSkill.skills[skillName].default[j];
        if (check == undefined) {
            xp = dataxp.experience[j].experience_difference;
            totalxp += xp;
            semiPrice = lvlPrice * dataxp.experience[j].experience_difference;
            total += semiPrice;
        }
        else {
            xp = dataxp.experience[j].experience_difference;
            totalxp += xp;
            lvlPrice = dataSkill.skills[skillName].default[j];
            semiPrice = lvlPrice * dataxp.experience[j].experience_difference;
            total += semiPrice;
        }
    }
    console.log("TOTAL PRICE =>  ", total);
    console.log("TOTAL XP =>  ", totalxp);
    // return total;
    resp = `Total experience required: ${totalxp}. The total price of skill ${skillName} from level ${lvlStart} to level ${lvlEnd} is ${total}$`
    return resp;
};

//QUEST CALCULATIONS
function quest(questName) {
    string = strings = '';
    try {

        let questData
        let quests
        let TotalPrice = []
        let found = false;
        let len = questName.length;
        let questNames
        let name = []
        for (let i = 0; i < len; i++) {
             questNames = questName[i].name;
            for (let key in qs.quest) {
                key = key.toLowerCase();
                questNames = questNames.toLowerCase();
                if (key.includes(questNames)) {
                    found = true;
                    questData = qs.quest[key];
                    quests = questData.price;
                    TotalPrice[i] = quests * questName[i].quantity;
                    name[i] = questNames
                }
            }
        }
        for(let i=0; i<questName.length; i++){

            string = `\n ${name[i]} cost is ${TotalPrice[i]}$. Total Price with upcharges are ${TotalPrice[i] + 0.8}$`
            strings = strings + string;
        }
        name = TotalPrice = [];
        name = TotalPrice = 0;



        console.log(strings)
        return strings;
        if (!found) {
            string = `Quest "${questName}" not found.`;
        }
    }
    catch (error) {
        console.log("ERROR IN THE QUEST: ", error)

    }
};
export { history, userId, completionResponse }