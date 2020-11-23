
let dogBreed = ''

function setDogBreed() {
  $('form').on('change', '#dog-breed-entry', function(e){
      dogBreed = $('#dog-breed-entry').val().toLowerCase().trim()
      console.log(`dog breed set to ${dogBreed}`)
  })
}

function getDogImage() {
  fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
    .then(response => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err))
      }
      return response.json()
    })
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert(`Something went wrong. ${error.message}`));
}

function displayResults(responseJson) {
  // display the results section
  $('.results').removeClass('hidden');
  //inject string of html formatted images)
  $('.result').html(`<img src="${responseJson.message}" class="results-img">`)
  
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getDogImage();
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  setDogBreed()
  watchForm()
});