const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // HTML dosyasını yükle
  const htmlPath = path.join(__dirname, 'resume-dark.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  // PDF oluştur - tüm margin'leri ve header/footer'ları kaldır
  await page.pdf({
    path: 'resume-dark-puppeteer.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    },
    displayHeaderFooter: false
  });
  
  await browser.close();
  console.log('PDF oluşturuldu: resume-dark-puppeteer.pdf');
}

generatePDF().catch(console.error); 