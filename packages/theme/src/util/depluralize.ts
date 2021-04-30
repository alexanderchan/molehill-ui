// A simple depluralization for our subset of known values
export function depluralize({ name }: { name: string }) {
  if (!(typeof name === 'string')) {
    return name
  }

  if (name.slice(-3) === 'ies') {
    return `${name.slice(0, -3)}y`
  } else if (name.slice(-4) === 'ices') {
    return `${name.slice(0, -4)}ex`
  } else if (name.slice(-1) === 's') {
    return `${name.slice(0, -1)}`
  } else if (name.slice(-2) === 'ii') {
    return `${name.slice(0, -2)}ius`
  }

  return name
}
