import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
router.post('/api/chatgpt', async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.apiKEY
    });
    console.log('req.body', req.body);
    if (req.body.prompt) {
        const { prompt, context, temperature, max_tokens, top_p, frequency_penalty, presence_penalty, role } = req.body;
        const messages = context ? [...context, { role, content: JSON.stringify(prompt) }] : [{ role, content: prompt }];
        console.log('messages', messages[0]);
        const openai = new OpenAIApi(configuration);
        try {
            const response = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages,
                temperature: temperature || 0,
                max_tokens: max_tokens || 100,
                top_p: top_p || 1,
                frequency_penalty: frequency_penalty || 0,
                presence_penalty: presence_penalty || 0,
            });
            console.log('bueno no esta fallando tanto', response);
            if (response.data.choices[0].message) {
                messages.push(response.data.choices[0].message);
                console.log('response', messages);
                return res.json(response.data.choices[0].message);
            }
        }
        catch (error) {
            console.log('error', error);
        }
    }
    return res.json({ "error": "don't provide a prompt" });
});
export { router as ChatGPTRouter };
//# sourceMappingURL=chatapi.Router.js.map