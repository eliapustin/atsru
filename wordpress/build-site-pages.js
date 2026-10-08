// Generate server-rendered page fragments from the current site content.
// Run with: node wordpress/build-site-pages.js
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const output = path.join(__dirname, 'ats-site', 'content');
fs.mkdirSync(output, { recursive: true });
const context = vm.createContext({});
for (const file of ['data.js', 'components.js', 'pages.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'assets', 'js', file), 'utf8'), context, { filename: file });
}

const pages = {
  front: 'home()',
  education: 'education()',
  procurement: 'procurement()',
  documents: 'documents()',
  about: 'about()',
  contacts: 'contacts()',
  equipment: 'equipment()',
};
const products = vm.runInContext('products.map(p => p.id)', context);
for (const product of products) pages[`product-${product}`] = `productPage(products.find(p => p.id === '${product}'))`;

function convert(html) {
  return html
    .replace(/href="#\/(.*?)"/g, (_, route) => `href="{{ATS_HOME}}${route ? `${route}/` : ''}"`)
    .replaceAll('http://astru-news.local/', '{{ATS_HOME}}news/')
    .replace(/(src|poster|href)="assets\//g, '$1="{{ATS_ASSET}}')
    .replace(/[\t ]+$/gm, '');
}

for (const [name, expression] of Object.entries(pages)) {
  const html = convert(vm.runInContext(expression, context));
  fs.writeFileSync(path.join(output, `${name}.html`), html + '\n');
}
const shell = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const modal = shell.match(/<div class="modal-backdrop" id="form-modal"[\s\S]*?<\/form>\s*<\/div>\s*<\/div>/);
if (!modal) throw new Error('The contact form modal was not found in index.html');
fs.writeFileSync(path.join(output, 'form-modal.html'), modal[0] + '\n');
console.log(`Generated ${Object.keys(pages).length} WordPress page fragments.`);
