// URL base de la API. Asegúrate de que el puerto coincida con el de tu servidor backend.
const API_URL = 'http://localhost:3001';

// Elementos del DOM
const form = document.getElementById('product-form');
const tableBody = document.getElementById('products-table-body');
const formTitle = document.getElementById('form-title');
const productIdInput = document.getElementById('product-id');
const cancelButton = document.getElementById('cancel-button');
const submitButton = document.getElementById('submit-button');


/**
 * Función para obtener y mostrar todos los productos.
 */
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Error al conectar con la API');
        const products = await response.json();

        // Limpiamos la tabla antes de llenarla
        tableBody.innerHTML = '';

        if (products.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center p-8 text-gray-500">No hay productos registrados.</td></tr>';
            return;
        }

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-900">${product.product}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">$${parseFloat(product.price).toFixed(2)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${product.amount}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.is_active === 'true' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${product.is_active === 'true' ? 'Activo' : 'Inactivo'}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button onclick="editProduct('${product.id}', '${product.product}', ${product.price}, ${product.amount}, ${product.is_active === 'true'})" class="text-indigo-600 hover:text-indigo-900">Editar</button>
                    <button onclick="deleteProduct('${product.id}')" class="text-red-600 hover:text-red-900">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center p-8 text-red-500">Error al cargar los productos. Revisa la consola.</td></tr>`;
    }
}

/**
 * Maneja el envío del formulario para crear o actualizar un producto.
 */
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que la página se recargue

    const id = productIdInput.value;
    const productData = {
        product: document.getElementById('product').value,
        price: parseFloat(document.getElementById('price').value),
        amount: parseInt(document.getElementById('amount').value),
        is_active: document.getElementById('is_active').checked,
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/products/${id}` : `${API_URL}/products`;

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ocurrió un error.');
        }
        
        await response.json();
        resetForm();
        await fetchProducts();

    } catch (error) {
        console.error('Error al guardar:', error);
        alert(`Error al guardar el producto: ${error.message}`);
    }
});

/**
 * Prepara el formulario para editar un producto.
 * Se expone globalmente para poder llamarla desde el HTML.
 */
window.editProduct = function(id, name, price, amount, isActive) {
    formTitle.textContent = 'Editar Producto';
    productIdInput.value = id;
    document.getElementById('product').value = name;
    document.getElementById('price').value = price;
    document.getElementById('amount').value = amount;
    document.getElementById('is_active').checked = isActive;
    
    submitButton.textContent = 'Actualizar Producto';
    cancelButton.classList.remove('hidden');
    window.scrollTo(0, 0); // Sube al inicio de la página para ver el formulario
}

/**
 * Elimina un producto.
 * Se expone globalmente para poder llamarla desde el HTML.
 */
window.deleteProduct = async function(id) {
    // Usamos un cuadro de diálogo de confirmación personalizado en el futuro.
    // Por ahora, el confirm del navegador es suficiente para la funcionalidad.
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('No se pudo eliminar el producto.');
        await fetchProducts();
    } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el producto.');
    }
}

/**
 * Resetea el formulario a su estado inicial.
 */
function resetForm() {
    form.reset();
    productIdInput.value = '';
    formTitle.textContent = 'Agregar Nuevo Producto';
    submitButton.textContent = 'Guardar Producto';
    cancelButton.classList.add('hidden');
}

// Event listener para el botón de cancelar
cancelButton.addEventListener('click', resetForm);

// Carga inicial de los productos cuando la página está lista
document.addEventListener('DOMContentLoaded', fetchProducts);
