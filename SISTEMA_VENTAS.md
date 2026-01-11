# 🛍️ Sistema de Ventas Completo

## ✨ Características Implementadas

### 🎨 Diseño Fluido
- **Animaciones suaves** en todos los elementos
- **Efecto ripple** en botones al hacer clic
- **Parallax** en la sección hero
- **Transiciones** optimizadas para mejor rendimiento
- **Glassmorphism** en modales y cards

### 🛒 Sistema de Carrito
- ✅ Añadir productos al carrito
- ✅ Actualizar cantidad (+/-)
- ✅ Eliminar productos
- ✅ Persistencia con LocalStorage
- ✅ Contador en tiempo real
- ✅ Cálculo automático de totales

### 💳 Proceso de Checkout
1. **Botón "Ir a Checkout"** desde el carrito
2. **Formulario completo** con validación
3. **Métodos de pago**: WhatsApp y Email
4. **Generación de número de pedido** único
5. **Confirmación visual** con modal

### 📱 Integración WhatsApp
- Envío automático de pedidos vía WhatsApp
- Formato profesional del mensaje
- Incluye todos los detalles del pedido

### 📧 Integración Email
- Opción alternativa para pedidos por correo
- Formato estructurado del mensaje

### 🎯 Mejoras de UX
- **Lazy loading** de imágenes
- **Scroll suave** con offset para navbar
- **Animaciones al scroll** (fade in)
- **Notificaciones mejoradas** con iconos
- **Indicador de carga** al procesar pedidos
- **Responsive** en todos los dispositivos

## 🚀 Cómo Usar

### Para el Cliente

1. **Explorar Productos**
   - Click en "Tienda" en el menú
   - Filtrar por categorías: Todos, Retratos, Abstract, Naturaleza, Urbano

2. **Añadir al Carrito**
   - Click en "Comprar Ahora"
   - Ajustar cantidad con los botones + y -
   - Eliminar productos si es necesario

3. **Finalizar Compra**
   - Click en "Ir a Checkout"
   - Completar formulario con datos personales
   - Seleccionar método de contacto (WhatsApp o Email)
   - Click en "Finalizar Pedido"

4. **Recibir Confirmación**
   - Número de pedido único
   - Mensaje se abre en WhatsApp o cliente de email

### Para el Artista (Configuración)

#### Cambiar Número de WhatsApp
En el archivo `script.js`, línea ~965:
```javascript
const phone = '34600000000'; // Cambiar por tu número (formato internacional)
```
Ejemplo: Para España: `34612345678`, Para México: `52155123456789`

#### Cambiar Email
En el archivo `script.js`, línea ~971:
```javascript
const mailtoUrl = `mailto:contacto@ejemplo.com?subject=...`;
```
Cambiar `contacto@ejemplo.com` por tu email real.

#### Añadir/Modificar Productos
En el archivo `index.html`, buscar la sección de productos:
```html
<div class='producto-card-modern'>
    <span class='badge-popular'>Popular</span>
    <div class='icon-wrapper'>
        <i class='fas fa-palette'></i>
    </div>
    <h3>Retrato Profesional</h3>
    <p>Retrato detallado en lápiz grafito</p>
    <div class='precio'>€150</div>
    <button class='btn-comprar-modern' data-producto='Retrato Profesional' data-precio='€150'>
        Comprar Ahora
    </button>
</div>
```

## 🎨 Paleta de Colores

- **Primary**: #ff006e (Rosa vibrante)
- **Secondary**: #7209b7 (Púrpura)
- **Accent**: #f72585 (Rosa coral)
- **Dark**: #560bad (Púrpura oscuro)

## 📦 Badges Disponibles

- `.badge-popular` - Fondo rosa
- `.badge-bestseller` - Fondo morado
- `.badge-exclusive` - Fondo dorado
- `.badge-hot` - Fondo naranja
- `.badge-save` - Fondo verde

## 🔧 Archivos Modificados

1. **index.html**
   - Estructura de tienda overlay
   - Modal de carrito
   - Modal de checkout
   - Modal de confirmación

2. **styles.css**
   - Sistema completo de estilos
   - Animaciones y transiciones
   - Responsive design
   - Efectos glassmorphism

3. **script.js**
   - Clase CartMejorado
   - Clase CheckoutController
   - Efectos ripple
   - Lazy loading
   - Parallax
   - Sistema de notificaciones

## 📱 Responsive

La página es totalmente responsive:
- **Desktop**: Layout completo con grid
- **Tablet**: Adaptación de columnas
- **Mobile**: Stack vertical optimizado

## ⚡ Optimizaciones

- **will-change** en elementos animados
- **IntersectionObserver** para animaciones
- **requestAnimationFrame** para parallax
- **LocalStorage** para persistencia
- **Lazy loading** de imágenes

## 🎯 Próximas Mejoras (Opcional)

- [ ] Sistema de descuentos
- [ ] Cupones de descuento
- [ ] Galería de imágenes por producto
- [ ] Sistema de reviews
- [ ] Backend real para gestión de pedidos
- [ ] Panel de administración

## 📞 Soporte

Para modificar cualquier aspecto del sistema de ventas, consulta los comentarios en el código o contacta al desarrollador.

---

**Versión**: 2.0  
**Última actualización**: 2024  
**Desarrollado con**: HTML5, CSS3, JavaScript ES6
