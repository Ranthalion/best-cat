import { test, expect } from '@playwright/test';

test('App should load and display cats', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('h1');

  const titleText = await page.innerText('h1');
  expect(titleText).toBe('Who is the best cat?');

  const cat1Image = await page.locator('label').first();
  const cat2Image = await page.locator('label').nth(1);
  
  const cat1ImageUrl = await cat1Image.getAttribute('style');
  const cat2ImageUrl = await cat2Image.getAttribute('style');

  expect(cat1ImageUrl).toBeTruthy();
  expect(cat2ImageUrl).toBeTruthy();
});

test('App should submit vote successfully', async ({ page }) => {
  await page.goto('/');
  await page.waitForSelector('h1');

  await expect(page.getByText('You have voted for 0 cats!')).toBeVisible();

  await page.locator('label').first().click();
  await page.click('button[type="submit"]');

  await expect(page.getByText('You have voted for 1 cat!')).toBeVisible();
});
