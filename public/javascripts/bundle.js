window.onload = function () {
  var inputUrlElement = document.getElementById('input-url')
  var inputTimeElement = document.getElementById('input-time')
  var waybackifyBtn = document.getElementById('waybackify-btn')

  waybackifyBtn.addEventListener('click', handleWaybackifyClick)
  inputUrlElement.addEventListener('keydown', handleReturnPress)

  function waybackifyUrl (url, timestamp) {
    if (url) {
      timestamp = timestamp || '2017'
      return `https://web.archive.org/web/${timestamp}/${url}`
    } else {
      return 'No url provided.'
    }
  }

  function postUrl (url) {
    var req = new XMLHttpRequest()
    req.open('POST', '/', true)
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    req.send(`waybackifiedUrl=${encodeURIComponent(url)}`)
  }

  function handleWaybackifyClick (evt) {
    var waybackifiedUrl = ''
    evt = evt || window.event
    evt && evt.preventDefault()

    waybackifiedUrl = waybackifyUrl(inputUrlElement.value, inputTimeElement.value)

    postUrl(waybackifiedUrl)
  }

  function handleReturnPress (evt) {
    evt = evt || window.event
    var keyCode = evt && (evt.keyCode || evt.which)
    if (keyCode && keyCode === 13) {
      waybackifyBtn && waybackifyBtn.click()
    }
  }
}
