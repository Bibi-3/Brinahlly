// Sistema completo da Brinahlly Beauty
class BrinahllyBeauty {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('brinahllyUsers')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('brinahllyCurrentUser')) || null;
        this.products = this.initializeProducts();
        this.cart = JSON.parse(localStorage.getItem('brinahllyCart')) || [];
        this.orders = JSON.parse(localStorage.getItem('brinahllyOrders')) || [];
        this.currentProduct = null;
        this.init();
    }

    initializeProducts() {
        return [
            {
                id: 1,
                name: "Flor de Cerejeira",
                description: "Fragrância suave e floral com notas de cerejeira e jasmim. Perfeita para o dia a dia, trazendo uma sensação de frescor e delicadeza.",
                longDescription: "O Body Splash Flor de Cerejeira é uma fragrância encantadora que combina notas suaves de cerejeira com o aroma floral do jasmim. Ideal para quem busca uma fragrância leve e romântica. Sua fórmula hidratante mantém a pele macia e perfumada por horas.",
                price: 49.90,
                oldPrice: 59.90,
                category: "body-splash",
                badge: "MAIS VENDIDO",
                image: "https://via.placeholder.com/500x500/FFB6C1/FFFFFF?text=Flor+de+Cerejeira",
                images: [
                    "https://via.placeholder.com/500x500/FFB6C1/FFFFFF?text=Flor+de+Cerejeira+1",
                    "https://via.placeholder.com/500x500/FFB6C1/FFFFFF?text=Flor+de+Cerejeira+2",
                    "https://via.placeholder.com/500x500/FFB6C1/FFFFFF?text=Flor+de+Cerejeira+3"
                ],
                features: [
                    "Duração de até 8 horas",
                    "Hidratação intensa",
                    "Fragrância suave e duradoura",
                    "Sem álcool na fórmula"
                ],
                volume: "200ml"
            },
            {
                id: 2,
                name: "Brisa Tropical",
                description: "Notas refrescantes de coco e abacaxi com um toque exótico",
                longDescription: "Transporte-se para um paraíso tropical com o Body Splash Brisa Tropical. Combina a doçura do coco com a frescura do abacaxi, criando uma fragrância vibrante e energizante.",
                price: 54.90,
                category: "body-splash",
                badge: "LANÇAMENTO",
                image: "https://via.placeholder.com/500x500/87CEEB/FFFFFF?text=Brisa+Tropical",
                images: [
                    "https://via.placeholder.com/500x500/87CEEB/FFFFFF?text=Brisa+Tropical+1",
                    "https://via.placeholder.com/500x500/87CEEB/FFFFFF?text=Brisa+Tropical+2"
                ],
                features: [
                    "Aroma tropical revitalizante",
                    "Hidratação com óleo de coco",
                    "Perfeito para o verão",
                    "Fórmula refrescante"
                ],
                volume: "200ml"
            },
            {
                id: 3,
                name: "Vanilla Dream",
                description: "Doce e aconchegante, com notas cremosas de baunilha e âmbar",
                longDescription: "Uma fragrância aconchegante que lembra doces caseiros. O Vanilla Dream combina notas cremosas de baunilha com um toque sensual de âmbar, criando uma experiência olfativa única.",
                price: 52.90,
                oldPrice: 59.90,
                category: "body-splash",
                image: "https://via.placeholder.com/500x500/FFF8DC/333333?text=Vanilla+Dream",
                images: [
                    "https://via.placeholder.com/500x500/FFF8DC/333333?text=Vanilla+Dream+1",
                    "https://via.placeholder.com/500x500/FFF8DC/333333?text=Vanilla+Dream+2"
                ],
                features: [
                    "Aroma doce e aconchegante",
                    "Hidratação 24h",
                    "Notas de baunilha natural",
                    "Perfeito para noites"
                ],
                volume: "200ml"
            },
            {
                id: 4,
                name: "Lavanda Serena",
                description: "Acalmante e relaxante, com essência pura de lavanda francesa",
                longDescription: "Relaxe e renove suas energias com o Body Splash Lavanda Serena. Formulado com essência pura de lavanda francesa, promove relaxamento e bem-estar enquanto hidrata sua pele.",
                price: 47.90,
                category: "body-splash",
                image: "https://via.placeholder.com/500x500/E6E6FA/333333?text=Lavanda+Serena",
                images: [
                    "https://via.placeholder.com/500x500/E6E6FA/333333?text=Lavanda+Serena+1",
                    "https://via.placeholder.com/500x500/E6E6FA/333333?text=Lavanda+Serena+2"
                ],
                features: [
                    "Propriedades relaxantes",
                    "Auxilia no sono tranquilo",
                    "Hidratação profunda",
                    "Aroma terapêutico"
                ],
                volume: "200ml"
            }
        ];
    }

    init() {
        this.setupEventListeners();
        this.loadProducts();
        this.updateCartDisplay();
        this.updateUserInterface();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.checkProductPage();
    }

    checkProductPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('product');
        
        if (productId) {
            this.showProductPage(parseInt(productId));
        }
    }

    setupEventListeners() {
        // Navegação
        document.getElementById('explorarBtn')?.addEventListener('click', () => {
            this.scrollToSection('produtos');
        });

        document.getElementById('ofertaBtn')?.addEventListener('click', () => {
            this.handleSpecialOffer();
        });

        // Modal handlers
        this.setupModalHandlers();
        
        // Forms
        this.setupFormHandlers();
        
        // Carrinho
        this.setupCartHandlers();
        
        // Categorias
        this.setupCategoryHandlers();

        // Busca
        this.setupSearchHandler();
    }

    setupModalHandlers() {
        // Login Modal
        document.getElementById('login-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showModal('loginModal');
        });

        // Cadastro Modal
        document.getElementById('cadastro-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showModal('registerModal');
        });

        // Minhas Compras
        document.getElementById('minhas-compras-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentUser) {
                this.showUserOrders();
            } else {
                this.showModal('loginModal');
                this.showNotification('Faça login para ver suas compras', 'warning');
            }
        });

        document.getElementById('footerPedidos')?.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.currentUser) {
                this.showUserOrders();
            } else {
                this.showModal('loginModal');
                this.showNotification('Faça login para ver suas compras', 'warning');
            }
        });

        // Switch between modals
        document.getElementById('showRegister')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('loginModal');
            this.showModal('registerModal');
        });

        document.getElementById('showLogin')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal('registerModal');
            this.showModal('loginModal');
        });

        // Close modals
        document.querySelectorAll('.close-modal').forEach(close => {
            close.addEventListener('click', () => {
                this.hideAllModals();
            });
        });

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.hideAllModals();
            }
        });
    }

    setupFormHandlers() {
        // Login form
        document.getElementById('loginForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Register form
        document.getElementById('registerForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister();
        });

        // Newsletter
        document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewsletter();
        });

        // Social login
        document.getElementById('googleLogin')?.addEventListener('click', () => {
            this.handleSocialLogin('google');
        });

        document.getElementById('facebookLogin')?.addEventListener('click', () => {
            this.handleSocialLogin('facebook');
        });
    }

    setupCartHandlers() {
        // Finalizar compra
        document.getElementById('finalizarCompraBtn')?.addEventListener('click', () => {
            this.handleCheckout();
        });

        document.getElementById('checkoutBtn')?.addEventListener('click', () => {
            this.showPaymentOptions();
        });

        // Payment handlers
        document.getElementById('confirmPayment')?.addEventListener('click', () => {
            this.processPayment();
        });
    }

    setupCategoryHandlers() {
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.filterProductsByCategory(category);
            });
        });
    }

    setupSearchHandler() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                if (searchTerm.length > 2) {
                    this.handleSearch(searchTerm);
                } else if (searchTerm.length === 0) {
                    this.loadProducts();
                }
            });
        }
    }

    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Product Management
    loadProducts() {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        productsGrid.innerHTML = this.products.map(product => `
            <div class="product-card" data-id="${product.id}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <div class="product-image" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300/B695c0/FFFFFF?text=Produto'">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <span class="current-price">R$ ${product.price.toFixed(2)}</span>
                        ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
                        <span class="installment">ou 3x de R$ ${(product.price / 3).toFixed(2)}</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn-comprar" data-id="${product.id}">Comprar Agora</button>
                        <button class="btn-add-cart" data-id="${product.id}">Adicionar à Sacola</button>
                        <button class="btn-details" data-id="${product.id}">Ver Detalhes</button>
                    </div>
                </div>
            </div>
        `).join('');

        this.reattachProductEventListeners();
    }

    reattachProductEventListeners() {
        // Botões de compra
        document.querySelectorAll('.btn-comprar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.handleBuyNow(productId);
            });
        });

        // Botões de adicionar ao carrinho
        document.querySelectorAll('.btn-add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.addToCart(productId);
            });
        });

        // Botões de ver detalhes
        document.querySelectorAll('.btn-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                this.showProductDetails(productId);
            });
        });

        // Clicar na imagem do produto
        document.querySelectorAll('.product-image').forEach(image => {
            image.addEventListener('click', (e) => {
                const productId = parseInt(e.currentTarget.dataset.id);
                this.showProductDetails(productId);
            });
        });
    }

    showProductDetails(productId) {
        // Redireciona para a página do produto
        window.location.href = `?product=${productId}`;
    }

    showProductPage(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) {
            window.location.href = '/';
            return;
        }

        this.currentProduct = product;
        
        // Esconde o conteúdo principal e mostra a página do produto
        document.querySelector('main').style.display = 'none';
        document.querySelector('.offers-section').style.display = 'none';
        document.querySelector('.newsletter-section').style.display = 'none';
        
        this.createProductPage(product);
    }

    createProductPage(product) {
        const productPageHTML = `
            <section class="product-detail-section">
                <div class="container">
                    <nav class="breadcrumb">
                        <a href="/">Home</a> > 
                        <a href="#produtos">Body Splash</a> > 
                        <span>${product.name}</span>
                    </nav>
                    
                    <div class="product-detail">
                        <div class="product-gallery">
                            <div class="main-image">
                                <img src="${product.image}" alt="${product.name}" id="mainProductImage">
                            </div>
                            <div class="image-thumbnails">
                                ${product.images.map((img, index) => `
                                    <img src="${img}" alt="${product.name} ${index + 1}" 
                                         class="thumbnail ${index === 0 ? 'active' : ''}"
                                         data-image="${img}">
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="product-info-detail">
                            <h1>${product.name}</h1>
                            <div class="product-rating">
                                ⭐⭐⭐⭐⭐ (4.8)
                            </div>
                            <p class="product-description">${product.longDescription}</p>
                            
                            <div class="product-features">
                                <h3>Características:</h3>
                                <ul>
                                    ${product.features.map(feature => `<li>✓ ${feature}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <div class="product-volume">
                                <strong>Volume:</strong> ${product.volume}
                            </div>
                            
                            <div class="product-price-detail">
                                <span class="current-price">R$ ${product.price.toFixed(2)}</span>
                                ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
                                <div class="installment">ou 3x de R$ ${(product.price / 3).toFixed(2)} sem juros</div>
                                <div class="pix-discount">5% de desconto no PIX: R$ ${(product.price * 0.95).toFixed(2)}</div>
                            </div>
                            
                            <div class="product-actions-detail">
                                <div class="quantity-selector">
                                    <label>Quantidade:</label>
                                    <div class="quantity-controls">
                                        <button class="quantity-btn" data-action="decrease">-</button>
                                        <input type="number" value="1" min="1" max="10" id="productQuantity">
                                        <button class="quantity-btn" data-action="increase">+</button>
                                    </div>
                                </div>
                                
                                <button class="btn-comprar-detail" id="buyNowDetail">Comprar Agora</button>
                                <button class="btn-add-cart-detail" id="addToCartDetail">Adicionar ao Carrinho</button>
                            </div>
                            
                            <div class="product-shipping">
                                <p>🚚 Frete grátis para compras acima de R$ 99</p>
                                <p>📦 Entrega em até 5 dias úteis</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="back-to-products">
                        <button class="btn-back" id="backToProducts">← Voltar para Produtos</button>
                    </div>
                </div>
            </section>
        `;

        // Insere a página do produto antes do footer
        const footer = document.querySelector('footer');
        footer.insertAdjacentHTML('beforebegin', productPageHTML);

        // Adiciona event listeners para a página do produto
        this.setupProductPageEvents(product);
    }

    setupProductPageEvents(product) {
        // Thumbnails
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', () => {
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                document.getElementById('mainProductImage').src = thumb.dataset.image;
            });
        });

        // Controles de quantidade
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = document.getElementById('productQuantity');
                let value = parseInt(input.value);
                
                if (btn.dataset.action === 'increase' && value < 10) {
                    input.value = value + 1;
                } else if (btn.dataset.action === 'decrease' && value > 1) {
                    input.value = value - 1;
                }
            });
        });

        // Botão comprar agora
        document.getElementById('buyNowDetail').addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('productQuantity').value);
            this.handleBuyNow(product.id, quantity);
        });

        // Botão adicionar ao carrinho
        document.getElementById('addToCartDetail').addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('productQuantity').value);
            this.addToCart(product.id, quantity);
        });

        // Botão voltar
        document.getElementById('backToProducts').addEventListener('click', () => {
            window.location.href = '/';
        });
    }

    filterProductsByCategory(category) {
        const filteredProducts = category === 'all' 
            ? this.products 
            : this.products.filter(product => product.category === category);
        
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-id="${product.id}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <div class="product-image" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300/B695c0/FFFFFF?text=Produto'">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <span class="current-price">R$ ${product.price.toFixed(2)}</span>
                        ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
                        <span class="installment">ou 3x de R$ ${(product.price / 3).toFixed(2)}</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn-comprar" data-id="${product.id}">Comprar Agora</button>
                        <button class="btn-add-cart" data-id="${product.id}">Adicionar à Sacola</button>
                        <button class="btn-details" data-id="${product.id}">Ver Detalhes</button>
                    </div>
                </div>
            </div>
        `).join('');

        this.reattachProductEventListeners();
        this.scrollToSection('produtos');
        this.showNotification(`Mostrando produtos da categoria: ${this.getCategoryName(category)}`, 'success');
    }

    handleSearch(searchTerm) {
        const filteredProducts = this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );

        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        if (filteredProducts.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-results">
                    <h3>Nenhum produto encontrado</h3>
                    <p>Tente buscar com outros termos</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = filteredProducts.map(product => `
            <div class="product-card" data-id="${product.id}">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <div class="product-image" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300/B695c0/FFFFFF?text=Produto'">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <span class="current-price">R$ ${product.price.toFixed(2)}</span>
                        ${product.oldPrice ? `<span class="old-price">R$ ${product.oldPrice.toFixed(2)}</span>` : ''}
                        <span class="installment">ou 3x de R$ ${(product.price / 3).toFixed(2)}</span>
                    </div>
                    <div class="product-actions">
                        <button class="btn-comprar" data-id="${product.id}">Comprar Agora</button>
                        <button class="btn-add-cart" data-id="${product.id}">Adicionar à Sacola</button>
                        <button class="btn-details" data-id="${product.id}">Ver Detalhes</button>
                    </div>
                </div>
            </div>
        `).join('');

        this.reattachProductEventListeners();
    }

    getCategoryName(category) {
        const categories = {
            'body-splash': 'Body Splash',
            'perfumes': 'Perfumes',
            'kits': 'Kits Presente',
            'lancamentos': 'Lançamentos'
        };
        return categories[category] || category;
    }

    // Cart Management
    addToCart(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showNotification(`${product.name} adicionado ao carrinho!`, 'success');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Produto removido do carrinho', 'success');
    }

    updateQuantity(productId, action) {
        const item = this.cart.find(item => item.id === productId);
        if (!item) return;

        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease') {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
                return;
            }
        }

        this.saveCart();
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        const cartItemsModal = document.getElementById('cartItemsModal');
        const cartTotalModal = document.getElementById('cartTotalModal');

        // Update cart count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCount) cartCount.textContent = totalItems;

        // Update cart total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        if (cartTotal) cartTotal.textContent = total.toFixed(2);
        if (cartTotalModal) cartTotalModal.textContent = total.toFixed(2);

        // Update cart items preview
        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Carrinho vazio</p>';
            } else {
                cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-info">
                            <h5>${item.name}</h5>
                            <div class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</div>
                        </div>
                        <button class="remove-item" data-id="${item.id}">×</button>
                    </div>
                `).join('');

                // Add event listeners to remove buttons
                cartItems.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const productId = parseInt(e.target.dataset.id);
                        this.removeFromCart(productId);
                    });
                });
            }
        }

        // Update cart modal
        if (cartItemsModal) {
            if (this.cart.length === 0) {
                cartItemsModal.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
            } else {
                cartItemsModal.innerHTML = this.cart.map(item => `
                    <div class="cart-item-modal">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}">🗑️</button>
                    </div>
                `).join('');

                // Add event listeners
                cartItemsModal.querySelectorAll('.quantity-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const productId = parseInt(e.target.dataset.id);
                        const action = e.target.dataset.action;
                        this.updateQuantity(productId, action);
                    });
                });

                cartItemsModal.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const productId = parseInt(e.target.dataset.id);
                        this.removeFromCart(productId);
                    });
                });
            }
        }
    }

    saveCart() {
        localStorage.setItem('brinahllyCart', JSON.stringify(this.cart));
    }

    // User Management
    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (!email || !password) {
            this.showNotification('Preencha todos os campos', 'error');
            return;
        }

        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('brinahllyCurrentUser', JSON.stringify(user));
            this.hideModal('loginModal');
            this.updateUserInterface();
            this.showNotification(`Bem-vinda de volta, ${user.name}!`, 'success');
        } else {
            this.showNotification('E-mail ou senha incorretos', 'error');
        }
    }

    handleRegister() {
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        const phone = document.getElementById('registerPhone').value;

        if (!name || !email || !password || !confirmPassword || !phone) {
            this.showNotification('Preencha todos os campos', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showNotification('As senhas não coincidem', 'error');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            this.showNotification('Este e-mail já está cadastrado', 'error');
            return;
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            phone,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        localStorage.setItem('brinahllyUsers', JSON.stringify(this.users));

        this.currentUser = newUser;
        localStorage.setItem('brinahllyCurrentUser', JSON.stringify(newUser));

        this.hideModal('registerModal');
        this.updateUserInterface();
        this.showNotification(`Conta criada com sucesso, ${name}!`, 'success');
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('brinahllyCurrentUser');
        this.updateUserInterface();
        this.showNotification('Logout realizado com sucesso', 'success');
    }

    handleSocialLogin(platform) {
        this.showNotification(`Login com ${platform} - Em desenvolvimento`, 'warning');
    }

    updateUserInterface() {
        const userName = document.getElementById('userName');
        const logoutLink = document.getElementById('logout-link');
        const accountDropdown = document.querySelector('.account-dropdown .dropdown-menu');

        if (this.currentUser) {
            if (userName) userName.textContent = this.currentUser.name.split(' ')[0];
            if (logoutLink) logoutLink.style.display = 'block';
            
            if (accountDropdown) {
                accountDropdown.innerHTML = `
                    <a href="#">Olá, ${this.currentUser.name.split(' ')[0]}</a>
                    <a href="#" id="minhas-compras-link">Minhas Compras</a>
                    <a href="#" id="favoritos-link">Meus Favoritos</a>
                    <a href="#" id="logout-link">Sair</a>
                `;

                // Re-add event listeners
                document.getElementById('logout-link')?.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleLogout();
                });
            }
        } else {
            if (userName) userName.textContent = '';
            if (logoutLink) logoutLink.style.display = 'none';
            
            if (accountDropdown) {
                accountDropdown.innerHTML = `
                    <a href="#" id="login-link">Login</a>
                    <a href="#" id="cadastro-link">Cadastrar</a>
                    <a href="#" id="minhas-compras-link">Minhas Compras</a>
                    <a href="#" id="favoritos-link">Meus Favoritos</a>
                `;

                // Re-add event listeners
                document.getElementById('login-link')?.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showModal('loginModal');
                });

                document.getElementById('cadastro-link')?.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showModal('registerModal');
                });
            }
        }
    }

    // Order Management
    handleBuyNow(productId, quantity = 1) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        if (!this.currentUser) {
            this.showModal('loginModal');
            this.showNotification('Faça login para finalizar a compra', 'warning');
            return;
        }

        // Add to cart and checkout immediately
        this.addToCart(productId, quantity);
        this.showPaymentOptions();
    }

    showPaymentOptions() {
        if (this.cart.length === 0) {
            this.showNotification('Seu carrinho está vazio', 'warning');
            return;
        }

        if (!this.currentUser) {
            this.showModal('loginModal');
            this.showNotification('Faça login para finalizar a compra', 'warning');
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const pixDiscount = total * 0.95;

        const paymentModal = document.getElementById('paymentModal') || this.createPaymentModal();
        
        document.getElementById('paymentTotal').textContent = total.toFixed(2);
        document.getElementById('pixTotal').textContent = pixDiscount.toFixed(2);
        document.getElementById('creditTotal').textContent = total.toFixed(2);
        
        this.showModal('paymentModal');
    }

    createPaymentModal() {
        const paymentHTML = `
            <div id="paymentModal" class="modal">
                <div class="modal-content large">
                    <span class="close-modal">&times;</span>
                    <h2>Finalizar Compra</h2>
                    
                    <div class="payment-container">
                        <div class="order-summary">
                            <h3>Resumo do Pedido</h3>
                            <div class="order-items">
                                ${this.cart.map(item => `
                                    <div class="order-item">
                                        <img src="${item.image}" alt="${item.name}">
                                        <div class="item-details">
                                            <h4>${item.name}</h4>
                                            <p>Quantidade: ${item.quantity}</p>
                                            <p>R$ ${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="order-total-payment">
                                <strong>Total: R$ <span id="paymentTotal">0,00</span></strong>
                            </div>
                        </div>
                        
                        <div class="payment-methods">
                            <h3>Método de Pagamento</h3>
                            
                            <div class="payment-option">
                                <input type="radio" id="pix" name="payment" value="pix" checked>
                                <label for="pix">
                                    <div class="payment-icon">📱</div>
                                    <div class="payment-info">
                                        <strong>PIX</strong>
                                        <span>5% de desconto</span>
                                        <small>Total: R$ <span id="pixTotal">0,00</span></small>
                                    </div>
                                </label>
                            </div>
                            
                            <div class="payment-option">
                                <input type="radio" id="credit" name="payment" value="credit">
                                <label for="credit">
                                    <div class="payment-icon">💳</div>
                                    <div class="payment-info">
                                        <strong>Cartão de Crédito</strong>
                                        <span>Até 3x sem juros</span>
                                        <small>Total: R$ <span id="creditTotal">0,00</span></small>
                                    </div>
                                </label>
                            </div>
                            
                            <div class="payment-option">
                                <input type="radio" id="debit" name="payment" value="debit">
                                <label for="debit">
                                    <div class="payment-icon">💳</div>
                                    <div class="payment-info">
                                        <strong>Cartão de Débito</strong>
                                        <span>1x no débito</span>
                                        <small>Total: R$ <span id="debitTotal">0,00</span></small>
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        <div class="payment-actions">
                            <button class="btn-primary" id="confirmPayment">Confirmar Pagamento</button>
                            <button class="btn-secondary" id="continueShopping">Continuar Comprando</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', paymentHTML);

        // Add event listeners
        document.getElementById('confirmPayment').addEventListener('click', () => {
            this.processPayment();
        });

        document.getElementById('continueShopping').addEventListener('click', () => {
            this.hideModal('paymentModal');
        });

        return document.getElementById('paymentModal');
    }

    processPayment() {
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        let finalTotal = total;

        if (selectedPayment === 'pix') {
            finalTotal = total * 0.95;
        }

        const order = {
            id: Date.now(),
            userId: this.currentUser.id,
            products: [...this.cart],
            total: finalTotal,
            paymentMethod: selectedPayment,
            date: new Date().toISOString(),
            status: 'processing'
        };

        this.orders.push(order);
        localStorage.setItem('brinahllyOrders', JSON.stringify(this.orders));

        // Clear cart
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();

        this.hideModal('paymentModal');
        this.showNotification(`Compra realizada com sucesso! Método: ${this.getPaymentMethodName(selectedPayment)}`, 'success');
        
        // Mostra confirmação
        setTimeout(() => {
            this.showOrderConfirmation(order);
        }, 1000);
    }

    getPaymentMethodName(method) {
        const methods = {
            'pix': 'PIX',
            'credit': 'Cartão de Crédito',
            'debit': 'Cartão de Débito'
        };
        return methods[method] || method;
    }

    showOrderConfirmation(order) {
        const confirmationHTML = `
            <div id="confirmationModal" class="modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <div class="confirmation-content">
                        <div class="confirmation-icon">🎉</div>
                        <h2>Compra Realizada com Sucesso!</h2>
                        <p>Seu pedido #${order.id} foi confirmado.</p>
                        <div class="order-details">
                            <p><strong>Total:</strong> R$ ${order.total.toFixed(2)}</p>
                            <p><strong>Método:</strong> ${this.getPaymentMethodName(order.paymentMethod)}</p>
                            <p><strong>Status:</strong> Em processamento</p>
                        </div>
                        <button class="btn-primary" id="backToHome">Voltar à Loja</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', confirmationHTML);
        this.showModal('confirmationModal');

        document.getElementById('backToHome').addEventListener('click', () => {
            this.hideModal('confirmationModal');
            window.location.href = '/';
        });
    }

    handleCheckout() {
        this.showPaymentOptions();
    }

    showUserOrders() {
        const userOrders = this.orders.filter(order => order.userId === this.currentUser.id);
        
        if (userOrders.length === 0) {
            this.showNotification('Você ainda não realizou nenhuma compra', 'warning');
        } else {
            this.showNotification(`Você tem ${userOrders.length} pedido(s) realizados!`, 'success');
        }
    }

    // Special Offers
    handleSpecialOffer() {
        if (!this.currentUser) {
            this.showModal('loginModal');
            this.showNotification('Faça login para aproveitar a oferta', 'warning');
            return;
        }

        // Adiciona o kit especial ao carrinho
        const specialProduct = {
            id: 999,
            name: "Kit Leve 3 Pague 2",
            description: "Kit especial com 3 fragrâncias mais amadas",
            price: 119.90,
            image: "https://via.placeholder.com/300x300/B695c0/FFFFFF?text=Kit+Especial"
        };

        this.cart.push({
            ...specialProduct,
            quantity: 1
        });

        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Kit especial adicionado ao carrinho! 🎉', 'success');
    }

    // Newsletter
    handleNewsletter() {
        const email = document.getElementById('newsletterEmail').value;
        if (!email) {
            this.showNotification('Digite seu e-mail', 'warning');
            return;
        }

        this.showNotification(`Obrigada por se cadastrar! Enviaremos novidades para: ${email}`, 'success');
        document.getElementById('newsletterForm').reset();
    }

    // Utility Methods
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }

    hideAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }

    showNotification(message, type = 'success') {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'flex';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for notifications and images if not present
    if (!document.querySelector('#dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 5px;
                z-index: 3000;
                animation: slideIn 0.3s ease;
                display: none;
                align-items: center;
                gap: 10px;
                max-width: 300px;
                font-weight: 500;
            }
            .notification.success {
                background: #28a745;
                color: white;
            }
            .notification.error {
                background: #dc3545;
                color: white;
            }
            .notification.warning {
                background: #ffc107;
                color: #333;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .no-results {
                grid-column: 1 / -1;
                text-align: center;
                padding: 40px;
                color: #666;
            }
            .product-image img {
                width: 100%;
                height: 250px;
                object-fit: cover;
                border-radius: 8px 8px 0 0;
                cursor: pointer;
                transition: transform 0.3s;
            }
            .product-image img:hover {
                transform: scale(1.05);
            }
            .cart-item-img {
                width: 40px;
                height: 40px;
                object-fit: cover;
                border-radius: 5px;
            }
            .cart-item-image {
                width: 60px;
                height: 60px;
                object-fit: cover;
                border-radius: 8px;
            }
            .category-card img {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-radius: 10px;
                margin-bottom: 15px;
            }
            .btn-details {
                background: transparent;
                color: #666;
                border: 1px solid #ddd;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 12px;
                margin-top: 5px;
            }
            .btn-details:hover {
                background: #f5f5f5;
                border-color: #999;
            }
            /* Product Detail Page Styles */
            .product-detail-section {
                padding: 40px 0;
                background: #f8f8f8;
                min-height: 100vh;
            }
            .breadcrumb {
                margin-bottom: 20px;
                font-size: 14px;
                color: #666;
            }
            .breadcrumb a {
                color: #B695c0;
                text-decoration: none;
            }
            .product-detail {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 40px;
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            .product-gallery .main-image img {
                width: 100%;
                border-radius: 10px;
            }
            .image-thumbnails {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
            .thumbnail {
                width: 60px;
                height: 60px;
                object-fit: cover;
                border-radius: 5px;
                cursor: pointer;
                border: 2px solid transparent;
            }
            .thumbnail.active {
                border-color: #B695c0;
            }
            .product-info-detail h1 {
                color: #333;
                margin-bottom: 10px;
            }
            .product-rating {
                color: #ffc107;
                margin-bottom: 15px;
            }
            .product-features {
                margin: 20px 0;
            }
            .product-features ul {
                list-style: none;
                padding: 0;
            }
            .product-features li {
                padding: 5px 0;
                color: #666;
            }
            .product-price-detail {
                background: #f8f8f8;
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
            }
            .product-price-detail .current-price {
                font-size: 2rem;
                font-weight: bold;
                color: #B695c0;
            }
            .pix-discount {
                color: #28a745;
                font-weight: bold;
                margin-top: 10px;
            }
            .product-actions-detail {
                margin: 25px 0;
            }
            .quantity-selector {
                margin-bottom: 15px;
            }
            .quantity-controls {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 5px;
            }
            .quantity-controls input {
                width: 60px;
                text-align: center;
                padding: 5px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
            .quantity-btn {
                width: 30px;
                height: 30px;
                border: 1px solid #ddd;
                background: white;
                border-radius: 5px;
                cursor: pointer;
            }
            .btn-comprar-detail {
                background: #B695c0;
                color: white;
                border: none;
                padding: 15px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: bold;
                width: 100%;
                margin-bottom: 10px;
                transition: background 0.3s;
            }
            .btn-comprar-detail:hover {
                background: #9e7ca9;
            }
            .btn-add-cart-detail {
                background: transparent;
                color: #B695c0;
                border: 2px solid #B695c0;
                padding: 13px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                width: 100%;
                transition: all 0.3s;
            }
            .btn-add-cart-detail:hover {
                background: #B695c0;
                color: white;
            }
            .back-to-products {
                text-align: center;
                margin-top: 30px;
            }
            .btn-back {
                background: #666;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
            }
            /* Payment Styles */
            .payment-container {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
            }
            .order-summary {
                background: #f8f8f8;
                padding: 20px;
                border-radius: 10px;
            }
            .order-item {
                display: flex;
                gap: 15px;
                padding: 10px 0;
                border-bottom: 1px solid #ddd;
            }
            .order-item img {
                width: 50px;
                height: 50px;
                object-fit: cover;
                border-radius: 5px;
            }
            .payment-option {
                margin-bottom: 15px;
            }
            .payment-option input[type="radio"] {
                display: none;
            }
            .payment-option label {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 15px;
                border: 2px solid #ddd;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s;
            }
            .payment-option input[type="radio"]:checked + label {
                border-color: #B695c0;
                background: #f8f8f8;
            }
            .payment-icon {
                font-size: 24px;
            }
            .payment-actions {
                grid-column: 1 / -1;
                display: flex;
                gap: 15px;
                margin-top: 20px;
            }
            .btn-secondary {
                background: #666;
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 5px;
                cursor: pointer;
            }
            .confirmation-content {
                text-align: center;
            }
            .confirmation-icon {
                font-size: 64px;
                margin-bottom: 20px;
            }
            @media (max-width: 768px) {
                .product-detail {
                    grid-template-columns: 1fr;
                }
                .payment-container {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }

    window.brinahllyApp = new BrinahllyBeauty();
    console.log('Brinahlly Beauty - Sistema completo com páginas de produto! 🚀');
});