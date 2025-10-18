import { add } from "../src/calculator";

describe("문자열 덧셈 계산하기", () => {
  test("빈 문자열이면 0 반환", () => {
    expect(add("")).toBe(0);
    expect(add(" ")).toBe(0);
  });

  test("기본 구분자(, :)로 합산", () => {
    expect(add("1,2:3")).toBe(6);
  });

  test("//;\\n 커스텀 구분자로 합산", () => {
    expect(add("//;\n1;2;3")).toBe(6);
  });

  test("멀티문자 커스텀 구분자도 동작", () => {
    expect(add("//***\n1***2***3")).toBe(6);
  });
});
