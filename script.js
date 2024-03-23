const form = document.querySelector('form');
const totalLineItems = document.querySelector('.total-lines-count');
const totalInventory = document.querySelector('.total-inventory-count');
const warningModal = document.querySelector('.warning-modal');
const confirmBtn = document.querySelector('.confirm-btn');
const cancelBtn = document.querySelector('.cancel-btn');
let lineItemsCount = 4;
let inventoryCount = 199;
let selectedRow = null;

import {
  populateHeader,
  setMinDateAllowed,
  capitalizeFirstLetter,
  formatCost,
  countStock,
  highlightRow,
  updateInventoryCount,
  updateLineItemsCount,
} from './helpers.js';

populateHeader();

updateLineItemsCount(totalLineItems, lineItemsCount);

countStock();

setMinDateAllowed('expirationDate');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const productBrand = capitalizeFirstLetter(form.productBrand.value);
  const productDescription = `${productBrand} ${capitalizeFirstLetter(
    form.productDescription.value
  )}`;
  const productQty = form.productQty.value;
  const productCost = formatCost(form.productCost.value);
  const expirationDate = form.expirationDate.value;
  const productCategory = form.productCategory.value;
  const stockStatus = form.stockStatus.value;

  const productValues = [
    productBrand,
    productDescription,
    productQty,
    productCost,
    expirationDate,
    productCategory,
    stockStatus,
  ];

  addProductToTable(...productValues);

  lineItemsCount++;
  updateLineItemsCount(totalLineItems, lineItemsCount);

  inventoryCount += Number(productQty);
  updateInventoryCount();

  // form.reset();
});

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
  editButton.addEventListener('click', highlightRow);

  // Add delete functionality for new rows
  deleteBtn.addEventListener('click', (event) => {
    showModal();
    selectedRow = event.target.parentNode.parentNode;
  });

  table.appendChild(newRow);
countStock(); }

const existingEditBtns = document.querySelectorAll('.edit-button');
for (const existingEditBtn of existingEditBtns) {
  existingEditBtn.addEventListener('click', highlightRow);
  existingEditBtn.addEventListener('click', countStock);
}

const existingDeleteBtns = document.querySelectorAll('.delete-button');
for (const existingDeleteBtn of existingDeleteBtns) {
  existingDeleteBtn.addEventListener('click', (event) => {
    showModal();
    selectedRow = event.target.parentNode.parentNode;
    countStock();
  });
}

function showModal() {
  warningModal.classList.add('show-modal');

  cancelBtn.removeEventListener('click', hideModal);
  confirmBtn.removeEventListener('click', confirmDelete);

  cancelBtn.addEventListener('click', hideModal);
  confirmBtn.addEventListener('click', confirmDelete);
}

function hideModal() {
  warningModal.classList.remove('show-modal');
}

function confirmDelete() {
  let inventoryCount = 0;
  const quantities = document.querySelectorAll('.qty');
  for (const quantity of quantities) {
    inventoryCount += Number(quantity.innerText);
  }

  const quantityCell = selectedRow.querySelector('.qty');

  inventoryCount -= Number(quantityCell.textContent);
  updateInventoryCount(totalInventory, inventoryCount);

  --lineItemsCount;
  updateLineItemsCount(totalLineItems, lineItemsCount);

  selectedRow.remove();
  hideModal();
  selectedRow = null;
}