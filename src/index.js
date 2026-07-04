export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('OK — this is the bot webhook endpoint', { status: 200 });
    }

    const update = await request.json();
    const message = update.message;

    if (message && message.text === '/start') {
      const chatId = message.chat.id;

      await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: 'Привіт! Тисни кнопку нижче, щоб відкрити облік доходів 👇',
          reply_markup: {
            inline_keyboard: [[
              {
                text: '📊 Відкрити застосунок',
                web_app: { url: 'https://t.me/kontra_income_bot/ledger' }
              }
            ]]
          }
        })
      });
    }

    return new Response('OK', { status: 200 });
  }
};
