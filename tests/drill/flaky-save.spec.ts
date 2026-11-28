import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

test('Flakiness drill - save message', async ({ page }) => {
  const fileUrl = pathToFileURL(path.join(__dirname, 'index.html')).href;

  await page.goto(fileUrl);
  await page.locator('#save').click();

  // Retries automatically until #status shows "Saved"
  await expect(page.locator('#status')).toHaveText('Saved');
});