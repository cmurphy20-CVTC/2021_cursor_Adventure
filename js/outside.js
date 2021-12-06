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

    // Reset inventory to remove key 
    var inventory = ["Bottle of water", "Food ration"];

    // Display inventory header and number of items
    $("#inventory").html("Current Inventory(" + inventory.length + ")");

    // Display current inventory items 
    inventory.forEach(function (item) {
      $("#inventory_items").append("<li>" + item + "</li>");
    });
    
    $('#o_look').on("click", function() {

    $("#o_dialogue").html("<p>Testing Outside Dialogue Box.</p>"); 
    
    
  });
});