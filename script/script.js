const form = document.getElementById('menu__form');
const addFood = document.getElementById('menu-form__food');
const enterPrice = document.getElementById('menu-form__price');
const menuList = document.getElementById('menu__list');
const sortedMenu = document.querySelector('.menu__sort');
const searchFoods = document.querySelector('.menu-search');
const filterFrom = document.getElementById('filter-cheap');
const filterTo = document.getElementById('filter-expensive');
const menuFilter = document.querySelector('.menu__filter');

let menu = JSON.parse(localStorage.getItem("menu")) || [];

function Food(name, price) {
    this.name = name;
    this.price = parseFloat(price);
}

const createMenu = (e) => {
    e.preventDefault();
    if (addFood.value.trim() !== "" && enterPrice.value.trim() !== "") {
        let newFood = new Food(addFood.value, enterPrice.value);
        menu.push(newFood);
        localStorage.setItem("menu", JSON.stringify(menu));
        addFood.value = "";
        enterPrice.value = "";
        renderMenu(menu);
    }
}

const renderMenu = (products = menu) => {
    menuList.innerHTML = "";
    products?.forEach(food => {
        menuList.innerHTML += `
            <li class="menu__item">
                <h4 class="menu-item__title">${food.name}</h4>
                <div>
                    <span>${food.price}</span>
                    <span>so'm</span>
                </div>
            </li>
        `;
    });
}

renderMenu();

const sortMenu = () => {
    let selectedSortType = sortedMenu.value;
    switch (selectedSortType) {
        case 'a-z':
            menu.sort((a, b) => {
                if (a.name > b.name) {
                    return 1
                }
                else {
                    return -1
                }
            })
            break;
        case 'z-a':
            menu.sort((a, b) => {
                if (a.name > b.name) {
                    return -1
                }
                else {
                    return 1
                }
            })
            break;
        case "arzon":
            menu.sort((a, b) => a.price - b.price);
            break;
        case "qimmat":
            menu.sort((a, b) => b.price - a.price);
            break;
    }
    renderMenu(menu);
}

sortedMenu.addEventListener('change', sortMenu);

const filteredMenu = () => {
    let searchValue = searchFoods.value.trim().toLowerCase();
    let filteredMenu = menu.filter(item => item.name.toLowerCase().includes(searchValue));
    renderMenu(filteredMenu);
}

searchFoods.addEventListener('input', filteredMenu);

function filterByPriceRange(menu, minPrice, maxPrice) {
    return menu.filter(product => product.price >= minPrice && product.price <= maxPrice);
}

function updateFilteredProducts() {
    let minPrice = parseFloat(filterFrom.value);
    let maxPrice = parseFloat(filterTo.value);

    if (isNaN(minPrice)) minPrice = 0;
    if (isNaN(maxPrice)) maxPrice = Infinity;

    const filteredProducts = filterByPriceRange(menu, minPrice, maxPrice);
    renderMenu(filteredProducts);
}




filterFrom.addEventListener('input', updateFilteredProducts);
filterTo.addEventListener('input', updateFilteredProducts);
form.addEventListener('submit', createMenu);
