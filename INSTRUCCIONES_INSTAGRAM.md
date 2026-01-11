# 📸 Cómo Conectar Instagram a Tu Web

## Opción 1: Instagram Basic Display API (Gratis)

### Pasos para obtener tu Access Token:

1. **Crear una App de Facebook**
   - Ve a [Facebook Developers](https://developers.facebook.com/)
   - Crea una cuenta de desarrollador si no tienes
   - Crea una nueva app
   - Selecciona "Consumer" como tipo de app

2. **Configurar Instagram Basic Display**
   - En el panel de tu app, añade "Instagram Basic Display"
   - Completa la información requerida
   - Añade tu URL de redirección (tu sitio web)

3. **Obtener el Access Token**
   - En Instagram Basic Display Settings, crea una nueva "Instagram Test User"
   - Acepta la invitación desde tu cuenta de Instagram
   - Genera el Access Token
   - Copia el token

4. **Integrar en tu Web**
   Abre `script.js` y reemplaza:
   ```javascript
   const instagramToken = 'TU_TOKEN_AQUI';
   const instagramUserId = 'TU_USER_ID';
   ```

5. **Activar la integración**
   Descomenta esta línea en `script.js`:
   ```javascript
   // instagramFeed(); // <- Quita las barras //
   ```

## Opción 2: Widget de Instagram (Más Fácil)

### Usar un servicio de terceros:

1. **SnapWidget** (gratis hasta 50 imágenes)
   - Ve a [snapwidget.com](https://snapwidget.com/)
   - Conecta tu cuenta de Instagram
   - Personaliza el widget
   - Copia el código HTML
   - Pégalo en la sección de galería de `index.html`

2. **Elfsight Instagram Feed** (tiene plan gratuito)
   - Ve a [elfsight.com](https://elfsight.com/instagram-feed-instashow/)
   - Crea tu widget
   - Copia el código de integración
   - Pégalo en tu HTML

3. **Juicer.io** (opción completa)
   - Conecta varias redes sociales
   - Actualización automática
   - Personalizable

## Opción 3: Instagram Embed (Más Simple)

Para posts individuales:

1. Abre el post en Instagram (web)
2. Haz clic en los tres puntos (...)
3. Selecciona "Incorporar"
4. Copia el código
5. Pégalo en tu HTML donde quieras mostrar el post

## Ejemplo de Código para API

```javascript
const cargarInstagram = async () => {
    const token = 'TU_TOKEN';
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const galleryGrid = document.getElementById('galleryGrid');
        galleryGrid.innerHTML = ''; // Limpiar galería
        
        data.data.forEach(post => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `
                <img src="${post.media_url}" alt="${post.caption || 'Tatuaje'}">
            `;
            galleryGrid.appendChild(item);
        });
    } catch (error) {
        console.error('Error cargando Instagram:', error);
    }
};
```

## Recomendación

Para empezar rápido, usa **SnapWidget** o **Instagram Embed**. 
Para control total, usa la **API de Instagram**.

## Limitaciones a tener en cuenta

- Los tokens de Instagram expiran cada 60 días
- Necesitas renovarlos manualmente o configurar renovación automática
- La API tiene límites de llamadas por hora
- Los widgets de terceros pueden tener marca de agua en versión gratuita

## Soporte

Si necesitas ayuda, contacta con:
- [Instagram Developer Docs](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Facebook Developer Support](https://developers.facebook.com/support/)
