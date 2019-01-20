export const toHaveContent = (node, content) => {
  if (node.textContent.trim() === content) {
    return {
      message: () =>
        `node ${node} has content ${content}`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `node ${node} has content "${node.textContent.trim()}" but not "${content}"`,
      pass: false,
    };
  }
}
