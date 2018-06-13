let $open ="<b>";
let $close="</b>";


$('input[value="vimtips"]').on('click', function(e) {
  $open ="";
  $close="";
  setTimeout(search)
});

$('input[value="pdfs"]').on('click', function(e) {
  $open ="<b>";
  $close="</b>";
});

$('input[value="books"]').on('click', function(e) {
  $open ="<b>";
  $close="</b>";
  setTimeout(search)
});

$('input[value="railsCommands"]').on('click', function(e) {
  $open ="<b>";
  $close="</b>";
  setTimeout(search)
});

$('input[value="gitCommands"]').on('click', function(e) {
  $open ="";
  $close="";
  setTimeout(search)
});


$(function () {
  setNavigation();
});

function setNavigation() {
  var path = window.location.pathname;
  path = path.replace(/\/$/, "");
  path = decodeURIComponent(path);
  console.log(path);

  if (path === '/index.html') {
    $('#index').closest('li').addClass('active');
  } 
  else if (path === '/vimtips.html') {
    $('#vimtips').closest('li').addClass('active');
  }
  else if (path === '/gitcommands.html') {
    $('#gitcommands').closest('li').addClass('active');
  } else {
    $('#index').closest('li').addClass('active');
  }
}

  $( function() {
    $( document ).tooltip();
  } );
