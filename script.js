/**
 * Boceto Juan Giraldo - Página Web
 * Script principal con mejores prácticas de programación y seguridad
 * @author Juan Giraldo
 * @version 2.0
 */

'use strict';

// Configuración global
const CONFIG = {
    instagram: {
        username: 'boceto.juangiraldo',
        url: 'https://www.instagram.com/boceto.juangiraldo'
    },
    carrito: {
        storageKey: 'bj_carrito',
        maxItems: 20
    },
    animation: {
        scrollOffset: 50,
        duration: 800
    }
};

// Utilidades de seguridad
const SecurityUtils = {
    /**
     * Sanitiza strings para prevenir XSS
     * @param {string} str - String a sanitizar
     * @returns {string} String sanitizado
     */
    sanitizeHTML: (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    /**
     * Valida email
     * @param {string} email - Email a validar
     * @returns {boolean} True si es válido
     */
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Valida teléfono
     * @param {string} phone - Teléfono a validar
     * @returns {boolean} True si es válido
     */
    validatePhone: (phone) => {
        const re = /^[0-9+\s\-()]{9,20}$/;
        return re.test(phone);
    },

    /**
     * Valida nombre
     * @param {string} name - Nombre a validar
     * @returns {boolean} True si es válido
     */
    validateName: (name) => {
        return name && name.length >= 3 && name.length <= 100;
    }
};

// Gestión del almacenamiento local seguro
const StorageManager = {
    /**
     * Guarda datos en localStorage de forma segura
     * @param {string} key - Clave
     * @param {*} data - Datos a guardar
     */
    save: (key, data) => {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('Error guardando en localStorage:', error);
            return false;
        }
    },

    /**
     * Obtiene datos del localStorage
     * @param {string} key - Clave
     * @returns {*} Datos guardados o null
     */
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error leyendo de localStorage:', error);
            return null;
        }
    },

    /**
     * Elimina datos del localStorage
     * @param {string} key - Clave
     */
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error eliminando de localStorage:', error);
            return false;
        }
    }
};

// Sistema de notificaciones
class NotificationSystem {
    constructor() {
        this.queue = [];
        this.isShowing = false;
    }

    /**
     * Muestra una notificación
     * @param {string} message - Mensaje a mostrar
     * @param {string} type - Tipo: success, error, info
     */
    show(message, type = 'success') {
        const notification = this.create(message, type);
        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        setTimeout(() => {
            this.hide(notification);
        }, 3000);
    }

    /**
     * Crea elemento de notificación
     * @param {string} message - Mensaje
     * @param {string} type - Tipo
     * @returns {HTMLElement} Elemento de notificación
     */
    create(message, type) {
        const notif = document.createElement('div');
        notif.className = `notification notification-${type}`;
        notif.setAttribute('role', 'alert');
        notif.setAttribute('aria-live', 'polite');
        
        const icon = this.getIcon(type);
        notif.innerHTML = `
            <i class="fas fa-${icon}" aria-hidden="true"></i>
            <span>${SecurityUtils.sanitizeHTML(message)}</span>
        `;
        
        return notif;
    }

    /**
     * Obtiene icono según tipo
     * @param {string} type - Tipo de notificación
     * @returns {string} Nombre del icono
     */
    getIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'bell';
    }

    /**
     * Oculta notificación
     * @param {HTMLElement} notification - Elemento a ocultar
     */
    hide(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
}

const notificationSystem = new NotificationSystem();

// Sistema de carrito de compras
class ShoppingCart {
    constructor() {
        this.items = this.load();
        this.updateUI();
    }

    /**
     * Carga carrito desde localStorage
     * @returns {Array} Items del carrito
     */
    load() {
        const saved = StorageManager.get(CONFIG.carrito.storageKey);
        return Array.isArray(saved) ? saved : [];
    }

    /**
     * Guarda carrito en localStorage
     */
    save() {
        StorageManager.save(CONFIG.carrito.storageKey, this.items);
    }

    /**
     * Añade producto al carrito
     * @param {Object} producto - Producto a añadir
     */
    add(producto) {
        if (this.items.length >= CONFIG.carrito.maxItems) {
            notificationSystem.show('Carrito lleno. Máximo 20 productos.', 'error');
            return false;
        }

        const item = {
            id: Date.now() + Math.random(),
            nombre: SecurityUtils.sanitizeHTML(producto.nombre),
            precio: SecurityUtils.sanitizeHTML(producto.precio),
            timestamp: new Date().toISOString()
        };

        this.items.push(item);
        this.save();
        this.updateUI();
        notificationSystem.show('Producto añadido al carrito', 'success');
        return true;
    }

    /**
     * Elimina producto del carrito
     * @param {number} id - ID del producto
     */
    remove(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.save();
        this.updateUI();
        notificationSystem.show('Producto eliminado', 'info');
    }

    /**
     * Vacía el carrito
     */
    clear() {
        this.items = [];
        this.save();
        this.updateUI();
    }

    /**
     * Calcula total del carrito
     * @returns {number} Total en euros
     */
    getTotal() {
        return this.items.reduce((sum, item) => {
            const precio = parseFloat(item.precio.replace('€', '')) || 0;
            return sum + precio;
        }, 0);
    }

    /**
     * Actualiza UI del carrito
     */
    updateUI() {
        const countElement = document.getElementById('carritoCount');
        if (countElement) {
            countElement.textContent = this.items.length;
            countElement.setAttribute('aria-label', `${this.items.length} productos en el carrito`);
        }
    }

    /**
     * Renderiza contenido del carrito
     */
    render() {
        const container = document.getElementById('carritoItems');
        const totalElement = document.getElementById('totalCarrito');

        if (!container || !totalElement) return;

        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="carrito-vacio">
                    <i class="fas fa-shopping-cart" aria-hidden="true"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            totalElement.textContent = '€0.00';
            return;
        }

        container.innerHTML = this.items.map(item => `
            <div class="carrito-item">
                <div class="carrito-item-info">
                    <h4>${item.nombre}</h4>
                    <p>${item.precio}</p>
                </div>
                <button 
                    onclick="cart.remove(${item.id})" 
                    aria-label="Eliminar ${item.nombre}"
                    class="btn-remove">
                    <i class="fas fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        `).join('');

        totalElement.textContent = `€${this.getTotal().toFixed(2)}`;
    }
}

const cart = new ShoppingCart();

// Sistema de validación de formularios
class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.errors = {};
    }

    /**
     * Valida el formulario completo
     * @returns {boolean} True si es válido
     */
    validate() {
        this.errors = {};
        let isValid = true;

        // Validar nombre
        const nombre = this.form.querySelector('#nombre');
        if (!SecurityUtils.validateName(nombre.value.trim())) {
            this.setError(nombre, 'El nombre debe tener entre 3 y 100 caracteres');
            isValid = false;
        }

        // Validar email
        const email = this.form.querySelector('#email');
        if (!SecurityUtils.validateEmail(email.value.trim())) {
            this.setError(email, 'Introduce un email válido');
            isValid = false;
        }

        // Validar teléfono
        const telefono = this.form.querySelector('#telefono');
        if (!SecurityUtils.validatePhone(telefono.value.trim())) {
            this.setError(telefono, 'Introduce un teléfono válido');
            isValid = false;
        }

        // Validar mensaje
        const mensaje = this.form.querySelector('#mensaje');
        if (mensaje.value.trim().length < 10) {
            this.setError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
            isValid = false;
        }

        return isValid;
    }

    /**
     * Establece error en un campo
     * @param {HTMLElement} field - Campo del formulario
     * @param {string} message - Mensaje de error
     */
    setError(field, message) {
        field.classList.add('error');
        const errorElement = field.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        this.errors[field.name] = message;
    }

    /**
     * Limpia errores del formulario
     */
    clearErrors() {
        this.form.querySelectorAll('.error').forEach(field => {
            field.classList.remove('error');
        });
        this.form.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }

    /**
     * Obtiene datos del formulario de forma segura
     * @returns {Object} Datos sanitizados
     */
    getData() {
        return {
            nombre: SecurityUtils.sanitizeHTML(this.form.querySelector('#nombre').value.trim()),
            email: SecurityUtils.sanitizeHTML(this.form.querySelector('#email').value.trim()),
            telefono: SecurityUtils.sanitizeHTML(this.form.querySelector('#telefono').value.trim()),
            mensaje: SecurityUtils.sanitizeHTML(this.form.querySelector('#mensaje').value.trim())
        };
    }
}

// Navegación móvil
class MobileNavigation {
    constructor() {
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.init();
    }

    init() {
        if (!this.navToggle || !this.navMenu) return;

        this.navToggle.addEventListener('click', () => this.toggle());
        
        // Cerrar al hacer clic en enlaces
        this.navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }

    toggle() {
        const isOpen = this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        this.navToggle.setAttribute('aria-expanded', isOpen);
    }

    close() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
    }

    isOpen() {
        return this.navMenu.classList.contains('active');
    }
}

// Navbar con scroll
class ScrollNavbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        if (!this.navbar) return;

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            this.navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            return;
        }

        if (currentScroll > this.lastScroll && currentScroll > 100) {
            // Scroll down
            this.navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up
            this.navbar.style.transform = 'translateY(0)';
            this.navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        }

        this.lastScroll = currentScroll;
    }
}

// Sistema de galería con filtros
class GalleryFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.filter(e.target));
        });
    }

    filter(button) {
        // Actualizar botones activos
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');

        const filter = button.getAttribute('data-filter');

        this.galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                item.style.display = 'none';
            }
        });
    }
}

// Sistema de modal
class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        if (!this.modal) return;

        this.closeBtn = this.modal.querySelector('.modal-close');
        this.init();
    }

    init() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    isOpen() {
        return this.modal.classList.contains('active');
    }
}

// Smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#carrito') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animaciones al scroll con Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar secciones
    document.querySelectorAll('.about-section, .gallery-section, .tienda-section, .services-section, .contact-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Boceto Juan Giraldo - Sitio web cargado');

    // Inicializar sistemas
    new MobileNavigation();
    new ScrollNavbar();
    new GalleryFilter();

    // Modales
    const carritoModal = new Modal('carritoModal');
    const galleryModal = new Modal('galleryModal');

    // Smooth scroll
    initSmoothScroll();
    
    // Animaciones
    initScrollAnimations();

    // Botón carrito
    const carritoIcon = document.querySelector('.carrito-icon');
    if (carritoIcon) {
        carritoIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cart.render();
            carritoModal.open();
        });
    }

    // Botones de compra
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.producto-card');
            if (!card) return;

            const producto = {
                nombre: card.querySelector('h3').textContent,
                precio: card.querySelector('.precio').textContent
            };
            cart.add(producto);
        });
    });

    // Finalizar compra
    const finalizarCompra = document.getElementById('finalizarCompra');
    if (finalizarCompra) {
        finalizarCompra.addEventListener('click', () => {
            if (cart.items.length === 0) {
                notificationSystem.show('El carrito está vacío', 'error');
                return;
            }

            const mensaje = `¡Gracias por tu interés! Productos seleccionados: ${cart.items.length}. Te contactaremos pronto para finalizar tu compra.`;
            notificationSystem.show(mensaje, 'success');
            
            // Aquí podrías enviar a WhatsApp:
            // const phone = '34123456789';
            // const text = `Hola, me interesan estos productos: ${cart.items.map(i => i.nombre).join(', ')}`;
            // window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
            
            setTimeout(() => {
                cart.clear();
                carritoModal.close();
            }, 2000);
        });
    }

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const validator = new FormValidator(contactForm);
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            validator.clearErrors();

            if (!validator.validate()) {
                notificationSystem.show('Por favor, corrige los errores en el formulario', 'error');
                return;
            }

            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');

            // Mostrar loader
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';

            try {
                const formData = validator.getData();
                console.log('Datos del formulario:', formData);

                // Aquí podrías enviar a tu backend o email
                // Ejemplo con WhatsApp:
                // const phone = '34123456789';
                // const text = `Nuevo contacto:\nNombre: ${formData.nombre}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\nMensaje: ${formData.mensaje}`;
                // window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');

                // Simular envío
                await new Promise(resolve => setTimeout(resolve, 1500));

                notificationSystem.show('¡Mensaje enviado! Te contactaré pronto.', 'success');
                contactForm.reset();
                validator.clearErrors();
            } catch (error) {
                console.error('Error:', error);
                notificationSystem.show('Error al enviar. Inténtalo de nuevo.', 'error');
            } finally {
                // Restaurar botón
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
            }
        });

        // Validación en tiempo real
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => {
                if (field.value.trim()) {
                    validator.clearErrors();
                    validator.validate();
                }
            });
        });
    }

    // Prevenir enlaces vacíos
    document.querySelectorAll('a[href="#"].social-disabled').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            notificationSystem.show('Próximamente disponible', 'info');
        });
    });

    // Instagram info
    console.log(`📷 Instagram: @${CONFIG.instagram.username}`);
    console.log('💡 Para integrar API: https://developers.facebook.com/docs/instagram-basic-display-api');
});

// Prevenir errores globales
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Página cargada en ${pageLoadTime}ms`);
        }, 0);
    });
}

// Exportar para uso global
window.BJ = {
    cart,
    notificationSystem,
    SecurityUtils,
    CONFIG
};
