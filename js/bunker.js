var difficultySelector;

$(function() {
    
    $('.bunker').hide();
    
    $('#diff_easy').on("click", function() {

        var difficultySelector = "easy";
    
        $('.difficulty').hide();
        
        $('.bunker').show();
    });
    
    $('#diff_normal').on("click", function() {

    var difficultySelector = "normal";
    
    $('.difficulty').hide();
        
    $('.bunker').show();
    });
    
    $('#diff_hard').on("click", function() {

    var difficultySelector = "hard";
    
    $('.difficulty').hide();
        
    $('.bunker').show();
    });

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