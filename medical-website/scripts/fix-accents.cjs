const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const exts = new Set(['.jsx', '.tsx', '.html']);

/** Pairs of [regex, replacement] for common mojibake in ES text */
const fixes = [
  [/Cl��nica/g, 'Clínica'],
  [/cl��nica/g, 'clínica'],
  [/Navegaci��n/g, 'Navegación'],
  [/m��vil/g, 'móvil'],
  [/Espa��a/g, 'España'],
  [/D��az/g, 'Díaz'],
  [/Cirug��a/g, 'Cirugía'],
  [/Endocrinolog��a/g, 'Endocrinología'],
  [/atenci��n/g, 'atención'],
  [/Atenci��n/g, 'Atención'],
  [/m1dico/g, 'médico'], // fallback for odd sequence
  [/mǸdico/g, 'médico'],
  [/m1dica/g, 'médica'],
  [/Qu1/g, 'Quién'],
  [/Qu1/g, 'Quién'],
  [/Qu1 atiende/g, 'Quién atiende'],
  [/Cu�ntanos/g, 'Cuéntanos'],
  [/c�mo/g, 'cómo'],
  [/Enviando�?�/g, 'Enviando…'],
  [/��Gracias!/g, '¡Gracias!'],
  [/menǧ/g, 'menú'],
  [/R�o/g, 'Río'],
  [/Orqu��dea/g, 'Orquídea'],
  [/m��dico/g, 'médico'],
  [/educaci��n/g, 'educación'],
  [/p1gina/g, 'página'],
  [/Saber mǭs/g, 'Saber más'],
  [/Saber m1s/g, 'Saber más'],
  [/WhatsApp o llamar si lo prefieres\./g, 'WhatsApp o llamar si lo prefieres.'],
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(p);
    } else if (exts.has(path.extname(p))) {
      let s = fs.readFileSync(p, 'utf8');
      const before = s;
      for (const [re, rep] of fixes) s = s.replace(re, rep);
      if (s !== before) {
        fs.writeFileSync(p, s);
        console.log('fixed', path.relative(ROOT, p));
      }
    }
  }
}

walk(path.join(ROOT, 'src'));
['index.html', 'public/legal/aviso-legal/index.html', 'public/legal/privacidad/index.html'].forEach(f => {
  const p = path.join(ROOT, f);
  if (fs.existsSync(p)) {
    let s = fs.readFileSync(p, 'utf8');
    const before = s;
    for (const [re, rep] of fixes) s = s.replace(re, rep);
    if (s !== before) {
      fs.writeFileSync(p, s);
      console.log('fixed', f);
    }
  }
});

console.log('done');

