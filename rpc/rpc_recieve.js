const amqplib = require("amqplib");
const queue_name = "rpc_queue";
const receive_message = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queue_name, { durable: false });
  channel.prefetch(1);
  console.log(`Wait For Message in Queue: ${queue_name}`);

  channel.consume(
    queue_name,
    (message) => {
      string_number = get_parity(parseInt(message.content.toString()));
      console.log(`[X] Received : ${message.content.toString()}`);
      channel.sendToQueue(
        message.properties.replyTo,
        Buffer.from(string_number.toString()),
        {
          correlationId: message.properties.correlationId,
        }
      );
      channel.ack(message);
    },
    { noAck: false }
  );
};

const get_parity = (number) => {
  if (number % 2 == 0) {
    return "is even";
  } else {
    return "is odd";
  }
};
receive_message();
