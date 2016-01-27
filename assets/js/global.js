//Settings
var PREGAME_DURATION = 30;
var INGAME1_DURATION = 150;
var INGAME2_DURATION = 150;
var INGAME3_DURATION = 150;
var INGAME4_DURATION = 150;
var POSTGAME_DURATION = 30;

var socket = io('http://5vs5.paxnotdead.com:5555');
  
socket.on('game', function (data) {
    getUpdate(data)
});

$(function () {
  $('.menu .item').tab();
})

function getUpdate(data)
{
    console.log(data);
    
    /* General */
    var status = '';
    var time = '';
    
    $(".data-score").html(data.score.home + " : " + data.score.away)
    
    switch(data.status)
    {
        case "pregame":
            status = "PREGAME";
            time = PREGAME_DURATION - data.timer;
            break;
        case "ingame1":
            status = "1ST QUARTER";
            time = INGAME1_DURATION - data.timer;
            break;
        case "ingame2":
            status = "2ND QUARTER";
            time = INGAME2_DURATION - data.timer;
            break;
        case "ingame3":
            status = "3RD QUARTER";
            time = INGAME3_DURATION - data.timer;
            break;
        case "ingame4":
            status = "4TH QUARTER";
            time = INGAME4_DURATION - data.timer;
            break;
        case "postgame":
            status = "POST GAME";
            time = POSTGAME_DURATION - data.timer;
            break;
    }
    
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    
    if(minutes<10)minutes = "0" + minutes;
    if(seconds<10)seconds = "0" + seconds;
    
    $(".data-status").html(status);
    $(".data-time").html(minutes + ":" + seconds);
    
    $(".data-log").html(data.log[data.log.length - 1].text);
    
    /* Home */
    $(".data-home-color").css("background", data.teams.home.color);
    $(".data-home-team-name").html(data.teams.home.name);
    
    $(".data-home-table tbody").html("");
    
    $.each(data.teams.home.players, function( index, player ) {
      
      if(index.substring(0,3)!= 'SUB')
      {
          $(".data-home-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>0</td>\n\
            <td class='text-center'>0</td>\n\
            <td class='text-center'>" + player.form + "</td>\n\
          </tr>");
      }
      
    });
    
    
    /* Away */
    $(".data-away-color").css("background", data.teams.away.color);
    $(".data-away-team-name").html(data.teams.away.name);
    
    $(".data-away-table tbody").html("");
    
    $.each(data.teams.away.players, function( index, player ) {
      
      if(index.substring(0,3)!= 'SUB')
      {
          $(".data-away-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>0</td>\n\
            <td class='text-center'>0</td>\n\
            <td class='text-center'>" + player.form + "</td>\n\
          </tr>");
      }
      
    });
}