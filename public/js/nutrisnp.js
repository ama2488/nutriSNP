$(document).ready(() => {
  $('.button-collapse').sideNav();
  $('.modal').modal();
  $('select').material_select();
  $('.parallax').parallax();

  function authenticateUser(e) {
    e.preventDefault();
    const formData = $(e.target).serialize();
    $.ajax({
      url: e.target.getAttribute('action'),
      type: 'POST',
      data: formData,
      contentType: 'application/x-www-form-urlencoded',
      processData: false,
      success(result) {
        window.location.replace('/');
      },
      error(err) {
        Materialize.toast('Email and password don\'t match', 3000, 'rounded');
      },
    });
  }

  $('.authenticate').on('submit', (e) => { authenticateUser(e); });
});
