const fs = require('fs')
const path = require('path')

fs.rmdirSync(path.resolve(__dirname, '../node_modules/.vite_opt_cache'), {
  recursive: true
})

const localePath = path.resolve(
  __dirname,
  '../node_modules/element-plus/lib/index.d.ts'
)

fs.writeFileSync(
  localePath,
  fs.readFileSync(localePath, 'utf8').replace('./el-locale', './locale')
)

const constPath = path.resolve(
  __dirname,
  '../node_modules/element-plus/lib/el-option/index.d.ts'
)

fs.writeFileSync(
  constPath,
  fs.readFileSync(constPath, 'utf8').replace('@element-plus', '..')
)

const dialogPath = path.resolve(
  __dirname,
  '../node_modules/element-plus/lib/el-dialog/src/useDialog.d.ts'
)

fs.writeFileSync(
  dialogPath,
  fs.readFileSync(dialogPath, 'utf8').replace('/el-utils/', '/utils/')
)

const transPath = path.resolve(
  __dirname,
  '../node_modules/element-plus/lib/el-collapse-transition/index.d.ts'
)

fs.writeFileSync(
  transPath,
  fs.readFileSync(transPath, 'utf8').replace('/transition', '/el-transition')
)
