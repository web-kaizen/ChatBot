const selects = (url) => {
    const selectTypeBot = document.getElementById('type-bot');
    const selectModelBot = document.getElementById('bot-model');
    const selectModeBot = document.getElementById('bot-mode');

    let listBots
    let sectorObj

    const renderSelect = (list) => {
        sectorObj = localStorage.getItem('bots') ? JSON.parse(localStorage.getItem('bots')) : {};
        selectTypeBot.innerHTML = '';
        selectModelBot.innerHTML = '';
        selectModeBot.innerHTML = '';

        list.forEach((bot) => {
            const option = document.createElement('option');

            option.innerHTML = `<option value="${bot.name}">${bot.name}</option>`
            selectTypeBot.append(option)
        });

        localStorage.getItem('bots') ? selectTypeBot.value = sectorObj.bot : selectTypeBot.value = 'ChatGpt';

        if (selectTypeBot[selectTypeBot.selectedIndex].textContent === 'ChatGpt') {
            selectModelBot.classList.remove('hide');
            selectModeBot.classList.remove('hide');

            list[selectTypeBot.selectedIndex].modelList.forEach((model) => {
                const option = document.createElement('option');

                option.innerHTML = `<option value="${model.name}">${model.name}</option>`
                selectModelBot.append(option)
            });
            localStorage.getItem('bots') ? selectModelBot.value = sectorObj.model : selectModelBot.value = 'Gpt-3.5';

            list[selectTypeBot.selectedIndex].modelList[selectModelBot.selectedIndex].modeList.forEach((mode) => {
                const option = document.createElement('option');

                option.innerHTML = `<option value="${mode.name}">${mode.name}</option>`
                selectModeBot.append(option)
            });
            localStorage.getItem('bots') ? selectModeBot.value = sectorObj.mode : selectModeBot.value = '4k context';
        } else {
            selectModelBot.classList.add('hide');
            selectModeBot.classList.add('hide');
        };

        sectorObj = {
            bot: selectTypeBot.value,
            model: selectModelBot.value,
            mode: selectModeBot.value,
        };
        localStorage.setItem('bots', JSON.stringify(sectorObj))
    };

    const getData = async (url) => {
        try {
            const res = await fetch(url)

            if (res.ok) {
                return await res.json()
            } else {
                throw new Error
            }
        } catch (error) {
            throw new Error("Произошла ошибка, данных нет!")
        }
    };

    const getBotList = (url) => {
        getData(url)
            .then(bots => {
                listBots = bots
                renderSelect(listBots);
            })
            .catch(error => {
                console.log(error.message);
            })
    };

    selectTypeBot.addEventListener('change', () => {
        sectorObj = JSON.parse(localStorage.getItem('bots'));
        sectorObj.bot = selectTypeBot.value;

        if (selectTypeBot.value === 'ChatGpt') {
            sectorObj.model = 'Gpt-3.5';
            sectorObj.mode = '4k context';
        };
        localStorage.setItem('bots', JSON.stringify(sectorObj));

        renderSelect(listBots);
    });

    selectModelBot.addEventListener('change', () => {
        sectorObj = JSON.parse(localStorage.getItem('bots'));
        sectorObj.model = selectModelBot.value;

        if (selectModelBot.value === 'Gpt-3.5') {
            sectorObj.mode = '4k context';
        } else if (selectModelBot.value === 'Gpt-4') {
            sectorObj.mode = '8k context';
        };
        localStorage.setItem('bots', JSON.stringify(sectorObj));

        renderSelect(listBots);
    });

    selectModeBot.addEventListener('change', () => {
        sectorObj = JSON.parse(localStorage.getItem('bots'));
        sectorObj.mode = selectModeBot.value;
        localStorage.setItem('bots', JSON.stringify(sectorObj));

        renderSelect(listBots);
    });

    getBotList(url);

};

export default selects;