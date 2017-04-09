// @flow

window.onload = function (): void {
  var inputUrlElement: HTMLElement | null = document.getElementById('input-url')
  var inputTimeElement: HTMLElement | null = document.getElementById('input-time')
  var waybackifyBtn: HTMLElement | null = document.getElementById('waybackify-btn')

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
    var req: XMLHttpRequest = new XMLHttpRequest()
    req.open('POST', '/', true)
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    req.send(`waybackifiedUrl=${encodeURIComponent(url)}`)
  }

  function sanitizeEvent (evt: Event): $Subtype<Event> {
    return !evt ? window.event : evt
  }

  function handleWaybackifyClick (evt: MouseEvent): void {
    var waybackifiedUrl: string = ''
    var e: MouseEvent = sanitizeEvent(evt)

    e.preventDefault()

    if (inputUrlElement instanceof HTMLInputElement &&
      inputTimeElement instanceof HTMLInputElement) {
      waybackifiedUrl = waybackifyUrl(inputUrlElement.value, inputTimeElement.value)
    }

    postUrl(waybackifiedUrl)
  }

  function handleReturnPress (evt: KeyboardEvent): void {
    var e: KeyboardEvent = sanitizeEvent(evt)
    var keyCode: number = e.keyCode || e.which

    if (keyCode === 13) {
      waybackifyBtn && waybackifyBtn.click()
    }
  }
}
