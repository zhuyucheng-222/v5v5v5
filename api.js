import config from './config.js';

class DeepSeekAPI {
    constructor() {
        this.apiKey = config.apiKey;
        this.baseURL = config.baseURL;
        this.model = config.model;
    }

    async chat(message) {
        try {
            const response = await fetch(`${this.baseURL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: "system",
                            content: "你是V5数字武馆的AI助教，负责回答用户关于武术的问题。"
                        },
                        {
                            role: "user",
                            content: message
                        }
                    ],
                    stream: false
                })
            });

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('API调用错误:', error);
            return '抱歉，我暂时无法回答您的问题。请稍后再试。';
        }
    }
}

export default new DeepSeekAPI(); 