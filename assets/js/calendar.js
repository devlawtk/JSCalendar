var timeArray = [9, 10, 11, 12, 1, 2, 3, 4, 5];
var mainCalendarArea = document.querySelector("#mainCalArea");

$(document).ready(function() {

    let dayOfWeek =  moment().format("dddd");
    let today = moment().format('MMMM Do YYYY');

    buildCalendar(dayOfWeek, today);
});

function buildCalendar(dayName, todayDate) {
    var output = [];

    output.push(
        `<div class="row">
        <div class="col-2"></div>
        <div class="col-8 border-0">
            <table class="table table-bordered rounded">
                <tbody>
                    <tr>
                        <td class="td-mySetup"></td>
                        <td class="td-calMiddle text-center font-weight-bold">
                            <h5>
                                ${dayName + ", " + todayDate}
                            </h5>
                        </td>
                        <td class="td-mySetup"></td>
                    </tr>`
    )
	//get our time loop done to build out our JSON
	timeArray.forEach(hourNumber => {
		if (hourNumber < 12 && hourNumber > 5) {
			output.push(`
                <tr>
                    <td class="td-mySetup">${hourNumber}<sup>am</sup></td>
                    <td class="td-calMiddle text-center">
                        ${setColorFromHour(hourNumber, "am")}
                    </td>
                    <td class="td-mySetup">
                        <a class="btn btn-success" href="#" onclick="btnSave(document.getElementById('hour${hourNumber}'))">Save</a> 
                    </td>
                </tr>`
            );
		} else {
            output.push(`
                <tr>
                    <td class="td-mySetup">${hourNumber}<sup>pm</sup></td>
                    <td class="td-calMiddle text-center">
                        ${setColorFromHour(hourNumber, "pm")}
                    </td>
                    <td class="td-mySetup">
                        <a class="btn btn-success" href="#" onclick="btnSave(document.getElementById('hour${hourNumber}'))">Save</a>
                    </td>
                </tr>`
            ); 
        }
    });

    output.push(
        `</tbody>
        </table>
        </div>
        <div class="col-2"></div>
        </div>
        </div>`
    );

    mainCalendarArea.innerHTML = output.join("");
}

function setColorFromHour (hourNumber, todIndicator) {

    var momentHour = moment().format("MM-DD-YYYY " + hourNumber + ":00 ");
    var momentNow = moment().format("MM-DD-YYYY h:00 a");

    momentHour += todIndicator;

    if (moment(momentHour).isSame(momentNow)) {
        return `<input class="myTextArea" type="text" name="hour${hourNumber}" id="hour${hourNumber}" style="background-color: lightskyblue" 
        value="${eventGet("hour" + hourNumber)}">`
    }

    if (moment(momentHour).isBefore(momentNow)){
        return `<input class="myTextArea" type="text" name="hour${hourNumber}" id="hour${hourNumber}" style="background-color: lightgrey" 
        value="${eventGet("hour" + hourNumber)}">`
    }

    if (moment(momentHour).isAfter(momentNow)) {
        return `<input class="myTextArea" type="text" name="hour${hourNumber}" id="hour${hourNumber}" style="background-color: blanchedalmond" 
        value="${eventGet("hour" + hourNumber)}">`
    }
}

function btnSave (inputElement) {

    var userCalEvent = inputElement.value;
    var userCalHour = inputElement.id;

    localStorage.setItem(userCalHour, userCalEvent);
}

function eventGet (eventID) {

    var eventData = localStorage.getItem(eventID)

    if (eventData != null) {
        return eventData;
    } else {
        return "";
    }

}
