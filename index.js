
let dogsToDisplay=3 

function fewerDogs() {
  $('form').on('click', '#less-dogs-btn', function(e){     
      dogsToDisplay > 1 ? dogsToDisplay-- : dogsToDisplay=1
      $('#total-dogs-entry').val(`${dogsToDisplay}`)
      console.log(`subtracted dogs`)
  })
}
function moreDogs() {
  $('form').on('click', '#more-dogs-btn', function(e){     
      dogsToDisplay < 50 ? dogsToDisplay++ : dogsToDisplay=50
      $('#total-dogs-entry').val(`${dogsToDisplay}` )
      console.log(`added dogs`)
  })
}
function setDogAmount() {
  $('form').on('input', '#total-dogs-entry', function(e){
      if ($('#total-dogs-entry').val() < 1) {
          dogsToDisplay = 1
          $('#total-dogs-entry').val(1)
      } else if ($('#total-dogs-entry').val() >= 50) {
          dogsToDisplay = 50
          $('#total-dogs-entry').val(50)
      } else {
          dogsToDisplay = $('#total-dogs-entry').val()
      }
      console.log(`dog amount set to ${dogsToDisplay}`)
  })
}

function getDogImage() {
  fetch(`https://dog.ceo/api/breeds/image/random/${dogsToDisplay}`)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  //create an HTML string of dog images from JSON response array
  let dogHTML = responseJson.message.map(dogImg => {
    console.log(dogImg)
    return `<img src="${dogImg}" class="results-img">`
  })
  // display the results section
  $('.results').removeClass('hidden');
  //inject string of html formatted images)
  $('.results-imgs').html(dogHTML.join(""))
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getDogImage();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  fewerDogs()
  moreDogs()
  setDogAmount()
  watchForm()
});