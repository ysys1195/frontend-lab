import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("introduces the interview flashcards app", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "技術面接の準備を、毎日の習慣に。" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Interview Flashcards")).toBeInTheDocument();
  });
});
