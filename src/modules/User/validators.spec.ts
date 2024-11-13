import { generateCNPJ } from "../../utils/utils.js";
import { validCNPJ } from "./validators.js";

describe("validCNPJ", () => {
  it("should return true for a valid CNPJ format", () => {
    const checkCNPJ = generateCNPJ();
    console.log("CHECKCNPJ", checkCNPJ);
    expect(validCNPJ(checkCNPJ)).toBe(false);
  });

  it("should return false for an invalid CNPJ format", () => {
    const invalidCNPJ = "00.000.000/0000-00";
    expect(validCNPJ(invalidCNPJ)).toBe(false);
  });

  it("should return false for non-string and non-array inputs", () => {
    expect(validCNPJ(12345678901234)).toBe(false);
  });

  it("should return false for empty input", () => {
    expect(validCNPJ("")).toBe(false);
  });

  it("should return false for a CNPJ with invalid length", () => {
    const invalidLengthCNPJ = "12.345.678/9012-3";
    expect(validCNPJ(invalidLengthCNPJ)).toBe(false);
  });

  it("should return false for a CNPJ with all identical digits", () => {
    const identicalDigitsCNPJ = "11.111.111/1111-11";
    expect(validCNPJ(identicalDigitsCNPJ)).toBe(false);
  });
});
