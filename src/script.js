/*
Functionality to add:
  - Local Storage
  - Data population for all columns
  - Delete button deleting existing entries
  - Warning modal for user on-click delete button
*/

const form = document.querySelector('form');

let today = new Date().toISOString().split('T')[0];
document.getElementsByName('expirationDate')[0].setAttribute('min', today);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const productBrand =
    form.productBrand.value.charAt(0).toUpperCase() +
    form.productBrand.value.slice(1);
  const productName =
    form.productName.value.charAt(0).toUpperCase() +
    form.productName.value.slice(1);

  const productCost = form.productCost.value;
  const expirationDate = form.expirationDate.value;
  const productCategory = form.productCategory.value;
  const stockStatus = form.stockStatus.value;

  addProductToTable(productBrand, productName);

  // form.reset();
});

function addProductToTable(
  productBrand,
  productName,
  productCost,
  expirationDate,
  productCategory,
  stockStatus
) {
  const table = document.querySelector('.productTable');
  const newRow = document.createElement('tr');

  const productBrandCell = document.createElement('td');
  productBrandCell.innerText = productBrand;

  const productNameCell = document.createElement('td');
  productNameCell.innerText = productName;

  const productCostCell = document.createElement('td');
  productCostCell.innerText = productCost;

  const expirationDateCell = document.createElement('td');
  expirationDateCell.innerText = expirationDate;

  const productCategoryCell = document.createElement('td');
  productCategoryCell.innerText = productCategory;

  const stockStatusCell = document.createElement('td');
  stockStatusCell.innerText = stockStatus;

  newRow.appendChild(productBrandCell);
  newRow.appendChild(productNameCell);
  newRow.appendChild(productCostCell);
  newRow.appendChild(expirationDateCell);
  newRow.appendChild(productCategoryCell);
  newRow.appendChild(stockStatusCell);

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'Delete';
  deleteBtn.classList.add("delete-button");

  newRow.append(deleteBtn);

  deleteBtn.addEventListener('click', () => {
    newRow.remove();
  });

  table.appendChild(newRow);
}

const headerDate = document.querySelector('.header__date');
headerDate.innerText = new Date();
headerDate.style.color = '#c6cdd7';
