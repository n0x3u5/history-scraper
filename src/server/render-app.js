// @flow

import { STATIC_PATH, WDS_PORT } from '../shared/config'
import { isProd } from '../shared/util'

const renderApp = (title: string) => `
<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="${STATIC_PATH}/stylesheets/style.css">
  </head>
  <body>
    <h1>${title}</h1>
    <form>
      <div class="form-widget">
        <label class="form-label" for="input-url">URL</label>
        <input type="url" id="input-url">
      </div>
      <div class="form-widget">
        <label class="form-label" for="input-time">Year</label>
        <input type="number" id="input-time">
      </div>
      <div class="form-widget">
        <button class="form-btn" id="waybackify-btn">Generate</button>
      </div>
    </form>
    <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/javascripts/bundle.js"></script>
  </body>
</html>
`
export default renderApp
