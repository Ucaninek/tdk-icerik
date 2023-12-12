# tdk-icerik
 tdk sitesinde bulunan rastgele atasozu, deyim, yanlis yazilan kelimeler vb icerikleri tdk apisinden ceker.

## Kurulum

```bash
npm install tdk-icerik
```

## Kullanim

```javascript
import * as tdk from 'tdk-content';

console.log(await tdk.getAll());
console.log(await tdk.getRandomRule());
console.log(await tdk.getRandomWord());
console.log(await tdk.getRandomForeignWord());
console.log(await tdk.getRandomConfusedWord());
```
