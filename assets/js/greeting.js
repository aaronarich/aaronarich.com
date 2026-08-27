// Time-of-day greeting for the home page. Progressive enhancement: the
// heading already reads "Hello!" without JavaScript.
(function () {
  var el = document.querySelector('.greeting');
  if (!el) return;
  var hour = new Date().getHours();
  var greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
  el.textContent = greeting.replace(' ', ' ');
})();
