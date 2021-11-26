var difficultySelector;

$(function() {
    
    $('.bunker').hide();

    var score = 0;
    var bgMusic = new Audio('media/bunkerBg.mp3');
    bgMusic.loop = true;
    
    $('#diff_easy').on("click", function() {

        var difficultySelector = "easy";
    
        $('.difficulty').hide();

        bgMusic.play();
        
        $('.bunker').show();
    });
    
    $('#diff_normal').on("click", function() {

    var difficultySelector = "normal";
    
    $('.difficulty').hide();

    bgMusic.play();
        
    $('.bunker').show();
    });
    
    $('#diff_hard').on("click", function() {

    var difficultySelector = "hard";
    
    $('.difficulty').hide();

    bgMusic.play();
        
    $('.bunker').show();
    });

  $('#b_look').on("click", function() {

    $("#b_dialogue").html("<p>Still the same old grimey bunker.  The radio is still on.  Looks like I left a key on the floor too.</p>"); 
    $('#b_music').css("visibility", "visible");
  });

  // Toggling background music on and off
  $('#b_music').on("click", function() {

    if (!bgMusic.paused) { // Music is playing
      bgMusic.pause();
      $("#b_music").text("Turn radio on")
    } else {  //  Music isn't playing
      bgMusic.play();
      $("#b_music").text("Turn radio off")
    }

    $("b_dialogue").html("<p>I hated that song.</p>");
  });

  $('#b_item').on("click", function() {

    $("#b_dialogue").html("<p>I could pick it up...it's kinda far though..</p>");
    
    var score =+ 10
  });

  $('#b_stare').on("click", function() {

    $("#b_dialogue").html("<p>Is that a new spot on the wall?</p>"); 
  });

  $('#b_sleep').on("click", function() {

    $("#b_dialogue").html("<p>No arguements here....ZZZzzzzzzz...</p>"); 
  });
})