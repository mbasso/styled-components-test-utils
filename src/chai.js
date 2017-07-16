import init from './init';
// eslint-disable-next-line
import chai from 'chai';
import * as matchers from './';

init();

Object.keys(matchers).forEach((x) => {
  chai.Assertion.addMethod(x, function matcher(...params) {
    // eslint-disable-next-line
    const test = matchers[x](this._obj, ...params);

    this.assert(
      test.pass,
      test.message,
    );
  });
});
