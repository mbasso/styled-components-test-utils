const getClassNames = (node) => {
  const classNames = [];

  if (node.children) {
    node.children
      .slice()
      .reverse()
      .forEach(child =>
        Array.prototype.unshift.apply(classNames, getClassNames(child)),
      );
  }

  if (node.props && node.props.className) {
    Array.prototype.unshift.apply(classNames, node.props.className.split(/\s/));
  }

  return classNames;
};

export default getClassNames;
