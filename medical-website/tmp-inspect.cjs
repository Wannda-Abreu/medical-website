const sample = "NavegaciÃ³n";
const fixed = Buffer.from(sample, 'latin1').toString('utf8');
console.log(sample);
console.log(fixed);
console.log([...fixed].map(ch => ch.charCodeAt(0)));
