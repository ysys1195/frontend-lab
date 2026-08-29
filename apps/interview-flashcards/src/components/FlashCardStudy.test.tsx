import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { LEARNING_PROGRESS_STORAGE_KEY } from "@/lib/storage";
import { interviewCards } from "@/data/interview-cards";
import { FlashCardStudy } from "./FlashCardStudy";

describe("FlashCardStudy", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("identifies the current card and advances through the supplied cards", () => {
    render(<FlashCardStudy cards={interviewCards} />);

    expect(screen.getByText(`カード 1 / ${interviewCards.length}`)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: interviewCards[0].question }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "次のカードへ" }));

    expect(screen.getByText(`カード 2 / ${interviewCards.length}`)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: interviewCards[1].question }),
    ).toBeInTheDocument();
  });

  it("persists confidence for the current card", () => {
    render(<FlashCardStudy cards={interviewCards} />);

    fireEvent.click(screen.getByRole("button", { name: "回答を見る" }));
    fireEvent.click(screen.getByRole("radio", { name: "🙂 だいたいOK" }));

    const stored = JSON.parse(
      window.localStorage.getItem(LEARNING_PROGRESS_STORAGE_KEY) ?? "",
    );
    expect(stored.version).toBe(1);
    expect(stored.cards[interviewCards[0].id]).toMatchObject({
      confidence: 3,
      reviewCount: 1,
    });
    expect(stored.cards[interviewCards[0].id].lastReviewedAt).toEqual(expect.any(String));
  });
});
