/// <reference types="@testing-library/jest-dom" />

import React from "react";
import { Button } from "../src/components/ui/Button";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
  it("should render with correct text", () => {
    render(<Button>Valider</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Valider");
  });
});

it("calls onClick when clicked", () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  const button = screen.getByRole("button");
  button.click();

  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("had submit type when type is specified", () => {
  render(<Button type="submit">Valider</Button>);
  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("type", "submit");
});

it("had default type when type is not specified", () => {
  render(<Button>Valider</Button>);
  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("type", "button");
});

it("apply classes personalized", () => {
  render(<Button className="bg-bluewize">Valider</Button>);
  const button = screen.getByRole("button");
  expect(button).toHaveClass("bg-bluewize");
});
