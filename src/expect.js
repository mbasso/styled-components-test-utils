import init from './init';
import * as matchers from './';

init();

export default function injectStyledUtils(expect) {
  const extension = {};
  Object.keys(matchers).forEach((x) => {
    extension[x] = function matcher(...params) {
      const test = matchers[x](this.actual, ...params);

      expect.assert(
        test.pass,
        test.message,
      );
      return this;
    };
  });

  expect.extend(extension);
}
