$(function() {
    // Set initial health
    var health = sessionStorage.getItem("healthLevel");
    console.log(health);
    $("#o_health").html("Health: " + health);

    // Start method that subtracts radiation damage every 7 seconds
    setInterval(dmg, 7000);

    // Function used to subtract radiation damage
    function dmg() {
        health--;
        if (health < 0) {
            alert("You died!")
            window.location = "1_bunker.html"; 
        };
        $("#o_health").html("Health: " + health);
    }
    
    // Hide option buttons upon start
    $('#o_option1').toggle();
    $('#o_option2').toggle();
    $('#o_leave').toggle();
    

    // Reset inventory to remove key 
    var inventory = ["Bottle of water", "Food ration"];

    // Display inventory header and number of items
    $("#inventory").html("Current Inventory(" + inventory.length + ")");

    // Display current inventory items 
    inventory.forEach(function (item) {
      $("#inventory_items").append("<li>" + item + "</li>");
    });
    
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