import fetch from 'node-fetch';

class ConfusedWord {
    improperSpelling: string;
    properSpelling: string;
    
    constructor(proper: string, improper: string) {
        this.properSpelling = proper;
        this.improperSpelling = improper;
    }
}

class TdkContent {
    constructor(confusedWords) {

    }
}

export default function get() {
    return new Promise(async (resolve, reject) => {
        const res = await fetch('https://sozluk.gov.tr/icerik')
        const data = await res.json();
        if (data == null) reject('fetch failed.');
    });
}