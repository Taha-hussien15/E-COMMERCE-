// Main JavaScript for the e-commerce site

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header .container').appendChild(mobileMenuToggle);
    
    mobileMenuToggle.addEventListener('click', function() {
        document.querySelector('.main-nav').classList.toggle('active');
    });

    // Product data
    const products = [
        {
            id: 1,
            name: "Premium Wireless Bluetooth Earbuds",
            price: 49.99,
            originalPrice: 79.99,
            image: "images/product-1.jpg",
            rating: 4.5,
            reviewCount: 128,
            badge: "Hot"
        },
        {
            id: 2,
            name: "Smart Watch with Fitness Tracker",
            price: 89.99,
            originalPrice: 129.99,
            image: "images/product-2.jpg",
            rating: 4.2,
            reviewCount: 86,
            badge: "Sale"
        },
        {
            id: 3,
            name: "Portable Bluetooth Speaker",
            price: 34.99,
            originalPrice: 49.99,
            image: "images/product-3.jpg",
            rating: 4.7,
            reviewCount: 215,
            badge: "Popular"
        },
        {
            id: 4,
            name: "Wireless Charging Pad",
            price: 19.99,
            originalPrice: 29.99,
            image: "images/product-4.jpg",
            rating: 4.0,
            reviewCount: 42,
            badge: "New"
        },
        {
            id: 5,
            name: "Noise Cancelling Headphones",
            price: 129.99,
            originalPrice: 199.99,
            image: "images/product-5.jpg",
            rating: 4.8,
            reviewCount: 178,
            badge: "Best Seller"
        },
        {
            id: 6,
            name: "4K Action Camera",
            price: 149.99,
            originalPrice: 199.99,
            image: "images/product-6.jpg",
            rating: 4.3,
            reviewCount: 92,
            badge: "Limited"
        }
    ];

    // Load featured products on homepage
    if (document.querySelector('.featured-products .product-grid')) {
        const featuredGrid = document.querySelector('.featured-products .product-grid');
        featuredGrid.innerHTML = '';
        
        products.slice(0, 4).forEach(product => {
            featuredGrid.appendChild(createProductCard(product));
        });
    }

    // Load all products on products page
    if (document.querySelector('.products-grid')) {
        const productsGrid = document.querySelector('.products-grid');
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            productsGrid.appendChild(createProductCard(product));
        });
    }

    // Load related products on product detail page
    if (document.querySelector('.related-products .product-grid')) {
        const relatedGrid = document.querySelector('.related-products .product-grid');
        relatedGrid.innerHTML = '';
        
        products.slice(2, 6).forEach(product => {
            relatedGrid.appendChild(createProductCard(product));
        });
    }

    // Product card template
    function createProductCard(product) {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    <span class="discount">${discount}% OFF</span>
                </div>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
                <div class="product-actions">
                    <button class="btn-primary add-to-cart">Add to Cart</button>
                    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;
        
        // Add event listeners
        card.querySelector('.add-to-cart').addEventListener('click', addToCart);
        card.querySelector('.wishlist-btn').addEventListener('click', toggleWishlist);
        
        return card;
    }

    // Generate star rating HTML
    function generateStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }

    // Add to cart function
    function addToCart(e) {
        e.preventDefault();
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        const productPrice = parseFloat(productCard.querySelector('.current-price').textContent.replace('$', ''));
        const productImage = productCard.querySelector('.product-image img').src;
        
        // In a real app, you would add this to a cart array or send to server
        alert(`${productName} has been added to your cart!`);
        
        // Update cart count in header
        updateCartCount(1);
    }

    // Toggle wishlist
    function toggleWishlist(e) {
        e.preventDefault();
        const btn = e.target.closest('.wishlist-btn');
        btn.classList.toggle('active');
        
        if (btn.classList.contains('active')) {
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            btn.innerHTML = '<i class="far fa-heart"></i>';
        }
    }

    // Update cart count in header
    function updateCartCount(quantity = 0) {
        let cartCount = localStorage.getItem('cartCount') || 0;
        cartCount = parseInt(cartCount) + quantity;
        localStorage.setItem('cartCount', cartCount);
        
        const cartIcon = document.querySelector('.top-bar-right a[href="cart.html"]');
        if (cartCount > 0) {
            if (!cartIcon.querySelector('.cart-count')) {
                const countBadge = document.createElement('span');
                countBadge.className = 'cart-count';
                cartIcon.appendChild(countBadge);
            }
            cartIcon.querySelector('.cart-count').textContent = cartCount;
        } else if (cartIcon.querySelector('.cart-count')) {
            cartIcon.querySelector('.cart-count').remove();
        }
    }

    // Initialize cart count
    if (localStorage.getItem('cartCount')) {
        updateCartCount();
    }

    // Product detail page functionality
    if (document.querySelector('.product-detail')) {
        // Thumbnail image click
        const thumbnails = document.querySelectorAll('.thumbnail-images img');
        const mainImage = document.getElementById('main-product-image');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                mainImage.src = this.src.replace('-thumb', '');
            });
        });

        // Color selection
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Quantity selector
        const minusBtn = document.querySelector('.quantity-btn.minus');
        const plusBtn = document.querySelector('.quantity-btn.plus');
        const quantityInput = document.querySelector('.quantity-selector input');
        
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;
        });

        // Add to cart button
        document.querySelector('.add-to-cart').addEventListener('click', function() {
            const productName = document.querySelector('.product-info h1').textContent;
            const quantity = parseInt(quantityInput.value);
            alert(`${quantity} ${productName} added to cart!`);
            updateCartCount(quantity);
        });

        // Buy now button
        document.querySelector('.buy-now').addEventListener('click', function() {
            alert('Proceeding to checkout!');
            window.location.href = 'checkout.html';
        });

        // Tab switching
        const tabNav = document.querySelectorAll('.tabs-nav li');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabNav.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                tabNav.forEach(t => t.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                this.classList.add('active');
                tabPanes[index].classList.add('active');
            });
        });

        // Star rating in reviews
        const starInputs = document.querySelectorAll('.rating-input i');
        starInputs.forEach((star, index) => {
            star.addEventListener('click', function() {
                starInputs.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('active');
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        });
    }

    // Sort functionality on products page
    if (document.getElementById('sort-options')) {
        document.getElementById('sort-options').addEventListener('change', function() {
            const sortValue = this.value;
            let sortedProducts = [...products];
            
            switch(sortValue) {
                case 'newest':
                    // In a real app, you would sort by date added
                    sortedProducts.reverse();
                    break;
                case 'price-low':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                // 'popular' is default
            }
            
            const productsGrid = document.querySelector('.products-grid');
            productsGrid.innerHTML = '';
            
            sortedProducts.forEach(product => {
                productsGrid.appendChild(createProductCard(product));
            });
        });
    }

    // Price range filter
    if (document.getElementById('price-range')) {
        const priceRange = document.getElementById('price-range');
        const minPrice = document.querySelector('.range-values span:first-child');
        const maxPrice = document.querySelector('.range-values span:last-child');
        
        priceRange.addEventListener('input', function() {
            maxPrice.textContent = `$${this.value}`;
        });
    }
});



// Cart page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Quantity selectors
    const quantityMinusBtns = document.querySelectorAll('.quantity-btn.minus');
    const quantityPlusBtns = document.querySelectorAll('.quantity-btn.plus');
    const quantityInputs = document.querySelectorAll('.quantity-selector input');
    
    quantityMinusBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let value = parseInt(quantityInputs[index].value);
            if (value > 1) {
                quantityInputs[index].value = value - 1;
                updateCartItemTotal(index);
            }
        });
    });
    
    quantityPlusBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let value = parseInt(quantityInputs[index].value);
            quantityInputs[index].value = value + 1;
            updateCartItemTotal(index);
        });
    });
    
    quantityInputs.forEach((input, index) => {
        input.addEventListener('change', function() {
            if (parseInt(this.value) < 1) {
                this.value = 1;
            }
            updateCartItemTotal(index);
        });
    });
    
    // Remove item buttons
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this item from your cart?')) {
                const cartItem = this.closest('.cart-item');
                cartItem.remove();
                updateCartSummary();
                updateCartCount(-1);
            }
        });
    });
    
    // Update cart button
    document.querySelector('.update-cart').addEventListener('click', function() {
        alert('Cart updated!');
    });
    
    // Continue shopping button
    document.querySelector('.continue-shopping').addEventListener('click', function() {
        window.location.href = 'products.html';
    });
    
    // Proceed to checkout button
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        window.location.href = 'checkout.html';
    });
    
    // Apply coupon button
    document.querySelector('.apply-coupon').addEventListener('click', function() {
        const couponCode = document.querySelector('.coupon-code input').value;
        if (couponCode) {
            alert(`Coupon code "${couponCode}" applied! (This is just a demo)`);
        } else {
            alert('Please enter a coupon code');
        }
    });
    
    // Calculate cart item total
    function updateCartItemTotal(index) {
        const price = parseFloat(document.querySelectorAll('.cart-item-price')[index].textContent.replace('$', ''));
        const quantity = parseInt(quantityInputs[index].value);
        const total = (price * quantity).toFixed(2);
        document.querySelectorAll('.cart-item-total')[index].textContent = `$${total}`;
        updateCartSummary();
    }
    
    // Update cart summary
    function updateCartSummary() {
        let subtotal = 0;
        const itemTotals = document.querySelectorAll('.cart-item-total');
        
        itemTotals.forEach(item => {
            subtotal += parseFloat(item.textContent.replace('$', ''));
        });
        
        const shipping = 4.99;
        const tax = (subtotal * 0.06).toFixed(2);
        const total = (parseFloat(subtotal) + parseFloat(shipping) + parseFloat(tax)).toFixed(2);
        
        document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = `$${shipping.toFixed(2)}`;
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = `$${tax}`;
        document.querySelector('.summary-row.total span:last-child').textContent = `$${total}`;
    }
    
    // Initialize cart summary
    updateCartSummary();
});


// Checkout page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Continue to payment button
    document.querySelector('.continue-to-payment').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Validate form
        const requiredFields = document.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value) {
                field.style.borderColor = 'red';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // In a real app, you would proceed to the next step
            alert('Proceeding to payment step!');
            document.querySelector('.step:nth-child(2)').classList.add('active');
            document.querySelector('.shipping-form').style.display = 'none';
            
            // Show payment form (which would be in the next step)
            // This is just a demo, so we'll show an alert
        } else {
            alert('Please fill in all required fields');
        }
    });
    
    // Payment method selection
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            document.querySelectorAll('.payment-details').forEach(details => {
                details.style.display = 'none';
            });
            
            const selectedDetails = document.getElementById(`${this.id}-details`);
            if (selectedDetails) {
                selectedDetails.style.display = 'block';
            }
        });
    });
    
    // Place order button
    document.querySelector('.place-order').addEventListener('click', function() {
        // In a real app, you would process the payment
        alert('Thank you for your order!');
        window.location.href = 'account.html?order=success';
    });
    
    // Back to shipping button
    document.querySelector('.back-to-shipping').addEventListener('click', function() {
        document.querySelector('.step:nth-child(1)').classList.add('active');
        document.querySelector('.step:nth-child(2)').classList.remove('active');
        document.querySelector('.shipping-form').style.display = 'block';
        document.querySelector('.payment-form').style.display = 'none';
    });
});