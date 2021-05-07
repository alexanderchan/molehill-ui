## Installation

Run `npx molehill-ui` to setup the config.

## Manual installation

Add this plugin before any plugins that add or process the `css` prop:

```json
{
  "plugins": ["@molehill-ui"]
}
```

## Setup the config file (optional)

Add a `molehill.config.js` file to the project root.

```tsx
import { createCssTheme } from '@molehill-ui/theme'

export default createCssTheme({
  config: {},
})
```
