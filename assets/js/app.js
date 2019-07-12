'use strict'

function getRepos() {
    const searchHandle = $("js-search-handle").val();
    console.log(searchHandle);
    fetch('https://api.github.com/users/' + searchHandle + '/repos')
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

function displayResults(responseJson) {
    console.log(responseJson);
    if (responseJson.message == 'not found') {
        alert('Cannot find handle');
    }
    else (makeList(responseJson));
    $('#results').removeClass('hidden')
}

function makeList(responseJson) {
    $('#results-list').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('.results-list').append(
            `<li><h3>${responseJson[i].name}</h3>
            <h3><a href="${responseJson[i].url}">${responseJson[i].html_url}</a></h3>
            </li>`
    )};
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      getRepos();
    });
  }
  
  $(function() {
    console.log('App works');
    watchForm();
  });