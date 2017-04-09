window.onload = function () {
  var inputUrlElement = document.getElementById('input-url');
  var inputTimeElement = document.getElementById('input-time');
  var waybackifyBtn = document.getElementById('waybackify-btn');

  waybackifyBtn.addEventListener('click', (evt) => {
    evt = evt || window.event;
    evt && evt.preventDefault();
    waybackifyUrl(inputUrlElement.value, inputTimeElement.value);
  });

  inputUrlElement.addEventListener('keydown', (evt) => {
    evt = evt || window.event;
    var keyCode = evt && (evt.keyCode || evt.which);
    if (keyCode &&  keyCode === 13) {
      waybackifyBtn && waybackifyBtn.click();
    }
  });

  function waybackifyUrl(url, timestamp) {
    if (url) {
      timestamp = timestamp || '2017';
      return `https://web.archive.org/web/${timestamp}/${url}`;
    } else {
      return 'No url provided.';
    }
  }
}
