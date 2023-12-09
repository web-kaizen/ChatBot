const Bot = {
    _errorList: {
        'invalid_callback': 'Невалидный callback',
        'server_error': 'Internal server error'
    },
    _returnError(code) {
        let message = this._errorList[code] || null;

        if (message === null) {
            code = 'unknown_error';
            message = 'Unknown error';
        }

        throw new Error(JSON.stringify({text: message, code: code}));
    },

    getList(callback = undefined) {
        if (callback && typeof callback !== 'function') this._returnError('invalid_callback');

        fetch('http://85.215.65.210/api/v0/bots')
            .then(response => {
                if (!response.ok) this._returnError('server_error');
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