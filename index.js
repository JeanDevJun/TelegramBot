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
botTelegram.on('message', async msg => {
    const chatId = msg.chat.id;
    try {
        if(!msg.text.startsWith('/')) return;
        const command = msg.text.split("/")[1].split(" ")[0];
        const mensaje = msg.text.split(" ")[1];
        console.log(command);
        const usuario = await getUser(msg.from.username);
        console.log(msg.from.username);
        if(!usuario){
            await botTelegram.sendMessage(chatId, '🚫 No tienes permisos para usar el bot contacta a @Antonello54 !');
            return;
        }
        if(commands[command]){
            commands[command](botTelegram, chatId, mensaje);
        }else{
            await botTelegram.sendMessage(chatId,'⭕️ Comando no reconocido.');
        }
    } catch (error) {
        console.log(error);
    }
});

const getUser = (user) => {
    return new Promise((resolve, reject) =>{
        fs.readFile(('./config/users.txt'), 'utf-8', (error, data) =>{
            if(error) reject(error);
            console.log(data);
            const username = data.includes(user);
            resolve(username);
        });
    });
};