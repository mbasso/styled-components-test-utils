import StyleSheet from './utils/styleSheet';
import isOverV2 from './utils/isOverV2';
import isServer from './utils/isServer';

const init = () => {
  if (isOverV2()) {
    StyleSheet.reset(isServer());
  }
};

export default init;
