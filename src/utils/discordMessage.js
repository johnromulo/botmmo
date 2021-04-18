const Discord = require("discord.js");
const configs = require("../../config.json");

const client = new Discord.WebhookClient(
  "833366117611339797",
  "ubi2qY2dHpvOq0gz1P-jrqqA8FBynL44T6t6KQ8DSFK_h_KLG8QQ599Lrx51Jo6LYCTe"
);

async function run() {
  await client.send(`Pong! <@${configs.user_discord_id}>`, {});
  process.exit();
}

run();
