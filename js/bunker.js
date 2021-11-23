$(function() {

  $('#b_look').on("click", function() {

    $("#b_dialogue").html("<p>Looks like there is a key on the floor.</p>"); 
  });

  $('#b_item').on("click", function() {

    $("#b_dialogue").html("<p>I could pick it up...it's kinda far though..</p>"); 
  });

  $('#b_stare').on("click", function() {

    $("#b_dialogue").html("<p>Is that a new spot on the wall?</p>"); 
  });

  $('#b_sleep').on("click", function() {

    $("#b_dialogue").html("<p>No arguements here....ZZZzzzzzzz...</p>"); 
  });



})