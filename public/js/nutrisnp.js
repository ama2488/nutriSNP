$(document).ready(() => {
  $('.button-collapse').sideNav();
  $('.modal').modal();
  $('select').material_select();
  $('.parallax').parallax();
  const currCals = parseInt($('#calories').html(), 10);
  const carb = ((parseInt($('#carb').html(), 10) * 4) / currCals).toFixed(2);
  const fat = ((parseInt($('#fat').html(), 10) * 9) / currCals).toFixed(2);
  const protein = ((parseInt($('#protein').html(), 10) * 4) / currCals).toFixed(2);

  console.log(carb);
  console.log(fat);

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
      title: 'Macronutrients',
    },
    color: {
      pattern: ['#1f77b4', '#aec7e8', '#354171'],
    },
  });

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

  $('#goals').on('change', (e) => { updateMacros(e); });
});
