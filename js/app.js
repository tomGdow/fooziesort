let $open ="";
let $close="";


$('input[value="vimtips"]').on('click', function(e) {
  $open ="";
  $close="";
  setTimeout(search)
});

$('input[value="pdfs"]').on('click', function(e) {
  $open ="";
  $close="";
});

$('input[value="books"]').on('click', function(e) {
  $open ="";
  $close="";
  setTimeout(search)
});

$('input[value="railsCommands"]').on('click', function(e) {
  $open ="";
  $close="";
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




// copy to clipboard
document.body.addEventListener('click',

  function(e){

    e = window.event ? event.srcElement: e.target;

    if(e.className && e.className.indexOf('all-copy')!=-1) {

      document.execCommand('copy');
      var obj = document.getElementById(e.id);
      obj.setAttribute('data-tooltip-pdfpath', 'copied');

      setTimeout(function(){
        obj.setAttribute('data-tooltip-pdfpath', 'click to copy');
      }, 1000);

    }
  } 

)



