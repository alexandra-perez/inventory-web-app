export function populateHeader() {
  const headerDate = document.querySelector('.header__date');
  headerDate.innerText = new Date();
}

export function setMinDateAllowed(elementName) {
  const currentDate = new Date().toISOString().split('T')[0];
  document.getElementsByName(elementName)[0].setAttribute('min', currentDate);
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatCost(cost) {
  return Number(cost).toFixed(2);
}

export function countStock() {
  let inventoryCount = 0;
  const totalInventory = document.querySelector('.total-inventory-count');

  const quantities = document.querySelectorAll('.qty');
  for (const quantity of quantities) {
    inventoryCount += Number(quantity.innerText);
  }
  updateInventoryCount(totalInventory, inventoryCount);
}

export function highlightRow(e) {
  const row = e.target.parentNode.parentNode;
  row.contentEditable = 'true';
  row.classList.toggle('highlight');
}

export function updateInventoryCount(totalInventory, inventoryCount) {
  totalInventory.innerText = `Total items in inventory (${inventoryCount})`;
}

export function updateLineItemsCount(totalLineItems, lineItemsCount) {
  totalLineItems.innerText = `Total line items: ${lineItemsCount}`;
}
