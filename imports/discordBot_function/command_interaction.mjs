import { OpenAI } from "openai";
import { BaseGuildEmojiManager, Client, GatewayIntentBits, TextChannel } from "discord.js";
import { ChatGPT } from "discord-chat-gpt";
import { commands } from "../../slash_commands/register_command.mjs";
import { conversationHistory, baseConversation } from "../../machine_learning/base_conversation.mjs"

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

//SLASH COMMANDS INTERACTIONS
// let slashInteract = async function (interaction) {
//     if (!interaction.isChatInputCommand()) return;

//     if (interaction.commandName === 'close') {
//         await interaction.reply('Your Chat ticket is closed');
//         conversationHistory = [];
//         conversationHistory = baseConversation;
//     }
// };
// export { slashInteract }