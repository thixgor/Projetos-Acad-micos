// netlify/functions/fetchUsersMedVet.js
exports.handler = async (event, context) => {
    try {
        const targetUrl = 'https://pastebin.com/raw/xEq858u6';
        const response = await fetch(targetUrl);

        if (!response.ok) {
            throw new Error('Erro ao carregar usuários');
        }

        const data = await response.text(); // Pega o conteúdo em formato de texto

        return {
            statusCode: 200,
            body: data,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Erro ao carregar usuários' }),
        };
    }
};
