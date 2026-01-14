/**
 * Boceto Juan Giraldo - Página Web
 * Script principal con mejores prácticas de programación y seguridad
 * @author Juan Giraldo
 * @version 3.0
 */

'use strict';

// Marca el documento como "JS habilitado" para animaciones seguras (si JS falla, el contenido queda visible)
document.documentElement.classList.add('js');

// Configuración global
const CONFIG = {
    instagram: {
        username: 'boceto.juangiraldo',
        url: 'https://www.instagram.com/boceto.juangiraldo?igsh=MTFpNGY1bnV6dnh0NA=='
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

// ============================================
// LOADING SCREEN (Deshabilitado - carga instantánea)
// ============================================
// El loading screen está oculto por defecto en el HTML
// Si quieres activarlo, quita style="display: none;" del HTML
// y descomenta este código:
/*
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    }
});
*/

// ============================================
// NAVEGACIÓN STICKY Y RESPONSIVE
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Hacer navbar sticky con efecto
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Toggle menú móvil
// Nota: El toggle del menú móvil se gestiona en la clase MobileNavigation

// Cerrar menú al hacer click en enlaces
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.setAttribute('aria-expanded', 'false');
        }
        
        // Smooth scroll
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
        
        // Marcar link activo
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animar
document.querySelectorAll('.gallery-item, .service-card, .product-card, .about-content, .contact-content').forEach(el => {
    observer.observe(el);
});

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// DETECCIÓN DE DISPOSITIVO Y ORIENTACIÓN
// ============================================
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent) && !isMobile;
    
    document.body.classList.toggle('is-mobile', isMobile);
    document.body.classList.toggle('is-tablet', isTablet);
    document.body.classList.toggle('is-desktop', !isMobile && !isTablet);
}

detectDevice();
window.addEventListener('resize', detectDevice);

// ============================================
// MANEJO DE ORIENTACIÓN
// ============================================
function handleOrientation() {
    const isLandscape = window.matchMedia("(orientation: landscape)").matches;
    document.body.classList.toggle('landscape', isLandscape);
    document.body.classList.toggle('portrait', !isLandscape);
}

handleOrientation();
window.addEventListener('orientationchange', handleOrientation);
window.addEventListener('resize', handleOrientation);

// ============================================
// SMOOTH SCROLL PARA TODOS LOS ENLACES ANCLA
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#carrito' && href !== '#openTienda') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

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

let notificationSystem = new NotificationSystem();

// Helpers: moneda y parseo de precios (soporta €, $, COP, separadores . y ,)
function getCurrencySymbol() {
    if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.cart && SITE_CONFIG.cart.currency) {
        return SITE_CONFIG.cart.currency;
    }
    return '€';
}

function getCurrencyCode() {
    if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.cart && SITE_CONFIG.cart.currencyCode) {
        return SITE_CONFIG.cart.currencyCode;
    }

    const symbol = getCurrencySymbol();
    if (symbol === '€') return 'EUR';
    if (symbol === '$') return 'USD';
    if (symbol.toUpperCase && symbol.toUpperCase() === 'COP') return 'COP';
    return 'EUR';
}

function formatAmount(value, currencyCode) {
    const zeroDecimal = new Set(['COP', 'JPY', 'KRW', 'CLP', 'VND']);
    const decimals = zeroDecimal.has(currencyCode) ? 0 : 2;
    const factor = Math.pow(10, decimals);
    const rounded = Math.round((Number(value) || 0) * factor) / factor;
    return rounded.toFixed(decimals);
}

function parsePriceToNumber(value) {
    if (value == null) return 0;
    const raw = String(value).trim();
    const cleaned = raw.replace(/[^0-9,.-]/g, '');
    if (!cleaned) return 0;

    const lastDot = cleaned.lastIndexOf('.');
    const lastComma = cleaned.lastIndexOf(',');

    let normalized = cleaned;

    // Si hay ambos separadores, el último suele ser el decimal.
    if (lastDot !== -1 && lastComma !== -1) {
        const decimalSep = lastDot > lastComma ? '.' : ',';
        const thousandSep = decimalSep === '.' ? ',' : '.';
        normalized = normalized.split(thousandSep).join('');
        normalized = normalized.replace(decimalSep, '.');
    } else if (lastComma !== -1) {
        // Solo coma: decimal si termina en ,d o ,dd; si no, es separador de miles.
        const decimals = normalized.split(',').pop();
        if (decimals && decimals.length <= 2) {
            normalized = normalized.replace(',', '.');
        } else {
            normalized = normalized.split(',').join('');
        }
    } else if (lastDot !== -1) {
        // Solo punto: decimal si termina en .d o .dd; si no, es separador de miles.
        const decimals = normalized.split('.').pop();
        if (!(decimals && decimals.length <= 2)) {
            normalized = normalized.split('.').join('');
        }
    }

    const number = parseFloat(normalized);
    return Number.isFinite(number) ? number : 0;
}

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
     * @returns {number} Total numérico
     */
    getTotal() {
        return this.items.reduce((sum, item) => {
            const precio = parsePriceToNumber(item.precio);
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
        const subtotalElement = document.getElementById('subtotalCarrito');

        const currency = getCurrencySymbol();

        if (!container || !totalElement) return;

        if (this.items.length === 0) {
            container.innerHTML = `
                <div class="carrito-vacio">
                    <i class="fas fa-shopping-cart" aria-hidden="true"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
            totalElement.textContent = `${currency}0.00`;
            if (subtotalElement) subtotalElement.textContent = `${currency}0.00`;
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

        const total = this.getTotal();
        totalElement.textContent = `${currency}${total.toFixed(2)}`;
        if (subtotalElement) subtotalElement.textContent = `${currency}${total.toFixed(2)}`;
    }
}

let cart = new ShoppingCart();

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

        // Cerrar al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!this.isOpen()) return;
            const target = e.target;
            if (!this.navMenu.contains(target) && !this.navToggle.contains(target)) {
                this.close();
            }
        });

        // Estado inicial accesible
        this.navToggle.setAttribute('aria-expanded', this.isOpen() ? 'true' : 'false');
    }

    toggle() {
        const isOpen = this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        this.navToggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    close() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
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
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.about-section, .gallery-section, .services-section, .contact-section')
            .forEach(section => section.classList.add('animate-in'));
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar secciones
    document.querySelectorAll('.about-section, .gallery-section, .services-section, .contact-section').forEach(section => {
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

    // === TIENDA OVERLAY ===
    const tiendaOverlay = document.getElementById('tiendaOverlay');
    const openTienda = document.getElementById('openTienda');
    const closeTienda = document.getElementById('closeTienda');
    
    // Abrir tienda
    if (openTienda) {
        openTienda.addEventListener('click', (e) => {
            e.preventDefault();
            if (tiendaOverlay) {
                tiendaOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }
    
    // Cerrar tienda
    if (closeTienda) {
        closeTienda.addEventListener('click', () => {
            if (tiendaOverlay) {
                tiendaOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Cerrar al hacer click fuera
    if (tiendaOverlay) {
        tiendaOverlay.addEventListener('click', (e) => {
            if (e.target === tiendaOverlay) {
                tiendaOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && tiendaOverlay && tiendaOverlay.classList.contains('active')) {
            tiendaOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Filtros de categoría
    const categoriaBtns = document.querySelectorAll('.categoria-btn');
    const productosCards = document.querySelectorAll('.producto-card-modern');
    
    categoriaBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.dataset.categoria;
            
            // Actualizar botones activos
            categoriaBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtrar productos
            productosCards.forEach(card => {
                if (categoria === 'todos' || card.dataset.categoria === categoria) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInGrid 0.6s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Botones de compra en tienda moderna
    document.querySelectorAll('.btn-comprar-modern').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.producto-card-modern');
            if (!card) return;

            const producto = {
                nombre: card.querySelector('h3').textContent,
                precio: card.querySelector('.producto-precio').textContent
            };
            cart.add(producto);
            
            // Efecto visual en el botón
            btn.innerHTML = '<i class="fas fa-check"></i> ¡Añadido!';
            btn.style.background = 'linear-gradient(135deg, #06ffa5, #00d4ff)';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Añadir';
                btn.style.background = '';
            }, 2000);
        });
    });

    // === PAYPAL (cargar SDK + renderizar botones) ===
    const paypalSection = document.getElementById('paypalSection');
    const paypalMissing = document.getElementById('paypalMissing');
    const paypalButtonsContainer = document.getElementById('paypalButtons');

    function getPayPalConfig() {
        if (typeof SITE_CONFIG === 'undefined') return null;
        const paypalCfg = SITE_CONFIG.paypal;
        if (!paypalCfg || !paypalCfg.enabled) return null;
        if (!paypalCfg.clientId || String(paypalCfg.clientId).trim() === '') return null;

        const currencyCode = paypalCfg.currencyCode || getCurrencyCode();
        return {
            clientId: String(paypalCfg.clientId).trim(),
            currencyCode
        };
    }

    function loadPayPalSdk(clientId, currencyCode) {
        return new Promise((resolve, reject) => {
            if (window.paypal && typeof window.paypal.Buttons === 'function') {
                resolve();
                return;
            }

            const existing = document.querySelector('script[data-paypal-sdk="true"]');
            if (existing) {
                existing.addEventListener('load', () => resolve());
                existing.addEventListener('error', () => reject(new Error('No se pudo cargar PayPal SDK')));
                return;
            }

            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${encodeURIComponent(currencyCode)}&intent=capture`;
            script.async = true;
            script.defer = true;
            script.dataset.paypalSdk = 'true';
            script.setAttribute('data-paypal-sdk', 'true');

            script.onload = () => resolve();
            script.onerror = () => reject(new Error('No se pudo cargar PayPal SDK'));
            document.head.appendChild(script);
        });
    }

    function buildPayPalItems() {
        // Normalizar items (CartMejorado usa cantidad; ShoppingCart no)
        const items = (cart && Array.isArray(cart.items)) ? cart.items : [];
        const currencyCode = getCurrencyCode();

        const normalized = items
            .map((it) => {
                const name = (it && it.nombre) ? String(it.nombre) : 'Producto';
                const qty = Number(it && it.cantidad != null ? it.cantidad : 1);
                const quantity = Math.max(1, Math.floor(qty));
                const unit = parsePriceToNumber(it && it.precio);
                return {
                    name,
                    quantity,
                    unitAmount: Math.max(0, unit),
                    currencyCode
                };
            })
            .filter((it) => it.unitAmount >= 0 && it.quantity >= 1);

        const itemTotal = normalized.reduce((sum, it) => sum + (it.unitAmount * it.quantity), 0);
        return { normalized, itemTotal, currencyCode };
    }

    async function renderPayPalButtons() {
        const cfg = getPayPalConfig();
        if (!paypalSection || !paypalButtonsContainer) return;

        // Reset visibilidad
        paypalSection.hidden = true;
        if (paypalMissing) paypalMissing.hidden = true;

        if (!cfg) {
            // Si PayPal no está configurado, mostramos un aviso solo si el usuario abrió el carrito
            if (paypalMissing) paypalMissing.hidden = false;
            return;
        }

        const { normalized, itemTotal, currencyCode } = buildPayPalItems();
        if (!normalized.length || itemTotal <= 0) {
            return;
        }

        try {
            await loadPayPalSdk(cfg.clientId, cfg.currencyCode || currencyCode);
        } catch (err) {
            console.error(err);
            if (paypalMissing) paypalMissing.hidden = false;
            return;
        }

        // Render
        paypalButtonsContainer.innerHTML = '';
        paypalSection.hidden = false;

        const amountValue = formatAmount(itemTotal, currencyCode);

        window.paypal
            .Buttons({
                style: {
                    layout: 'vertical',
                    shape: 'rect',
                    label: 'paypal'
                },
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currencyCode,
                                    value: amountValue
                                },
                                description: 'Compra - Boceto Juan Giraldo'
                            }
                        ],
                        application_context: {
                            shipping_preference: 'NO_SHIPPING'
                        }
                    });
                },
                onApprove: async (data, actions) => {
                    const details = await actions.order.capture();
                    console.log('✅ Pago aprobado:', details);
                    notificationSystem.show('Pago aprobado. ¡Gracias por tu compra!', 'success');

                    // Vaciar carrito y cerrar modal
                    try {
                        if (cart && typeof cart.clear === 'function') cart.clear();
                    } catch (e) {}

                    const carritoEl = document.getElementById('carritoModal');
                    if (carritoEl) {
                        carritoEl.classList.remove('active');
                        carritoEl.setAttribute('aria-hidden', 'true');
                        document.body.style.overflow = '';
                    }
                },
                onError: (err) => {
                    console.error('❌ PayPal error:', err);
                    notificationSystem.show('No se pudo procesar el pago con PayPal.', 'error');
                }
            })
            .render('#paypalButtons');
    }

    // Botón carrito
    const carritoIcon = document.querySelector('.carrito-icon');
    if (carritoIcon) {
        carritoIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cart.render();
            carritoModal.open();
            renderPayPalButtons();
        });
    }

    // Botones de compra antiguos (por si acaso)
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

            const whatsappPhone =
                (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.social && SITE_CONFIG.social.whatsapp) ? SITE_CONFIG.social.whatsapp :
                (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsapp && SITE_CONFIG.whatsapp.businessPhone) ? SITE_CONFIG.whatsapp.businessPhone :
                '';

            const { normalized, itemTotal, currencyCode } = buildPayPalItems();
            const currencySymbol = getCurrencySymbol();
            const totalText = `${currencySymbol}${formatAmount(itemTotal, currencyCode)}`;

            const productosTxt = normalized.map(it => `• ${it.name} x${it.quantity}`).join('\n');
            const text = `Hola! Quiero comprar:\n${productosTxt}\n\nTotal: ${totalText}`;

            if (!whatsappPhone) {
                notificationSystem.show('Configura tu WhatsApp en js/config.js para finalizar por mensaje.', 'info');
                return;
            }

            window.open(`https://wa.me/${encodeURIComponent(whatsappPhone)}?text=${encodeURIComponent(text)}`, '_blank');
            notificationSystem.show('Abriendo WhatsApp para finalizar la compra…', 'success');
            
            setTimeout(() => {
                cart.clear();
                carritoModal.close();
            }, 2000);
        });
    }

    // Intento de renderizar PayPal si el carrito se abre por fallback inline (onclick)
    const openCarritoBtn = document.getElementById('openCarrito');
    if (openCarritoBtn) {
        openCarritoBtn.addEventListener('click', () => {
            // en caso de que este listener corra además del inline
            setTimeout(renderPayPalButtons, 0);
        });
    }

    // Prevenir enlaces vacíos
    document.querySelectorAll('a[href="#"].social-disabled').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            notificationSystem.show('Próximamente disponible', 'info');
        });
    });

    // Instagram Feed Loader - CON API REAL Y AUTO-ACTUALIZACIÓN
    async function loadInstagramFeed() {
        // Verificar si existe configuración externa
        const instagramConfig = typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.social?.instagram 
            ? SITE_CONFIG.social.instagram 
            : CONFIG.instagram;
        
        const feedContainer = document.getElementById('instagram-feed');
        const loadingIndicator = document.getElementById('instagram-loading');
        const widgetContainer = document.getElementById('instagram-widget-container');
        
        if (!feedContainer) return;
        
        // Si se debe usar API y hay token, ocultar widget y mostrar feed API
        if (instagramConfig.useAPI && instagramConfig.accessToken) {
            console.log('📷 Instagram: Usando API para cargar publicaciones');
            if (widgetContainer) widgetContainer.style.display = 'none';
            
            // Mostrar indicador de carga
            if (loadingIndicator) loadingIndicator.style.display = 'block';
            feedContainer.style.display = 'none';
            
            try {
                // Llamar a la API de Instagram
                const response = await fetch(
                    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${instagramConfig.accessToken}&limit=${instagramConfig.maxPosts || 12}`
                );
                
                if (!response.ok) {
                    throw new Error(`Error de API: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (!data.data || data.data.length === 0) {
                    throw new Error('No hay publicaciones disponibles');
                }
                
                // Renderizar publicaciones reales de Instagram
                feedContainer.innerHTML = data.data.map((post, index) => {
                    const imageUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
                    const caption = post.caption ? post.caption.substring(0, 100) + '...' : 'Ver en Instagram';
                    
                    return `
                        <div class="instagram-post" style="animation: fadeInUp 0.6s ease ${index * 0.1}s both;">
                            <a href="${post.permalink}" target="_blank" rel="noopener noreferrer" title="${SecurityUtils.sanitizeHTML(caption)}">
                                <img src="${imageUrl}" 
                                     alt="${SecurityUtils.sanitizeHTML(caption)}"
                                     loading="lazy"
                                     onerror="this.parentElement.innerHTML='<div class=\\'instagram-post-placeholder\\'><i class=\\'fab fa-instagram\\'></i></div>';">
                                ${post.media_type === 'VIDEO' ? '<div class="video-indicator"><i class="fas fa-play"></i></div>' : ''}
                            </a>
                        </div>
                    `;
                }).join('');
                
                // Mostrar feed y ocultar loading
                feedContainer.style.display = 'grid';
                if (loadingIndicator) loadingIndicator.style.display = 'none';
                
                console.log(`✅ ${data.data.length} publicaciones de Instagram cargadas desde API`);
                
            } catch (error) {
                console.error('❌ Error cargando Instagram feed:', error);
                
                // Ocultar loading y mostrar mensaje
                if (loadingIndicator) loadingIndicator.style.display = 'none';
                feedContainer.innerHTML = `
                    <div class="instagram-error">
                        <i class="fab fa-instagram"></i>
                        <p>No se pudieron cargar las publicaciones.</p>
                        <p><a href="${instagramConfig.url || CONFIG.instagram.url}" target="_blank" class="btn btn-primary">
                            <i class="fab fa-instagram"></i> Ver en Instagram
                        </a></p>
                    </div>
                `;
                feedContainer.style.display = 'block';
            }
        } else {
            // Usar widget embebido
            console.log('📷 Instagram: Widget embebido activo (se actualiza automáticamente)');
            console.log('💡 Para usar API directa, configura useAPI: true en config.js');
        }
    }
    
    // Auto-actualizar feed cada 30 minutos (solo si se usa API)
    function setupAutoRefresh() {
        const instagramConfig = typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.social?.instagram 
            ? SITE_CONFIG.social.instagram 
            : CONFIG.instagram;
            
        if (instagramConfig.useAPI && instagramConfig.accessToken) {
            setInterval(() => {
                console.log('🔄 Actualizando feed de Instagram...');
                loadInstagramFeed();
            }, 30 * 60 * 1000); // 30 minutos
        }
    }

    // Cargar feed de Instagram al iniciar
    loadInstagramFeed();
    setupAutoRefresh();

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

// Soporte para handlers inline antiguos (index.html usa window.cart en fallbacks)
window.cart = cart;

// === SISTEMA COMPLETO DE VENTAS ===

// Checkout Modal Controller
class CheckoutController {
    constructor() {
        this.checkoutModal = document.getElementById('checkoutModal');
        this.confirmacionModal = document.getElementById('confirmacionModal');
        this.init();
    }
    
    init() {
        // Botón ir a checkout
        const irCheckout = document.getElementById('irCheckout');
        if (irCheckout) {
            irCheckout.addEventListener('click', () => this.abrirCheckout());
        }
        
        // Botón seguir comprando
        const seguirComprando = document.getElementById('seguirComprando');
        if (seguirComprando) {
            seguirComprando.addEventListener('click', () => {
                const carritoEl = document.getElementById('carritoModal');
                if (carritoEl) {
                    carritoEl.classList.remove('active');
                    carritoEl.setAttribute('aria-hidden', 'true');
                    carritoEl.style.display = '';
                }
                const tiendaEl = document.getElementById('tiendaOverlay');
                if (tiendaEl) {
                    tiendaEl.classList.add('active');
                }
            });
        }
        
        // Cerrar checkout
        const checkoutClose = document.getElementById('checkoutClose');
        if (checkoutClose) {
            checkoutClose.addEventListener('click', () => this.cerrarCheckout());
        }
        
        // Formulario de checkout
        const checkoutForm = document.getElementById('checkoutFormulario');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => this.procesarPedido(e));
        }
        
        // Cerrar confirmación
        const cerrarConfirmacion = document.getElementById('cerrarConfirmacion');
        if (cerrarConfirmacion) {
            cerrarConfirmacion.addEventListener('click', () => {
                if (this.confirmacionModal) {
                    this.confirmacionModal.style.display = 'none';
                }
                document.body.style.overflow = '';
            });
        }
    }
    
    abrirCheckout() {
        if (cart.items.length === 0) {
            notificationSystem.show('El carrito está vacío', 'error');
            return;
        }
        
        // Cerrar carrito
        const carritoEl = document.getElementById('carritoModal');
        if (carritoEl) {
            carritoEl.classList.remove('active');
            carritoEl.setAttribute('aria-hidden', 'true');
            carritoEl.style.display = '';
        }
        
        // Renderizar items en checkout
        this.renderCheckoutItems();
        
        // Abrir modal checkout
        if (this.checkoutModal) {
            this.checkoutModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    cerrarCheckout() {
        if (this.checkoutModal) {
            this.checkoutModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    renderCheckoutItems() {
        const checkoutItems = document.getElementById('checkoutItems');
        const checkoutSubtotal = document.getElementById('checkoutSubtotal');
        const checkoutTotal = document.getElementById('checkoutTotal');
        
        if (!checkoutItems) return;
        
        checkoutItems.innerHTML = cart.items.map(item => `
            <div class='checkout-item'>
                <span>${item.nombre} x${item.cantidad}</span>
                <span>${item.precio}</span>
            </div>
        `).join('');
        
        const total = this.calcularTotal();
        checkoutSubtotal.textContent = total;
        checkoutTotal.textContent = total;
    }
    
    calcularTotal() {
        const currency = getCurrencySymbol();
        const total = cart.items.reduce((sum, item) => {
            const precio = parsePriceToNumber(item.precio);
            return sum + (precio * item.cantidad);
        }, 0);
        return `${currency}${total.toFixed(2)}`;
    }
    
    procesarPedido(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const datos = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            ciudad: formData.get('ciudad'),
            direccion: formData.get('direccion'),
            notas: formData.get('notas'),
            metodo: formData.get('metodo')
        };
        
        // Validar campos
        if (!datos.nombre || !datos.email || !datos.telefono || !datos.ciudad) {
            notificationSystem.show('Por favor completa todos los campos obligatorios', 'error');
            return;
        }
        
        // Generar número de pedido
        const numeroPedido = 'BJ' + Date.now().toString().slice(-8);
        
        // Preparar mensaje
        const productos = cart.items.map(item => 
            `${item.nombre} x${item.cantidad} - ${item.precio}`
        ).join('\n');
        
        const total = this.calcularTotal();
        
        const mensaje = `
*NUEVO PEDIDO #${numeroPedido}*

📦 *Productos:*
${productos}

💰 *Total:* ${total}

👤 *Cliente:*
Nombre: ${datos.nombre}
Email: ${datos.email}
Teléfono: ${datos.telefono}
Ciudad: ${datos.ciudad}
${datos.direccion ? 'Dirección: ' + datos.direccion : ''}

${datos.notas ? '📝 Notas: ' + datos.notas : ''}
        `.trim();
        
        // Enviar según método elegido
        if (datos.metodo === 'whatsapp') {
            const phone = '34600000000'; // Cambiar por tu número
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
        } else {
            // Crear mailto
            const subject = `Nuevo Pedido #${numeroPedido}`;
            const body = mensaje.replace(/\*/g, '');
            const mailtoUrl = `mailto:contacto@ejemplo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;
        }
        
        // Mostrar confirmación
        document.getElementById('numeroPedido').textContent = numeroPedido;
        this.cerrarCheckout();
        this.confirmacionModal.style.display = 'flex';
        
        // Limpiar carrito
        setTimeout(() => {
            cart.clear();
        }, 1000);
        
        // Limpiar formulario
        e.target.reset();
    }
}

// Mejorar el sistema de carrito existente
class CartMejorado {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('bj_carrito')) || [];
        this.updateCount();
    }
    
    add(producto) {
        const existe = this.items.find(item => item.nombre === producto.nombre);
        if (existe) {
            existe.cantidad++;
        } else {
            this.items.push({
                nombre: producto.nombre,
                precio: producto.precio,
                cantidad: 1
            });
        }
        this.save();
        this.updateCount();
        notificationSystem.show(`${producto.nombre} añadido al carrito`, 'success');
    }
    
    remove(nombre) {
        this.items = this.items.filter(item => item.nombre !== nombre);
        this.save();
        this.updateCount();
        this.render();
    }
    
    updateQuantity(nombre, cantidad) {
        const item = this.items.find(item => item.nombre === nombre);
        if (item) {
            item.cantidad = Math.max(1, cantidad);
            this.save();
            this.updateCount();
            this.render();
        }
    }
    
    clear() {
        this.items = [];
        this.save();
        this.updateCount();
        this.render();
    }
    
    save() {
        localStorage.setItem('bj_carrito', JSON.stringify(this.items));
    }
    
    updateCount() {
        const count = this.items.reduce((sum, item) => sum + item.cantidad, 0);
        const countElement = document.getElementById('carritoCount');
        if (countElement) {
            countElement.textContent = count;
        }
    }
    
    render() {
        const carritoItems = document.getElementById('carritoItems');
        const totalElement = document.getElementById('totalCarrito');
        const subtotalElement = document.getElementById('subtotalCarrito');

        const currency = getCurrencySymbol();
        
        if (!carritoItems) return;
        
        if (this.items.length === 0) {
            carritoItems.innerHTML = '<p style="color: rgba(255,255,255,0.7); text-align: center; padding: 40px;">Tu carrito está vacío</p>';
            if (totalElement) totalElement.textContent = `${currency}0`;
            if (subtotalElement) subtotalElement.textContent = `${currency}0`;
            return;
        }
        
        carritoItems.innerHTML = this.items.map(item => `
            <div class='carrito-item'>
                <div class='item-info'>
                    <div class='item-nombre'>${item.nombre}</div>
                    <div class='item-precio'>${item.precio}</div>
                </div>
                <div class='item-cantidad'>
                    <button class='cantidad-btn' onclick='cart.updateQuantity("${item.nombre}", ${item.cantidad - 1})'>-</button>
                    <span class='cantidad-num'>${item.cantidad}</span>
                    <button class='cantidad-btn' onclick='cart.updateQuantity("${item.nombre}", ${item.cantidad + 1})'>+</button>
                </div>
                <button class='item-eliminar' onclick='cart.remove("${item.nombre}")'>
                    <i class='fas fa-trash'></i>
                </button>
            </div>
        `).join('');
        
        const total = this.items.reduce((sum, item) => {
            const precio = parsePriceToNumber(item.precio);
            return sum + (precio * item.cantidad);
        }, 0);
        
        if (totalElement) totalElement.textContent = `${currency}${total.toFixed(2)}`;
        if (subtotalElement) subtotalElement.textContent = `${currency}${total.toFixed(2)}`;
    }
}

// Reemplazar el carrito existente
if (typeof cart !== 'undefined') {
    cart = new CartMejorado();
}

// Mantener export global consistente (por si se usa BJ.cart en otros scripts)
if (window.BJ) {
    window.BJ.cart = cart;
}

// Mantener alias global consistente
window.cart = cart;

// Inicializar checkout
const checkoutController = new CheckoutController();

// === EFECTOS DE RIPPLE Y MEJORAS DE UX ===

// Añadir efecto ripple a todos los botones
document.addEventListener('click', function(e) {
    if (e.target.matches('button, .btn-primary, .btn-comprar-modern, .categoria-btn')) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        e.target.style.position = 'relative';
        e.target.style.overflow = 'hidden';
        e.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Lazy loading para imágenes
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Smooth scroll con offset para navbar fijo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Parallax suave para hero
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const hero = document.querySelector('.hero');
            if (hero) {
                const scrolled = window.pageYOffset;
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Animaciones al scroll (elementos aparecen al entrar en viewport)
const fadeInObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, fadeInObserverOptions);

// Aplicar animación a secciones
document.querySelectorAll('.gallery, .stats-grid, .producto-card-modern').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// Precargar imágenes importantes
const preloadImages = () => {
    const images = [
        'images/profile/profile.jpg',
        'images/gallery/dibujo1.jpg',
        'images/gallery/dibujo2.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Ejecutar al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadImages);
} else {
    preloadImages();
}

// Mejorar el sistema de notificaciones
class NotificationSystemMejorado {
    constructor() {
        this.container = document.getElementById('notificationContainer') || this.createContainer();
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
        return container;
    }
    
    show(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
        const bgColor = type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                       type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                       'linear-gradient(135deg, #3b82f6, #2563eb)';
        
        notification.style.cssText = `
            background: ${bgColor};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
            min-width: 300px;
            backdrop-filter: blur(10px);
        `;
        
        notification.innerHTML = `
            <span style="font-size: 24px; font-weight: bold;">${icon}</span>
            <span>${message}</span>
        `;
        
        this.container.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutUp 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
}

// Reemplazar sistema de notificaciones
if (typeof notificationSystem !== 'undefined') {
    notificationSystem = new NotificationSystemMejorado();
    if (window.BJ) {
        window.BJ.notificationSystem = notificationSystem;
    }
}

// Añadir indicador de carga
const showLoading = () => {
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
    `;
    
    overlay.innerHTML = `
        <div style="text-align: center;">
            <div class="loading-spinner" style="width: 60px; height: 60px; border-width: 5px; margin: 0 auto 20px;"></div>
            <p style="color: white; font-size: 18px;">Procesando pedido...</p>
        </div>
    `;
    
    document.body.appendChild(overlay);
    return overlay;
};

const hideLoading = (overlay) => {
    if (overlay) overlay.remove();
};

// Mejorar el procesarPedido para mostrar loading
const originalProcesarPedido = CheckoutController.prototype.procesarPedido;
CheckoutController.prototype.procesarPedido = function(e) {
    e.preventDefault();
    const loading = showLoading();
    
    setTimeout(() => {
        hideLoading(loading);
        originalProcesarPedido.call(this, e);
    }, 1500);
};

console.log('✨ Sistema de ventas completo y optimizado cargado');
