// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const path = require('path')

const buildEslintCommand = filenames =>
  `next lint --fix --file ${filenames
    // eslint-disable-next-line no-undef
    .map(f => path.relative(process.cwd(), f))
    .join(' --file ')}`

// eslint-disable-next-line no-undef
module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
