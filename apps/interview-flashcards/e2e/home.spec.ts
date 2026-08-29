import { expect, test } from "@playwright/test";

test("reveals an answer and advances to the next card", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "技術面接の準備を、毎日の習慣に。" }),
  ).toBeVisible();
  await expect(page.getByText("カード 1 / 70")).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "回答例" })).toBeHidden();

  await page.getByRole("button", { name: "回答を見る" }).click();

  await expect(page.getByRole("heading", { level: 3, name: "回答例" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "重要ポイント" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "深掘り質問" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "公式 Reference" })).toBeVisible();
  await expect(page.getByRole("link", { name: /公式情報源を開く/ }).first()).toHaveAttribute(
    "href",
    /^https:\/\//,
  );

  await page.getByRole("radio", { name: "🙂 だいたいOK" }).check();
  await expect(page.getByRole("radio", { name: "🙂 だいたいOK" })).toBeChecked();

  await page.reload();
  await page.getByRole("button", { name: "回答を見る" }).click();
  await expect(page.getByRole("radio", { name: "🙂 だいたいOK" })).toBeChecked();

  await page.getByRole("button", { name: "次のカードへ" }).click();

  await expect(page.getByText("カード 2 / 70")).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: "回答例" })).toBeHidden();
});

test("filters the learning queue and updates progress", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("0 / 70 問")).toBeVisible();
  await page.getByLabel("カテゴリ").selectOption("git");
  await expect(page.getByText("カード 1 / 10")).toBeVisible();
  await page.getByLabel("自信度フィルター").selectOption("4");
  await expect(page.getByText("条件に一致するカードがありません")).toBeVisible();

  await page.getByRole("button", { name: "フィルターをすべて解除" }).click();
  await page.getByRole("button", { name: "回答を見る" }).click();
  await page.getByRole("radio", { name: "💪 自信あり" }).check();

  await expect(page.getByText("1 / 70 問")).toBeVisible();
  await page.getByLabel("自信度フィルター").selectOption("4");
  await expect(page.getByText("カード 1 / 1")).toBeVisible();
});
