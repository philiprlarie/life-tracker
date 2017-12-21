prefillOptions();
$('#options-form').on('submit', saveOptions);

function saveOptions(event) {
  debugger
  event.preventDefault();

  var bdate = $('#bdate').val();
  var lifeExpectancy = $('#life-expectancy').val() || 76;

  window.localStorage.setItem('bdate', bdate);
  window.localStorage.setItem('lifeExpectancy', lifeExpectancy);

  var status = document.getElementById('status');
  status.textContent = 'Options saved.';
  setTimeout(function() {
    status.textContent = '';
  }, 750);
}

function prefillOptions() {
  const bdate = window.localStorage.getItem('bdate');
  const lifeExpectancy = window.localStorage.getItem('lifeExpectancy');

  $('#bdate').val(bdate);
  $('#life-expectancy').val(lifeExpectancy);
}
