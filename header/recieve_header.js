const amqplib = require("amqplib");

const exchange_name = "header_logs";

const receive_message = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange_name, "headers", { durable: false }); // <--- headers
  const q = await channel.assertQueue("", { exclusive: true });
  console.log(`Wait For Message in Queue: ${q.queue}`);
  channel.bindQueue(q.queue, exchange_name, "", {
    action: "save_to_db",
    method: "error",
    "x-match": "any",
  }); // <-- header
  channel.consume(
    q.queue,
    (message) => {
      if (message.content) {
        console.log(
          `[*] Headers ${JSON.stringify(message.properties.headers)}`
        );
        console.log(`[X] Received : ${message.content.toString()}`);
      }
    },
    { noAck: true }
  );
};
receive_message();
