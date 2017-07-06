export default (code) => {
  const start = code.indexOf('{');
  if (start === -1) return '';

  let i = start + 1;
  let parenthesis = 1;
  while (parenthesis !== 0 || i === start + 1) {
    const char = code[i];
    if (char === '{') {
      parenthesis += 1;
    } else if (char === '}') {
      parenthesis -= 1;
    }
    i += 1;
  }
  return code.substring(start, i - 1);
};
