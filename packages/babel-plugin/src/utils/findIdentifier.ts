
export function findIdentifier({ path, depth }) {
  const MAX_DEPTH = 6;
  if (depth > MAX_DEPTH || !path) {
    return null;
  }

  if (path?.parent?.key?.type === 'Identifier') {
    return path?.parent?.key?.name;
  } else {
    return findIdentifier({
      path: path?.parentPath,
      depth: depth + 1,
    });
  }
}
