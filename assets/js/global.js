var socket = io('http://5vs5.paxnotdead.com:5555');
  
socket.on('game', function (data) {
    getUpdate(data)
});

function getUpdate(data)
{
    console.log(data);
}