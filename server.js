const fs = require('fs')
const path = require('path')
const {createBundleRenderer} = require('vue-server-renderer')
const express = require('express')

const resolve = file => path.resolve(__dirname, file)
const app = express()

const renderer = createBundleRenderer(
  require('./dist/vue-ssr-server-bundle.json'), {
    runInNewContext: false,
    template: fs.readFileSync(resolve('./index.html'), 'utf-8'),
    clientManifest: require('./dist/vue-ssr-client-manifest.json'),
  })

function renderToString (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}

app.use(express.static(resolve('./dist')));

app.get('*', (req, res) => {

  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Server', 'Express server side render')
  const context = {
    title: 'Vue HN 2.0', // default title
    url: req.url,
  }
  renderToString(context).
    then(html => res.send(html)).
    catch(err => res.send(err))
})

app.listen(8088)
