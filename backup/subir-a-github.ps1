# Script para subir el proyecto a GitHub (PowerShell)
# Repositorio: https://github.com/josedavidosorio2005/Requerimientos-P-gina-Web-para-Artista

Write-Host "🚀 Subiendo proyecto a GitHub..." -ForegroundColor Cyan

# 1. Verificar si git está instalado
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git no está instalado. Instálalo desde: https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

# 2. Inicializar repositorio si no existe
if (-not (Test-Path .git)) {
    Write-Host "📦 Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
}

# 3. Configurar usuario de Git (si no está configurado)
$gitUser = git config user.name
if ([string]::IsNullOrEmpty($gitUser)) {
    Write-Host "⚙️  Configurando Git..." -ForegroundColor Yellow
    $userName = Read-Host "Introduce tu nombre de GitHub"
    $userEmail = Read-Host "Introduce tu email de GitHub"
    git config user.name $userName
    git config user.email $userEmail
}

# 4. Añadir remoto (eliminar si ya existe)
Write-Host "🔗 Configurando repositorio remoto..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/josedavidosorio2005/Requerimientos-P-gina-Web-para-Artista.git

# 5. Crear .gitignore si no existe
if (-not (Test-Path .gitignore)) {
    Write-Host "📝 Creando .gitignore..." -ForegroundColor Yellow
    @"
# Node modules
node_modules/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Temporal
*.tmp
*.temp
"@ | Out-File -FilePath .gitignore -Encoding UTF8
}

# 6. Añadir todos los archivos
Write-Host "📁 Añadiendo archivos al commit..." -ForegroundColor Yellow
git add .

# 7. Crear commit
Write-Host "💾 Creando commit..." -ForegroundColor Yellow
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
- LocalStorage para persistencia

Estructura del proyecto:
- index.html: Estructura principal
- styles.css: Estilos responsive
- script.js: Lógica y funcionalidades
- config.js: Configuración personalizable
- README.md: Documentación completa"

# 8. Cambiar a rama main
Write-Host "🌿 Cambiando a rama main..." -ForegroundColor Yellow
git branch -M main

# 9. Subir al repositorio
Write-Host "⬆️  Subiendo a GitHub..." -ForegroundColor Yellow
Write-Host "Nota: Si te pide credenciales, usa tu Personal Access Token, no tu contraseña." -ForegroundColor Cyan
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ ¡Proyecto subido exitosamente!" -ForegroundColor Green
    Write-Host "🌐 Ver en: https://github.com/josedavidosorio2005/Requerimientos-P-gina-Web-para-Artista" -ForegroundColor Green
    Write-Host "`n💡 Próximos pasos:" -ForegroundColor Cyan
    Write-Host "   1. Ve al repositorio en GitHub" -ForegroundColor White
    Write-Host "   2. Ve a Settings > Pages" -ForegroundColor White
    Write-Host "   3. Selecciona 'main' como fuente" -ForegroundColor White
    Write-Host "   4. Tu página estará en: https://josedavidosorio2005.github.io/Requerimientos-P-gina-Web-para-Artista/" -ForegroundColor White
} else {
    Write-Host "`n❌ Error al subir. Verifica tus credenciales." -ForegroundColor Red
    Write-Host "💡 Para crear un Personal Access Token:" -ForegroundColor Yellow
    Write-Host "   1. Ve a GitHub.com > Settings > Developer settings > Personal access tokens" -ForegroundColor White
    Write-Host "   2. Genera un nuevo token con permisos 'repo'" -ForegroundColor White
    Write-Host "   3. Usa ese token como contraseña cuando git te lo pida" -ForegroundColor White
}
