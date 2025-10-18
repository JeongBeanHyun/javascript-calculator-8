import { DEFAULT_DELIMITERS } from "./delimiters.js";

export function getDelimitersAndNumbersPart(input) {
  // 콘솔에서 \n을 두개의 문자로 인식하는 것을 개선하기 위해 줄바꿈 문자로 변환
  input = input.replace("\\n", "\n");
  let delimiters = [...DEFAULT_DELIMITERS];
  let numbersPart = input;

  if (input.startsWith("//")) {
    const customEndIndex = input.indexOf("\n");
    if (customEndIndex === -1) {
      throw new Error("[ERROR] 커스텀 구분자 형식의 끝 문자열은 '\\n' 입니다.");
    }
    const custom = input.slice(2, customEndIndex);

    if (!custom) {
      throw new Error(
        "[ERROR] 커스텀 구분자를 지정하지 않았습니다. 기본 구분자는 ','와 ':'입니다."
      );
    }

    numbersPart = input.slice(customEndIndex + 1);

    if (numbersPart.trim() === "") {
      throw new Error(
        "[ERROR] 커스텀 구분자 뒤에 숫자 입력이 되지 않았습니다."
      );
    }

    if (custom && custom.length > 0) {
      delimiters.push(custom);
    }
  } else {
    const invalidPattern = /[^0-9,:\n]/;
    if (invalidPattern.test(numbersPart)) {
      throw new Error(
        "[ERROR] 커스텀 구분자를 지정하지 않았습니다. 기본 구분자는 ','와 ':'입니다."
      );
    }
  }

  return { delimiters, numbersPart };
}

export function tokenize(numbersPart, delimiters) {
  return numbersPart.split(delimiters);
}

export function toNumbers(tokens) {
  const numbers = tokens.map((n) => Number(n));
  return numbers;
}
