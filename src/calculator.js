import { getDelimitersAndNumbersPart, tokenize, toNumbers } from "./parser.js";
import { validateRawInput, validateTokens } from "./validator.js";
import { buildDelimiterRegex } from "./delimiters.js";

function sum(numbers) {
  const result = numbers.reduce((num, add) => num + add, 0);
  return result;
}

export function add(input) {
  validateRawInput(input);

  if (input.trim() === "") return 0;

  const { delimiters, numbersPart } = getDelimitersAndNumbersPart(input);

  const delimiterRegex = buildDelimiterRegex(delimiters);

  const tokens = tokenize(numbersPart, delimiterRegex);

  validateTokens(tokens);

  const numbers = toNumbers(tokens);
  return sum(numbers);
}
