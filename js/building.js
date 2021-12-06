$(document).ready(function(){

  var inventory = ["Bottle of water", "Food ration"];
  var difficulty = localStorage.getItem("difficulty");
  var score = parseInt(localStorage.getItem("score"));

  $('#bd_combat').css("display", "none");

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
                
              // Adding knife to list of inventory items
              $("#inventory_items").append("<li>" + inventory[3] + "</li>");
            }
            
            $("#bd_itemPick").css("display", "none");

            $("#bd_useItem").css("display", "none");

            $("#bd_look").on("click", function() {

              $("#bd_dialogue").html("<p>Looks like I wasn't alone...Raiders and it doesn't look like they want to talk...</p>");

              $('#bd_combat').css("display", "inline-block");
              $('#bd_combat').css("visibility", "visible");

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

        $('#bd_combat').css("display", "inline-block");

      });

    });

    $("#bd_itemPick").css("display", "none");

  });

  // action for if user idly clicks this btn
  $("#bd_useItem").on("click", function() {

    $("#bd_dialogue").html("<p>\"Furiously swings around knife dispatching imaginary foes\".<p>");

  });

  //
  // Combat sequence
  //
  $('#bd_combat').on("click", function() {

    // Hide start and look around button
    $('#bd_combat').hide();
    $('#bd_look').hide();
  
    // Variables
    var playerHealth = 50;
    var playerAttack;
    var enemyAttack;
    var minRoll = 1;
    var maxRoll = 6;
    var damage;
    var playerAttackMsg = "";
    var enemyAttackMsg = "";

    // Function for simulating a standard 1-6 dice roll
    function attackDmg(minRoll, maxRoll) {
      return Math.floor(Math.random() * (maxRoll - minRoll)) + minRoll;
    }
  
    // Setting damage types and enemy health for selected difficulty
    if (difficulty == "easy") {

      // Checking if player has gun before the combat sequence
      // If they do, they have higher damage
      if (inventory.length == 4) {
        var lowDmg = 12;
        var baseDmg = 14;
        var critDmg = 16;
      } else {
      var lowDmg = 8;
      var baseDmg = 12;
      var critDmg = 16;
      }
      var enemyHealth = 40;
  
    } else if (difficulty == "normal") {

      // Checking if player has gun before the combat sequence
      // If they do, they have higher damage
      if (inventory.length == 4) {
        var lowDmg = 10;
        var baseDmg = 12;
        var critDmg = 14;
      } else {
      var lowDmg = 6;
      var baseDmg = 8;
      var critDmg = 10;
      }
      var enemyHealth = 60;
  
    } else if (difficulty == "hard") {

      // Checking if player has gun before the combat sequence
      // If they do, they have higher damage
      if (inventory.length == 4) {
        var lowDmg = 8;
        var baseDmg = 10;
        var critDmg = 12;
      } else {
      var lowDmg = 4;
      var baseDmg = 6;
      var critDmg = 8;
      }
      var enemyHealth = 70;
  
    }
  
    $("#bd_dialogue").html("<p>A group of raiders emerge from the stairs.<br>  They look ready to attack you with their melee weapons.<br>  You should attempt to defend yourself.</p>");
    
    // Hide pickup item and use item buttons
    $('#bd_itemPick').hide();
    $('#bd_useItem').hide();
  
    // Show new button and health
    $('#bd_health').css("visibility", "visible");
    $('#bd_attack').css("visibility", "visible");
  
      $('#bd_attack').on("click", function() {
  
      //  Loop for while the enemy or player is alive
      if (enemyHealth > 1 && playerHealth > 1) {
  
        playerAttack = attackDmg(minRoll, maxRoll);
  
        //  Player rolls
        // rolled a 2 or lower
        if (playerAttack <= 2) {
          damage = lowDmg;
          enemyHealth -= damage;
          score = score + 5;
          playerAttackMsg = "<p>You attack for " + damage + " points of damage.</p>";
        
        //  rolled between 3 and 5
        } else if (playerAttack == 3 || playerAttack == 4 || playerAttack == 5) {
          damage = baseDmg;
          enemyHealth -= damage;
          score = score + 10;
          playerAttackMsg = "<p>You attack for " + damage + " points of damage.</p>";
  
        //  rolled a 6
        } else if (playerAttack == 6) {
          damage = critDmg;
          enemyHealth -= damage;
          score = score + 15;
          playerAttackMsg = "<p>You attack for " + damage + " points of damage.</p>";

        }
  
        enemyAttack = attackDmg(minRoll, maxRoll);
  
        // Enemy Rolls
        //  rolled a 2 or lower
        if (enemyAttack <= 2) {
          damage = lowDmg;
          playerHealth = playerHealth - damage;
          enemyAttackMsg = "<p>You're hit for " + damage + " points of damage.</p>";
  
        //  rolled between 3 and 5
        } else if (enemyAttack == 3 || enemyAttack == 4 || enemyAttack == 5) {
          damage = baseDmg;
          playerHealth = playerHealth - damage;
          enemyAttackMsg = "<p>You're hit for " + damage + " points of damage.</p>";
          
        //  rolled a 6
        } else if (enemyAttack == 6) {
          damage = critDmg;
          playerHealth = playerHealth - damage;
          enemyAttackMsg = "<p>You're hit for " + damage + " points of damage.</p>";

        }
  
        $("#bd_dialogue").html(playerAttackMsg + enemyAttackMsg);
        $("#bd_health").html("Health: " + playerHealth);

        if (playerHealth <= 0 || enemyHealth <= 0) {
          $("#bd_attack").text("End combat");
        }
  
    } else if (playerHealth <= 0) {
  
        $("#bd_dialogue").html("<p>Looks like you died.  Better luck next time.</p>");
        $('#bd_restart').css("visibility", "visible");
        $('#bd_attack').css("visibility", "hidden");
  
    } else if (enemyHealth <= 0) {
  
      score = score + 20;
  
        $("#bd_dialogue").html("<p>Looks like I got them all.  That was a close one.</p>");
  
        playerHealth = 50;
  
      //  Hide health, attack and start combat buttons
      $('#bd_health').hide();
      $('#bd_attack').hide();
    
      // Show look, pickup item, and use items button
      $('#bd_look').show();
      $('#bd_itemPick').show();
      $('#bd_useItem').show();
  
    }
  
    // End of attack button function
  });
    
    // End of combat sequence function
    });
       
  });
  