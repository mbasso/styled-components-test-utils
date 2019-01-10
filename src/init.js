import StyleSheet from './utils/styleSheet';
import isServer from './utils/isServer';

const init = () => {
  StyleSheet.reset(isServer());
};

export default init;
