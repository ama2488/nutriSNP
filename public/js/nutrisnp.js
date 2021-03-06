$(document).ready(() => {
  $('.button-collapse').sideNav();
  $('.modal').modal();
  $('select').material_select();
  $('.parallax').parallax();
  $('.tooltipped').tooltip({ delay: 50 });
  $('.sticky').pushpin({
    top: 5,
    offset: 200,
  });
  $('.scrollspy').scrollSpy();
  const currCals = parseInt($('#calories').html(), 10);
  const carb = ((parseInt($('#carb').html(), 10) * 4) / currCals).toFixed(2);
  const fat = ((parseInt($('#fat').html(), 10) * 9) / currCals).toFixed(2);
  const protein = ((parseInt($('#protein').html(), 10) * 4) / currCals).toFixed(2);
  const ttam = TTAM('1e740220bb911b3b2b0788ac89fe366c');
  if ($('#TTAM_wrapper').length) {
    ttam.connectButton('TTAM_wrapper', ['basic', 'names', 'email', 'genomes']);
  }

  const chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
      ['carbs', carb],
      ['fat', fat],
      ['protein', protein],
      ],
      type: 'donut',
      onclick(d, i) { console.log('onclick', d, i); },
      onmouseover(d, i) { console.log('onmouseover', d, i); },
      onmouseout(d, i) { console.log('onmouseout', d, i); },
    },
    donut: {
      label: {
        show: false,
      },
      title: 'Macronutrients',
    },
    color: {
      pattern: ['#1565c0', '#dce775', '#80deea'],
    },
  });

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
        window.location.replace('/profile/');
      },
      error(err) {
        Materialize.toast(err.responseText, 3000, 'rounded');
      },
    });
  }

  function deleteItem(e) {
    e.preventDefault();
    const id = e.target.getAttribute('id');
    console.log(e.target);
    $.ajax({
      url: `/admin/snp/${id}`,
      type: 'DELETE',
      contentType: 'application/x-www-form-urlencoded',
      processData: false,
      success(result) {
        window.location.replace('/profile/');
      },
      error(err) {
        console.log(err);
      },
    });
  }

  function updateMacros(event) {
    const goal = event.target.value;
    const newCals = parseInt(currCals, 10) + (parseInt(goal, 10) * 500);
    const newCarb = Math.round((newCals * carb) / 4);
    const newFat = Math.round((newCals * fat) / 9);
    const newPro = Math.round((newCals * protein) / 4);
    $('#calories').html(newCals);
    $('#carb').html(newCarb);
    $('#fat').html(newFat);
    $('#protein').html(newPro);
  }

  function fbAuth(e) {
    e.preventDefault();
    window.location.replace('/auth/facebook');
  }

  if (window.location.hash && window.location.hash == '#_=_') {
    if (window.history && history.pushState) {
      window.history.pushState('', document.title, window.location.pathname);
    } else {
    // Prevent scrolling by storing the page's current scroll offset
      const scroll = {
        top: document.body.scrollTop,
        left: document.body.scrollLeft,
      };
      window.location.hash = '';
    // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scroll.top;
      document.body.scrollLeft = scroll.left;
    }
  }

  $('#fblogin').on('click', (e) => { fbAuth(e); });
  $('.deleteSNP').on('click', (e) => { deleteItem(e); });
  $('#goals').on('change', (e) => { updateMacros(e); });
  $('.authenticate').on('submit', (e) => { authenticateUser(e); });
});
