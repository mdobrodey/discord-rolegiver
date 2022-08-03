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
    guildId: "1000906408826503268",
    roleId: "1004461838584516649",
    phrase: "discord.gg/1000-7"
 }

client.on("ready", async () => {
    console.log("Bot is ready!");
    console.log(`${client.user.tag} || ${client.user.id}`);
    console.log(`${client.guilds.cache.size} guilds`);
    /**
     * @type {Discord.Guild} 
     */
    const guild = client.guilds.cache.get(config.guildId);
    client.user.setActivity(`gives roles`, { type: 'PLAYING' });
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
