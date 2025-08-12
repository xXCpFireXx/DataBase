// URL base de la API. Asegúrate de que el puerto coincida con el de tu servidor backend.
const API_URL = 'http://localhost:3001';

// Elementos del DOM
const form = document.getElementById('product-form');
const tableBody = document.getElementById('products-table-body');
const formTitle = document.getElementById('form-title');
const productIdInput = document.getElementById('product-id');
const cancelButton = document.getElementById('cancel-button');
const submitButton = document.getElementById('submit-button');

async function fetchProducts(){
  try{
    const response = await fetch(`${API_URL}/products`);
    if(!response.ok) throw new Error('Error al conectar con la API');
    const products = await response.json();

    tableBody.innerHTML = '';

    if(!products || products.length === 0){
      tableBody.innerHTML = '<tr><td colspan="5" class="center muted">No hay productos registrados.</td></tr>';
      return;
    }

    products.forEach(product => {
      const row = document.createElement('tr');

      const isActive = (product.is_active === true || product.is_active === 'true');

      row.innerHTML = `
        <td>
          <div>${escapeHtml(product.product)}</div>
        </td>
        <td>
          <div>$${Number(product.price).toFixed(2)}</div>
        </td>
        <td>
          <div>${product.amount}</div>
        </td>
        <td>
          <span class="badge ${isActive ? 'active' : 'inactive'}">${isActive ? 'Activo' : 'Inactivo'}</span>
        </td>
        <td class="actions-cell">
          <button class="action-link edit" onclick="editProduct('${product.id}', '${escapeQuotes(product.product)}', ${product.price}, ${product.amount}, ${isActive})">Editar</button>
          <button class="action-link delete" onclick="deleteProduct('${product.id}')">Eliminar</button>
        </td>
      `;

      tableBody.appendChild(row);
    });

  }catch(err){
    console.error(err);
    tableBody.innerHTML = '<tr><td colspan="5" class="center muted">Error al cargar los productos. Revisa la consola.</td></tr>';
  }
}

form.addEventListener('submit', async (event) =>{
  event.preventDefault();

  const id = productIdInput.value;
  const productData = {
    product: document.getElementById('product').value,
    price: parseFloat(document.getElementById('price').value),
    amount: parseInt(document.getElementById('amount').value),
    is_active: document.getElementById('is_active').checked,
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_URL}/products/${id}` : `${API_URL}/products`;

  try{
    const response = await fetch(url, {
      method,
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(productData)
    });

    if(!response.ok){
      const errorData = await response.json().catch(()=>({}));
      throw new Error(errorData.error || 'Ocurrió un error.');
    }

    await response.json().catch(()=>{});
    resetForm();
    await fetchProducts();

  }catch(error){
    console.error('Error al guardar:', error);
    alert(`Error al guardar el producto: ${error.message}`);
  }
});

window.editProduct = function(id, name, price, amount, isActive){
  formTitle.textContent = 'Editar Producto';
  productIdInput.value = id;
  document.getElementById('product').value = name;
  document.getElementById('price').value = price;
  document.getElementById('amount').value = amount;
  document.getElementById('is_active').checked = isActive;

  submitButton.textContent = 'Actualizar Producto';
  cancelButton.style.display = 'inline-block';
  window.scrollTo(0,0);
}

window.deleteProduct = async function(id){
  if(!confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
  try{
    const response = await fetch(`${API_URL}/products/${id}`, { method:'DELETE' });
    if(!response.ok) throw new Error('No se pudo eliminar el producto.');
    await fetchProducts();
  }catch(err){
    console.error('Error al eliminar:', err);
    alert('Error al eliminar el producto.');
  }
}

function resetForm(){
  form.reset();
  productIdInput.value = '';
  formTitle.textContent = 'Agregar Nuevo Producto';
  submitButton.textContent = 'Guardar Producto';
  cancelButton.style.display = 'none';
}

cancelButton.addEventListener('click', resetForm);

document.addEventListener('DOMContentLoaded', fetchProducts);

// small helpers to avoid breaking HTML/JS when inserting names
function escapeHtml(text){
  if(text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
function escapeQuotes(text){
  if(text == null) return '';
  return String(text).replace(/'/g, "\\'").replace(/\"/g,'\\\"');
}