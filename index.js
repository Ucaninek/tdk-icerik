import fetch from 'node-fetch';

/**
 * Class representing a Confused Word object that contains the proper and the improper spellings of the word.
 */
class ConfusedWord {
    constructor(proper, improper) {
        this.properSpelling = proper;
        this.improperSpelling = improper;
    }
}

/**
 * Class representing a Foreign Word object that contains the word, its meaning, the suggested translation and the orign of the word.
 */
class ForeignWord {
    /**
     * Create a Foreign Word object
     * @param {string} foreignWord 
     * @param {string} meaning 
     * @param {string} translation 
     * @param {string} orign 
     */
    constructor(foreignWord, meaning, translation, orign) {
        this.foreignWord = foreignWord;
        this.meaning = meaning;
        this.translation = translation;
        this.orign = orign;
    }
}

/**
 * Class representing a TDK Content object that contains everything (a foreign word, a frequently confused word etc.)
 */
class TdkContent {
    /**
     * Create a TDK Content object.
     * @param {GenericPair} randomWord 
     * @param {ConfusedWord} confusedWord 
     * @param {RuleUrlPair} randomRule 
     * @param {ForeignWord} foreignWord 
     */
    constructor(randomWord, confusedWord, randomRule, foreignWord) {
        this.randomWord = randomWord;
        this.confusedWord = confusedWord;
        this.randomRule = randomRule;
        this.foreignWord = foreignWord;
    }
}

/**
 * Class representing a pair of a spelling rule and its url.
 */
class RuleUrlPair {
    /**
     * Create a generic pair.
     * @param {string} rule 
     * @param {string} url
     */
    constructor(rule, url) {
        this.rule = rule;
        this.url = url;
    }
}

/**
 * Class representing a generic pair of a word and its meaning.
 */
class GenericPair {
    /**
     * Create a generic pair.
     * @param {string} madde 
     * @param {string} anlam 
     */
    constructor(madde, anlam) {
        this.content = madde;
        this.meaning = anlam;
    }
}

/**
 * takes the badly formatted api response from TDK and converts it to a nicer json object.
 * @param {object} json 
 * @returns a TdkContent Object.
 */
function convertApi(json) {
    const randomWord = new GenericPair(json.kelime[0].madde, json.kelime[0].anlam);
    const randomRule = new GenericPair(json.kural[0].adi, json.kural[0].url);
    const confusedWord = new ConfusedWord(json.syyd[0].dogrukelime, json.syyd[0].yanliskelime);
    const foreignWord_ = new ForeignWord(json.yabanci.kkelime, json.yabanci.anlam, json.yabanci.kkarsilik, json.yabanci.kkoken);
    return new TdkContent(randomWord, confusedWord, randomRule, foreignWord_);
}

/** 
 * Fetches the TDK content api and returns a TdkContent object.
 * @returns {Promise<TdkContent>} a Promise that contains a TdkContent object.
  */
export function getAll() {
    return new Promise(async (resolve, reject) => {
        const res = await fetch('https://sozluk.gov.tr/icerik', {
            method: 'get',
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const data = JSON.parse((await res.text()).replace(/<\/?[^>]+(>|$)/g, "")); //remove html tags..
        if (data == null) reject('fetch failed.');
        resolve(convertApi(data));
    });
}

/**
 * 
 * @returns {Promise<GenericPair>} a Promise that contains a random word-meaning pair.
 */
export function getRandomWord() {
    return new Promise(async (resolve, _reject) => {
        const data = await getAll();
        resolve(data.randomWord);
    });
}

/**
 * 
 * @returns {Promise<ForeignWord>} a Promise that contains a random foreign word.
 */
export function getRandomForeignWord() {
    return new Promise(async (resolve, _reject) => {
        const data = await getAll();
        resolve(data.randomWord);
    });
}

/**
 * 
 * @returns {Promise<RuleUrlPair>} a Promise that contains a random foreign word.
 */
export function getRandomRule() {
    return new Promise(async (resolve, _reject) => {
        const data = await getAll();
        resolve(data.randomRule);
    });
}

/**
 * 
 * @returns {Promise<ConfusedWord>} a Promise that contains a random confused word.
 */
export function getRandomConfusedWord() {
    return new Promise(async (resolve, _reject) => {
        const data = await getAll();
        resolve(data.randomWord);
    });
}