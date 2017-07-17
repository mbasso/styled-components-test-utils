import init from './init';
import * as matchers from './';
import styleSheetSerializer from './serializers/styleSheetSerializer';

init();

const extension = {};
Object.keys(matchers).forEach((x) => {
  extension[x] = (...params) => matchers[x](...params);
});

expect.addSnapshotSerializer(styleSheetSerializer);
expect.extend(extension);
