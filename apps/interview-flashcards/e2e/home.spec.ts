import { expect, test } from "@playwright/test";

const mobileViewports = [375, 390, 430] as const;

for (const width of mobileViewports) {
  test(`keeps the study screen usable without horizontal overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.getByRole("button", { name: "回答を見る" }).click();

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(width);
    await expect(page.getByRole("button", { name: "回答を閉じる" })).toBeVisible();
    await expect(page.getByRole("radio", { name: "💪 自信あり" })).toBeVisible();

    const undersizedTargets = await page
      .locator("button, select, a[href], label:has(input)")
      .evaluateAll((elements) =>
        elements
          .filter((element) => element.getBoundingClientRect().height > 0)
          .filter((element) => element.getBoundingClientRect().height < 44)
          .map((element) => ({
            element: element.tagName,
            height: element.getBoundingClientRect().height,
            label: element.textContent?.trim() ?? "",
          })),
      );
    expect(undersizedTargets).toEqual([]);
  });
}

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

test("supports primary study actions with the keyboard and exposes answer state", async ({
  page,
}) => {
  await page.goto("/");

  const categoryFilter = page.getByLabel("カテゴリ");
  await categoryFilter.focus();
  await page.keyboard.press("g");
  await expect(categoryFilter).toHaveValue("git");

  const unreviewedOnly = page.getByRole("checkbox", { name: "未評価のみ" });
  await unreviewedOnly.focus();
  await page.keyboard.press("Space");
  await expect(unreviewedOnly).toBeChecked();

  const revealButton = page.getByRole("button", { name: "回答を見る" });
  await revealButton.focus();
  await expect(revealButton).toBeFocused();
  const focusOutline = await revealButton.evaluate((element) => {
    const styles = window.getComputedStyle(element);
    return { style: styles.outlineStyle, width: styles.outlineWidth };
  });
  expect(focusOutline.style).not.toBe("none");
  expect(focusOutline.width).not.toBe("0px");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "回答を閉じる" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );

  const confidenceOption = page.getByRole("radio", { name: "🤔 少し不安" });
  await confidenceOption.focus();
  await page.keyboard.press("Space");
  await expect(page.getByText("1 / 70 問")).toBeVisible();
  await expect(page.getByText("カード 1 / 9")).toBeVisible();

  const nextCardButton = page.getByRole("button", { name: "次のカードへ" });
  await nextCardButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText(/カード 2 \/ /)).toBeVisible();
});
