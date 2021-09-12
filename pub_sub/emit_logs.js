const amqplib = require("amqplib");

const exchange_name = "logs";
// const msg = ["task 1", "task 2", "task 3"]
const msg = process.argv.slice(2).join(" ") || "Emmit Message!";

const send_message = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange_name, "fanout", { durable: false });
  channel.publish(exchange_name, "", Buffer.from(msg));
  console.log(`Message send : ${msg}`);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};
send_message();
