import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

function removeProduct(id) {
    const products = JSON.parse(localStorage.getItem("products"));

    const newProducts = products.filter((product) => {
        return product.id !== id;
    });

    localStorage.setItem("products", JSON.stringify(newProducts));
    renderProducts();
}

function renderProducts() {
    const storage = localStorage.getItem("products");
    const products = storage ? JSON.parse(storage) : [];
    const tbody = document.querySelector("#table-container table tbody");

    tbody.innerHTML = "";

    products.forEach((product) => {
        const tr = document.createElement("tr");
        const id = product.id;

        tr.setAttribute("title", product.name);
        tr.innerHTML = `
            <td class="table-row">${product.name}</td>
            <td class="table-row">${product.price}</td>
            <td class="table-row">${product.description}</td>
            <td class="table-row">
                <button type="button" class="danger-button" id="${id}">X</button>
            </td>
        `;

        tbody.appendChild(tr);
        document.getElementById(id).addEventListener("click", () => {
            removeProduct(id);
        });
    });
}

document.addEventListener("DOMContentLoaded", renderProducts);

// DOM - document object model

document.getElementById("product-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#name");
    const price = document.querySelector("#price");
    const description = document.querySelector("#description");

    const newProduct = {
        id: uuidv4(),
        name: name.value,
        price: price.value,
        description: description.value
    }

    const storage = localStorage.getItem("products");
    const products = storage ? JSON.parse(storage) : [];

    localStorage.setItem("products", JSON.stringify([...products, newProduct]));

    name.value = price.value = description.value = "";
    
    renderProducts();
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
});