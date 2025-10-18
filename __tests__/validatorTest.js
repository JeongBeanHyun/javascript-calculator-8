import { validateTokens, validateRawInput } from "../src/validator.js";

describe("양수 테스트", () => {
  test("음수 입력 시 에러 발생", () => {
    const tokens = ["1", "2", "-4"];

    expect(() => validateTokens(tokens)).toThrow(
      "[ERROR] 양수만 입력할 수 있습니다."
    );
  });

  test("0 입력 시 에러 발생", () => {
    const tokens = ["1", "2", "0"];

    expect(() => validateTokens(tokens)).toThrow(
      "[ERROR] 양수만 입력할 수 있습니다."
    );
  });

  test("양수 입력 시 통과", () => {
    const tokens = ["1", "2", "3"];

    expect(() => validateTokens(tokens)).not.toThrow();
  });
});

describe("숫자 테스트", () => {
  test("실수(1.4) 입력 시 에러 발생", () => {
    const tokens = ["1", "2", "1.4"];

    expect(() => validateTokens(tokens)).toThrow(
      "[ERROR] 숫자만 입력할 수 있습니다."
    );
  });

  test("문자(a) 입력 시 에러 발생", () => {
    const tokens = ["1", "2", "a"];

    expect(() => validateTokens(tokens)).toThrow(
      "[ERROR] 숫자만 입력할 수 있습니다."
    );
  });

  test("숫자 입력 시 통과", () => {
    const tokens = ["1", "2", "3"];

    expect(() => validateTokens(tokens)).not.toThrow();
  });
});

describe("null이나 undefined 가 입력된 경우", () => {
  test("null 입력 시 에러 발생", () => {
    const input = null;

    expect(() => validateRawInput(input)).toThrow(
      "[ERROR] 유효하지 않은 입력입니다."
    );
  });

  test("undefined 입력 시 에러 발생", () => {
    const input = undefined;

    expect(() => validateRawInput(input)).toThrow(
      "[ERROR] 유효하지 않은 입력입니다."
    );
  });
});

describe("구분자 사이에 오는 값 테스트", () => {
  test("구분자 사이에 비어있는 값 입력 시 에러 발생", () => {
    const tokens = ["1", "", "4"];

    expect(() => validateTokens(tokens)).toThrow(
      "[ERROR] 구분자 사이에 비어있는 값이 있습니다. 비어있는 값은 계산할 수 없습니다."
    );
  });

  test("비어있는 값 입력 시 에러 발생", () => {
    const tokens = ["1", "2", ""];

    expect(() => validateTokens(tokens)).toThrow(
      "[ERROR] 구분자 사이에 비어있는 값이 있습니다. 비어있는 값은 계산할 수 없습니다."
    );
  });
});
