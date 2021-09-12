const amqplib = require("amqplib");

const exchange_name = "header_logs";
const msg =
  process.argv.slice(2).join(" ") || `Emmit Message ${Math.random()}!`;

const send_message = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange_name, "headers", { durable: false }); // <-- headers exchange
  channel.publish(exchange_name, "", Buffer.from(msg), {
    headers: { action: "save_to_db", method: "info" },
  }); // <-- publish header
  console.log(`Message send : ${msg}`);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};
send_message();
