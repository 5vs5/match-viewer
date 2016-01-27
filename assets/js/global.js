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
    var status = getStatus(data.status, data.timer);
    
    $(".data-status").html(status.status);
    $(".data-time").html(status.time);
    
    $(".data-score").html(data.score.home + " : " + data.score.away)
    
    $(".data-log").html(data.log[data.log.length - 1].text);
    
    $.each(data.log, function( index, log ) {
        
        var logStatus = getStatus(log.status, log.timer);
        
        if(!$(".data-long-log .item[data-id='" + index + "']").length)
        {
            $(".data-long-log").prepend('<div class="item" data-id="' + index + '">\n\
                                <div class="content">\n\
                                  <a class="header">' + logStatus.status + ' - ' + logStatus.time2 + '</a>\n\
                                  <div class="description">' + log.text + '</div>\n\
                                </div>\n\
                              </div>');
        }
    });
    
    /* Home */
    $(".data-home-color").css("background", data.teams.home.color);
    $(".data-home-team-name").html(data.teams.home.name);
    
    $(".data-home-table tbody").html("");
    $(".data-home-stats-table tbody").html("");
    $(".data-home-physical-table tbody").html("");
    $(".data-home-offensive-table tbody").html("");
    $(".data-home-defensive-table tbody").html("");
    
    $(".data-home-vs-stats-table tbody").html("");
    $(".data-home-vs-physical-table tbody").html("");
    $(".data-home-vs-offensive-table tbody").html("");
    $(".data-home-vs-defensive-table tbody").html("");
    
    
    $.each(data.teams.home.players, function( index, player ) {
      
      if(index.substring(0,3)!= 'SUB')
      {
          $(".data-home-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.stats.points + "</td>\n\
            <td class='text-center'>" + player.stats.fouls + "</td>\n\
            <td class='text-center'>" + player.form + "</td>\n\
          </tr>");
          
          $(".data-home-vs-stats-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.stats.points + "</td>\n\
            <td class='text-center'>" + player.stats.points_3.success + "/" + player.stats.points_3.total + "</td>\n\
            <td class='text-center'>" + player.stats.points_2.success + "/" + player.stats.points_2.total + "</td>\n\
            <td class='text-center'>" + player.stats.ft.success + "/" + player.stats.ft.total + "</td>\n\
            <td class='text-center'>" + player.stats.assists + "</td>\n\
            <td class='text-center'>" + player.stats.steals + "</td>\n\
            <td class='text-center'>" + player.stats.blocks + "</td>\n\
            <td class='text-center'>" + player.stats.def_rebounds + "</td>\n\
            <td class='text-center'>" + player.stats.off_rebounds + "</td>\n\
            <td class='text-center'>" + player.stats.mistakes + "</td>\n\
            <td class='text-center'>" + player.stats.playtime + "</td>\n\
          </tr>");
          
          $(".data-home-vs-physical-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.age + "</td>\n\
            <td class='text-center'>" + player.height + "</td>\n\
            <td class='text-center'>" + player.attributes.jumping + "</td>\n\
            <td class='text-center'>" + player.attributes.speed + "</td>\n\
            <td class='text-center'>" + player.attributes.power + "</td>\n\
            <td class='text-center'>" + player.attributes.stamina + "</td>\n\
            <td class='text-center'>" + player.form + "</td>\n\
          </tr>");
          
          $(".data-home-vs-offensive-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.attributes.shooting3 + "</td>\n\
            <td class='text-center'>" + player.attributes.shooting2 + "</td>\n\
            <td class='text-center'>" + player.attributes.free_throws + "</td>\n\
            <td class='text-center'>" + player.attributes.ball_handling + "</td>\n\
            <td class='text-center'>" + player.attributes.passing + "</td>\n\
            <td class='text-center'>" + player.attributes.rebound_off + "</td>\n\
          </tr>");
          
          $(".data-home-vs-defensive-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.attributes.marking + "</td>\n\
            <td class='text-center'>" + player.attributes.stealing + "</td>\n\
            <td class='text-center'>" + player.attributes.blocking + "</td>\n\
            <td class='text-center'>" + player.attributes.rebound_def + "</td>\n\
          </tr>");
      }
      
      $(".data-home-stats-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.stats.points + "</td>\n\
            <td class='text-center'>" + player.stats.points_3.success + "/" + player.stats.points_3.total + "</td>\n\
            <td class='text-center'>" + player.stats.points_2.success + "/" + player.stats.points_2.total + "</td>\n\
            <td class='text-center'>" + player.stats.ft.success + "/" + player.stats.ft.total + "</td>\n\
            <td class='text-center'>" + player.stats.assists + "</td>\n\
            <td class='text-center'>" + player.stats.steals + "</td>\n\
            <td class='text-center'>" + player.stats.blocks + "</td>\n\
            <td class='text-center'>" + player.stats.def_rebounds + "</td>\n\
            <td class='text-center'>" + player.stats.off_rebounds + "</td>\n\
            <td class='text-center'>" + player.stats.mistakes + "</td>\n\
            <td class='text-center'>" + player.stats.playtime + "</td>\n\
          </tr>");
          
      $(".data-home-physical-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.age + "</td>\n\
            <td class='text-center'>" + player.height + "</td>\n\
            <td class='text-center'>" + player.attributes.jumping + "</td>\n\
            <td class='text-center'>" + player.attributes.speed + "</td>\n\
            <td class='text-center'>" + player.attributes.power + "</td>\n\
            <td class='text-center'>" + player.attributes.stamina + "</td>\n\
            <td class='text-center'>" + player.form + "</td>\n\
          </tr>");
          
      $(".data-home-offensive-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.attributes.shooting3 + "</td>\n\
            <td class='text-center'>" + player.attributes.shooting2 + "</td>\n\
            <td class='text-center'>" + player.attributes.free_throws + "</td>\n\
            <td class='text-center'>" + player.attributes.ball_handling + "</td>\n\
            <td class='text-center'>" + player.attributes.passing + "</td>\n\
            <td class='text-center'>" + player.attributes.rebound_off + "</td>\n\
          </tr>");
          
      $(".data-home-defensive-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.attributes.marking + "</td>\n\
            <td class='text-center'>" + player.attributes.stealing + "</td>\n\
            <td class='text-center'>" + player.attributes.blocking + "</td>\n\
            <td class='text-center'>" + player.attributes.rebound_def + "</td>\n\
          </tr>");
      
    });
    
    
    /* Away */
    $(".data-away-color").css("background", data.teams.away.color);
    $(".data-away-team-name").html(data.teams.away.name);
    
    $(".data-away-table tbody").html("");
    $(".data-away-stats-table tbody").html("");
    $(".data-away-physical-table tbody").html("");
    $(".data-away-offensive-table tbody").html("");
    $(".data-away-defensive-table tbody").html("");
    
    $(".data-away-vs-stats-table tbody").html("");
    $(".data-away-vs-physical-table tbody").html("");
    $(".data-away-vs-offensive-table tbody").html("");
    $(".data-away-vs-defensive-table tbody").html("");
    
    $.each(data.teams.away.players, function( index, player ) {
      
      if(index.substring(0,3)!= 'SUB')
      {
          $(".data-away-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.stats.points + "</td>\n\
            <td class='text-center'>" + player.stats.fouls + "</td>\n\
            <td class='text-center'>" + player.form + "</td>\n\
          </tr>");
          
          $(".data-away-vs-stats-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.stats.points + "</td>\n\
            <td class='text-center'>" + player.stats.points_3.success + "/" + player.stats.points_3.total + "</td>\n\
            <td class='text-center'>" + player.stats.points_2.success + "/" + player.stats.points_2.total + "</td>\n\
            <td class='text-center'>" + player.stats.ft.success + "/" + player.stats.ft.total + "</td>\n\
            <td class='text-center'>" + player.stats.assists + "</td>\n\
            <td class='text-center'>" + player.stats.steals + "</td>\n\
            <td class='text-center'>" + player.stats.blocks + "</td>\n\
            <td class='text-center'>" + player.stats.def_rebounds + "</td>\n\
            <td class='text-center'>" + player.stats.off_rebounds + "</td>\n\
            <td class='text-center'>" + player.stats.mistakes + "</td>\n\
            <td class='text-center'>" + player.stats.playtime + "</td>\n\
          </tr>");
          
          $(".data-away-vs-physical-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.age + "</td>\n\
            <td class='text-center'>" + player.height + "</td>\n\
            <td class='text-center'>" + player.attributes.jumping + "</td>\n\
            <td class='text-center'>" + player.attributes.speed + "</td>\n\
            <td class='text-center'>" + player.attributes.power + "</td>\n\
            <td class='text-center'>" + player.attributes.stamina + "</td>\n\
            <td class='text-center'>" + player.form + "</td>\n\
          </tr>");
          
          $(".data-away-vs-offensive-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.attributes.shooting3 + "</td>\n\
            <td class='text-center'>" + player.attributes.shooting2 + "</td>\n\
            <td class='text-center'>" + player.attributes.free_throws + "</td>\n\
            <td class='text-center'>" + player.attributes.ball_handling + "</td>\n\
            <td class='text-center'>" + player.attributes.passing + "</td>\n\
            <td class='text-center'>" + player.attributes.rebound_off + "</td>\n\
          </tr>");
          
          $(".data-away-vs-defensive-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.attributes.marking + "</td>\n\
            <td class='text-center'>" + player.attributes.stealing + "</td>\n\
            <td class='text-center'>" + player.attributes.blocking + "</td>\n\
            <td class='text-center'>" + player.attributes.rebound_def + "</td>\n\
          </tr>");
      }
      
      $(".data-away-stats-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.stats.points + "</td>\n\
            <td class='text-center'>" + player.stats.points_3.success + "/" + player.stats.points_3.total + "</td>\n\
            <td class='text-center'>" + player.stats.points_2.success + "/" + player.stats.points_2.total + "</td>\n\
            <td class='text-center'>" + player.stats.ft.success + "/" + player.stats.ft.total + "</td>\n\
            <td class='text-center'>" + player.stats.assists + "</td>\n\
            <td class='text-center'>" + player.stats.steals + "</td>\n\
            <td class='text-center'>" + player.stats.blocks + "</td>\n\
            <td class='text-center'>" + player.stats.def_rebounds + "</td>\n\
            <td class='text-center'>" + player.stats.off_rebounds + "</td>\n\
            <td class='text-center'>" + player.stats.mistakes + "</td>\n\
            <td class='text-center'>" + player.stats.playtime + "</td>\n\
          </tr>");
          
      $(".data-away-physical-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.age + "</td>\n\
            <td class='text-center'>" + player.height + "</td>\n\
            <td class='text-center'>" + player.attributes.jumping + "</td>\n\
            <td class='text-center'>" + player.attributes.speed + "</td>\n\
            <td class='text-center'>" + player.attributes.power + "</td>\n\
            <td class='text-center'>" + player.attributes.stamina + "</td>\n\
            <td class='text-center'>" + player.form + "</td>\n\
          </tr>");
          
      $(".data-away-offensive-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.attributes.shooting3 + "</td>\n\
            <td class='text-center'>" + player.attributes.shooting2 + "</td>\n\
            <td class='text-center'>" + player.attributes.free_throws + "</td>\n\
            <td class='text-center'>" + player.attributes.ball_handling + "</td>\n\
            <td class='text-center'>" + player.attributes.passing + "</td>\n\
            <td class='text-center'>" + player.attributes.rebound_off + "</td>\n\
          </tr>");
          
      $(".data-away-defensive-table tbody").append("<tr>\n\
            <td>" + player.fname.substring(0,1) + ". " + player.lname + "</td>\n\
            <td class='text-center'><div class='ui label'>" + index + "</div></td>\n\
            <td class='text-center'>" + player.attributes.marking + "</td>\n\
            <td class='text-center'>" + player.attributes.stealing + "</td>\n\
            <td class='text-center'>" + player.attributes.blocking + "</td>\n\
            <td class='text-center'>" + player.attributes.rebound_def + "</td>\n\
          </tr>");
      
    });
}

function getStatus(status, time)
{
    var resStatus = '';
    var resTime = '';

    switch(status)
    {
        case "pregame":
            resStatus = "PREGAME";
            resTime = PREGAME_DURATION - time;
            break;
        case "ingame1":
            resStatus = "1ST QUARTER";
            resTime = INGAME1_DURATION - time;
            break;
        case "ingame2":
            resStatus = "2ND QUARTER";
            resTime = INGAME2_DURATION - time;
            break;
        case "ingame3":
            resStatus = "3RD QUARTER";
            resTime = INGAME3_DURATION - time;
            break;
        case "ingame4":
            resStatus = "4TH QUARTER";
            resTime = INGAME4_DURATION - time;
            break;
        case "postgame":
            resStatus = "POST GAME";
            resTime = POSTGAME_DURATION - time;
            break;
    }
    
    var minutes = Math.floor(resTime / 60);
    var seconds = resTime % 60;
    
    if(minutes<10)minutes = "0" + minutes;
    if(seconds<10)seconds = "0" + seconds;
    
    
    var minutes2 = Math.floor(time / 60);
    var seconds2 = time % 60;
    
    if(minutes2<10)minutes2 = "0" + minutes2;
    if(seconds2<10)seconds2 = "0" + seconds2;
    
    return {status: resStatus, time: minutes + ":" + seconds, time2: minutes2 + ":" + seconds2};
}