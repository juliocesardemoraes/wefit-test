import { generateCNPJ, generateCPF } from "../../../utils/utils.js";
import { validCNPJ, validCPF } from "../schema/customvalidator.js";

describe("CNPJ CHECK", () => {
  it("should return true for 100 valid CNPJs formats", () => {
    for (let i = 0; i < 100; i++) {
      const checkCNPJ = generateCNPJ();
      expect(validCNPJ(checkCNPJ)).toBe(true);
    }
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

describe("CPF CHECK", () => {
  it("should return true for 100 valid CPFs formats", () => {
    for (let i = 0; i < 100; i++) {
      const checkCPF = generateCPF();
      expect(validCPF(checkCPF)).toBe(true);
    }
  });

  it("should return false for an invalid CPF format", () => {
    const invalidCPF = "000.000.000-00";
    expect(validCPF(invalidCPF)).toBe(false);
  });

  it("should return false for non-string and non-array inputs", () => {
    expect(validCPF(12345678901)).toBe(false);
  });

  it("should return false for empty input", () => {
    expect(validCPF("")).toBe(false);
  });

  it("should return false for a CPF with invalid length", () => {
    const invalidLengthCPF = "123.456.789-0";
    expect(validCPF(invalidLengthCPF)).toBe(false);
  });

  it("should return false for a CPF with all identical digits", () => {
    const identicalDigitsCPF = "111.111.111-11";
    expect(validCPF(identicalDigitsCPF)).toBe(false);
  });
});
