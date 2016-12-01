// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

var searchTerms = [];
var matches = [];

(function() {
  // Magic!
  console.log('Keepin\'n it clean with an external script!');
  queryBowytz();

  $(".flexsearch-input").on('input', function(e){
    handleSearch(e.target.value);
  });

})();

function queryBowytz()
{
  $.ajax({
    url:"http://www.mattbowytz.com/simple_api.json?data=all",
    type:'get',
    success:function(response){
      searchTerms = searchTerms.concat(response.data.interests);
      searchTerms = searchTerms.concat(response.data.programming);
    },
    failure:function(){
      console.log("Failed to query.");
    }
  });
  $.ajax({
    url:"http://www.mattbowytz.com/simple_api.json?data=comics",
    type:'get',
    success:function(response){
      searchTerms = searchTerms.concat(response.data);
    },
    failure:function(){
      console.log("Failed to query.");
    }
  });
}

function handleSearch(searchString){
  if(searchString === ""){
    matches = [];
  }
  else{
    var tempMatch = [];
    var lowerSearchString = searchString.toLowerCase();
    for(term of searchTerms){
      var lowerSearchTerm = term.toLowerCase();
      if(lowerSearchTerm.startsWith(lowerSearchString)){
        tempMatch.push(term);
      }
    }
    matches = tempMatch;
  }
  updateMatchesDisplay();
}

function updateMatchesDisplay(){
  // Clear previous search results
  $(".results .results-list").html("");

  // Draw new search results
  for(match of matches){
    $(".results .results-list").append("<li class='result-item'><a target='_blank' href='https://www.google.com/#q=" + match + "'>" + match + "</a></li>");
  }
}