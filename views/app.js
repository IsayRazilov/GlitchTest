$(document).ready(() => {

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    $('#give').click(() => {
        // console.log('Clicked button')
        // $.post('/give', { amount: '100' })
    })

    
})
