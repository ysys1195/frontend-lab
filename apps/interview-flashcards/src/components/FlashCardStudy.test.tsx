import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { interviewCards } from "@/data/interview-cards";
import { FlashCardStudy } from "./FlashCardStudy";

describe("FlashCardStudy", () => {
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
});
