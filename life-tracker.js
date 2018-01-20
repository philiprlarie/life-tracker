/* global $, moment */
const YEARS_TO_LIVE = window.localStorage.getItem('lifeExpectancy');
const BIRTHDAY = window.localStorage.getItem('bdate');
if (!BIRTHDAY || ! YEARS_TO_LIVE) {
  window.alert("You must go to the settings for this extension and add your birthday.");
}

const now = moment();
const bday = moment(BIRTHDAY);
const daysOld = now.diff(bday, 'days');
const yearsOld = now.diff(bday, 'years');

// add YEARS_TO_LIVE number of rows
const $lifeTracker = $('#life-tracker');
$lifeTracker.append(() => {
  let str = '';
  for (let i = 0; i < YEARS_TO_LIVE; i++) {
    str += '<div class="year"></div>';
  }
  return str;
});
$('.year').css({ height: `${100 / YEARS_TO_LIVE}%` });

// fill in full years
for (let i = 0; i < yearsOld; i++) {
  $lifeTracker.find('.year').eq(i).addClass('lived');
}

// fill in current year whatever percentage it deserves
let mostRecentBdayYear;
if (now.month() > bday.month()) {
  mostRecentBdayYear = now.year();
} else if (now.month() === bday.month() && now.date() >= bday.date()) {
  mostRecentBdayYear = now.year();
} else {
  mostRecentBdayYear = now.year() - 1;
}
const mostRecentBday = moment({
  year: mostRecentBdayYear,
  day: bday.date(),
  month: bday.month()
});
const daysLivedThisYear = now.diff(mostRecentBday, 'days');
const $currentYear = $lifeTracker.find('.year').eq(yearsOld);
const $daysThisYear = $('<div class="days-this-year lived"></div>');
$daysThisYear.css({ width: `${daysLivedThisYear / 365 * 100}%` });
$currentYear.append($daysThisYear);

// add single box for today
const $today = $('<div class="today"></div>');
$today.css({ width: `${1 / 365 * 100}%` });
$currentYear.append($today);

// Add title to the page
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
$('title').html(`${numberWithCommas(daysOld)} days so far...`);

setTimeout(() => {
  $('.overlay').addClass('clear');
}, 50);
