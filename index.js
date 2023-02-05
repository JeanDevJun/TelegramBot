const TelegramBot = require('node-telegram-bot-api');
const { token } = require('./config.json');
const fs = require('fs');
const botTelegram = new TelegramBot(token, {
    polling: true
});

const commands = {};

fs.readdirSync('./commands').forEach(file =>{
    const command = require(`./commands/${file}`);
    const commandName = file.split('.')[0];
    commands[commandName] = command;
});
botTelegram.on('message', msg => {
    const chatId = msg.chat.id;
    if(!msg.text.startsWith('/')) return;
    const command = msg.text.split("/")[1].split(" ")[0];
    console.log(command);
    const mensaje = msg.text.split(" ")[1];
    if(commands[command]){
        commands[command](botTelegram, chatId, mensaje);
    }else{
        botTelegram.sendMessage(chatId,'Comando no reconocido.');
    }
});