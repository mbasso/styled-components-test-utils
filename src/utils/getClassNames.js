const getClassNames = (node) => {
  const classNames = [];
  if (node.children) {
    node.children.forEach(child => (
      Array.prototype.push.apply(classNames, getClassNames(child))
    ));
  }
  if (node.props && node.props.className) {
    Array.prototype.push.apply(classNames, node.props.className.split(' '));
  }
  return classNames;
};

export default getClassNames;
