const params = new URLSearchParams(window.location.search);
const productName = params.get('product');

const products = {
    'Camiseta Oversize': {
        name: 'Camiseta Oversize',
        priceNio: 18990,
        image: 'https://images.unsplash.com/photo-1495121605193-b116b5b9c5aa?auto=format&fit=crop&w=900&q=80',
        description: 'Un basico comodo con estampado moderno para un look relajado.',
        details: ['Material suave y ligero', 'Corte oversize para libertad de movimiento', 'Disponible en varios colores'],
    },
    'Sudadera con capucha': {
        name: 'Sudadera con capucha',
        priceNio: 24990,
        image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=80',
        description: 'Una pieza esencial para un look casual y confortable.',
        details: ['Capucha ajustable', 'Bolsillo kangaroo', 'Tela resistente y acolchada'],
    },
    'Pantalon Cargo': {
        name: 'Pantalon Cargo',
        priceNio: 29990,
        image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
        description: 'Funcionalidad y estilo en una prenda resistente y con bolsillos grandes.',
        details: ['Multiples bolsillos utilitarios', 'Cintura con cordon', 'Tela duradera para uso diario'],
    },
    'Chaqueta Street': {
        name: 'Chaqueta Street',
        priceNio: 39990,
        image: 'https://images.unsplash.com/photo-1520975919078-5675e0142934?auto=format&fit=crop&w=900&q=80',
        description: 'Perfecta para capas ligeras y un look urbano con presencia.',
        details: ['Forro interior suave', 'Cierre frontal durable', 'Diseño moderno con capucha'],
    }
};

const formatNio = value => `C$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

const nameEl = document.querySelector('#product-name');
const descriptionEl = document.querySelector('#product-description');
const imageEl = document.querySelector('#product-image');
const priceEl = document.querySelector('#product-price');
const longDescEl = document.querySelector('#product-long-description');
const featuresEl = document.querySelector('#product-features');
const buyNowButton = document.querySelector('#buy-now');

if (!productName || !products[productName]) {
    nameEl.textContent = 'Producto no encontrado';
    descriptionEl.textContent = 'No se encontró el producto solicitado. Vuelve a la colección para seleccionar otra prenda.';
    imageEl.src = 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=900&q=80';
    imageEl.alt = 'Producto no encontrado';
    priceEl.textContent = '';
    longDescEl.textContent = '';
    featuresEl.innerHTML = '';
    buyNowButton.disabled = true;
} else {
    const product = products[productName];
    nameEl.textContent = product.name;
    descriptionEl.textContent = product.description;
    imageEl.src = product.image;
    imageEl.alt = product.name;
    priceEl.textContent = formatNio(product.priceNio);
    longDescEl.textContent = product.description;

    featuresEl.innerHTML = product.details.map(detail => `<li>${detail}</li>`).join('');

    buyNowButton.addEventListener('click', () => {
        alert(`Se agregó ${product.name} al carrito.`);
    });
}
