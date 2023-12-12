import fetch from 'node-fetch';

class ConfusedWord {
    constructor(proper, improper) {
        this.properSpelling = proper;
        this.improperSpelling = improper;
    }
}

class foreignWord {
    constructor(foreignWord, meaning, translation, orign) {
        this.foreignWord = foreignWord;
        this.meaning = meaning;
        this.translation = translation;
        this.orign = orign;
    }
}

class TdkContent {
    constructor(randomWord, confusedWord, randomRule, foreignWord) {
        this.randomWord = randomWord;
        this.ConfusedWord = confusedWord;
        this.randomRule = randomRule;
        this.foreignWord = foreignWord;
    }
}

class GenericPair {
    constructor(madde, anlam) {
        this.content = madde;
        this.meaning = anlam;
    }
}
function convertApi(json) {
    const randomWord = new GenericPair(json.kelime[0].madde, json.kelime[0].anlam);
    const randomRule = new GenericPair(json.kural[0].adi, json.kural[0].url);
    const confusedWord = new ConfusedWord(json.syyd[0].dogrukelime, json.syyd[0].yanliskelime);
    const foreignWord_ = new foreignWord(json.yabanci.kkelime, json.yabanci.anlam, json.yabanci.kkarsilik, json.yabanci.kkoken);
    return new TdkContent(randomWord, confusedWord, randomRule, foreignWord_);
}

export function getAll() {
    return new Promise(async (resolve, reject) => {
        const res = await fetch('https://sozluk.gov.tr/icerik', {
            method: 'get',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        console.log(res.status);
        const data = JSON.parse((await res.text()).replace(/<\/?[^>]+(>|$)/g, "")); //remove html tags..
        if (data == null) reject('fetch failed.');
        resolve(convertApi(data));
    });
}

console.log(await getAll());