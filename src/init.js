import styleSheet from 'styled-components/lib/models/StyleSheet';
import isOverV2 from './utils/isOverV2';
import isServer from './utils/isServer';

const init = () => {
  if (isOverV2()) {
    styleSheet.reset(isServer());
  }
};

export default init;
