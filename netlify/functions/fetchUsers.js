// netlify/functions/fetchUsers.js
exports.handler = async (event, context) => {
    try {
        // Mapeamento dos cursos e suas URLs
        const cursos = {
            medicina: 'https://pastebin.com/raw/zFYnPjcE',
            biomedicina: 'https://pastebin.com/raw/gQGspCcf',
            enfermagem: 'https://pastebin.com/raw/XwUn8jgz',
            medvet: 'https://pastebin.com/raw/xEq858u6',
            odonto: 'https://pastebin.com/raw/3G8HG9x2',
            psicologia: 'https://pastebin.com/raw/MqGpECkQ',
        };

        // Obtém o curso da query string
        const curso = event.queryStringParameters.curso;

        // Verifica se o curso existe no mapeamento
        if (!cursos[curso]) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Curso inválido' }),
            };
        }

        // Faz o fetch da URL correspondente ao curso
        const targetUrl = cursos[curso];
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
