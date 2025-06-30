window.addEventListener("DOMContentLoaded", function () {
    const select = document.getElementById("product");
  
    const categories = [
      { id: "shoes", label: "Shoes" },
      { id: "shirt", label: "Shirts" },
      { id: "trouser", label: "Trousers" },
      { id: "dress", label: "Dresses" }
    ];
  
    // Check if we're loading this script from the `buy.html` page
    if (!select) return;
  
    // Because `buy.html` is separate, we simulate fetching product data (static fallback)
    const productData = {
      Shoes: [
        { id: "S001", name: "Black Sneakers" },
        { id: "S002", name: "White Trainers" },
        { id: "S003", name: "Red Sports Shoes" },
        { id: "S004", name: "Blue Canvas" },
        { id: "S005", name: "Green Runners" },
        { id: "S006", name: "Formal Leather" }
      ],
      Shirts: [
        { id: "SH001", name: "American Shirt" },
        { id: "SH002", name: "Canadian Shirt" }
      ],
      Trousers: [
        { id: "T001", name: "American Trouser" },
        { id: "T002", name: "Canadian Trouser" },
        { id: "T003", name: "Kenyan Trouser" },
        { id: "T004", name: "Tanzanian Trouser" },
        { id: "T005", name: "Slim Fit Trouser" }
      ],
      Dresses: [
        { id: "D001", name: "Sundress" },
        { id: "D002", name: "American Dress" },
        { id: "D003", name: "Hot Summer Dress" },
        { id: "D004", name: "All Time Dress" }
      ]
    };
  
    for (let [category, items] of Object.entries(productData)) {
      const optgroup = document.createElement("optgroup");
      optgroup.label = category;
  
      items.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = `${item.id} - ${item.name}`;
        optgroup.appendChild(option);
      });
  
      select.appendChild(optgroup);
    }
  });
  