# 🎨 Página Web para Artista - Portfolio & Tienda

[![GitHub](https://img.shields.io/badge/GitHub-josedavidosorio2005-purple?style=for-the-badge&logo=github)](https://github.com/josedavidosorio2005/Requerimientos-P-gina-Web-para-Artista)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

Página web moderna, vibrante y completamente funcional para artista de tatuajes y dibujos a lápiz, con **sistema de ventas integrado**.

![Preview](https://img.shields.io/badge/Estado-Activo-success?style=for-the-badge)

## ✨ Características Principales

### 🎨 Diseño Vibrante
- **Gradientes animados** de fondo con colores vibrantes
- **Glassmorphism** en navbar y modales
- **Efectos de brillo** y partículas en hero section
- **5 estilos diferentes** para exhibir arte en lápiz con marcos de colores
- **Animaciones fluidas** en toda la página

### 🛍️ Sistema de E-commerce Completo
- ✅ **Tienda overlay** moderna con 8 productos
- ✅ **Filtros por categoría**: Todos, Retratos, Abstract, Naturaleza, Urbano
- ✅ **Sistema de carrito** con LocalStorage
- ✅ **Checkout completo** con formulario de datos
- ✅ **Integración WhatsApp** para envío de pedidos
- ✅ **Integración Email** como alternativa
- ✅ **Números de pedido** únicos generados automáticamente
- ✅ **Confirmación visual** de compra

### 🎯 Mejoras de UX
- **Efecto ripple** en todos los botones
- **Parallax** en sección hero
- **Lazy loading** de imágenes
- **Animaciones al scroll** (fade in al entrar en viewport)
- **Scroll suave** con offset para navbar fijo
- **Notificaciones mejoradas** con iconos y gradientes
- **Indicador de carga** al procesar pedidos
- **100% Responsive** en todos los dispositivos

### 📱 Secciones
1. **Hero** - Presentación con efectos visuales
2. **Acerca de** - Información del artista con estadísticas
3. **Galería** - Exhibición de arte con marcos coloridos
4. **Tienda** - Sistema completo de ventas (overlay modal)
5. **Contacto** - Formulario y enlaces sociales
6. **Instagram Widget** - Integración con redes sociales

## 🚀 Demo en Vivo

👉 [Ver página en GitHub Pages](https://josedavidosorio2005.github.io/Requerimientos-P-gina-Web-para-Artista/)

## 🛠️ Tecnologías

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Animaciones, gradientes, glassmorphism
- **JavaScript ES6** - Lógica interactiva y carrito

### Características Técnicas
- **CSS Variables** para temas consistentes
- **IntersectionObserver** para animaciones eficientes
- **LocalStorage** para persistencia de carrito
- **Fetch API** (preparado para backend)
- **Font Awesome** para iconografía

## 📦 Instalación

### 1. Clonar el repositorio
\\\ash
git clone https://github.com/josedavidosorio2005/Requerimientos-P-gina-Web-para-Artista.git
cd Requerimientos-P-gina-Web-para-Artista
\\\

### 2. Abrir en navegador
\\\ash
# Opción 1: Abrir directamente
start index.html

# Opción 2: Con servidor local (recomendado)
npx http-server
\\\

### 3. Configurar datos personales

#### WhatsApp (script.js línea ~965)
\\\javascript
const phone = '34612345678'; // Tu número en formato internacional
\\\

#### Email (script.js línea ~971)
\\\javascript
const mailtoUrl = \\\mailto:tu@email.com?subject=...\\\;
\\\

## 📂 Estructura del Proyecto

\\\
tatuador/
├── index.html                      # Página principal
├── styles.css                      # Estilos completos (2900+ líneas)
├── script.js                       # Funcionalidad (1200+ líneas)
├── config.js                       # Configuración
├── SISTEMA_VENTAS.md              # Documentación del sistema de ventas
├── INSTRUCCIONES_INSTAGRAM.md     # Guía de integración Instagram
├── SEGURIDAD_Y_MEJORAS.md         # Notas de seguridad
└── images/
    ├── gallery/                    # Imágenes de galería
    └── profile/                    # Foto de perfil
\\\

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Rosa Vibrante | \#ff006e\ | Primary, acentos |
| Púrpura | \#7209b7\ | Secondary, fondos |
| Rosa Coral | \#f72585\ | Accent, hovers |
| Púrpura Oscuro | \#560bad\ | Dark, sombras |

## 🔧 Uso del Sistema de Ventas

### Para Clientes

1. **Navegar a Tienda**
   - Click en \"Tienda\" en el menú superior
   - Explorar productos con badges (Popular, Bestseller, etc.)

2. **Añadir al Carrito**
   - Click en \"Comprar Ahora\"
   - Ver carrito con icono de bolsa (muestra contador)

3. **Gestionar Carrito**
   - Aumentar/disminuir cantidad con + / -
   - Eliminar productos con icono de basura
   - Ver total actualizado en tiempo real

4. **Checkout**
   - Click en \"Ir a Checkout\"
   - Completar formulario (nombre, email, teléfono, ciudad)
   - Seleccionar método: WhatsApp o Email
   - Click en \"Finalizar Pedido\"

5. **Confirmación**
   - Recibir número de pedido único
   - Mensaje se abre automáticamente en WhatsApp o email
   - Carrito se limpia automáticamente

### Para el Artista

Ver documentación completa en [SISTEMA_VENTAS.md](SISTEMA_VENTAS.md)

## 📱 Responsive Design

La página se adapta perfectamente a:
- 💻 **Desktop** (1920px+)
- 💻 **Laptop** (1366px - 1920px)
- 📱 **Tablet** (768px - 1366px)
- 📱 **Mobile** (320px - 768px)

## ⚡ Optimizaciones de Rendimiento

- ✅ **Lazy Loading** de imágenes
- ✅ **will-change** para animaciones
- ✅ **requestAnimationFrame** para scroll
- ✅ **Debounce** en eventos de scroll
- ✅ **CSS Transform** en lugar de position
- ✅ **Minificación** lista para producción

## 🔒 Seguridad

- Validación de formularios en cliente
- Sanitización de inputs
- HTTPS recomendado para producción
- LocalStorage encriptado (opcional)

Ver [SEGURIDAD_Y_MEJORAS.md](SEGURIDAD_Y_MEJORAS.md) para más detalles.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👨‍💻 Autor

**Jose David Osorio**
- GitHub: [@josedavidosorio2005](https://github.com/josedavidosorio2005)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea tu rama (\git checkout -b feature/AmazingFeature\)
3. Commit tus cambios (\git commit -m 'Add: AmazingFeature'\)
4. Push a la rama (\git push origin feature/AmazingFeature\)
5. Abre un Pull Request

## 📝 Changelog

### v2.0.0 (2024)
- ✨ Sistema completo de ventas
- ✨ Checkout con WhatsApp/Email
- ✨ Carrito con gestión completa
- ✨ Efectos ripple en botones
- ✨ Parallax y lazy loading
- ✨ Animaciones al scroll
- ✨ Notificaciones mejoradas
- 🎨 Diseño glassmorphism

### v1.0.0 (2024)
- 🎉 Lanzamiento inicial
- 🎨 Diseño vibrante
- 🖼️ Galería de arte
- 📱 Responsive design

## 🙏 Agradecimientos

- Font Awesome por los iconos
- Google Fonts por las tipografías
- Comunidad de GitHub por feedback

## 📞 Soporte

¿Necesitas ayuda? Abre un [Issue](https://github.com/josedavidosorio2005/Requerimientos-P-gina-Web-para-Artista/issues)

---

⭐ **¡Si te gustó este proyecto, dale una estrella!** ⭐
