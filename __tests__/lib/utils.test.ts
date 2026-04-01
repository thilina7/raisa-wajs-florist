import { describe, it, expect } from "vitest";
import { formatPrice, cn } from "@/lib/utils";

describe("formatPrice", () => {
  it("formats a whole number as GBP currency", () => {
    expect(formatPrice(29)).toBe("£29.00");
  });

  it("formats a decimal number as GBP currency", () => {
    expect(formatPrice(29.99)).toBe("£29.99");
  });

  it("formats zero as GBP currency", () => {
    expect(formatPrice(0)).toBe("£0.00");
  });
});

describe("cn", () => {
  it("merges class names", () => {
    const result = cn("px-4", "py-2");
    expect(result).toBe("px-4 py-2");
  });

  it("handles conditional classes", () => {
    const result = cn("base", false && "hidden", "visible");
    expect(result).toBe("base visible");
  });

  it("merges conflicting Tailwind classes", () => {
    const result = cn("px-4", "px-6");
    expect(result).toBe("px-6");
  });
});
