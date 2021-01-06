const http = require('http');
const { sub } = require('date-fns');

const data = [
    {
      id : '1',
      title: 'This is title1',
      content: 'This is task1 hello world how are you',
      lastUpdateTime: sub((new Date()), { days:10 }),
      taskStartTime: sub((new Date()), { days: 2 }),
      taskEndTime : sub((new Date()), { days: 1 }),
      taskStatus: 'new',
      isDeleted : false,
    },
    {
      id : '2',
      title: 'This is title2',
      content: 'This is task2',
      lastUpdateTime: sub((new Date()), { days:0 }),
      taskStartTime: sub((new Date()), { days: 3 }),
      taskEndTime : sub((new Date()), { days: 2 }),
      taskStatus: 'new',
      isDeleted : false,
    },
    {
      id : '3',
      title: 'This is title3',
      content: 'This is task3',
      lastUpdateTime: sub((new Date()), { hours:5 }),
      taskStartTime: sub((new Date()), { hours: 4 }),
      taskEndTime : sub((new Date()), { hours: 3 }),
      taskStatus: 'new',
      isDeleted : false,
    },
];

const server = http.createServer(function (request, response){
    response.setHeader('Content-Type','text/plain');
    response.setHeader('Access-Control-Allow-Origin',"*")
    response.end(JSON.stringify(data));
}); 

server.listen(8080, '127.0.0.1');  

