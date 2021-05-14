const amqplib = require("amqplib")

const queue_name = "welcome"
const msg = "Welcome to RabbitMQ And Nodejs"

const send_message = async () => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queue_name, {durable: false})
    channel.sendToQueue(queue_name, Buffer.from(msg))
    console.log(`Message send : ${msg}`)
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500)
}
send_message()
