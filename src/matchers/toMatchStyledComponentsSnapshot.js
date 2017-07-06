/* eslint-disable */
import chalk from 'chalk';
import diff from 'jest-diff';
import stripAnsi from 'strip-ansi';
import { toMatchSnapshot } from 'jest-snapshot';
/* eslint-enable */

const isAddition = line => /^\+/.test(line);

const isDeletion = line => /^-/.test(line);

const isClassName = line => (
  (isAddition(line) || isDeletion(line)) &&
  (/\.[a-zA-Z]+/.test(line) || /className="(sc-)?[a-zA-Z ]+"/.test(line))
);

const colorize = message => (
  message.split('\n').map((line) => {
    if (isClassName(line)) {
      return chalk.white(line);
    }

    if (isAddition(line)) {
      return chalk.red(line);
    }

    if (isDeletion(line)) {
      return chalk.green(line);
    }

    return chalk.dim(line);
  }).join('\n')
);

export default function toMatchStyledComponentsSnapshot(received) {
  const result = toMatchSnapshot.call(this, received);
  let message;

  if (!result.pass) {
    message = diff(result.expected, result.actual, {
      aAnnotation: 'Snapshot',
      bAnnotation: 'Received',
    });
    message = stripAnsi(message);
    message = colorize(message);
  }

  return {
    pass: result.pass,
    message,
  };
}
