import css from 'css';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import getCSS from '../utils/getCSS';
import getClassNames from '../utils/getClassNames';

const filterNodes = classNames => (rule) => {
  if (rule.type === 'rule') {
    const className = rule.selectors[0].split(/:| /)[0];
    return classNames.includes(className.substring(1)) && rule.declarations.length;
  }

  return false;
};

const getAtRules = (ast, filter) => (
  ast.stylesheet.rules
    .filter(rule => rule.type === 'media' || rule.type === 'supports')
    .reduce((acc, mediaQuery) => {
      // eslint-disable-next-line
      mediaQuery.rules = mediaQuery.rules.filter(filter);

      if (mediaQuery.rules.length) {
        return acc.concat(mediaQuery);
      }

      return acc;
    }, [])
);

const getStyles = (classNames) => {
  const styles = getCSS(styleSheet);
  const ast = css.parse(styles);
  const filter = filterNodes(classNames);
  const rules = ast.stylesheet.rules.filter(filter);
  const mediaQueries = getAtRules(ast, filter);

  ast.stylesheet.rules = rules.concat(mediaQueries);

  return css.stringify(ast).trim();
};

const styleSheetSerializer = {
  test(val) {
    return val && !val.withStyles && val.$$typeof === Symbol.for('react.test.json');
  },
  print(val, print) {
    const classNames = getClassNames(val);
    const styles = classNames.length ? `${getStyles(classNames)}\n\n` : '';

    // eslint-disable-next-line
    val.withStyles = true;

    return `${styles}${print(val)}`;
  },
};

export default styleSheetSerializer;
