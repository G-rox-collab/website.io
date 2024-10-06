let cart = [];
        let userCredits = {}; // Store credits per user phone number

        function addToCart(productName, price) {
            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                alert('This product is already in your cart.');
                return;
            }

            const product = { name: productName, price: price };
            cart.push(product);
            renderCart();
        }

        function renderCart() {
            const cartItemsElement = document.getElementById('cartItems');
            cartItemsElement.innerHTML = ''; // Clear current cart items
            let total = 0;

            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = ${item.name} - KSh ${item.price.toLocaleString()};
                
                // Remove button
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.classList.add('remove-btn');
                removeBtn.onclick = () => removeFromCart(item.name);
                li.appendChild(removeBtn);
                
                cartItemsElement.appendChild(li);
                total += item.price;
            });

            document.getElementById('totalPrice').textContent = Total: KSh ${total.toLocaleString()};
        }

        function removeFromCart(productName) {
            cart = cart.filter(item => item.name !== productName);
            renderCart();
        }

        document.getElementById('checkoutBtn').addEventListener('click', function() {
            document.getElementById('checkoutModal').style.display = 'block';
        });

        document.getElementById('closeCheckout').addEventListener('click', function() {
            document.getElementById('checkoutModal').style.display = 'none';
        });

        document.getElementById('registerBtn').addEventListener('click', function() {
            document.getElementById('registerModal').style.display = 'block';
        });

        document.getElementById('closeRegister').addEventListener('click', function() {
            document.getElementById('registerModal').style.display = 'none';
        });

        document.getElementById('submitRegister').addEventListener('click', function() {
            const phoneNumber = document.getElementById('phoneNumber').value;
            const email = document.getElementById('email').value;
            
            if (phoneNumber && email) {
                alert('Registration successful! You can now add items to your cart.');
                document.getElementById('registerModal').style.display = 'none';
                userCredits[phoneNumber] = Infinity; // Initialize credits for the new user
            } else {
                alert('Please fill in all fields.');
            }
        });

        document.getElementById('confirmCheckout').addEventListener('click', function() {
            const phoneNumber = document.getElementById('phoneNumberCheckout').value;
            const total = cart.reduce((sum, item) => sum + item.price, 0);

            // Initialize credits for the phone number if not already present
            if (!userCredits[phoneNumber]) {
                userCredits[phoneNumber] = Infinity; // Unlimited credits
            }

            if (userCredits[phoneNumber] >= total) {
                userCredits[phoneNumber] -= total; // Deduct total from user's credits
                alert(Purchase successful via Mpesa! Total KSh ${total.toLocaleString()} has been deducted from your credits.);
                cart = []; // Clear cart after successful checkout
                renderCart(); // Update cart display
                document.getElementById('checkoutModal').style.display = 'none'; // Close the modal
            } else {
                alert('Insufficient credits to complete the purchase.');
            }
        });

        // Close modals when clicking outside of them
        window.onclick = function(event) {
            const registerModal = document.getElementById('registerModal');
            const checkoutModal = document.getElementById('checkoutModal');
            if (event.target == registerModal) {
                registerModal.style.display = "none";
            }
            if (event.target == checkoutModal) {
                checkoutModal.style.display = "none";
            }
        }
    
