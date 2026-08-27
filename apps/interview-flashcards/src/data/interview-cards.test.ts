import { describe, expect, it } from "vitest";
import { interviewCards, type Category } from "./interview-cards";

const expectedCategoryCounts: Record<Category, number> = {
  "computer-science": 8,
  network: 12,
  security: 10,
  design: 10,
  frontend: 20,
  git: 10,
};

const officialReferenceHosts = new Set([
  "cheatsheetseries.owasp.org",
  "developer.mozilla.org",
  "git-scm.com",
  "nextjs.org",
  "owasp.org",
  "react.dev",
  "www.rfc-editor.org",
  "vuejs.org",
]);

describe("interviewCards", () => {
  it("contains exactly 70 cards with the expected category distribution", () => {
    const categoryCounts = Object.fromEntries(
      Object.keys(expectedCategoryCounts).map((category) => [category, 0]),
    ) as Record<Category, number>;

    for (const card of interviewCards) {
      categoryCounts[card.category] += 1;
    }

    expect(interviewCards).toHaveLength(70);
    expect(categoryCounts).toEqual(expectedCategoryCounts);
  });

  it("uses a non-empty unique ID for every card", () => {
    const ids = interviewCards.map(({ id }) => id);

    expect(ids.every((id) => id.trim().length > 0)).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("provides every required content field", () => {
    for (const card of interviewCards) {
      expect(card.question.trim()).not.toBe("");
      expect(card.answer.trim()).not.toBe("");
      expect(card.keyPoints.length).toBeGreaterThan(0);
      expect(card.keyPoints.every((point) => point.trim().length > 0)).toBe(true);
      expect(card.followUps.length).toBeGreaterThan(0);
      expect(card.followUps.every((followUp) => followUp.trim().length > 0)).toBe(
        true,
      );
      expect(card.references.length).toBeGreaterThan(0);
    }
  });

  it("uses named HTTPS references from the approved official sources", () => {
    for (const { references } of interviewCards) {
      for (const reference of references) {
        expect(reference.title.trim()).not.toBe("");

        const url = new URL(reference.url);
        expect(url.protocol).toBe("https:");
        expect(officialReferenceHosts.has(url.hostname)).toBe(true);
      }
    }
  });
});
