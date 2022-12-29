$(document).ready(function () {
    setInterval(function() {
        updatetime();
        if(d > 0) {
            $("#timer").text(getTextForTime());
            $("#timer2").text(getDesc());
        } else {
            sig_newyears();
        }
    }, 1000);
});

let time_2023 = 1672574400000;
let v = 0;
let d = 0;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let secs = 0;
let mins = 0;
let hours = 0;
let days = 0;

function addZero(i) {
    if (i == 0) {
        return "00";
    }
    if (i < 10) {i = "0" + i}
    return i;
}

function sig_newyears() {
    $(function () {
        $("#timernewyear").attr("hidden", true);
        $("#animnewyear").removeAttr("hidden");
    });
}

function updatetime() {
    v = Date.now();
    d = time_2023 - v;
/*
    days = Math.round(d / day);
    d = d - (days * day);
    hours = Math.round(d / hour);
    d = d - (hours * hour);
    mins = Math.round(d / minute);
    d = d - (mins * minute);
    secs = Math.round(d / second);
*/
    const h = new Date();
    h.setTime(d); /* javascript is weird */
    secs = h.getSeconds();
    mins = h.getMinutes();
    hours = h.getHours();
    days = Math.round(d / day);
}

function getTextForTime() {
    let b = "";
    b = addZero(days) + ":" + addZero(hours) + ":" + addZero(mins) + ":" + addZero(secs);
    return b;
}

function getDesc() {
    let b = "";
    b = "That's also " + days + " day(s), " + hours + " hour(s), " + mins + " minute(s), and " + secs + " second(s)."
    return b;
}