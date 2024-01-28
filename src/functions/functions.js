export const getData = async (url) => {
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

export const validateEmail = (email) => {

    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const extractUsername = (email) => {
    const match = email.match(/^(.+)@/);
    return match ? match[1] : null;
};