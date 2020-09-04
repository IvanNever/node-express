const toCurrency = price => {
    return new Intl.NumberFormat('en-EN', {
        currency: 'uah',
        style: 'currency'
    }).format(price)
}

document.querySelectorAll('.price').forEach(item => {
    item.textContent = toCurrency(item.textContent)
})

const $cart = document.querySelector('#cart')
if ($cart) {
    $cart.addEventListener('click', (e) => {
        if(e.target.classList.contains('js-remove')) {
            const id = e.target.dataset.id


            fetch('/cart/remove/' + id, {
                method: 'delete'
            }).then(res => res.json())
              .then(cart => {
                if (cart.services.length) {
                    const html = cart.services.map(item => {
                        return `
                            <tr>
                                <td>${item.title}</td>
                                <td>${item.count}</td>
                                <td>
                                    <button class="btn btn-small js-remove" data-id="${item.id}">Delete</button>
                                </td>
                            </tr>
                        `
                    }).join('')
                    $cart.querySelector('tbody').innerHTML = html
                    $cart.querySelector('.price').textContent = toCurrency(cart.price)
                } else {
                    $cart.innerHTML = '<p>The cart is empty</p>'
                }
              })
        }
    })
}