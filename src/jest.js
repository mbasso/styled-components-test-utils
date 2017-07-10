import init from './init';
import * as matchers from './';
import toMatchStyledComponentsSnapshot from './matchers/toMatchStyledComponentsSnapshot';
import styleSheetSerializer from './serializers/styleSheetSerializer';

init();

const extension = {};
Object.keys(matchers).forEach((x) => {
  extension[x] = (...params) => matchers[x](...params);
});

extension.toMatchStyledComponentsSnapshot = toMatchStyledComponentsSnapshot;

expect.addSnapshotSerializer(styleSheetSerializer);
expect.extend(extension);
