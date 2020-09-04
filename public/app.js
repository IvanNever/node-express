document.querySelectorAll('.price').forEach(item => {
    item.textContent = new Intl.NumberFormat('en-EN', {
        currency: 'uah',
        style: 'currency'
    }).format(item.textContent)
})