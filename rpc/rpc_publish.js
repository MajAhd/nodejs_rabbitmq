const amqplib = require("amqplib");
const queue_name = "rpc_queue";
const msg = process.argv.slice(2).join(" ") || 1;

const send_message = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  const q = await channel.assertQueue("", { exclusive: true });
  channel.sendToQueue(queue_name, Buffer.from(msg.toString()), {
    replyTo: q.queue,
    correlationId: "get_number", // <--- or uuid or whatever id you want
  });
  console.log(`Message send : ${msg}`);

  channel.consume(q.queue, (message) => {
    if (message.properties.correlationId == "get_number") {
      console.log(`[*] string number: ${message.content.toString()}`);
    }
  });
};
send_message();
