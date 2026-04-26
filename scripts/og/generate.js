// Generate 1200x630 OG cards for every page.
// Loads template.html, swaps title/tagline/num/label per card, screenshots, optimizes to JPG.

const puppeteer = require('puppeteer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const TEMPLATE = `file://${path.resolve(__dirname, 'template.html')}`;
const OUT_DIR = path.resolve(__dirname, '..', '..', 'assets', 'og');

const cards = [
  {
    file: 'home',
    title: 'architecture, interiors, construction.',
    tagline: 'One team in Lahore. Same studio designs and builds. Since 2023.',
    num: '00',
    label: 'studio',
    titleClass: 'long',
  },
  {
    file: 'architecture',
    title: 'architecture.',
    tagline: 'Drawing sets, structural and MEP coordination, approval drawings.',
    num: '01',
    label: 'architecture',
  },
  {
    file: 'interior-design',
    title: 'interior design.',
    tagline: 'Layouts, finishes, lighting, joinery, fitout intent.',
    num: '02',
    label: 'interior design',
  },
  {
    file: 'construction',
    title: 'construction.',
    tagline: 'Itemized BOQ. Milestone payments. Weekly site updates.',
    num: '03',
    label: 'construction',
  },
  {
    file: 'supervision',
    title: 'supervision.',
    tagline: 'Quality oversight from kickoff to handover.',
    num: '04',
    label: 'supervision',
  },
  {
    file: 'corporate',
    title: 'office fitout.',
    tagline: 'Design and build under one contract. Single number, single team.',
    num: '05',
    label: 'office fitout',
  },
  {
    file: 'furniture',
    title: 'furniture.',
    tagline: 'Designed in Lahore. Fabricated by trusted partners.',
    num: '06',
    label: 'furniture',
  },
  {
    file: 'projects',
    title: 'selected work.',
    tagline: 'Villas, apartments, offices, renovations across Pakistan and the Gulf.',
    num: '07',
    label: 'projects',
  },
  {
    file: 'about',
    title: 'the studio.',
    tagline: 'A Lahore practice led by Mir Sohaib Sajid, Principal Architect.',
    num: '08',
    label: 'about',
  },
];

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    defaultViewport: { width: 1200, height: 630, deviceScaleFactor: 2 },
  });
  const page = await browser.newPage();

  for (const card of cards) {
    await page.goto(TEMPLATE, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);

    await page.evaluate((c) => {
      const titleEl = document.getElementById('title');
      titleEl.innerHTML = c.title.replace(
        /\.$/,
        '<span class="dot">.</span>'
      );
      titleEl.className = 'title' + (c.titleClass ? ' ' + c.titleClass : '');
      document.getElementById('tagline').textContent = c.tagline;
      document.getElementById('num').textContent = c.num;
      document.getElementById('label').textContent = c.label;
    }, card);

    await new Promise((r) => setTimeout(r, 200));

    const pngBuffer = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630 },
      omitBackground: false,
    });

    const outPath = path.join(OUT_DIR, `${card.file}.jpg`);
    await sharp(pngBuffer)
      .resize(1200, 630, { fit: 'cover' })
      .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' })
      .toFile(outPath);

    const { size } = fs.statSync(outPath);
    console.log(`✓ ${card.file}.jpg  (${(size / 1024).toFixed(1)} KB)`);
  }

  await browser.close();
  console.log('\nAll 9 cards generated to /assets/og/');
})();
