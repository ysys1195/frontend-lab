import { expect, test } from "@playwright/test";

test("shows the interview flashcards landing page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "技術面接の準備を、毎日の習慣に。" }),
  ).toBeVisible();
});
