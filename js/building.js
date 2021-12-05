$(document).ready(function(){

  var inventory = ["Bottle of water", "Food ration"];
  var score;

  $('#o_test').css("display", "none");

  $("#inventory").html("Current Inventory(" + inventory.length + ")");

        inventory.forEach(function (item) {
          $("#inventory_items").append("<li>" + item + "</li>");
        });

  $(".hide_btns").css("display", "none");

  // Player arms themself and looking around leads to progressing the level
  $("#bd_itemPick").on("click", function() {

    $(".hide_btns").css("display", "inline-block");
    
    $("#bd_dialogue").html("<p>Sorry buddy I'll be needing this more than you. This knife will be handy if I get into a fight. I should look around to get see what I can find.<p>");

    if (inventory.length < 3) {
      inventory.push("Combat Knife");

      $("#inventory").html("Current Inventory(" + inventory.length + ")");

      // Adding score to local storage for use later
      localStorage.setItem("score", score);

      // Adding knife to list of inventory items
      $("#inventory_items").append("<li>" + inventory[2] + "</li>");
    }  

  });

  // Looking around for choices to explore in this level
  $("#bd_look").on("click", function() {

    $("#bd_dialogue").html("<p>Thankfully the stairs up to the offices are still intact. I can find the locker codes in my desk.<br><br>" +
    "Otherwise I take the chance and see if there is anything useful in the armoury now.</p>");

    $("#bd_look").html("Go upstairs").on("click", function() {

      $("#bd_look").html("Look around");

      $("#bd_useItem").html("Use item");

      $("#bd_dialogue").html("<p>Well here's what's left of my desk... I used to wish for my excitement in life. What I would give to go back and do inventory..<br><br>" +
      "Alright I should pick up the safe now.</p>");

      $("#bd_itemPick").css("display", "inline-block");

      $("#bd_itemPick").on("click", function() {

        $("#bd_dialogue").html("<p>1-0-2-6..when everything hit the fan. Time to go to the armoury and get equipped..<br><br>" +
        "Why do I feel like I'm being watched....</p>");

        $("#bd_look").html("Look in armoury");

        $("#bd_itemPick").css("display", "none");

        $("#bd_useItem").css("display", "none");

        $("#bd_look").on("click", function() {
          $("#bd_dialogue").html("<p>Good lord there's almost nothing left. At least one locker hasn't been plundered.<br><br>" +
          "I should use the code to unlock it.</p>");

          $("#bd_useItem").css("display", "inline-block");

          $("#bd_look").html("Look around");

          $("#bd_useItem").on("click", function() {

            $("#bd_dialogue").html("<p>9-1-1-1..Creative. Well I got a handgun and some bullets.<br><br>" +
            "Wait...what was that noise?</p>");

            if (inventory.length < 4) {
              inventory.push("Handgun");
        
              $("#inventory").html("Current Inventory(" + inventory.length + ")");
                
              // Adding knif to list of inventory items
              $("#inventory_items").append("<li>" + inventory[3] + "</li>");
            }
            
            $("#bd_itemPick").css("display", "none");

            $("#bd_useItem").css("display", "none");

            $("#bd_look").on("click", function() {

              $("#bd_dialogue").html("<p>Looks like I wasn't alone...Raiders and it doesn't look like they want to talk...</p>");

              $('#o_test').css("display", "inline-block");

              $("#bd_itemPick").css("display", "none");

              $("#bd_useItem").css("display", "none");

              $("#bd_look").css("display", "none");

            });

          });

        });

      });

    });

    $("#bd_useItem").html("Look in armoury").on("click", function() {

      $("#bd_dialogue").html("<p>Well. There ain't much here...one locker remains untouched.<br><br>" +
      "Wait...What's that noise?</p>");

      $("#bd_look").css("display", "inline-block");

      $("#bd_look").html("Look around");

      $("#bd_useItem").css("display", "none");

      $("#bd_look").on("click", function() {

        $("#bd_dialogue").html("<p>A couple Radiers...guess I get to use my knife sooner that I thought...</p>");

        $('#o_test').css("display", "inline-block");

      });

    });

    $("#bd_itemPick").css("display", "none");

  });

  // action for if user idly clicks this btn
  $("#bd_useItem").on("click", function() {

    $("#bd_dialogue").html("<p>\"Furiously swings around knife dispatching imaginary foes\".<p>");

  });
       
  });
  

