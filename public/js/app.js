console.log('Client side java script loaded')

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageSuccess = document.querySelector('#message-success')
const messageError = document.querySelector('#message-error')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchInput.value
    messageError.textContent = 'Loading...'
    messageSuccess.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageError.textContent = data.error
                
            } else {
                messageError.textContent = data.forecast.feelslike
                messageSuccess.textContent = data.forecast.temperature
                console.log(data.forecast)
                console.log(data.data)
            }
        })
    })
    console.log(location)
})
