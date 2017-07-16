import chalk from 'chalk';
import getCSS from '../utils/getCSS';
import getCodeBlock from '../utils/getCodeBlock';

const findKeyframeCode = (keyframe) => {
  const css = getCSS();
  const keyframeMatches = new RegExp(`@keyframes\\s*${keyframe}\\s*{(.*)`).exec(css);

  const trailingCode = keyframeMatches && keyframeMatches[0];
  if (!trailingCode) return '';

  return getCodeBlock(trailingCode);
};

const toHaveKeyframeRule = (received, keyframeSelector, selector, expected) => {
  const keyframeCode = findKeyframeCode(received);

  const getMessage = value =>
    `Expected keyframe to have ${keyframeSelector} ${selector} matching\n\t${chalk.green(expected)}\nreceived:\n\t${chalk.red(value)}`;

  const error = {
    pass: false,
    message: `Property not found: ${chalk.red(keyframeSelector)} ${chalk.red(selector)}`,
  };

  if (keyframeCode === '') return error;

  const styles = new RegExp(`(?:[^\\d]|^)${keyframeSelector}\\s*{([^}]*)`, 'g').exec(keyframeCode);
  const capture = new RegExp(`(?:[^\\-]|^)${selector}\\s*:\\s*([^;]+)`, 'g');

  const matches = styles && styles[1].match(capture);
  if (!matches) return error;

  const values = matches.map(r => r.replace(capture, '$1').trim());
  const val = values && values[0] && values[values.length - 1];

  return {
    message: getMessage(val),
    pass: values.some(
      v => (expected instanceof RegExp ? v.match(expected) : v === expected),
    ),
  };
};

export default toHaveKeyframeRule;
