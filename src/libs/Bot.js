import ApiError from './ApiError.js';
import { URL_PROXY } from '/src/constants/constants.js'

export default class Bot {
    getList(callback = undefined) {
        if (callback && typeof callback !== 'function') ApiError.return('invalid_callback');

        let url = URL_PROXY + 'api/v0/bots/'

        fetch(url)
            .then(response => {
                if (!response.ok) ApiError.return('server_error');
                return response.json();
            })
            .then(data => {
                const groupedByBot = data.result.reduce((acc, curr) => {
                    const botName = curr.bot_name;
                    if (!acc[botName]) {
                        acc[botName] = [];
                    }
                    acc[botName].push(curr);
                    return acc;
                }, {});

                const botList = Object.keys(groupedByBot).map(botName => ({
                    name: botName,
                    modelList: groupedByBot[botName].reduce((acc, curr) => {
                        const modelName = curr.model_name;
                        const modeName = curr.mode_name;
                        const id = curr.id;
                        const existingModel = acc.find(model => model.name === modelName);
                        if (existingModel) {
                            existingModel.modeList.push({ name: modeName, id });
                        } else {
                            acc.push({
                                name: modelName,
                                modeList: [{ name: modeName, id }]
                            });
                        }
                        return acc;
                    }, [])
                }));

                if (callback) {
                    callback(botList);
                }
            })
            .catch(error => {
                console.error(error); // Обрабатываем ошибку
            });
    }
};

let bot = new Bot()

function callback(result) {
    console.log(result)
}
bot.getList(callback)