const amqplib = require("amqplib");

const exchange_name = "topic_logs";
let args = process.argv.slice(2);
const key = args[0] || "error.save";
// const msg = ["task 1", "task 2", "task 3"]
const msg = args[1] || `Emmit Message ${Math.random()}!`;

const send_message = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange_name, "topic", { durable: false }); // <-- topic exchange
  channel.publish(exchange_name, key, Buffer.from(msg)); // <-- publish key
  console.log(`Message send : ${msg}`);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};
send_message();
