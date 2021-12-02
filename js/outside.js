$(function() {
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