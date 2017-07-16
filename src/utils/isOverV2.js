import { ServerStyleSheet } from 'styled-components';

// styled-components >=2.0.0
const isOverV2 = () => Boolean(ServerStyleSheet);

export default isOverV2;
