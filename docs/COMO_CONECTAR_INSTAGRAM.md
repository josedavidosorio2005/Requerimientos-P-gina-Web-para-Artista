# 📸 Cómo Conectar Tus Publicaciones Reales de Instagram

Tu web ya está preparada para mostrar tus publicaciones de Instagram automáticamente. Hay 2 opciones:

---

## ✅ OPCIÓN 1: Widget Automático (RECOMENDADA - Más Fácil)

**Esta es la opción más simple y ya está casi lista.** Solo necesitas:

### Paso 1: Obtener tu Widget Personalizado

1. **Ve a cualquiera de estos servicios (todos son gratis):**
   
   - **LightWidget** (Recomendado): https://lightwidget.com
   - **SnapWidget**: https://snapwidget.com
   - **Elfsight**: https://elfsight.com/instagram-feed-instashow/
   - **InstaShow**: https://instashow.com

2. **Conecta tu cuenta de Instagram** (te pedirá iniciar sesión)

3. **Personaliza tu feed:**
   - Número de fotos: 6-12
   - Diseño: Grid (cuadrícula)
   - Tamaño: Responsive
   - Tema: Oscuro o claro (según tu preferencia)

4. **Copia el código que te dan** (será algo como `<iframe src="...">`)

### Paso 2: Reemplazar en tu Web

1. **Abre el archivo:** `index.html`

2. **Busca la línea 142** (aproximadamente) que dice:
   ```html
   <iframe src="https://cdn.lightwidget.com/widgets/...
   ```

3. **Reemplaza todo el `<iframe>` con el código que copiaste**

4. **Guarda el archivo** ¡Y LISTO! 🎉

**Ventajas:**
- ✅ Se actualiza automáticamente cada vez que publicas
- ✅ No necesitas configurar APIs ni tokens
- ✅ Funciona inmediatamente
- ✅ Responsive (se adapta a móviles)
- ✅ Sin programación

---

## 🔧 OPCIÓN 2: API de Instagram (Avanzado - Mayor Control)

**Solo usa esta opción si quieres control total sobre el diseño.**

### Requisitos:
- Cuenta de Facebook Developer
- Conocimientos técnicos básicos
- 30-60 minutos de configuración

### Paso 1: Crear App de Facebook

1. Ve a: https://developers.facebook.com/apps
2. Crea una nueva app (tipo "Consumer")
3. Añade el producto "Instagram Basic Display"

### Paso 2: Configurar Instagram Basic Display

1. En el panel de tu app, busca "Instagram Basic Display"
2. Haz clic en "Settings"
3. Completa:
   - **Valid OAuth Redirect URIs**: Tu URL del sitio web
   - **Deauthorize Callback URL**: Tu URL del sitio web
   - **Data Deletion Request URL**: Tu URL del sitio web

### Paso 3: Crear Usuario de Prueba

1. En "Roles" > "Instagram Testers"
2. Añade tu cuenta de Instagram
3. Acepta la invitación en Instagram (Settings > Apps and Websites > Tester Invites)

### Paso 4: Obtener Access Token

1. Ve a "Basic Display" > "User Token Generator"
2. Haz clic en "Generate Token"
3. Inicia sesión con tu Instagram
4. Copia el **Access Token** (texto largo)
5. Copia el **User ID** (número)

### Paso 5: Configurar en tu Web

1. **Abre:** `config.js`

2. **Busca la sección de Instagram** (línea 23 aprox):
   ```javascript
   instagram: {
       username: 'boceto.juangiraldo',
       url: 'https://www.instagram.com/boceto.juangiraldo',
       useAPI: false,  // ← Cambia a true
       accessToken: null,  // ← Pega tu token aquí
       userId: null,  // ← Pega tu ID aquí
       maxPosts: 12
   }
   ```

3. **Modifica:**
   ```javascript
   useAPI: true,
   accessToken: 'IGQVJXabc123...',  // Tu token
   userId: '17841401234567890',  // Tu ID
   maxPosts: 12  // Número de publicaciones
   ```

4. **Guarda el archivo**

### Paso 6: Ocultar el Widget en HTML

1. **Abre:** `index.html`
2. **Busca la línea 142** (el iframe de LightWidget)
3. **Comenta o elimina esas líneas:**
   ```html
   <!-- <script src="https://cdn.lightwidget.com..."></script> -->
   <!-- <iframe src="https://cdn.lightwidget.com..."></iframe> -->
   ```

**Ventajas:**
- ✅ Control total del diseño
- ✅ Acceso a datos adicionales (likes, comentarios)
- ✅ Personalización ilimitada
- ⚠️ Requiere renovar token cada 60 días

---

## 🆘 Solución de Problemas

### El feed no se muestra

1. **Verifica tu conexión a Internet**
2. **Revisa la consola del navegador** (F12 > Console)
3. **Asegúrate de que tu Instagram es público**

### "Access token expired"

- Los tokens de Instagram expiran cada 60 días
- Genera uno nuevo siguiendo el Paso 4
- Actualiza el token en `config.js`

### "No se pudieron cargar publicaciones"

- Verifica que el Access Token sea correcto
- Asegúrate de que tu cuenta de Instagram es pública
- Comprueba que la API de Instagram esté activa

---

## 📋 Comparación Rápida

| Característica | Widget (Opción 1) | API (Opción 2) |
|----------------|-------------------|----------------|
| Dificultad | ⭐ Fácil | ⭐⭐⭐ Difícil |
| Tiempo setup | 5 minutos | 30-60 minutos |
| Auto-actualización | ✅ Sí | ✅ Sí (cada 30 min) |
| Mantenimiento | Ninguno | Renovar token cada 60 días |
| Personalización | Limitada | Total |
| Costo | Gratis | Gratis |

---

## 🎯 Recomendación

**Para la mayoría de usuarios: OPCIÓN 1 (Widget)**

Es más simple, funciona inmediatamente, y no requiere mantenimiento. Los widgets modernos son hermosos y completamente funcionales.

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:

1. Lee los mensajes de error en la consola (F12)
2. Verifica que seguiste todos los pasos
3. Revisa que tu Instagram sea público
4. Prueba con el widget primero (más fácil)

---

## 🔄 Auto-actualización

**Ambas opciones se actualizan automáticamente:**

- **Widget**: Se actualiza cada vez que Instagram sincroniza (cada pocos minutos)
- **API**: Se actualiza cada 30 minutos automáticamente

¡No necesitas hacer nada más después de configurar!

---

**¡Tu feed de Instagram quedará espectacular! 🎨✨**
