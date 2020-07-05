/**
* jQuery Slot Machine by Stefan Petre.
* http://www.eyecon.ro/slotmachine/
*
* Modified.
*/

var MAPS = ["ORIGINAL", "HELLAS", "ELYSIUM"];

NAMES = ["TERRAFORMER", "MAYOR", "GARDENER", "BUILDER", "PLANNER",
         "GENERALIST", "SPECIALIST", "ECOLOGIST", "TYCOON", "LEGEND",
         "DIVERSIFIER", "TACTICIAN", "POLAR EXPLORER", "ENERGIZER", "RIM SETTLER",
         "HOVERLORD",
         "LANDLORD", "SCIENTIST", "BANKER", "THERMALIST", "MINER",
         "CELEBRITY", "INDUSTRIALIST", "DESERT SETTLER", "ESTATE DEALER", "BENEFACTOR",
         "CULTIVATOR", "MAGNATE", "SPACE BARON", "EXCENTRIC", "CONTRACTOR",
         "VENUPHILE"]

var WEIGHT =[5,6.5,30,7,3,
         3, 4, 12,7,3,
         4, 3, 10,6,6,
         3, 
         20,0.7,0.7,0.6,9.5,
         0.7, 9,20,20,0.7,
         30, 0.7, 1.2,0.7,10,
         3];


var WEIGHT_ELYSIUM =[5,6.5,30,7,3,
         3, 4, 10,7,3,
         4, 3, 10,6,6,
         3, 
         29,0.8,0.8,0.8,9,
         0.8, 8,15,15,0.9,
         30, 0.9, 1.7,0.8,8,
         3];

var clearweight_bymap = []
var sumweight_bymap = []

SYNERGIES = [
   ["",0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,  1,0,0,1,0,0,0,1,1,9,2,0,0,0,0,0],
   [0,"",3,0,0,0,0,0,0,0,0,0,8,0,0,0,  6,0,0,0,0,0,0,3,3,0,3,0,0,0,0,0],
   [0,0,"",0,0,0,0,4,0,0,0,0,8,0,0,0,  6,0,0,0,0,0,0,3,3,2,9,0,0,0,0,0],
   [0,0,0,"",0,0,0,0,4,0,0,0,0,0,0,0,  0,0,0,0,1,0,1,0,0,0,0,3,0,0,9,0],
   [0,0,0,0,"",0,0,0,0,0,0,0,0,0,0,0,  0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,"",0,0,0,0,0,0,0,0,0,0,  0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,"",0,0,0,0,0,0,4,0,0,  0,0,2,1,1,0,1,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,"",2,0,4,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,1,1,0,4,0,0],
   [0,0,0,0,0,0,0,0,"",0,1,1,0,0,1,0,  0,2,0,0,0,0,0,0,0,0,0,9,2,0,2,2],
   [0,0,0,0,0,0,0,0,0,"",0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,"",0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,"",0,0,0,0,  0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,"",0,0,0,  4,0,0,0,0,0,0,8,2,0,3,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,"",0,0,  0,0,0,3,0,0,6,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,"",0,  0,0,0,0,0,2,0,0,0,0,0,1,5,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"",  0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,5],

   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  "",0,0,0,0,0,0,7,7,0,8,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,"",0,0,0,0,0,0,0,0,0,2,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,"",0,0,0,0,0,0,1,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,"",0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,"",0,7,0,0,0,0,0,4,0,4,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,"",0,0,0,0,0,1,3,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,"",0,0,0,0,0,0,0,4,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,"",5,1,7,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,"",1,8,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,"",3,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,"",0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,"",2,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,"",0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,"",0,2],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,"",0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,""]
];

var SYNERGIES_ELYSIUM = [];
for (var i = 0; i < SYNERGIES.length; i++)
   SYNERGIES_ELYSIUM[i] = SYNERGIES[i].slice();
SYNERGIES_ELYSIUM[23][24] = 0;

var synergy_matrix = []

previousSUM = 0;
limit = 3;
limit2 = 60;
gauge(0,0);
(function($){

    var slotMachine = function(){

            startSlot = function(){

                spinning = false;

                $('#slot-trigger').removeClass('slot-triggerDisabled');

                this.blur();

                return false;

            },
            endSlot = function(){

                $('#slot-block').show();
            },
            spin = function(){

                this.blur();

                if(spinning == false){

                    setTimeout(function(){
                      document.getElementById("note").style.transform = "scaleY(0)"
                    },1000)


                    $('#slot-machine .arm').animate({ top: '45px', height: '2%' });
                    $('#slot-machine .arm .knob').animate({ top: '-20px', height: '20px' });
                    $('#slot-machine .arm-shadow').animate({ top: '40px' }, 380);
                    $('#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow').animate({ top: '50%', opacity: 1 });

                    conflictSUM = 0;
                    spinsArray = [];
                    combinationsText = "";
                    sumsText = "";
                    //generate the spins
                    generateSpins();

                    //display the conflict SUM
                    setTimeout(function(){
                        gauge(previousSUM, conflictSUM);
                        previousSUM = conflictSUM;
                    }, 2500);

                    //trigger the red lamp
                    setTimeout(function(){
                      if (conflictSUM > 45 ) {document.getElementById("lamp-body").classList.add("red-light");}
                      else if (conflictSUM > 29 && conflictSUM < 45) {document.getElementById("lamp-body").classList.add("orange-light");}
                      else {document.getElementById("lamp-body").classList.remove("red-light", "orange-light");}

                      document.getElementById("total-sum").innerHTML = conflictSUM;
                      document.getElementById("combinations").innerHTML = combinationsText;
                      document.getElementById("sums").innerHTML = sumsText;
                      document.getElementById("note").style.transform = "scaleY(1)";

                    },3500);



                    $('#slot-trigger').addClass('slot-triggerDisabled');

                    $('img.slotSpinAnimation').show();

                    $('#wheel1 img:first').css('top', - (spin[0] * 100 + 16) + 'px');
                    $('#wheel2 img:first').css('top', - (spin[1] * 100 + 16) + 'px');
                    $('#wheel3 img:first').css('top', - (spin[2] * 100 + 16) + 'px');
                    $('#wheel4 img:first').css('top', - (spin[3] * 100 + 16) + 'px');
                    $('#wheel5 img:first').css('top', - (spin[4] * 100 + 16) + 'px');

                    $('#wheel6 img:first').css('top', - (spin[5] * 100 + 16) + 1600 + 'px');
                    $('#wheel7 img:first').css('top', - (spin[6] * 100 + 16) + 1600 + 'px');
                    $('#wheel8 img:first').css('top', - (spin[7] * 100 + 16) + 1600 + 'px');
                    $('#wheel9 img:first').css('top', - (spin[8] * 100 + 16) + 1600 + 'px');
                    $('#wheel10 img:first').css('top', - (spin[9] * 100 + 16) + 1600 + 'px');

                    setTimeout(function(){
                        $('#slot-machine .arm').animate({ top: '-25px', height: '50%', overflow: 'visible' });
                        $('#slot-machine .arm .knob').animate({ top: '-15px', height: '16px' });
                        $('#slot-machine .arm-shadow').animate({ top: '13px' });
                        $('#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow').animate({ top: '0', opacity: 0 });
                    }, 500);

                    setTimeout(function(){
                        stopSpin(1);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(2);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(3);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(4);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(5);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(6);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(7);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(8);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(9);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(10);
                    }, 1500 + parseInt(1500 * Math.random()));

                }

                return false;

            },
            stopSpin = function(slot){
                $('#wheel' + slot)
                    .find('img:last')
                    .hide()
                    .end()
                    .find('img:first')
                    .animate({
                        top: - spin[slot - 1] * 100
                    },{
                        duration: 500,
                        easing: 'elasticOut',
                        complete: function() {

                            spinning --;

                            if(spinning <= 0){
                                endSpin();
                            }

                        }
                    });
            },

            stopSpin2 = function(slot){
                $('#wheel' + slot)
                    .find('img:last')
                    .hide()
                    .end()
                    .find('img:first')
                    .animate({
                        top: - spin[slot - 1] * 100 + 1600
                    },{
                        duration: 500,
                        easing: 'elasticOut',
                        complete: function() {

                            spinning --;

                            if(spinning <= 0){
                                endSpin();
                            }

                        }
                    });
            },
            endSpin = function(){

                setTimeout(function(){

                        $('#slot-trigger').removeClass('slot-triggerDisabled');
                        spinning = false;

                }, 10);
            };
        return {

            init: function(){

                startSlot();

                $('#slot-trigger')
                    .bind('mousedown', function(){
                        $(this).addClass('slot-triggerDown');
                    })
                    .bind('click', spin);

                $(document).bind('mouseup', function(){
                    $('#slot-trigger').removeClass('slot-triggerDown');
                });

                $('#wheel1 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel2 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel3 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel4 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel5 img:first').css('top', - (16 * 100) + 'px');

                $('#wheel6 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel7 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel8 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel9 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel10 img:first').css('top', - (16 * 100) + 'px');
            }

        };
    }();

    $.extend($.easing,{
        bounceOut: function (x, t, b, c, d){
            if((t/=d) < (1/2.75)){
                return c*(7.5625*t*t) + b;
            } else if(t < (2/2.75)){
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if(t < (2.5/2.75)){
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeOut: function (x, t, b, c, d){
            return -c *(t/=d)*(t-2) + b;
        },
        elasticOut: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        }
    });

    $(document).ready(slotMachine.init);

})(jQuery);

function clear_weights(goal) {
  clearweight_bymap[goal] = 0;
  for (var i=0;i<32;i++) {
    if (synergy_matrix[i][goal] > limit) {
      clearweight_bymap[i] = 0;
    }
  }
  for (var i=0;i<32;i++) {
    if (synergy_matrix[goal][i] > limit) {
      clearweight_bymap[i] = 0;
    }
  }

  sumweight_bymap = [];
  rolling_sum = 0;
  for (var kk=0;kk<32;kk++) {
    rolling_sum += clearweight_bymap[kk];
    sumweight_bymap.push(rolling_sum*10);
  }
}

function weighted_milestone_roll() {
  var roll = parseInt(Math.random() * sumweight_bymap[15]);
  var slot = 15;
  for (var k=0;k<16;k++) {
    if (sumweight_bymap[k] > roll) {
      slot = k;
      break;
    }
  }
  return slot;
}

function weighted_award_roll() {
  var roll = parseInt(Math.random() * (sumweight_bymap[31]-sumweight_bymap[15])) + sumweight_bymap[15];
  var slot = 31;
  for (var k=16;k<32;k++) {
    if (sumweight_bymap[k] > roll) {
      slot = k;
      break;
    }
  }
  return slot;
}

function gauge (previousSUM, conflictSUM) {
  google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['SYNERGY', previousSUM]
        ]);

        var options = {
          width: 600, height: 180,
          redFrom: 45, redTo: 60, min: 0, max: 60,
          yellowFrom:30, yellowTo: 45,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

        chart.draw(data, options);

        setInterval(function() {
          data.setValue(0, 1, conflictSUM);
          chart.draw(data, options);
        }, 1000);
      }
}

function generateSpins() {

  exceded = true;
 
  var random_map_roll = parseInt(Math.random() * 3);
  var map_choice = MAPS[random_map_roll];
 
  while(exceded) {
    conflictSUM = 0;
    spinsArray = [];
    exclusionsArray = [];
    combinationsText = "Map: " + map_choice + "<br><br>";
    sumsText = "";

    synergy_matrix = SYNERGIES;
    clearweight_bymap = WEIGHT.slice();
    if (map_choice == "ELYSIUM") {
      synergy_matrix = SYNERGIES_ELYSIUM;
      clearweight_bymap = WEIGHT_ELYSIUM.slice();
    }

    sumweight_bymap = [];
    var rolling_sum = 0;
    for (var kk=0;kk<32;kk++) {
      rolling_sum += clearweight_bymap[kk];
      sumweight_bymap.push(rolling_sum*10);
    }

    //////// Adding exclusions //////////
    exclusions = document.querySelectorAll("select");
    for (i=0; i<exclusions.length; i++) {
      if (exclusions[i].value != "label") {exclusionsArray.push(parseInt(exclusions[i].value))}
    }
    console.log(exclusionsArray)
    //////// Calculating the conflict SUM /////////////

    //adding offset of 16 for the awards
    for (var aw=5;aw<10;aw++) {
      spin[aw] = weighted_award_roll(); //parseInt(Math.random() * 16) + 16;
      while (spinsArray.indexOf(spin[aw]) > -1 || exclusionsArray.indexOf(spin[aw]) > -1) { 
        spin[aw] = weighted_award_roll(); //parseInt(Math.random() * 16) + 16;
      }
      spinsArray.push(spin[aw]);
      clear_weights(spin[aw],synergy_matrix);
    }

    for (var mi=0;mi<5;mi++) {
      spin[mi] = weighted_milestone_roll(); //parseInt(Math.random() * 16);
      while (spinsArray.indexOf(spin[mi]) > -1 || exclusionsArray.indexOf(spin[mi]) > -1) { 
        spin[mi] = weighted_milestone_roll(); //parseInt(Math.random() * 16);
      }
      spinsArray.push(spin[mi]);
      clear_weights(spin[mi],synergy_matrix);
    }

    //loop through the matrix interconnections
    //sorting the array - crucial for pair checking with the matrix
    sortedArray = spinsArray.sort(function(a, b){return a - b});

    oldSUM = 0;
    maxCON = 0;
    for (i=0; i<9; i++) {
      for (j=i+1; j<10; j++) {
        conflictSUM +=SYNERGIES[sortedArray[i]][sortedArray[j]];
        maxCON = SYNERGIES[sortedArray[i]][sortedArray[j]];
        if (oldSUM > maxCON) maxCON = oldSUM;
        oldSUM = maxCON;
        if (SYNERGIES[sortedArray[i]][sortedArray[j]] > 0) {
          sumsText += SYNERGIES[sortedArray[i]][sortedArray[j]] + "<br>";
          combinationsText += NAMES[sortedArray[i]] + "&nbsp; + &nbsp;" + NAMES[sortedArray[j]] + "<br>"; }
      }
    }

    if (maxCON <= limit && conflictSUM <= limit2) exceded = false;
  }
}

function changeLimit2 (x) {
  if (x < 0 && limit2 > 20) {
    limit2 -=5;
    document.getElementById("limit-image2").style.marginLeft = 200 + (-10 * limit2) + "px";
  }
  if (x > 0 && limit2 < 60) {
    limit2 +=5;
    document.getElementById("limit-image2").style.marginLeft = 200 + (-10 * limit2) + "px";
  }
}

function changeLimit (x) {
  if (x < 0 && limit > 1) {
    limit -=1;
    document.getElementById("limit-image").style.marginLeft = 50 + (-50 * limit) + "px";
  }
  if (x > 0 && limit < 9) {
    limit +=1;
    document.getElementById("limit-image").style.marginLeft = 50 + (-50 * limit) + "px";
  }
}
