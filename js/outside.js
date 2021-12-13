$(function() {
    // Set initial health
    var health = parseInt(sessionStorage.getItem("healthLevel"));
    var maxHealth = sessionStorage.getItem("initalHealth");
    
    // Display current health
    function showHealth() {
        $("#o_health").html("Health: " + health);
    }

    // Display intial health
    showHealth();
    

    // Start method that subtracts radiation damage every 1 seconds
    setInterval(function() {
            health--;
            if (health < 0) {
                alert("You died!")
                window.location = "1_bunker.html"; 
            };
            $("#o_health").html("Health: " + health);
        }, 
        1000); // 1000ms = 1s 
    
    // Hide option buttons upon start
    $('#o_option1').toggle();
    $('#o_option2').toggle();
    $('#o_leave').toggle();
    

    // Reset inventory to remove key 
    var inventory = JSON.parse(sessionStorage.getItem("inventory"));

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

        console.log(itemKey);

        // Determine how the item will be used
        switch (itemKey) {
          case "Bottle of water":
              // Remove 5 water and add 5 health
              useHealthItem(itemKey, 25);
              break;
          case "Food ration": 
                // Remove 10 water and add 10 health
              useHealthItem(itemKey, 50);
              break;
        }     
      });
    }

    // Called to when item is used to increase health
    function useHealthItem(itemKey, amount) {
        if (health <= (maxHealth-amount)) {
            // Subtract amount from item
            inventory[itemKey] --;

            // Add health
            health += amount;

            // Remove item if it is empty 
            if (inventory[itemKey] <= 0) {
                delete inventory[itemKey]; 
            }
                        
            // Update health and inventory
            displayInventory();
            showHealth();
        }
    }

    displayInventory();

    $('#o_look').on("click", function() {

    $("#o_dialogue").html("<p>I can see a building that is one fire about a half mile down the road.</p>"); 
        
    $('#o_look').html("Walk towards building");
        
    });
        
    $('#o_look').on("click", function() {

        $("#o_dialogue").html("<p>Now that I am getting closer, it looks like I only have two foreseeable paths to get there. <br> I see there is a overhead highway to my right. Raiders tend to be hiding near these to catch unexpecting travelers off guard.<br> My other choice is walking straight to the building. Which would require me to walk through some water. I don't know what is in there or how deep it is.</p>"); 
        
        $('#o_look').toggle();
        
        $('#o_option1').toggle();
        $('#o_option1').html("Take the highway");
    
        $('#o_option2').toggle();
        $('#o_option2').html("Walk through the water");
        
            $('#o_option1').on("click", function() {
        
                $("#o_dialogue").html("<p>I'm going to stay low and try to stick to one of the highway side barriers.</p>");
                
                $('#o_option1').toggle();
                $('#o_option2').toggle();
                $('#o_look').toggle();
                
                $('#o_look').html("Make way across highway");
                
                $('#o_look').on("click", function() {
                    
                    $("#o_dialogue").html("<p>I'm about halfway across the highway and I can hear people talking below me. I carefully peek over the barrier.<br> I can see two men with baseball bats walking around.</p>");
                    
                    $('#o_option1').html("Attack Men");
                    $('#o_option2').html("Continue unnoticed");
                    
                    $('#o_option1').on("click", function() {  
                        
                        $("#o_dialogue").html("<p>I found a spot where I can drop down safely to confront these two men.<br><br><br> (Intergrate Raider Combat sequence)</p>");
                        
                        $('#o_option1').toggle();
                        $('#o_option2').toggle();
                        
                    });
                    
                    $('#o_option2').on("click", function() {
                        
                        $("#o_dialogue").html("<p>I made it safely across the highway. I turned around to see where those men were. I cannot see them, so I am going to assume they are headed the opposite direction of the bulding.</p>");
                        
                        $('#o_leave').toggle();

                        // Save the current health level for use on other pages
                        sessionStorage.setItem("healthLevel", health);
                        sessionStorage.setItem("inventory", JSON.stringify(inventory));
                        
                        $('#o_option1').toggle();
                        $('#o_option2').toggle();
                        
                    });
                    
                });
        
            });
    
            $('#o_option2').on("click", function() {
        
                $("#o_dialogue").html("<p>Wish I would have brought my swimsuit with me. Or at least some better shoes for this.</p>");
                
                $('#o_option1').toggle();
                $('#o_option2').toggle();
                
                $('#o_look').toggle();
                $('#o_look').html("Make way across water")
                
                $('#o_look').on("click", function() {
                    
                    $("#o_dialogue").html("<p>The water goes right up to my chest. It has a very nasty smell and slight glow to it.<br> I get about halfway across the water when I feel a crab-like claw grab my arm and pull my torso into the water.<br><br><br>(Intergrate Water monster Combat sequence)</p>"); 
                    
                    $('#o_option1').toggle();
                    $('#o_option2').toggle();
                    
                });
                
        
            });
    
    });
});