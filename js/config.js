/**
 * Configuración personalizable de la página web
 * Modifica estos valores para personalizar tu sitio
 */

const SITE_CONFIG = {
    // Información del artista
    artist: {
        name: 'Juan Giraldo',
        brandName: 'Boceto Juan Giraldo',
        bio: 'Como artista del tatuaje, mi pasión es convertir tus ideas en obras de arte permanentes que cuenten tu historia.',
        yearsExperience: '10+',
        clientsCount: '500+',
        location: 'Ciudad, País'
    },

    // Redes sociales
    social: {
        instagram: {
            username: 'boceto.juangiraldo',
            url: 'https://www.instagram.com/boceto.juangiraldo?igsh=MTFpNGY1bnV6dnh0NA==',
            
            // INTEGRACIÓN AUTOMÁTICA DE INSTAGRAM 📸
            // OPCIÓN 1: Widget Automático (YA ACTIVO) ✅
            // El widget se actualiza automáticamente con tus últimas publicaciones
            
            // OPCIÓN 2: API de Instagram (Opcional - Para mayor control)
            // Para activar: obtén tu token en https://developers.facebook.com/docs/instagram-basic-display-api
            useAPI: false, // Cambiar a true para usar API
            accessToken: null, // Tu Access Token aquí
            userId: null, // Tu User ID aquí
            maxPosts: 12 // Número de publicaciones a mostrar
        },
        facebook: '',  // Añade tu URL de Facebook
        twitter: '',   // Añade tu URL de Twitter
        youtube: '',   // Añade tu URL de YouTube
        tiktok: '',    // Añade tu URL de TikTok
        whatsapp: ''   // Añade tu número: '34123456789' (sin +)
    },

    // Información de contacto
    contact: {
        address: 'Calle Principal 123, Ciudad, CP 12345',
        phone: '+34 123 456 789',
        email: 'info@bocetojuangiraldo.com',
        schedule: {
            weekdays: 'Lun - Vie: 10:00 - 20:00',
            saturday: 'Sáb: 11:00 - 18:00',
            sunday: 'Domingo: Cerrado'
        }
    },

    // Productos de la tienda
    products: [
        {
            id: 1,
            name: 'Bono Regalo 1 Sesión',
            price: 150,
            description: 'Regala una sesión de tatuaje. Válido por 6 meses.',
            icon: 'gift',
            category: 'bono'
        },
        {
            id: 2,
            name: 'Kit Cuidado Post-Tatuaje',
            price: 35,
            description: 'Todo lo necesario para cuidar tu nuevo tatuaje.',
            icon: 'spray-can',
            category: 'producto'
        },
        {
            id: 3,
            name: 'Diseño Personalizado',
            price: 80,
            description: 'Diseño único creado especialmente para ti.',
            icon: 'palette',
            category: 'servicio'
        },
        {
            id: 4,
            name: 'Merchandise',
            price: 25,
            description: 'Camisetas y accesorios del estudio.',
            icon: 'tshirt',
            category: 'producto'
        },
        {
            id: 5,
            name: 'Consulta Diseño',
            price: 40,
            description: '1 hora de consulta para planificar tu tatuaje.',
            icon: 'calendar-check',
            category: 'servicio'
        },
        {
            id: 6,
            name: 'Sesión Flash',
            price: 100,
            description: 'Tatuajes pre-diseñados de tamaño pequeño.',
            icon: 'star',
            category: 'servicio'
        }
    ],

    // Servicios ofrecidos
    services: [
        {
            title: 'Diseño Personalizado',
            description: 'Creación de diseños únicos adaptados a tus ideas y preferencias personales.',
            icon: 'paint-brush'
        },
        {
            title: 'Tatuajes Tradicionales',
            description: 'Estilo clásico americano con líneas sólidas y colores vibrantes.',
            icon: 'star'
        },
        {
            title: 'Realismo',
            description: 'Tatuajes realistas con sombreado detallado y profundidad impresionante.',
            icon: 'eye'
        },
        {
            title: 'Geométrico',
            description: 'Diseños modernos con formas geométricas y patrones precisos.',
            icon: 'shapes'
        },
        {
            title: 'Acuarela',
            description: 'Estilo artístico con colores vibrantes y efectos de acuarela.',
            icon: 'droplet'
        },
        {
            title: 'Cover-Up',
            description: 'Transformación de tatuajes antiguos en nuevas obras maestras.',
            icon: 'eraser'
        }
    ],

    // Categorías de galería
    galleryCategories: [
        { id: 'all', name: 'Todos' },
        { id: 'realismo', name: 'Realismo' },
        { id: 'tradicional', name: 'Tradicional' },
        { id: 'geometrico', name: 'Geométrico' },
        { id: 'acuarela', name: 'Acuarela' }
    ],

    // Integración con Instagram
    instagram: {
        enabled: false,  // Cambia a true cuando tengas el token
        accessToken: '',  // Tu token de Instagram API
        userId: '',       // Tu user ID de Instagram
        maxPhotos: 12     // Número máximo de fotos a mostrar
    },

    // Integración con WhatsApp
    whatsapp: {
        enabled: true,
        defaultMessage: 'Hola! Me gustaría agendar una cita para un tatuaje.',
        businessPhone: ''  // Número sin + ni espacios: 34123456789
    },

    // Colores del sitio (opcional - sobrescribe CSS)
    colors: {
        primary: '#e63946',      // Color principal (rojo)
        secondary: '#1d3557',    // Color secundario (azul oscuro)
        accent: '#f1faee',       // Color de acento (blanco roto)
        dark: '#0a0a0a',         // Color oscuro
        light: '#ffffff'         // Color claro
    },

    // Configuración de SEO
    seo: {
        title: 'Boceto Juan Giraldo - Artista Tatuador Profesional',
        description: 'Arte sobre tu piel. Transformando ideas en obras maestras permanentes. Más de 10 años de experiencia.',
        keywords: 'tatuajes, tattoo, Juan Giraldo, boceto, realismo, tatuador profesional, arte corporal',
        ogImage: '',  // URL de imagen para compartir en redes sociales
        language: 'es'
    },

    // Configuración de carrito
    cart: {
        maxItems: 20,
        currency: '€',
        showPrices: true
    },

    // Google Analytics (opcional)
    analytics: {
        enabled: false,
        trackingId: ''  // Tu ID de Google Analytics
    },

    // Configuración de formulario
    form: {
        emailService: 'none',  // 'emailjs', 'formspree', 'custom', 'none'
        emailServiceKey: '',    // API key del servicio
        successMessage: '¡Mensaje enviado! Te contactaré pronto.',
        errorMessage: 'Error al enviar. Inténtalo de nuevo.'
    }
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SITE_CONFIG;
}
