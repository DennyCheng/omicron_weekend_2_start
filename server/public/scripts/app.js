$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        // console.log(data.omicron);//accessing the objects array of objects
        var personCounter = 0;
        var boxCounter = 0;
        $("#next").on("click",nextPerson);
        //console.log(data.omicron[0].name)accessing first object in the array's name property
        $("#previous").on("click",previousPerson);

        createPerson(data.omicron[personCounter]);
        createBoxes();
        changeBox();

        function createPerson(person){
          $("#namesList").append('<div class=person></div>').fadeOut().fadeIn();
          $el = $("#namesList").children().last();
          $el.append("<p>"+"Name "+person.name+"</p>");
          $el.append("<p>"+"GitHub UserName "+person.git_username+"</p>");
          $el.append("<p>"+"Message: "+person.shoutout+"</p>");

        }

        function createBoxes(){
          for(var idx = 0; idx < data.omicron.length;idx ++){
            $('#container').append("<div class=box id ="+boxCounter+"></div>")
            boxCounter +=1;
            //each box will have unique id # that will pair up with the boxCounter and link them together
          };
          boxCounter = 0;
          //resets the boxCounter so I can access them with the proper box index/person index
        }

        function nextPerson(){
          //This allows to add to the person counter and create the next person dynamically
          personCounter += 1;
          boxCounter +=1;
          limitChecker();
          changeBox();
          $("#namesList").empty();
          //empty just empties the current div
          //vs remove() removes the whole div
          createPerson(data.omicron[personCounter]);
        }

        function previousPerson(){
          limitChecker();
          //Selects the previous person by decrementing the personCounter and updating the div by removing the previous person and then adding a new one
          personCounter -= 1;
          changeBox();
          boxCounter -= 1;
          $("#namesList").empty();
          createPerson(data.omicron[personCounter]);
        }

        function changeBox(){
          //this will take account of the boxCounter variable and use that to access the propery indexed box
          if(boxCounter == 0){
            $("#0").toggleClass("highLight");
            $("#"+(boxCounter-1)).toggleClass("highLight");
          }
          else if(boxCounter > 0){
            $("#"+(boxCounter-1)).toggleClass("highLight");
            $("#"+boxCounter).toggleClass("highLight");
          }
        }

        function limitChecker(){
          if (personCounter > data.omicron.length-1 || boxCounter > data.omicron.length-1 ){
            personCounter = 0;
            boxCounter = 0;
          }
          else if(personCounter<0||boxCounter <0){
            personCounter = data.omicron.length-1;
            boxCounter = data.omicron.length-1;

          }
        }

//   function timerSet() {
// setInterval(function(){
//createPerson(data.omicron[personCounter]);
// createBoxes();
// changeBox();
//  }, 15000);
// }
//doesn't work need to rework

       }
    });
});
