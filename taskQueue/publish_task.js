const amqplib = require("amqplib")

const queue_name = "works"
const msg = process.argv.slice(2).join(' ') || "Hello RabbitMQ!";

const send_task = async () => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queue_name, {durable: true})
    channel.sendToQueue(queue_name, Buffer.from(msg), {persistent: true})
    console.log(`Message send : ${msg}`)
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500)
}
send_task()
