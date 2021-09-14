const amqplib = require("amqplib");

const exchange_name = "error_logs_exchange";
let args = process.argv.slice(2);
const key = args[0] || "error.file";
const msg = args[1] || `Emmit Message ${Math.random()}!`;

const send_message = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange_name, "topic", { durable: true }); // <-- topic exchange
  channel.publish(exchange_name, key, Buffer.from(msg)); // <-- publish key
  console.log(`Message send : ${msg}`);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};
send_message();
