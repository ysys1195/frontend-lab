import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { InterviewCard } from "@/data/interview-cards";
import { FlashCard } from "./FlashCard";

const card: InterviewCard = {
  id: "test-card",
  category: "frontend",
  question: "テスト用の質問ですか？",
  answer: "テスト用の回答です。",
  senkuMemo: "テスト用の学習メモです。",
  keyPoints: ["重要なポイント"],
  followUps: ["深掘りする質問ですか？"],
  references: [
    {
      title: "Official documentation",
      url: "https://example.com/docs",
    },
  ],
};

describe("FlashCard", () => {
  it("shows the question while keeping the answer hidden initially", () => {
    render(<FlashCard card={card} />);

    expect(screen.getByText("React / Vue / Webフロントエンド")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: card.question })).toBeInTheDocument();
    expect(screen.queryByText(card.answer)).not.toBeInTheDocument();
    expect(screen.queryByText(card.senkuMemo)).not.toBeInTheDocument();
  });

  it("reveals all answer content and an official reference link", () => {
    render(<FlashCard card={card} />);

    fireEvent.click(screen.getByRole("button", { name: "回答を見る" }));

    expect(screen.getByText(card.answer)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "千空メモ" })).toBeInTheDocument();
    expect(screen.getByText(card.senkuMemo)).toBeInTheDocument();
    expect(screen.getByText(card.keyPoints[0])).toBeInTheDocument();
    expect(screen.getByText(card.followUps[0])).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Official documentation/ }),
    ).toHaveAttribute("href", card.references[0].url);
  });

  it("exposes accessible confidence choices after revealing the answer", () => {
    render(<FlashCard card={card} confidence={2} />);

    fireEvent.click(screen.getByRole("button", { name: "回答を見る" }));

    expect(screen.getByRole("radio", { name: "🤔 少し不安" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "💪 自信あり" })).not.toBeChecked();
  });

  it("records an explicit re-selection of the current confidence", () => {
    const onConfidenceChange = vi.fn();
    render(
      <FlashCard
        card={card}
        confidence={2}
        onConfidenceChange={onConfidenceChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "回答を見る" }));
    fireEvent.click(screen.getByRole("radio", { name: "🤔 少し不安" }));

    expect(onConfidenceChange).toHaveBeenCalledOnce();
    expect(onConfidenceChange).toHaveBeenCalledWith(2);
  });
});
