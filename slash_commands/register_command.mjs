// const { REST, Routes } = require("discord.js")
import { REST, Routes } from "discord.js";
// import "dotenv/config";
import { config } from "dotenv";
config({ path: process.ENV })

const commands = [
    {
        name: 'close',
        description: 'close your chat ticket',
    },
    {
        name: 'ticket',
        description: 'We are opening your ticket',
    },
    {
        name: "delete",
        description: "delete your chat history",
        // type: "CHAT_INPUT"
    },
    {
        name: "ping",
        description: "test ping of bot",
        // type: "CHAT_INPUT"
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(process.env.APP_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error("ERROR----->", error);
}
export { commands };