import { findIdentifier } from "./findIdentifier";

export function getPropertyName(path) {
  return findIdentifier({ path, depth: 0 });
}
