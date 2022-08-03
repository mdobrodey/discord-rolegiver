const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MEMBERS',
        'GUILD_MESSAGES',
        'GUILD_PRESENCES'
    ]
});
const config = module.exports = {
    guildId: "988131751392059414",
    roleId: "1004442748465721345",
    phrase: "god"
 }

client.on("ready", async () => {
    console.log("Bot is ready!");
    console.log(`${client.user.tag} || ${client.user.id}`);
    console.log(`${client.guilds.cache.size} guilds`);
    /**
     * @type {Discord.Guild} 
     */
    const guild = client.guilds.cache.get(config.guildId);
    client.user.setActivity(`Set your status as ${config.phrase} or set your status as an invite to ${guild.name}`, { type: 'WATCHING' });
});

client.on("presenceUpdate", async (oldPresence, newPresence) => {
   try {
    const newMember = newPresence.member;
    if(!newPresence || !newMember || newMember.user.bot) return;
    if (!newMember.guild || (newMember.guild.id !== config.guildId)) return;
    if (newMember.roles.cache.find(role => role.id === config.roleId)){
        if(newMember.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes(config.phrase))) return;
        if(!newMember.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes(config.phrase))){
            const role = newMember.guild.roles.cache.get(config.roleId);
            await newMember.roles.remove(role);
            console.log("I removed the role from " + newMember.user.tag)
        }
    }
    if (!newMember.roles.cache.find(role => role.id === config.roleId) && newMember.presence.activities.some(activity => activity.type === "CUSTOM" && activity.state && activity.state.includes(config.phrase) )) {
        await newMember.roles.add(config.roleId);
        console.log("I added the role to " + newMember.user.tag)
    }
   }catch(err) {
      console.log(err);
   }
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
});

client.login('MTAwNDQyNzAyODEzODgzMTg4Mw.GaZCW3.jx2UrH-0R33S0BCayb0QTM9rj2AucfUoazdqb4');