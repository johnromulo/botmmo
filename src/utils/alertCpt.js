const Discord = require("discord.js");
const configs = require("../../config.json");

const client = new Discord.WebhookClient(
  configs.discord_webhook_id,
  configs.discord_webhook_token
);

async function alertCpt() {
  console.log("message discord");
  await client.send(`<@${configs.user_discord_id}> Corre!!!!`);
}

module.exports = alertCpt;
