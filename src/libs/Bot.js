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
                let botList = [];

                data.result.forEach(bot => {
                    let existingBot = botList.find(item => item.name === bot.name);

                    if (!existingBot) {
                        existingBot = {
                            name: bot.name,
                            modelList: []
                        };
                        botList.push(existingBot);
                    };

                    let existingModel = existingBot.modelList.find(model => model.name === bot.model_name);

                    if (!existingModel) {
                        existingModel = {
                            name: bot.model_name,
                            modeList: []
                        };
                        existingBot.modelList.push(existingModel);
                    }

                    existingModel.modeList.push({
                        name: bot.mode_name,
                        id: bot.id
                    });
                });

                if (callback) callback(botList);
            })
    }
};