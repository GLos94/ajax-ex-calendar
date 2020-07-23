
// milestone1 - creiamo il mese di gennaio
function printMonth(currentMonth) {
  var daysInMonth = currentMonth.daysInMonth();


  var template = $('#day-template').html();
  var compiled = Handlebars.compile(template);
  var target = $('.giorni-mese');

  target.html("");

  for (var i = 1; i <= daysInMonth; i++) {
    var datecomplete = moment({ year: currentMonth.year(), month: currentMonth.month(), day: i});
    var dayshtml = compiled({
      "value": i,
      "datecomplete": datecomplete.format("YYYY-MM-DD")
    });

    target.append(dayshtml);
  }

}

function printHoliday(currentMonth) {
  var year = currentMonth.year();
  var month = currentMonth.month();

  $.ajax({


    url: 'https://flynn.boolean.careers/exercises/api/holidays',
    method: 'GET',
    data: {
      'month': month,
      'year': year
    },

    success: function (data){
      var holidays = data['response'];
      for (var i = 0; i < holidays.length; i++) {
        var element = $(".giorni-mese li[data-datecomplete='" + holidays[i]["date"] +"']");
        element.addClass("red");
        element.append(" - " + holidays[i]["name"]);
      }
    },

    error: function (err) {
      console.log('err', err);
    }


  })
}



function init() {
  var currentMonth = moment("2018-01-01");
  printMonth(currentMonth);
  printHoliday(currentMonth);

}

$(document).ready(init);
