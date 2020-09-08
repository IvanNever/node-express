const toCurrency = price => {
    return new Intl.NumberFormat('en-EN', {
        currency: 'uah',
        style: 'currency'
    }).format(price)
}

const toDate = date => {
    return new Intl.DateTimeFormat('en-EN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date(date))
}

document.querySelectorAll('.price').forEach(item => {
    item.textContent = toCurrency(item.textContent)
})

document.querySelectorAll('.date').forEach(item => {
    item.textContent = toDate(item.textContent)
})

const $cart = document.querySelector('#cart')
if ($cart) {
    $cart.addEventListener('click', (e) => {
        if(e.target.classList.contains('js-remove')) {
            const id = e.target.dataset.id
            const csrf = e.target.dataset.csrf

            fetch('/cart/remove/' + id, {
                method: 'delete',
                headers: {
                    'X-XSRF-TOKEN': csrf
                }
            }).then(res => res.json())
              .then(cart => {
                if (cart.services.length) {
                    const html = cart.services.map(item => {
                        return `
                            <tr>
                                <td>${item.title}</td>
                                <td>${item.count}</td>
                                <td>
                                    <button
                                        class="btn btn-small js-remove" data-id="${item.id}"
                                        data-csrf="${csrf}"
                                    >Delete</button>
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

M.Tabs.init(document.querySelectorAll('.tabs'))