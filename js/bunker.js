var difficultySelector;
var score;

$(document).ready(function(){


  // Declare Initial Variables
  score = 0;
  var health;
  var inventory;
  var bgMusic = new Audio('media/bunkerBg.mp3');
  bgMusic.loop = true;
  var keyFound = false;
  var radioOn = true;
  var doorFound = false; 
  var doorUnlocked = false;

  function inventoryLength() {
    // Declare starting var
    count = 0;

    // count each item in inventory
    for (var x in inventory) {
        count++;
    }

    return count; 
  }

  // Call to display current inventory
  function displayInventory() {
    // Ensure all prevous entires have been deleted
    $("#inventory_items").children().remove();

    // Displaying inventory as soon as game starts
    $("#inventory").html("Current Inventory(" + inventoryLength() + ")");

    for (var key in inventory) {
      // Get information saved by index
      var amount = inventory[key];

      // Determine output formatting
      if (amount == null) {
        amount = ""; 
      } else {
        amount = ": " + amount;
      }

      // Add item to items list
      $("#inventory_items").append("<li id=\"" + key + "\"><button class=\"item_button\">Use</button>\t" + key + "\t" + amount + "</li>");

    };

    // Create listener event for all item buttons
    $('.item_button').on('click', function() {
      // Capture the id of the item
      var itemKey = $(this).closest('li').attr('id');

      // Determine how the item will be used
      switch (itemKey) {
        case "Food ration":
        case "Bottle of water": 
          dialogue("I don't need to use my rations or water now.");
          break;
        case "Bunker key":
          if (doorFound) {
            dialogue("The door is unlocked. Gonna miss the radio though...");

            doorUnlocked = true;
    
            // Remove key from inventory 
            delete inventory["Bunker key"];

            // Refresh Inventory 
            displayInventory();

            // Save the current health level and score for use on other pages
            sessionStorage.setItem("healthLevel", health);
            sessionStorage.setItem("score", score);
            sessionStorage.setItem("inventory", JSON.stringify(inventory));

            // Used key on the door to leave
            $('#b_leave').css("display", "inline-block");
            $('#b_sleep').css("visibility", "hidden");
            $('#b_music').css("visibility", "hidden");

            
          } else {
            dialogue("Where is the door at?");
          }
      }     
    });
  }

  // Handle text to displayed on b_dialogue
  function dialogue(output) {
    $("#b_dialogue").html("<p>" + output + "</p>");
  }

  // Setup the difficulty of the game
  function setDiff(initalHealth, diff) {
    // Set and store max health
    health = initalHealth;
    sessionStorage.setItem("initalHealth", initalHealth);

    // Set game diff
    switch (diff) {
      case "easy": 
        difficultySelector = "easy";
        inventory = {
          "Bottle of water": 25, 
          "Food ration" : 50
        };
        break;
      case "normal":
        difficultySelector = "normal";
        inventory = {
          "Bottle of water": 15, 
          "Food ration" : 40
        };
        break;
      case "hard":
        difficultySelector = "hard";
        inventory = {
          "Bottle of water": 10, 
          "Food ration" : 30
        };
        break;
    }
    
    // Save in session for other pages
    sessionStorage.setItem("difficulty", difficultySelector);

    // Change current display to bunker
    $('.difficulty').hide();
    $('.bunker').show();

    // Start music
    bgMusic.play();

    // Update health 
    $("#o_health").html("<h3>Health: " + health + "</h3>");

    // Populate inventory
    displayInventory();
  }

  
  $('#diff_easy').on("click", function() {
      setDiff(150, "easy");
  });
  
  $('#diff_normal').on("click", function() {
      setDiff(100, "normal");
  });
  
  $('#diff_hard').on("click", function() {
    setDiff(75, "hard");
  });

  $('#b_look').on("click", function() {
    if (!keyFound && radioOn) {
      dialogue("Still the same old grimey bunker.  The radio is still on to the right.  Looks like I dropped the key on the floor to the left."); 
      $('#b_music').css("visibility", "visible");
      $('#b_itemPick').css("visibility", "visible");
    } else if (!keyFound && !radioOn) {
      dialogue("Still the same old grimey bunker. It's very quiet now. Looks like I dropped the key on the floor to the left.");
    } else {
      if (!doorFound) {
        dialogue("Looks like the door is over there. Going over to get a better look.");
        doorFound = true;
      } else {
        if (!doorUnlocked) {
          dialogue("I think I better use that key.");
        } else {
          dialogue("It's time to get some fresh air...");
        }
      }
    }     
  });

  // Toggling background music on and off
  $('#b_music').on("click", function() {

    if (!bgMusic.paused) { // Music is playing
      bgMusic.pause();
      dialogue("I hated that song.");
      $("#b_music").text("Turn radio on");
      radioOn=false; 
    } else {  //  Music isn't playing
      bgMusic.play();
      dialogue("I'm feeling a bit lonely now.");
      $("#b_music").text("Turn radio off");
      radioOn=true;
    }

  });

  $('#b_itemPick').on("click", function() {

    dialogue("Walking over to the key... Wonder what this is for?");
    inventory["Bunker key"] = null;
    keyFound = true;
    displayInventory();
    
    score =+ 10;

    $('#b_itemPick').css("visibility", "hidden");
  });


  $('#b_sleep').on("click", function() {

    dialogue("I've already spent enough time in this creepy bunker..."); 

    $("b_sleep").css("display", "none");
  });

  $('#b_leave').css("display", "none");
});