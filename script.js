const menu = document.querySelector(".menu");
function toggleMenu() {
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

let total = 0;

async function fetchDataAndPopulateTable() {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889"
    );
    const data = await response.json();

    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";
    data.items.forEach((item) => {
      total += item.price * item.quantity;

      const row = document.createElement("tr");
      row.innerHTML = `<td><img src=${item.image}/></td><td>${
        item.title
      }</td><td>Rs. ${item.price.toFixed(2)}</td><td>${item.quantity}</td><td>Rs. ${(
        item.price * item.quantity
      ).toFixed(2)}</td>`;

      const actionCell = document.createElement("td");
      const deleteIcon = document.createElement("span");
      deleteIcon.textContent = "🗑️";
      deleteIcon.classList.add("delete-icon");
      deleteIcon.onclick = () => {
        modal.style.display = "flex";
      }
      actionCell.appendChild(deleteIcon);

      row.appendChild(actionCell);

      tableBody.appendChild(row);
      const subtotal = document.querySelector(".subtotal");
      subtotal.innerHTML=`<div>
            <p>SubTotal</p>
            <p>Rs. ${total.toFixed(2)}</p>
          </div>`
    });
    const totalbox=document.querySelector(".total")
    totalbox.innerText="Rs. "+total.toFixed(2)
  } catch (error) {
    console.error("Error fetching API data:", error);
  }
}

window.onload = fetchDataAndPopulateTable;




const modal = document.getElementById("modal");
const cancelBtn = document.getElementById("cancelBtn");


cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});


window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});