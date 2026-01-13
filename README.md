# Boceto Juan Giraldo — Sitio web (Portafolio)

Sitio web estático (HTML/CSS/JS) con estética **neón + glassmorphism**, diseñado como portafolio profesional de tatuajes.

Incluye:
- **Galería** con categorías (Realismo / Tradicional / Geométrico / Acuarela) y tarjetas con buen contraste.
- **Sección Instagram** (embeds) + botón directo al perfil.
- **Contacto** enfocado en canales reales (WhatsApp / Teléfono / redes).
- **Animaciones seguras** (no dejan secciones invisibles si falla JS) y diseño responsive.
- **SEO/PWA** (robots, sitemap, manifest).

---

## Ejecutar en local

Opción rápida: abre `index.html`.

Recomendado (servidor local):

1) En la carpeta del proyecto ejecuta:

`python -m http.server 8000`

2) Abre:

`http://localhost:8000`

---

## Personalización (lo esencial)

### 1) Redes y contacto

Los enlaces principales están en [index.html](index.html) (sección **Contacto** y el botón de Instagram del menú).

- WhatsApp: usa el formato `https://wa.me/57XXXXXXXXXX`.
- Teléfono: usa `tel:+57XXXXXXXXXX`.
- Instagram/TikTok/Facebook: reemplaza por tus URLs reales.

### 2) Instagram (embeds)

La sección de Instagram usa el script oficial de embed.

- En [index.html](index.html) ubica los `blockquote.instagram-media`.
- Reemplaza cada permalink `https://www.instagram.com/p/INSTAGRAM_POST_ID_X/` por el enlace real del post.
- Mantén el script:
  - `//www.instagram.com/embed.js`

Nota: si no quieres embeds, puedes reemplazar esa sección por imágenes normales de la carpeta `images/`.

### 3) Galería (imágenes)

Actualmente hay tarjetas “placeholder” (para que el diseño se vea bien aunque falten fotos).

Para mostrar trabajos reales:
- Coloca tus imágenes en `images/gallery/`
- Reemplaza los placeholders por `<img src="images/gallery/tu-foto.jpg" alt="...">` dentro de cada `.gallery-item`.

---

## Estructura del proyecto

Carpetas principales:

- `index.html` — página principal
- `css/styles.css` — estilos
- `js/script.js` — interactividad (menú móvil, animaciones, filtros)
- `js/config.js` — configuración (si la usas para centralizar datos)
- `images/` — imágenes del sitio
- `assets/` — archivos SEO/PWA
  - `manifest.json`
  - `robots.txt`
  - `sitemap.xml`
- `docs/` — documentación adicional/histórica (opcional)

---

## Publicar en GitHub Pages

1) Ve a **Settings → Pages** en tu repo.
2) En **Build and deployment** selecciona:
   - **Source**: Deploy from a branch
   - **Branch**: `main` / `root`
3) Espera 1–2 minutos y prueba la URL de GitHub Pages.

Si no ves cambios:
- Fuerza recarga con `Ctrl + F5`.

---

## Notas y solución de problemas

- **El menú móvil no abre**: verifica que cargue `js/script.js` en la parte final del HTML.
- **Cambios de CSS no se ven**: normalmente es caché; usa `Ctrl + F5`.
- **Alguna sección “desaparece”**: el sitio usa animaciones al scroll; están implementadas para no dejar contenido oculto permanentemente.
