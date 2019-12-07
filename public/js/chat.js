const socket = io()

socket.on('message', msg => {
    console.log(msg)
})

const msgForm = document.querySelector('form')

msgForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message, (error) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition((position) => {
        const geo = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }
        socket.emit('sendLocation', geo, (error) => {
            if (error) {
                return console.log(error)
            }
            console.log('Location shared!')
        })
    })
})