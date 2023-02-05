const fs = require('fs');
module.exports = async (bot, chatId, typeAccount) => {
    try {
        console.log(typeAccount);
        const cuenta = await getAccount(typeAccount);
        bot.sendMessage(chatId, `Tu cuenta es:\n${cuenta}`);
    } catch (error) {
        console.log(error);
    }
};
const getAccount = async (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`./archives/${path}.txt`, "utf-8", (error, data) =>{
            if (error) reject(error);
            const cuentas = data.split("\n");
            const rand = Math.round(Math.random() * (cuentas.length - 1));
            const cuenta = cuentas[rand];
            resolve(cuenta);
        });
    });
};