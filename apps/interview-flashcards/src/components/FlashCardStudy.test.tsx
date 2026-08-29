import { fireEvent, render, screen, within } from "@testing-library/react";
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

  it("shows a 70-card confidence breakdown and updates it immediately", () => {
    render(<FlashCardStudy cards={interviewCards} />);

    expect(screen.getByText("0 / 70 問")).toBeInTheDocument();
    expect(screen.getByText("現在の対象").parentElement).toHaveTextContent("70 問");

    fireEvent.click(screen.getByRole("button", { name: "回答を見る" }));
    fireEvent.click(screen.getByRole("radio", { name: "🙂 だいたいOK" }));

    expect(screen.getByText("1 / 70 問")).toBeInTheDocument();
    expect(screen.getByText("現在の対象").parentElement).toHaveTextContent("70 問");
    const breakdown = screen.getByRole("list", { name: "自信度の内訳" });
    expect(within(breakdown).getByText("3: だいたいOK").nextSibling).toHaveTextContent("1 問");
  });

  it("combines filters and provides a clear action for an empty result", () => {
    render(<FlashCardStudy cards={interviewCards} />);

    fireEvent.change(screen.getByLabelText("カテゴリ"), { target: { value: "network" } });
    fireEvent.change(screen.getByLabelText("自信度フィルター"), { target: { value: "4" } });

    expect(screen.getByText("条件に一致するカードがありません")).toBeInTheDocument();
    expect(screen.getByText("現在の対象").parentElement).toHaveTextContent("0 問");

    fireEvent.click(screen.getByRole("button", { name: "フィルターをすべて解除" }));

    expect(screen.getByText("カード 1 / 70")).toBeInTheDocument();
  });

  it("removes a card from the current queue immediately after confidence changes", () => {
    render(<FlashCardStudy cards={interviewCards} />);

    fireEvent.click(screen.getByRole("checkbox", { name: "未評価のみ" }));
    const firstQuestion = interviewCards[0].question;
    fireEvent.click(screen.getByRole("button", { name: "回答を見る" }));
    const confidenceOption = screen.getByRole("radio", { name: "😣 自信なし" });
    confidenceOption.focus();
    fireEvent.click(confidenceOption);

    expect(screen.queryByRole("heading", { name: firstQuestion })).not.toBeInTheDocument();
    expect(screen.getByText("カード 1 / 69")).toBeInTheDocument();
    expect(screen.getByRole("article")).toHaveFocus();
  });
});
