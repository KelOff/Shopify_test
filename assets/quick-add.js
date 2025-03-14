document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".quick-add-button").forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const productId = button.dataset.productId;
      if (!productId) return;
      
      const gridItem = button.closest('.grid__item');
      
      button.classList.add("loading");
      try {
        const formData = new FormData();
        formData.append("id", productId);
        formData.append("quantity", 1);
        const response = await fetch("/cart/add.js", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (!data || data.status) {
          console.error("Error adding to cart:", data);
          return;
        }
        
        const cartCount = document.querySelector(".cart-count");
        if (cartCount) {
          const cartResponse = await fetch("/cart.js");
          const cartData = await cartResponse.json();
          cartCount.textContent = cartData.item_count;
        }
        
        if (gridItem) {
          gridItem.style.transition = 'opacity 0.5s ease';
          gridItem.style.opacity = '0';
          
          setTimeout(() => {
            gridItem.remove();
            
            const sliderCounterTotal = document.querySelector('.slider-counter--total');
            if (sliderCounterTotal) {
              const currentTotal = parseInt(sliderCounterTotal.textContent);
              if (!isNaN(currentTotal)) {
                sliderCounterTotal.textContent = (currentTotal - 1).toString();
              }
            }
          }, 500);
        }
      } catch (error) {
        console.error("Failed to add product:", error);
      } finally {
        button.classList.remove("loading");
      }
    });
  });
});