export function validateRawInput(input) {
  if (input === null || input === undefined) {
    throw new Error("[ERROR] 유효하지 않은 입력입니다.");
  }
}

export function validateTokens(tokens) {
  let i = 0;
  while (i < tokens.length) {
    const value = String(tokens[i]).trim();

    if (value === "") {
      throw new Error(
        "[ERROR] 구분자 사이에 비어있는 값이 있습니다. 비어있는 값은 계산할 수 없습니다."
      );
    }

    if (!/^[+-]?\d+$/.test(value)) {
      throw new Error("[ERROR] 숫자만 입력할 수 있습니다.");
    }
    const num = Number(value);

    if (num <= 0) {
      throw new Error("[ERROR] 양수만 입력할 수 있습니다.");
    }
    i++;
  }
}
