import * as matchers from './';
import toMatchStyledComponentsSnapshot from './matchers/toMatchStyledComponentsSnapshot';

const extension = {};
Object.keys(matchers).forEach((x) => {
  extension[x] = (...params) => matchers[x](...params);
});

extension.toMatchStyledComponentsSnapshot = toMatchStyledComponentsSnapshot;

expect.extend(extension);
