document.addEventListener('DOMContentLoaded', () => {
  fetch('/components/header.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('site-header').innerHTML = html;
    });

  fetch('/components/footer.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('site-footer').innerHTML = html;
    });
});
