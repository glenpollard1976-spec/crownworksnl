// Test script to verify ProVet buttons are working
const puppeteer = require('puppeteer');

async function testProVetButtons() {
  console.log('🔍 Testing ProVet buttons...');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('#provet');

    // Get all buttons in ProVet section
    const buttons = await page.$$eval('#provet button', buttons =>
      buttons.map(btn => ({
        text: btn.textContent.trim(),
        type: btn.type,
        className: btn.className
      }))
    );

    console.log(`✅ Found ${buttons.length} buttons in ProVet section:`);
    buttons.forEach((btn, i) => {
      console.log(`  ${i+1}. "${btn.text}" (${btn.type})`);
    });

    // Test button clicks by checking if console logs appear
    console.log('\n🖱️ Testing button clicks...');

    // Listen for console messages
    const consoleMessages = [];
    page.on('console', msg => {
      consoleMessages.push(msg.text());
    });

    // Click the first button (Start Free Trial)
    await page.click('#provet button:first-child');
    await page.waitForTimeout(500);

    const clickLogs = consoleMessages.filter(msg =>
      msg.includes('clicked') || msg.includes('Start Free Trial')
    );

    if (clickLogs.length > 0) {
      console.log('✅ Button click detected in console!');
      clickLogs.forEach(log => console.log(`   "${log}"`));
    } else {
      console.log('⚠️ No click logs found - buttons may not be responding');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

testProVetButtons();
