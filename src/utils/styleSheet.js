import {
  isStyledComponent,
  __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS,
} from 'styled-components';

const getStyleSheet = () => {
  if (isStyledComponent) {
    const secretInternals = __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS;

    if (secretInternals === undefined || secretInternals.StyleSheet === undefined) {
      throw new Error('Could not find styled-components v3 secret internals');
    }

    return secretInternals.StyleSheet;
  }

  try {
    // eslint-disable-next-line global-require
    return require('styled-components/lib/models/StyleSheet').default;
  } catch (e) {
    throw new Error('Could not find module styled-components/lib/models/StyleSheet.js');
  }
};

export default getStyleSheet();
