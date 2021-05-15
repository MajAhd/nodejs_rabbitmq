## RabbitMQ With Nodejs
 
### install RabbitMQ

- docker run -d --hostname rabbitmq --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3

if you need rabbitMq management  
- docker run -d --hostname rabbitmq --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management


### Welcome
- send_welcome (./welcome) `The simplest thing that does something`
   -  run publisher & consumer separately

- Task Queue (./taskQueue) `Work Queues with RabbitMQ`    