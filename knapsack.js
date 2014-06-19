

var maxWeight = 20;
var w = 500;
var h = 600;
var height = 100;
var history = [];
var ratio = 0;
var bestWeight = 0;

function scatter(){
        //Create SVG element
        var svg = d3.select(".chart")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);
        svg.selectAll("circle")
            .data(history)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return d[0]*17;
            })
            .attr("cy", function(d) {
                return d[1]/2.2   ;
            })
            .attr("r", 4);
        svg.selectAll("text")
            .data(history)
            .enter()
            .append("text")
            .attr("class","coordinate")
            .text(function(d) {
                return d[0] + "kg , $" + d[1];
            })
            .attr("x", function(d) {
                return d[0]*17;
            })
            .attr("y", function(d) {
                return d[1]/2.2;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "12px")
            .attr("fill", "blue");

}    

$(document).ready(function(){   

    //makes captions for each image
    $(".images").each(function(){
        var value = $(this).children('img').data("value") 
        var weight = $(this).children('img').data("weight")
        $(this).children($('.caption')).html("$" + value + ", " + weight + "kg");
    })


    var value = 0;
    var weight = 0;

    $(".clearSc").click(function(){
        history = [];
        d3.selectAll("circle").remove();
        d3.selectAll(".coordinate").remove();
        scatter();
    })


    $(".images").click(function(){

        var name = $(this).children('img').data("name"); 
        var location = $(this).parent().get(0).id;

        thisWeight = $(this).children('img').data("weight");
        tempWeight = weight + thisWeight
        thisValue = $(this).children('img').data("value")

        if (location == "house"){
            //weight += $(this).children('img').data("weight");
            if (tempWeight <= maxWeight){
                $(this).appendTo("#knapsack");
                weight = tempWeight;
                value += thisValue;
            }
            else{
                //TODO: Add tasteful alert: not sure if this is tasteful
                $('.alerts').append( ' <div class="alert alert-warning alert-dismissable"> <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times; </button> <strong>Warning!</strong> Backpack is too heavy! </div> ');
            }
        }
        if (location == "knapsack"){
            $(this).appendTo("#house");
            weight -= thisWeight;
            value -= thisValue;
        }

        $('#value').html(value);
        $('#weight').html(weight);

        if (value/weight > ratio){
            ratio = value/weight 
            $('.ratio').text(ratio);
            var itemList = [];
            $("#knapsack").children('figure').children('img').each(function(){
                itemList.push($(this).data("name"));
            })
            $('.ratioItems').text(itemList);
            
        }

        
        
        
        history.push([weight, value]);
        scatter();

    })


})


