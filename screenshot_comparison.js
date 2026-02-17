const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to standard desktop size
  await page.setViewportSize({ width: 1920, height: 1080 });

  console.log('Taking screenshots of coldlava.ai...');

  // Screenshot 1: coldlava.ai hero section
  await page.goto('https://coldlava.ai', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/Users/oliver/sales-deck/screenshots/coldlava-hero.png', fullPage: false });

  // Scroll to see ticker
  await page.evaluate(() => window.scrollBy(0, 100));
  await page.screenshot({ path: '/Users/oliver/sales-deck/screenshots/coldlava-ticker.png', fullPage: false });

  // Screenshot of a card section (scroll down more)
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.screenshot({ path: '/Users/oliver/sales-deck/screenshots/coldlava-cards.png', fullPage: false });

  console.log('Taking screenshots of sales deck...');

  // Screenshot 2: Sales deck hero section
  await page.goto('https://sales-rep-onboarding-final.vercel.app', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // Wait for animations
  await page.screenshot({ path: '/Users/oliver/sales-deck/screenshots/salesdeck-hero.png', fullPage: false });

  // Scroll to ticker
  await page.evaluate(() => window.scrollBy(0, 100));
  await page.screenshot({ path: '/Users/oliver/sales-deck/screenshots/salesdeck-ticker.png', fullPage: false });

  // Scroll to Section 6 (sales points cards)
  await page.evaluate(() => {
    document.querySelector('#sales-points')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '/Users/oliver/sales-deck/screenshots/salesdeck-cards.png', fullPage: false });

  // Open Tier 3 accordion to see website previews
  await page.evaluate(() => {
    document.querySelector('#tier-3')?.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(500);
  await page.click('#tier-3 .tier-header');
  await page.waitForTimeout(1000); // Wait for accordion animation
  await page.screenshot({ path: '/Users/oliver/sales-deck/screenshots/salesdeck-tier3.png', fullPage: false });

  console.log('Screenshots saved to /Users/oliver/sales-deck/screenshots/');
  console.log('Files created:');
  console.log('- coldlava-hero.png');
  console.log('- coldlava-ticker.png');
  console.log('- coldlava-cards.png');
  console.log('- salesdeck-hero.png');
  console.log('- salesdeck-ticker.png');
  console.log('- salesdeck-cards.png');
  console.log('- salesdeck-tier3.png');

  await browser.close();
})();
