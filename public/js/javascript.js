let currentYear = moment().format("YYYY")
let currentMonth = moment().format("MM");
let daysInMonth;

var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var time = ["6am", "615am", "630am", "645am", "7am", "715am", "730am", "745am", "8am", "815am", "830am", "845am", "9am", "915am", "930am", "945am", "10am", "1015am", "1030am", "1045am", "11am", "1115am", "1130am", "1145am", "12pm", "1215pm", "1230pm", "1245pm", "1pm", "115pm", "130pm", "145pm", "2pm", "215pm", "230pm", "245pm", "3pm", "315pm", "330pm", "345pm", "4pm", "415pm", "430pm", "445pm", "5pm", "515pm", "530pm", "545pm", "6pm", "615pm", "630pm", "645pm", "7pm", "715pm", "730pm", "745pm", "8pm", "815pm", "830pm", "845pm", "9pm"]

formCalendar()


function formCalendar() {
    $(".calendarLocation").empty()

    //create a box to hold the calendar in 

    const outSideBox = $("<div>")
    outSideBox.addClass("calendarBox");

    $(".calendarLocation").append(outSideBox);

    // this function will display month selector and year selector for the user to browse through
    monthSelection()


    //create days of the week to append to calendar at the top
    formDayOfWeek()
    ///creates days in the month 
    formDaysInMonth()


}



function monthSelection() {

    // gather the name of the month listed in the array
    var monthOption = months[currentMonth - 1];



    //create div to hold month selection
    var monthContainer = $("<div>");
    monthContainer.addClass("monthContainer");



    //create arrows for choosing month..going left/right and starting with current  month showing------
    var leftBtn = "<i class='fas fa-angle-left fa-lg monthBTN' id='leftBtn'></i>";

    var rightBtn = "<i class='fas fa-angle-right fa-lg monthBTN' id='rightBtn'></i>";

    var mO = $("<div>");
    mO.addClass("monthOption")
    mO.text(monthOption)
    // -------                                                                                      

    //create arrows for choosing year..going left/right and starting with current  year showing ------
    var yrLeftBtn = "<i class='fas fa-angle-down fa-xs yearBTN' id='yrLeftBtn'></i>";

    var yrRightBtn = "<i class='fas fa-angle-up fa-xs yearBTN' id='yrRightBtn'></i>";

    var yO = $("<div>");
    yO.addClass("yearOption");
    yO.text(currentYear)
    // --------

    // attach the created div information to the page
    $(monthContainer).append(leftBtn)
    $(monthContainer).append(mO)
    $(monthContainer).append(rightBtn)

    $(yO).prepend(yrLeftBtn);
    $(yO).append(yrRightBtn);

    var containing = $("<div>");
    containing.addClass("containing");

    $(".calendarLocation").prepend(containing)

    $(containing).prepend(monthContainer)

    $(containing).prepend(yO)


    // ---------

    // click events for changing the year by increasing or decreasing year 
    $("#yrLeftBtn").on("click", function(e) {
        e.preventDefault()

        currentYear = (parseInt(currentYear) - 1);

        // This will re-render the page with new information
        formCalendar()
    })

    $("#yrRightBtn").on("click", function(e) {
        e.preventDefault()

        currentYear = (parseInt(currentYear) + 1);

        // This will re-render the page with new information
        formCalendar()
    })
    // -----------


    // click events for changing the year by increasing or decreasing month option    

    $("#leftBtn").on("click", function(e) {
        e.preventDefault()
        currentMonth = (parseInt(currentMonth) - 1);
        if (currentMonth < 1) {
            currentMonth = 12
            currentYear = currentYear - 1;
        }

        // This will re-render the page with new information
        formCalendar()
    })

    $("#rightBtn").on("click", function(e) {
        e.preventDefault()
        currentMonth = (parseInt(currentMonth) + 1);
        if (currentMonth > 12) {
            currentMonth = 1
            currentYear = (parseInt(currentYear) + 1);
        }


        // This will re-render the page with new information
        formCalendar()
    })
    // -----------
}




//this funtion popluates text showing the days of the week mon-fri 
function formDayOfWeek() {

    // a table is created and a row is attached to the table so we can input the days of the week
    const calendarTable = $("<table>");
    calendarTable.addClass("calendarTable")

    const daysOfWkrow = $("<tr>");
    daysOfWkrow.addClass("dayOfWkrow")

    $(calendarTable).append(daysOfWkrow)
    // -------

    // here we are looping through the array of days of the week to populate the data into the newly created row
    for (var i = 0; i < dayOfWeek.length; i++) {

        // the data being placed into the row is labeled with a <th> element because they are the column headers and a class and id has been given to each entry
        const dayOfWkData = $("<th>");
        dayOfWkData.addClass("daysOfWkData");
        dayOfWkData.text(dayOfWeek[i]);
        dayOfWkData.attr("id", [i]);

        $(daysOfWkrow).append(dayOfWkData)

    }

    // -------------

    // the information is popluated to the page using append
    $(".calendarBox").append(calendarTable)



}




function formDaysInMonth() {
    // here we find out whhich year and month the user is looking at. Based on that data, we use momentjs to
    // determine how many days are in a month

    daysInMonth = moment(currentYear + "-" + currentMonth, "YYYY,MM").daysInMonth();

    var day = 01;

    // the variable x is finding out what day the 1st of the month begins on then it subtracts 1. 
    // this way we know how many blank spaces to put before the 1st of the month of the calendar
    var x = (moment("" + currentYear + "-" + currentMonth + "-1").format("d"))
    console.log(x + "HERE IS X")

    // here row are being created to represent each week in the month. there are 6 rows being created
    for (j = 0; j < 6; j++) {

        let weekRow = $("<tr>");
        // the row is appended to the page
        $(".calendarTable").append(weekRow)


        // this section goes through each row created and creates 7 days for each week or row.
        for (var i = 0; i < 7; i++) {

            // this if statement is saying if it is the first week AND i is less than the number of blank spaces needed before
            // the 1st, then place a blank space on the calendar.
            if (([j] == 0) && (i < x)) {
                let addDay = $("<th>")
                addDay.addClass("noDay");
                $(weekRow).append(addDay)

            }

            // otherwise print to screen a box and label it with the numerical value of the day until
            // it reaches the max amount of days for the month
            else {

                // the if statement ensures we will not print more boxes than is needed for the month.
                // each box is being labeled with an id that represents the specific day so we can later add
                // information specific to that date
                if (day <= daysInMonth) {

                    let addDay = $("<th>")
                    addDay.addClass("addDay");
                    addDay.attr("id", formatDate())
                    addDay.attr("data-day", day)
                    addDay.text(day).append("<br>")

                    let addIcon = $("<div class='addIcon' data-toggle='modal' data-target='#exampleModalLong' data-id=" + formatDate() + "><i class='far fa-plus-square'></i></div>")
                    addIcon.addClass("addIcon");
                    addIcon.attr("data-toggle", 'modal')
                    addIcon.attr("data-target", "#exampleModalLong")
                    addIcon.attr("data-id", formatDate())
                    addIcon.attr("id", formatDate() + day)
                    addIcon.css("display", "none")

                    addDay.append(addIcon)


                    $(weekRow).append(addDay)
                    day++
                }


            }
        }


    }

    $(".addDay").hover(function(e) {
        var x = (e.target.id + ($(this).data("day")))

        $("#" + x + "").css("display", "block")

    }, function(e) {
        var x = (e.target.id + ($(this).data("day")))

        $("#" + x + "").css("display", "none")
    })

    // we use this function to make sure the date format is the same that is being placed into the database.
    // this way when information is getting added to the page from the database it can find the correct location
    // easily
    function formatDate() {
        var date = currentYear + "/" + currentMonth + "/" + (day)
        var formatedDate = moment(date).format("YYYYMMDD")
        return formatedDate
    }
    // ----------


    //  THIS AREA CAN HOLD A FUNCTION THAT WILL CHECK IF ANY EVENTS ARE SCHEDULED FOR MONTH AND PLACE THEM ON THE CALENDAR
    checkSchedule()



    //this populates a modal that allows the user to enter information they want to add to the specific day
    $(".addIcon").on("click", function(e) {
        e.preventDefault()
        let targetId = $(this).data("id");

        console.log(targetId)

        addEvent(targetId)
    })
}
// -----------------------------------------------------------------------------------------------------
//this function will push information from the input box into a database and then call a function to
// refresh the page and have the information saved on that day
function addEvent(targetId) {
    addNewEventForm()

    $("#putInfo").on("click", function(e) {
        e.preventDefault()

        var eventPackage = {
            date: targetId,
            time: $("#selectedTime").val(),
            event: $("#event").val()
        }


        // send packaged information to the database
        $.post("/api/addevent", eventPackage, function() {
            formCalendar()
        })

        $("#exampleModalLong").modal('toggle');
        //after information has been sent to the database then refresh the page so the data can be obtained from database
        //and entered into the calendar

    })



}

$(".close").on("click", function() {
    formCalendar()
})

// this function populates information into a modal for the user to input information
function addNewEventForm() {
    var form = "<div class='form-group'><label for='exampleFormControlSelect1'>Time</label><select class='form-control' id='selectedTime'></select>";
    form += "</div><div class='form-group'><label for='exampleFormControlTextarea1'>Event:</label>";
    form += "<textarea class='form-control' id='event' rows='3'></textarea></div>";

    submitBtn = "<button id='putInfo'>submit</button>";


    $(".modal-title").html("Enter Event")
    $(".modal-footer").html(submitBtn)


    $(".modal-body").html(form)
    for (j = 0; j < time.length; j++) {
        var timeSelection = "<option value=" + time[j] + ">" + time[j] + "</option>";
        $("#selectedTime").append(timeSelection)
    }

}
// -----------------------------------------------------------------------------------------------


// THIS AREA QUEIRIES THE DATABASE FOR THE MONTH THE USER IS LOOKING AT. IF THERE IS DATA SUBMITTED FOR THAT MONTH
// IT WILL SHOW UP ON THE DAY THE EVENT IS SUPPOSED TO OCCUR
function checkSchedule() {

    var start = moment(currentYear + "/" + currentMonth + "/" + 1).format("YYYYMMDD");
    var end = moment(currentYear + "/" + currentMonth + "/" + daysInMonth).format("YYYYMMDD");

    $.get("/api/daterange/" + start + "/" + end + "", function(results) {
        for (var i = 0; i < results.length; i++) {

            var id = results[i].id;
            var dateId = results[i].date;
            var time = results[i].time;
            var event = results[i].event;


            //this will add an event and time of event if one exists for this specific day in the database
            var display = $("<div>");
            display.addClass("eventDetails")
            display.attr("id", dateId)
            display.attr("data-time", time)
            display.text(time + " - " + event);



            //this will add an edit button to each event being placed into the spefic day. it is given specific
            //attributes to reference the specifc day/ event/ and time so we know which event needs to be edited
            //and can populate the information already existing into an edit form to change
            var editBtn = $("<div>");
            editBtn.addClass("fas fa-pencil-alt editBtn");
            editBtn.attr("id", dateId + time)
            editBtn.attr("data-time", time)
            editBtn.attr("data-dateId", dateId)
            editBtn.attr("data-id", id)
            editBtn.attr("data-toggle", 'modal')
            editBtn.attr("data-target", "#exampleModalLong")
            editBtn.css("display", "none")

            $(display).append(editBtn);

            $("#" + dateId + "").append(display)
        }


        //when hovering over a specific event it will display the edit button to select
        $(".eventDetails").hover(function(e) {

            var x = e.target.id
            var y = $(this).data("time");
            var w = x + y

            $("#" + w + "").css("display", "block")
        }, function(e) {
            var x = e.target.id
            var y = $(this).data("time");
            var w = x + y

            $("#" + w + "").css("display", "none")
        })



        //when the edit button is selected it will gather information saved as attributes to query the database and gather the
        //specific event occuring on that day at that time

        $(".editBtn").on("click", function(e) {
            e.preventDefault()
            let editTime = ($(this).data("time"))
            let databaseId = ($(this).data("id"))


            $.get("/api/getSingleEvent/" + databaseId, function(results) {

                var Events = results[0].event
                populateEditToModal(editTime, Events, databaseId)
            })


        })
    })


}



//the information is passed into this funtion to populate to the modal for reviewing and editing
function populateEditToModal(editTime, event, databaseId) {

    $(".modal-title").html("Edit Date");

    var form = "<div class='form-group'><label for='exampleFormControlSelect1'>Time</label><select class='form-control' id='selectedTime'><option selected>" + editTime + "</option></select>";
    form += "</div><div class='form-group'><label for='exampleFormControlTextarea1'>Event:</label>";
    form += "<textarea class='form-control' id='event' rows='3'>" + event + "</textarea></div>";

    var submitEdit = $("<button>");
    submitEdit.addClass("submitEdit")
    submitEdit.text("submit edit")


    var deleteEvent = $("<button>");
    deleteEvent.addClass("deleteEvent")
    deleteEvent.text("delete event")

    $(".modal-footer").html(submitEdit)
    $(".modal-footer").append(deleteEvent)

    $(".modal-body").html(form);

    for (j = 0; j < time.length; j++) {
        var timeSelection = "<option value=" + time[j] + ">" + time[j] + "</option>";
        $("#selectedTime").append(timeSelection)
    }


    //on submit the updated information is passed into the database and is identified based on the database id

    $(".submitEdit").on("click", function(e) {
        e.preventDefault()
        var info = {
            id: databaseId,
            time: $("#selectedTime").val(),
            event: $("#event").val()
        }

        $.ajax({
            url: "/api/editEvent",
            method: "PUT",
            data: info
        }).then(function() {
            console.log("added")
            formCalendar()
        })
        $("#exampleModalLong").modal('toggle');

    })



    //when delete is selected the database is queried for a specific id. when it finds that id it will delete all information
    //under that id
    $(".deleteEvent").on("click", function(e) {
        e.preventDefault()
        var info = {
            id: databaseId
        }
        $.ajax({
            url: "/api/deleteEvent",
            method: "DELETE",
            data: info
        }).then(function() {
            console.log("deleted")
            formCalendar()
        })
        $("#exampleModalLong").modal('toggle');
    })




}