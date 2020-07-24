
// milestone1 - creiamo il mese di gennaio
function printMonth(currentMonth) {
  var daysInMonth = currentMonth.daysInMonth();


  var template = $('#day-template').html();
  var compiled = Handlebars.compile(template);
  var target = $('.giorni-mese.active');

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

// facciamo comparire le festività
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


// Cambio mese
function switchMonth(){

  var nextButton = $('.next');
  var prevButton = $('.prev');

// Mese successivo
nextButton.click(function(){
  var currentMonth = $(".giorni-mese.active");
  var currentTitle = $("h1.active");

// Cambio ul
  var nextMonth = currentMonth.next();
    currentMonth.removeClass("active");
    nextMonth.addClass("active");

// Cambio h1
  var nextTitle = currentTitle.next();
    currentTitle.removeClass("active");
    nextTitle.addClass("active");

  });



// Mese precendente
prevButton.click(function(){
  var currentMonth = $(".giorni-mese.active");
  var currentTitle = $("h1.active");

// Cambio ul
  var prevMonth = currentMonth.next();
    currentMonth.removeClass("active");
    prevMonth.addClass("active");

// Cambio h1
  var prevTitle = currentTitle.next();
    currentTitle.removeClass("active");
    prevTitle.addClass("active");

  });

}

function init() {
  var anno = 2018;
  var month;

  for(var i = 1; i <= 12; i++){
      month = i;
      var currentMonth = moment(anno + "-" + month + "-01");
  }


  printMonth(currentMonth);
  printHoliday(currentMonth);
  switchMonth();

}

$(document).ready(init);
