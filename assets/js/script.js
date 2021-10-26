
var hours = {
  "9": [], "10": [],  "11": [], "12": [], "13": [], "14": [], "15": [], "16": [], "17": []
};

//text area - default textarea html causing massive responsive issues
$(".scheduler").click(function() {

  $("textarea").each(function() {
      replaceTextArea($(this));
  })

  //to stop being able to write for time past
  var time = $(this).closest(".hourColour").attr("id");
  if (parseInt(time) >= moment().hour()) {

      var text = $(this).text();
      var textInput = $("<textarea>")
          .addClass("form-control")
          .val(text);

      $(this).html(textInput);
      textInput.trigger("focus");
  }
})

//colours

var colours = function() {

  var now = moment().hour();
  $(".hourColour").each( function() {
      var blockHour = parseInt($(this).attr("id"));

      if ( blockHour === now ) {
        $(this).removeClass(["past"]).addClass("current");
  
      }
      else   if ( blockHour < now ) {
        $(this).removeClass(["current"]).addClass("past");
      }

      //default now to original row colour - future colour
  })
};

var setList = function() {
    localStorage.setItem("toDo", JSON.stringify(hours));
}

var getList = function() {

    var loadedTasks = JSON.parse(localStorage.getItem("toDo"));
    if (loadedTasks) {
      hours = loadedTasks

        $.each(hours, function(hour, task) {
            var hour = $("#" + hour);
            createList(task, hour);
        })}}


var createList = function(listText, hour) {

    var hours = hour.find(".scheduler");
    var taskP = $("<p>")
        .addClass("description")
        .text(listText)
        hours.html(taskP);
}


var replaceTextArea = function(textareaElement) {

    var taskInfo = textareaElement.closest(".hourColour");
    var textArea = taskInfo.find("textarea");

    var time = taskInfo.attr("id");
    var text = textArea.val().trim();

    hours[time] = [text]; 
    setList();

    createList(text, taskInfo);
}


//functions

$(".saveButton").click(function() {
    replaceTextArea($(this));
})



$(document).ready(function() {

  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
  getList();
  colours();
});

var intervalId = window.setInterval(function(){
  $("#currentTime").text(moment().format('HH:mm:ss'));
}, 1000);

