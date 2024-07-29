const amqp = require('amqplib');

amqp.connect('amqp://guest:guest@rabbitmq:5672')
  .then(conn => {
      console.log('Connected to RabbitMQ');
      return conn.close();
  })
  .catch(err => {
      console.error('Failed to connect to RabbitMQ:', err);
  });
