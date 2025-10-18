import {
  getDelimitersAndNumbersPart,
  tokenize,
  toNumbers,
} from "../src/parser";

const buildRegex = (delims) =>
  new RegExp(
    delims.map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"),
    "g"
  );

describe("기본 구분자 혹은 커스텀 구분자 파싱 테스트", () => {
  test("기본 구분자만 있을 때 그대로 반환", () => {
    const input = "1,2:3";
    const { delimiters, numbersPart } = getDelimitersAndNumbersPart(input);
    expect(delimiters).toEqual([",", ":"]);
    expect(numbersPart).toBe("1,2:3");
  });

  test("커스텀 구분자 ; 입력시 구분자 추가", () => {
    const input = "//;\n1;2;3";
    const { delimiters, numbersPart } = getDelimitersAndNumbersPart(input);
    expect(delimiters).toEqual([",", ":", ";"]);
    expect(numbersPart).toBe("1;2;3");
  });

  test("커스텀 구분자 형식에서 \n 이 없을 시 에러 발생", () => {
    const input = "//;1;2;3";
    expect(() => getDelimitersAndNumbersPart(input)).toThrow(
      "[ERROR] 커스텀 구분자 형식의 끝 문자열은 '\\n' 입니다."
    );
  });

  test("커스텀 구분자 미지정 상태에서 기본 구분자를 제외한 문자를 구분자로 사용할 시 예외 발생", () => {
    const input = "1+2+3";
    expect(() => getDelimitersAndNumbersPart(input)).toThrow(
      "[ERROR] 커스텀 구분자를 지정하지 않았습니다. 기본 구분자는 ','와 ':'입니다."
    );
  });

  test("커스텀 구분자 뒤 숫자 미입력 시 예외 발생", () => {
    const input = "//;\n";
    expect(() => getDelimitersAndNumbersPart(input)).toThrow(
      "[ERROR] 커스텀 구분자 뒤에 숫자 입력이 되지 않았습니다."
    );
  });
});

describe("구분자 분리하여 배열에 저장", () => {
  test("기본 구분자(, :)로 분리", () => {
    const numbersPart = "1,2:3";
    const regex = buildRegex([",", ":"]);
    const tokens = tokenize(numbersPart, regex);
    expect(tokens).toEqual(["1", "2", "3"]);
  });

  test("커스텀 구분자 ;로 분리", () => {
    const numbersPart = "10;20;30";
    const regex = buildRegex([";"]);
    const tokens = tokenize(numbersPart, regex);

    expect(tokens).toEqual(["10", "20", "30"]);
  });
});

test("문자 배열을 숫자 배열로 변환", () => {
  expect(toNumbers(["1", "02", "003"])).toEqual([1, 2, 3]);
});
