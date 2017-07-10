import init from './init';
import * as matchers from './';

init();

export default function injectStyledUtils(jasmine) {
  const extension = {};
  Object.keys(matchers).forEach((x) => {
    extension[x] = () => ({
      compare: matchers[x],
    });
  });
  jasmine.addMatchers(extension);
}
