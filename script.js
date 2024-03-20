/*
Functionality to add:
  - Edit button can't be edited
  - Edit qty updates total inventory
*/

// Populate header
const headerDate = document.querySelector('.header__date');
headerDate.innerText = new Date();
headerDate.style.color = '#c6cdd7';

// Set line items count
let lineItemsCount = 4;
const totalLineItems = document.querySelector('.total-lines-count');
totalLineItems.innerText = `Total line items: ${lineItemsCount}`;

// Set inventory count
let inventoryCount = 0;
const totalInventory = document.querySelector('.total-inventory-count');

const quantities = document.querySelectorAll('.qty');
for (const quantity of quantities) {
  inventoryCount += Number(quantity.innerText);
}
totalInventory.innerText = `Total items in inventory (${inventoryCount})`;

// Add form logic
const form = document.querySelector('form');
let selectedRow = null;

// Set current date as min exp. date allowed
let today = new Date().toISOString().split('T')[0];
document.getElementsByName('expirationDate')[0].setAttribute('min', today);

// Add edit functionality
const existingEditBtns = document.querySelectorAll('.edit-button');
for (const existingEditBtn of existingEditBtns) {
  existingEditBtn.addEventListener('click', (event) => {
    selectedRow = event.target.parentNode.parentNode;
    event.target.parentNode.parentNode.classList.toggle('highlight');
    selectedRow.contentEditable = 'true';
  });
}

// Show modal on user - click delete button.
// Set selected row for deletion.
const existingBtns = document.querySelectorAll('.delete-button');
for (const existingBtn of existingBtns) {
  existingBtn.addEventListener('click', (event) => {
    showModal();
    selectedRow = event.target.parentNode.parentNode;
  });
}

// Add form submission event listener
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const productBrand =
    form.productBrand.value.charAt(0).toUpperCase() +
    form.productBrand.value.slice(1);
  const productDescription =
    form.productBrand.value +
    ' ' +
    form.productDescription.value.charAt(0).toUpperCase() +
    form.productDescription.value.slice(1);
  const productQty = form.productQty.value;
  const productCost = Number(form.productCost.value).toFixed(2).toString();
  const expirationDate = form.expirationDate.value;
  const productCategory = form.productCategory.value;
  const stockStatus = form.stockStatus.value;

  // Populate inventory table
  addProductToTable(
    productBrand,
    productDescription,
    productQty,
    productCost,
    expirationDate,
    productCategory,
    stockStatus
  );
  // Increment and display line items and inventory count
  lineItemsCount++;
  totalLineItems.innerText = `Total line items: ${lineItemsCount}`;

  inventoryCount += Number(productQty);
  totalInventory.innerText = `Total items in inventory (${inventoryCount})`;

  // form.reset();
});

// Populate inventory table
function addProductToTable(
  productBrand,
  productDescription,
  productQty,
  productCost,
  expirationDate,
  productCategory,
  stockStatus
) {
  const table = document.querySelector('.product-table');
  const newRow = document.createElement('tr');
  newRow.classList.add('product-table__tr');

  const editCell = document.createElement('td');
  const editButton = document.createElement('button');
  editButton.innerHTML = 'Edit';
  editCell.classList.add('edit-col');
  editButton.classList.add('edit-button');
  editCell.appendChild(editButton);

  const productBrandCell = document.createElement('td');
  productBrandCell.innerText = productBrand;

  const productDescriptionCell = document.createElement('td');
  productDescriptionCell.innerText = productDescription;

  const qtyCell = document.createElement('td');
  qtyCell.innerText = productQty;
  qtyCell.classList.add('qty');

  const productCostCell = document.createElement('td');
  productCostCell.innerText = productCost;

  const expirationDateCell = document.createElement('td');
  expirationDateCell.innerText = expirationDate;

  const productCategoryCell = document.createElement('td');
  productCategoryCell.innerText = productCategory;

  const stockStatusCell = document.createElement('td');
  stockStatusCell.innerText = stockStatus;

  newRow.appendChild(editCell);
  newRow.appendChild(productBrandCell);
  newRow.appendChild(productDescriptionCell);
  newRow.appendChild(qtyCell);
  newRow.appendChild(productCostCell);
  newRow.appendChild(expirationDateCell);
  newRow.appendChild(productCategoryCell);
  newRow.appendChild(stockStatusCell);

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.classList.add('delete-button');

  const td = document.createElement('td');
  td.appendChild(deleteBtn);
  newRow.append(td);
  td.classList.add('delete-col');

  // Add edit functionality for new rows
  editButton.addEventListener('click', (event) => {
    selectedRow = event.target.parentNode.parentNode;
    selectedRow.contentEditable = 'true';
    event.target.parentNode.parentNode.classList.toggle('highlight');
  });

  // Add delete functionality for new rows
  deleteBtn.addEventListener('click', (event) => {
    showModal();
    selectedRow = event.target.parentNode.parentNode;
  });

  table.appendChild(newRow);
}

// Show/Hide warning modal
function showModal() {
  const warningModal = document.querySelector('.warning-modal');
  warningModal.style.display = 'block';

  const confirmBtn = document.querySelector('.confirm-btn');
  const cancelBtn = document.querySelector('.cancel-btn');

  cancelBtn.addEventListener('click', hideModal);
  confirmBtn.addEventListener('click', confirmDelete);
}

function hideModal() {
  const warningModal = document.querySelector('.warning-modal');
  warningModal.style.display = 'none';
}

// Delete table row
function confirmDelete() {
  const quantityCell = selectedRow.querySelector('.qty');
  console.log(quantityCell);
  inventoryCount -= Number(quantityCell.textContent);
  totalInventory.innerText = `Total items in inventory (${inventoryCount})`;

  lineItemsCount--;
  totalLineItems.innerText = `Total line items: ${lineItemsCount}`;

  selectedRow.remove();
  hideModal();
  selectedRow = null;
}
