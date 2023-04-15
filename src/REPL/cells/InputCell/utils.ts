function convertToBase64(data: string) {
  if (data.startsWith("b'") && data.slice(-1) === "'") {
    return `data:image/png;base64,${data.slice(2, -1)}`;
  }

  return data;
}

const INPUT_PARAM_REGEXP = /(\/\w+)(?:\s|^)(\w+)(?=\s|$)/;

function getInputParam(code: string): [string, string] | [] {
  const match = code.match(INPUT_PARAM_REGEXP);

  if (match) return [match[1], match[2]];

  return [];
}

export { getInputParam, convertToBase64 };
