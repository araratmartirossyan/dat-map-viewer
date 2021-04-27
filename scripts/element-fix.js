const fs = require('fs')
const path = require('path')

fs.rmdirSync(path.resolve(__dirname, '../node_modules/.vite_opt_cache'), {
  recursive: true
})

try {
  const transitionPath = path.resolve(
    __dirname,
    '../node_modules/element-plus/lib/el-collapse-transition/index.d.ts'
  )

  console.log('TRANSITION PATH', transitionPath)

  fs.writeFileSync(
    transitionPath,
    fs
      .readFileSync(transitionPath, 'utf8')
      .replace(
        '../transition/collapse-transition/index.vue',
        '../el-transition/collapse-transition/index.vue'
      )
  )

  console.log('DONE')
} catch (err) {
  console.log(err)
}
