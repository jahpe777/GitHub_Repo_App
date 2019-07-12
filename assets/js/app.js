'use strict'

function getRepos() {
    const searchHandle = $("js-search-handle").val();
    console.log(searchHandle);
    fetch('https://api.github.com/users/' + searchHandle + '/repos')
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again.'));
};

function displayResults(responseJson) {
    console.log(responseJson);
    if (responseJson.message == 'Not Found') {
        alert('Cannot find handle');
    }
    else (makeList(responseJson));
    $('.results').removeClass('hidden')
}

function makeList(responseJson) {
    $('#js-results-list').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('#js-results-list').append(
            `<li><h3>${responseJson[i].name}</h3>
            <h3><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></h3>
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