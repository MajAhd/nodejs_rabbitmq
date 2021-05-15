const amqplib = require("amqplib")

const queue_name = "works"

const receive_task = async () => {
    const connection = await amqplib.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queue_name, {durable: true})
    channel.prefetch(1);
    console.log(`Wait For Message in Queue: ${queue_name}`)

    channel.consume(queue_name, message => {
        let secs = message.content.toString().split('.').length - 1;
        console.log(`[X] Received : ${message.content.toString()}`)

        setTimeout(() => {
            console.log("Done With Task!")
            channel.ack(message)
        }, secs * 1000)

    }, {noAck: false})
}
receive_task()
