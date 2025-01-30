document
  .querySelector(".password-toggle")
  .addEventListener("click", function () {
    const passwordInput = document.querySelector("#password");
    const icon = this;

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.classList.replace("ri-eye-line", "ri-eye-off-line");
    } else {
      passwordInput.type = "password";
      icon.classList.replace("ri-eye-off-line", "ri-eye-line");
    }
  });

// Password toggle functionality
document.querySelectorAll(".password-toggle").forEach((toggle) => {
  toggle.addEventListener("click", function () {
    const passwordInput = this.previousElementSibling;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      this.classList.replace("ri-eye-line", "ri-eye-off-line");
    } else {
      passwordInput.type = "password";
      this.classList.replace("ri-eye-off-line", "ri-eye-line");
    }
  });
});

// Password strength meter
const passwordInput = document.querySelector("#password");
const strengthMeter = document.querySelector(".password-strength-meter div");
const strengthText = document.querySelector(".password-strength span");

passwordInput.addEventListener("input", function () {
  const password = this.value;
  let strength = 0;

  if (password.length >= 8) strength += 25;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
  if (password.match(/\d/)) strength += 25;
  if (password.match(/[^a-zA-Z\d]/)) strength += 25;

  strengthMeter.style.width = strength + "%";
  strengthMeter.style.backgroundColor =
    strength <= 25
      ? "#ff4444"
      : strength <= 50
      ? "#ffaa00"
      : strength <= 75
      ? "#2196f3"
      : "#4caf50";

  strengthText.textContent =
    strength <= 25
      ? "Weak"
      : strength <= 50
      ? "Fair"
      : strength <= 75
      ? "Good"
      : "Strong";
});

//  CL PAGE
// Category filter functionality
document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const bookCards = document.querySelectorAll(".book-card");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const selectedCategory = button.dataset.category;

      bookCards.forEach((card) => {
        if (
          selectedCategory === "all" ||
          card.dataset.category === selectedCategory
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});





// ADDING TO THE CART PAGE IS NOT WORKING PROPERLY


document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const bookCard = this.closest('.book-card');
            const bookTitle = bookCard.querySelector('h4').textContent;
            const bookAuthor = bookCard.querySelector('.author').textContent;
            const bookPrice = bookCard.querySelector('.price').textContent.replace('₹', '').trim();
            
            const bookItem = { title: bookTitle, author: bookAuthor, price: parseFloat(bookPrice) };
            cartItems.push(bookItem);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            
            alert(`${bookTitle} has been added to your cart!`);
        });
    });

    // Cart Page
    if (document.getElementById('cartItems')) {
        const cartTable = document.getElementById('cartItems');
        const totalPriceEl = document.getElementById('totalPrice');
        let totalPrice = 0;

        cartItems.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.title}</td>
                <td>${item.author}</td>
                <td>₹${item.price}</td>
                <td><button class="remove-btn" data-index="${index}">Remove</button></td>
            `;
            cartTable.appendChild(row);
            totalPrice += item.price;
        });

        totalPriceEl.textContent = totalPrice;

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function () {
                const index = this.dataset.index;
                cartItems.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                location.reload();
            });
        });
    }

    document.getElementById('checkoutBtn')?.addEventListener('click', function () {
        alert('Proceeding to checkout.');
        localStorage.removeItem('cart');
        location.reload();
    });
});