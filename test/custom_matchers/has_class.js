export const toHaveClass = (node, className) => {
  const classes = [].slice.apply(node.classList);

  if (classes.includes(className)) {
    return {
      message: () =>
        `node ${classes} has class name ${className}`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `node ${classes} has no class name ${className}`,
      pass: false,
    };
  }
}
