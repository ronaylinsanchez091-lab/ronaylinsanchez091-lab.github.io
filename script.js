let cart = [];
const numeroWhatsApp = "18292029238";

const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartEmptyMsgEl = document.getElementById("cart-empty-msg");
const errorMessageEl = document.getElementById("error-message");

/* AGREGAR AL CARRITO */
function addToCart(name, price) {
    const item = cart.find(p => p.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    renderCart();
}

/* ELIMINAR PRODUCTO COMPLETO */
function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    renderCart();
}

/* RENDERIZAR CARRITO */
function renderCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartEmptyMsgEl.style.display = "block";
    } else {
        cartEmptyMsgEl.style.display = "none";

        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const div = document.createElement("div");
            div.className = "flex justify-between items-center py-2 border-b";

            div.innerHTML = `
                <div>
                    <span class="font-semibold">${item.quantity} × ${item.name}</span>
                    <span class="block text-sm text-gray-500">RD$${subtotal}</span>
                </div>

                <button 
                    onclick="removeItem('${item.name}')" 
                    class="text-red-600 font-bold hover:text-red-800">
                    ❌
                </button>
            `;

            cartItemsEl.appendChild(div);
        });
    }

    cartTotalEl.innerText = `RD$${total}`;
}

/* ENVIAR PEDIDO A WHATSAPP */
function sendWhatsAppOrder() {
    const name = document.getElementById("customer-name").value.trim();
    const address = document.getElementById("customer-address").value.trim();

    errorMessageEl.classList.add("hidden");

    if (!name || !address) {
        errorMessageEl.textContent = "⚠️ Debes completar tu nombre y dirección.";
        errorMessageEl.classList.remove("hidden");
        return;
    }

    if (cart.length === 0) {
        errorMessageEl.textContent = "⚠️ Tu carrito está vacío.";
        errorMessageEl.classList.remove("hidden");
        return;
    }

    let mensaje = `🍔 *FASTFOODRD*\n\n`;
    mensaje += `👤 Nombre: ${name}\n`;
    mensaje += `🏠 Dirección: ${address}\n\n`;
    mensaje += `🧾 Pedido:\n`;

    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        mensaje += `- ${item.quantity} × ${item.name} (RD$${subtotal})\n`;
    });

    mensaje += `\n💰 Total: RD$${total}`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}
