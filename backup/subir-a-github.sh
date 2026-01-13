# Script para subir el proyecto a GitHub
# Repositorio: https://github.com/josedavidosorio2005/Requerimientos-P-gina-Web-para-Artista

# 1. Inicializar repositorio git (si no está inicializado)
git init

# 2. Añadir el repositorio remoto
git remote add origin https://github.com/josedavidosorio2005/Requerimientos-P-gina-Web-para-Artista.git

# 3. Añadir todos los archivos
git add .

# 4. Crear commit
git commit -m "Página web completa para Boceto Juan Giraldo - Artista Tatuador

Características implementadas:
- HTML5 semántico con accesibilidad (WCAG 2.1)
- Sistema de carrito de compras funcional
- Formulario de contacto con validación
- Integración con Instagram
- Galería con filtros por categoría
- Tienda online
- Diseño responsive
- Mejores prácticas de seguridad (XSS prevention, sanitización)
- SEO optimizado
- Performance optimizado
- Sistema de notificaciones
- Código modular y documentado (JSDoc)

Tecnologías:
- Vanilla JavaScript (ES6+)
- CSS3 con variables y animaciones
- Font Awesome para iconos
- LocalStorage para persistencia"

# 5. Cambiar a rama main (por si está en master)
git branch -M main

# 6. Subir al repositorio
git push -u origin main --force
