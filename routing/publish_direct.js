const amqplib = require("amqplib");

const exchange_name = "direct_logs";
const log_type = "info";
const msg = process.argv.slice(2).join(" ") || "Emmit Message!";

const send_message = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange_name, "direct", { durable: false }); // <-- direct exchange
  channel.publish(exchange_name, log_type, Buffer.from(msg)); // <-- publish log_type
  console.log(`Message send : ${msg}`);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};
send_message();
