//Script to set up a dynamic calendar

//this part sets up some important calendar information
var currDate = new Date();
// currDate = new Date(2026, 10, 30);

var monthDayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
if(currDate.getFullYear() % 4 == 0 && currDate.getFullYear() % 100 != 0 ||
    currDate.getFullYear() % 400 == 0) {
    monthDayCount[1] = 29;
}
var daysArr = document.querySelectorAll(".calendar td");

setCalendar();

document.querySelector(".calendar .month :last-child").addEventListener("click", onNextMonthClick);
document.querySelector(".calendar .month :first-child").addEventListener("click", onLastMonthClick);



function setCalendar() {
    //setting the current month
    document.querySelectorAll(".month > *")[1].innerHTML = new Intl.DateTimeFormat('en-US', {month: 'long', year: 'numeric'}).format(currDate);
    
    var currMonthStart = currDate.getDay();
    var currMonthOffset = currDate.getDate() % 7;

    while(currMonthOffset > 0) {
        currMonthStart--;
        currMonthOffset--;
    }
    if(currMonthStart < 0) {
        currMonthStart += 7;
    }

    //remove current stuff attached to all days
    daysArr.forEach((x) => {
        x.innerHTML = "";
        x.removeEventListener("click", onDayClick)
    });
    
    //adding in day numbers + event listeners
    for(let i = currMonthStart; i < monthDayCount[currDate.getMonth()] + currMonthStart; i++) {
        daysArr[i].innerHTML = (i - currMonthStart + 1).toString();
        daysArr[i].addEventListener("click", onDayClick)
        
    }
}

function onNextMonthClick() {
    if(currDate.getMonth() == 11) {
        currDate.setMonth(0);
        currDate.setFullYear(currDate.getFullYear() + 1);
    } else {
        currDate.setMonth(currDate.getMonth() + 1);
    }

    setCalendar();
}

function onLastMonthClick() {
    if(currDate.getMonth() == 0) {
        currDate.setMonth(11);
        currDate.setFullYear(currDate.getFullYear() - 1);
    } else {
        currDate.setMonth(currDate.getMonth() - 1);
    }

    setCalendar();
}

function onDayClick() {
    //PLACEHOLDER FOR EVENT VIEWING FUNCTIONALITY
    console.log(this.innerHTML);
}