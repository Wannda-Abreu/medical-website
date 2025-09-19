const fs = require('fs');
const path = require('path');

const NEW_ADDR = 'C. R\\u00EDo, 813003 Ciudad Real';
const NEW_CITY = 'Ciudad Real, Castilla-La Mancha, Espa\\u00F1a';

function replaceInFile(file, replacers) {
  const p = path.join(__dirname, '..', file);
  let s = fs.readFileSync(p, 'utf8');
  const before = s;
  for (const [re, val] of replacers) s = s.replace(re, val);
  if (s !== before) {
    fs.writeFileSync(p, s);
    console.log('updated', file);
  } else {
    console.log('nochange', file);
  }
}

// Contact.jsx: addressLabel + mapQuery
replaceInFile('src/components/sections/Contact.jsx', [
  [/addressLabel:\s*"[^"]*"/, `addressLabel: "${NEW_ADDR}"`],
  [/mapQuery:\s*"[^"]*"/, `mapQuery: "${NEW_ADDR}"`],
]);

// Team.jsx clinic address + areaServed
replaceInFile('src/components/sections/Team.jsx', [
  [/streetAddress:\s*"[^"]*"/, 'streetAddress: "C. R\\u00EDo"'],
  [/areaServed:\s*"[^"]*"/, `areaServed: "${NEW_CITY}"`],
]);

// DoctorDialog.jsx JSON-LD area/address (first occurrences inside JSON-LD)
replaceInFile('src/components/common/DoctorDialog.jsx', [
  [/areaServed:\s*"[^"]*"/, `areaServed: "${NEW_CITY}"`],
  [/address:\s*"[^"]*"/, `address: "${NEW_ADDR}, Castilla-La Mancha, Espa\\u00F1a"`],
]);

// index.html JSON-LD clinic locality + areaServed
replaceInFile('index.html', [
  [/"addressLocality":"[^"]*"/, '"addressLocality":"Ciudad Real"'],
  [/"areaServed":"[^"]*"/, `"areaServed":"${NEW_CITY}"`],
]);

console.log('done');

