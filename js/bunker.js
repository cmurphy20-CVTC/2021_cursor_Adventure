var difficultySelector;

$(document).ready(function(){

    var score = 0;
    var inventory = ["Bottle of water", "Food ration"];
    var bgMusic = new Audio('media/bunkerBg.mp3');
    bgMusic.loop = true;
    
    $('#diff_easy').on("click", function() {

        var difficultySelector = "easy";
    
        $('.difficulty').hide();

        bgMusic.play();

        // Displaying inventory as soon as game starts
        $("#inventory").html("Current Inventory(" + inventory.length + ")");

        inventory.forEach(function (item) {
          $("#inventory_items").append("<li>" + item + "</li>");
        });
        
        $('.bunker').show();
    });
    
    $('#diff_normal').on("click", function() {

    var difficultySelector = "normal";
    
    $('.difficulty').hide();

    bgMusic.play();

    // Displaying inventory as soon as game starts
    $("#inventory").html("Current Inventory(" + inventory.length + ")");

    inventory.forEach(function (item) {
      $("#inventory_items").append("<li>" + item + "</li>");
    });
        
    $('.bunker').show();
    });
    
    $('#diff_hard').on("click", function() {

    var difficultySelector = "hard";
    
    $('.difficulty').hide();

    bgMusic.play();

    // Displaying inventory as soon as game starts
    $("#inventory").html("Current Inventory(" + inventory.length + ")");

    inventory.forEach(function (item) {
      $("#inventory_items").append("<li>" + item + "</li>");
    });
        
    $('.bunker').show();
    });

  $('#b_look').on("click", function() {

    $("#b_dialogue").html("<p>Still the same old grimey bunker.  The radio is still on to the right.  Looks like I dropped the key on the floor to the left.</p>"); 
    $('#b_music').css("visibility", "visible");
  });

  // Toggling background music on and off
  $('#b_music').on("click", function() {

    if (!bgMusic.paused) { // Music is playing
      bgMusic.pause();
      $("#b_dialogue").html("<p>I hated that song.</p>");
      $("#b_music").text("Turn radio on")
    } else {  //  Music isn't playing
      bgMusic.play();
      $("#b_dialogue").html("<p>I'm feeling a bit lonely now.</p>");
      $("#b_music").text("Turn radio off")
    }

  });

  $('#b_itemPick').on("click", function() {

    $("#b_dialogue").html("<p>Walking over to key... Wonder what this is for?</p>");
    
    var score =+ 10
    // Protect from user adding more than one bunker key 
    if (inventory.length < 3) {
      inventory.push("Bunker Key");
      console.log(inventory[2]);

      $("#inventory").html("Current Inventory(" + inventory.length + ")");

      // Adding key to list of inventory items
      $("#inventory_items").append("<li>" + inventory[2] + "</li>");
    }  
  });

  $('#b_useItem').on("click", function() {

    // User tries to use items before the key is found
    $("#b_dialogue").html("<p>I don't need to use my rations or water now. Maybe there is a key nearby?</p>"); 
  
    if (inventory[2] == "Bunker Key") {
      // key is acquired
      $("#b_dialogue").html("<p>It's the key I brought, almost lost it...</p><br>I should look for the door out of here.<p>");
       
    }

    $('#b_look').on("click", function() {

      // Looked for door to leave
      $("#b_dialogue").html("<p>Jeez took me an hour to find this stupid door...Good time to use the key.<p>");
       
    })

    $('#b_useItem').on("click", function() {

      $("#b_dialogue").html("<p>Door is unlocked this place. Gonna miss the radio though..<p>");

        // Used key on the door to leave
        $('#b_leave').css("display", "inline-block");
       
    })
  
  });

  $('#b_sleep').on("click", function() {

    $("#b_dialogue").html("<p>I've already spent enough time in this creepy bunker...</p>"); 

    $("b_sleep").css("display", "none");
  });

  $('#b_leave').css("display", "none");
})