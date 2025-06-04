import puppeteer from 'puppeteer';

export class GoogleMeetBot {
  static async join(meetingUrl: string) {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--use-fake-ui-for-media-stream', '--no-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(meetingUrl);

    // Auto-join logic
    await page.waitForSelector('button[jsname="Qx7uuf"]');
    await page.click('button[jsname="Qx7uuf"]');
  }
}
