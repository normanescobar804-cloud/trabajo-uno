const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const buyButtons = document.querySelectorAll('.btn-secondary');
const cartList = document.querySelector('#cart-list');
const cartCount = document.querySelector('#cart-count');
const cartTotalNio = document.querySelector('#cart-total-nio');
const cartTotalUsd = document.querySelector('#cart-total-usd');
const clearCartButton = document.querySelector('#clear-cart');
const searchInput = document.querySelector('#product-search');
const productCards = document.querySelectorAll('.cards-grid .card');
const searchNoResults = document.querySelector('#search-no-results');

const exchangeRate = 35; // 1 USD = 35 NIO
const cart = [];

const formatNio = value => {
    return `C$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} `;
};

const formatUsd = value => {
    return `$${value.toFixed(2)}`;
};

const updateCartUI = () => {
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<p class="cart-empty">Tu carrito está vacío.</p>';
        cartCount.textContent = '0';
        cartTotalNio.textContent = 'C$0';
        cartTotalUsd.textContent = '$0.00';
        return;
    }

    let totalNio = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.priceNio * item.quantity;
        totalNio += itemTotal;
        itemCount += item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        const itemInfo = document.createElement('div');
        itemInfo.className = 'cart-item-info';
        itemInfo.innerHTML = `
            <strong>${item.name}</strong>
            <span>${item.quantity} x ${formatNio(item.priceNio).trim()} = ${formatNio(itemTotal).trim()} (${formatUsd(itemTotal / exchangeRate)})</span>
        `;

        const itemActions = document.createElement('div');
        itemActions.className = 'cart-item-actions';

        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-secondary';
        removeButton.type = 'button';
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => {
            cart.splice(index, 1);
            updateCartUI();
        });

        itemActions.appendChild(removeButton);
        cartItem.appendChild(itemInfo);
        cartItem.appendChild(itemActions);
        cartList.appendChild(cartItem);
    });

    cartCount.textContent = itemCount.toString();
    cartTotalNio.textContent = formatNio(totalNio).trim();
    cartTotalUsd.textContent = formatUsd(totalNio / exchangeRate);
};

menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.dataset.product || 'producto';
        const priceNio = Number(button.dataset.priceNio || '0');

        const existingItem = cart.find(item => item.name === product && item.priceNio === priceNio);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: product, priceNio, quantity: 1 });
        }

        updateCartUI();
    });
});

clearCartButton?.addEventListener('click', () => {
    cart.length = 0;
    updateCartUI();
});

const filterProducts = () => {
    const query = searchInput?.value.trim().toLowerCase() || '';
    let visibleCount = 0;

    productCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent.toLowerCase() || '';
        const isVisible = !query || title.includes(query) || description.includes(query);

        card.style.display = isVisible ? '' : 'none';
        if (isVisible) visibleCount += 1;
    });

    if (searchNoResults) {
        searchNoResults.hidden = visibleCount > 0;
    }
};

searchInput?.addEventListener('input', filterProducts);

function submitForm(event) {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    alert(`Gracias, ${name}. Hemos recibido tu mensaje y pronto te responderemos.`);
    event.target.reset();
}

updateCartUI();
