const fs = require('fs');
module.exports = async (bot, chatId, typeAccount) => {
    try {
        console.log(typeAccount);
        const cuenta = await getAccount(typeAccount);
        if(cuenta === "File Not Found") {
            await bot.sendMessage(chatId, `
▶️ ═══════════ LIGHBOT ═══════════
❌ Plataforma: ${typeAccount.toUpperCase()}
⛔️ Mensaje: Tipo de Cuenta no Existente
❗️ Bot: @AntonelloBot
                    `);
            return;
        }
        if(!cuenta || cuenta === "") return;
        await bot.sendMessage(chatId, `
▶️ ═══════════ LIGHBOT ═══════════
✅ Plataforma: ${typeAccount.toUpperCase()}
✅ Cuenta: ${cuenta}
❗️ Bot: @AntonelloBot
        `);
    } catch (error) {
        console.log(error);
    }
};
const getAccount = async (path) => {
    if(!fs.existsSync(`./archives/${path}.txt`)) return "File Not Found";
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