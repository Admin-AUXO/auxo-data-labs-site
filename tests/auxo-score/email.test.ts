import { describe, expect, it } from "vitest";
import { checkWorkEmail } from "../../src/lib/auxo-score/email";

describe("checkWorkEmail", () => {
  it("accepts a company address", () => expect(checkWorkEmail("a@b.co")).toBe(""));
  it("rejects free domains", () => expect(checkWorkEmail("x@gmail.com")).toMatch(/company email/));
  it("rejects bad format", () => expect(checkWorkEmail("bad@")).toMatch(/valid email/));
  it("trims and lowercases", () => {
    expect(checkWorkEmail("  Name@Company.COM  ")).toBe("");
    expect(checkWorkEmail("  X@GMAIL.com ")).toMatch(/company email/);
  });
});
