const amqplib = require("amqplib")

const queue_name = "welcome"

const receive_message = async () => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queue_name, {durable: false})
    console.log(`Wait For Message in Queue: ${queue_name}`)

    channel.consume(queue_name, message => {
        console.log(`[X] Received : ${message.content.toString()}`)
    }, {noAck: true})
    setTimeout(() => {
        connection.close()
        process.exit(0)
    }, 500)
}
receive_message()
