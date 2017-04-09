// @flow

window.onload = function (): void {
  var inputUrlElement = document.getElementById('input-url')
  var inputTimeElement = document.getElementById('input-time')
  var waybackifyBtn = document.getElementById('waybackify-btn')

  if (!inputUrlElement || !waybackifyBtn || !inputTimeElement) {
    return
  }

  waybackifyBtn.addEventListener('click', handleWaybackifyClick)
  inputUrlElement.addEventListener('keydown', handleReturnPress)

  function waybackifyUrl (url: string, timestamp: string): string {
    if (url) {
      timestamp = timestamp || '2017'
      return `https://web.archive.org/web/${timestamp}/${url}`
    } else {
      return 'No url provided.'
    }
  }

  function postUrl (url: string): void {
    var req = new XMLHttpRequest()
    req.open('POST', '/', true)
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    req.send(`waybackifiedUrl=${encodeURIComponent(url)}`)
  }

  function handleWaybackifyClick (evt: MouseEvent): void {
    var waybackifiedUrl = ''

    evt = evt || window.event
    evt && evt.preventDefault()

    if (inputUrlElement instanceof HTMLInputElement &&
      inputTimeElement instanceof HTMLInputElement) {
      waybackifiedUrl = waybackifyUrl(inputUrlElement.value, inputTimeElement.value)
    }

    postUrl(waybackifiedUrl)
  }

  function handleReturnPress (evt: KeyboardEvent): void {
    evt = evt || window.event
    var keyCode = evt && (evt.keyCode || evt.which)
    if (keyCode && keyCode === 13) {
      waybackifyBtn && waybackifyBtn.click()
    }
  }
}
