const APIKey = 'trnsl.1.1.20180414T101058Z.5355ec5ba7a89968.18267f1a46a13a25508cd8cb7991ec158cda37cb'


/*
    You can find more information about props on https://tech.yandex.ru/translate/doc/dg/reference/translate-docpage/
*/

// function curry(fn, ...args) {
//     return function cur(arg) {
//         const fullArgs = [...args, arg]
//         if (fn.length > fullArgs.length) {
//             return curry.apply(null, [fn, ...fullArgs])
//         }

//         return fn.apply(null, fullArgs)
//     }
// }

async function makeRequest(url, args) {
    const options = getOptions(args)
    return fetch(`${url}${options}`).then(res => res.json())
}

//TODO Refactoring
export function getTranslation(args) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${APIKey}`
    return makeRequest(url, args)
}

export function getSupposedLanguage(args) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/detect?key=${APIKey}`
    return makeRequest(url, args)
}

export function getSupportedLanguages(args) {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${APIKey}`
    return makeRequest(url, args)
}

function getOptions(args) {
    return Object
        .entries(args)
        .reduce((option, [key, value]) => `${option}&${key}=${value}`, '')
}
