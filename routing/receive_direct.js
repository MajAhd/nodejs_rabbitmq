const amqplib = require("amqplib");

const exchange_name = "direct_logs";
const log_type = process.argv.slice(2).join(" ") || "error";

const receive_message = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange_name, "direct", { durable: false }); // <--- direct
  const q = await channel.assertQueue("", { exclusive: true });
  console.log(`Wait For Message in Queue: ${q.queue}`);
  channel.bindQueue(q.queue, exchange_name, log_type); // <-- binding log_type (error)
  channel.consume(
    q.queue,
    (message) => {
      if (message.content) {
        console.log(`[X] Received : ${message.content.toString()}`);
      }
    },
    { noAck: true }
  );
};
receive_message();
