const defaultItems = [
    { type: 'product', brand: 'ADIDAS', name: 'Yeezy Boost 350', price: '1200 PLN', img: 'https://streetwear.pl/wp-content/uploads/2020/12/historia-yeezy-boost-350.jpg' },
    { type: 'product', brand: 'DC SHOES', name: 'Manteca 4', price: '380 PLN', img: 'https://static.supersklep.pl/1377212-buty-dc-manteca-4-black-white.jpg?t=fb' },
    { type: 'ambassador', name: 'KOBE BRYANT', msg: 'BLACK MAMBA', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRni_yrQGXunQplniiYEAN0LTRnwnnmz9fRcw&s' },
    { type: 'product', brand: 'NIKE', name: 'Jordan 1 Retro', price: '900 PLN', img: 'https://sneakershop.pl/data/include/img/news/1535664448.jpg' },
    { type: 'product', brand: 'STUSSY', name: '8 Ball Hoodie', price: '550 PLN', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_MS6ztN1bhfMaXBm84su1b3tGJ6ufcZPEw&s' },
    { type: 'ambassador', name: 'PLAYBOI CARTI ', msg: 'WHOLE LOTTA RED', img: 'https://i1.sndcdn.com/artworks-UPUI6utXWMtTAJ4Y-4ze7Ug-t500x500.jpg' },
    { type: 'product', brand: 'RICK OWENS', name: 'RICK OWENS FW25 CONCORDIANS JUMBOLACE SNEAKERS', price: '6500PLN', img: 'https://cdn.rickowens.eu/products/196847/large/RP02E4878_LCOW2_911_06.jpg?1747148906'},
    { type: 'product', brand: 'Maison Margiela', name: 'Maison Margiela Future White', price:'6000PLN',  img: 'https://i.ebayimg.com/images/g/6YMAAOSw-S1m~bfH/s-l1600.webp' }
];

const savedData = localStorage.getItem('myDropList');
let items;

if(savedData !== null) {
    items = JSON.parse(savedData);
} else {
    items = defaultItems;
    localStorage.setItem('myDropList', JSON.stringify(items));
}

const grid = document.getElementById('market-grid');
const itemCountSpan = document.getElementById('item-count');
const addItemForm = document.getElementById('add-item-form');

function saveToLocalStorage() {
    localStorage.setItem('myDropList', JSON.stringify(items));
}

function deleteItem(index) {
    items.splice(index, 1);
    saveToLocalStorage();
    renderMarket();
}

function renderMarket() {
    grid.innerHTML = ''; 
    const productCount = items.filter(i => i.type !== 'ambassador').length;
    itemCountSpan.innerText = productCount;

    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('item-card');

        const deleteBTN = `<button class="delete-btn" onclick="deleteItem(${index})">×</button>`;

        if (item.type === 'ambassador') {
            card.classList.add('ambassador-card');
            card.style.backgroundImage = `url('${item.img}')`;
            card.innerHTML = `
                ${deleteBTN}
                <div class="ambassador-overlay">
                    <h3>${item.name}</h3>
                    <p>${item.msg}</p>
                </div>`;
        } else {
            card.innerHTML = `
                ${deleteBTN}
                <img src="${item.img}" alt="${item.name}">
                <div class="product-info">
                    <span class="brand">${item.brand}</span>
                    <h3 class="name">${item.name}</h3>
                    <p class="price">${item.price}</p>
                </div>`;
        }
        grid.appendChild(card);
    });
}

addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let inputprice = document.getElementById('price').value;

    let finalprice = inputprice.toUpperCase().includes('PLN')
    ? inputprice 
    : inputprice + "PLN";

    const newItem = {
        type: 'product',
        brand: document.getElementById('brand').value.toUpperCase(),
        name: document.getElementById('name').value,
        price:finalprice,
        img: document.getElementById('img-url').value
    };
    items.push(newItem);
    saveToLocalStorage();
    renderMarket();
    addItemForm.reset();
});

renderMarket();