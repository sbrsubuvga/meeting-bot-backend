import puppeteer from 'puppeteer';
export class GoogleMeetBot {

  static async join(meetingUrl: string) {
    const email = ''
    const password ='';
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--use-fake-ui-for-media-stream', '--no-sandbox']
    });

    const page = await browser.newPage();

    // Go to Google login page
    await page.goto('https://accounts.google.com/signin/v2/identifier');
    await page.type('input[type="email"]', email, { delay: 50 });
    await page.click('#identifierNext');
    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', password, { delay: 50 });
    await page.click('#passwordNext');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Go to the meeting URL
    await page.goto(meetingUrl);

    // Wait for either "Join now" or "Ask to join" button
    try {
      await page.waitForSelector('button[jsname="Qx7uuf"],button[jsname="CQylAd"]', { visible: true, timeout: 15000 });
      // Try to click "Join now" button
      const joinNowBtn = await page.$('button[jsname="Qx7uuf"]');
      if (joinNowBtn) {
        await joinNowBtn.click();
      } else {
        // If "Join now" not found, click "Ask to join"
        const askToJoinBtn = await page.$('button[jsname="CQylAd"]');
        if (askToJoinBtn) {
          await askToJoinBtn.click();
        }
      }
    } catch (e) {
      console.error('Could not find join or ask to join button:', e);
    }
  }
}
