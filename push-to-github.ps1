param(
    [Parameter(Mandatory=$false)]
    [string]$RemoteUrl
)

# Asegura que el script se ejecute desde la carpeta del script
Set-Location -Path $PSScriptRoot

# Añadir rutas comunes de Git al PATH de esta sesión para detectar git.exe
$commonGitDirs = @(
    'C:\Program Files\Git\cmd',
    'C:\Program Files\Git\bin',
    'C:\Program Files (x86)\Git\cmd',
    'C:\Program Files (x86)\Git\bin'
)
foreach ($d in $commonGitDirs) {
    if ((Test-Path $d) -and (-not ($env:Path -match [regex]::Escape($d)))) {
        $env:Path = "$d;" + $env:Path
    }
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Error 'Git no está disponible en PATH. Instala Git y vuelve a ejecutar este script.'
    exit 1
}

# Inicializar repo si es necesario
if (-not (Test-Path .git)) {
    git init
    Write-Host 'Repositorio Git inicializado.'
} else {
    Write-Host '.git ya existe - usando repo existente.'
}

# Configurar user si no está seteado (opcional)
if (-not (git config user.email)) {
    git config user.email 'you@example.com'
    Write-Host 'Configurado user.email por defecto. Edita si quieres usar tu email real.'
}
if (-not (git config user.name)) {
    git config user.name 'Your Name'
    Write-Host 'Configurado user.name por defecto. Edita si quieres usar tu nombre real.'
}

# Añadir archivos y commitear si no hay commits
$hasHead = $true
try {
    git rev-parse --verify HEAD > $null 2>&1
} catch {
    $hasHead = $false
}

# Añadir ruta segura para evitar 'detected dubious ownership' en ciertos entornos
try {
    $pwdPath = (Get-Location).Path
    $pwdPathForward = $pwdPath -replace '\\','/'
    git config --global --add safe.directory "$pwdPath" 2>$null
    git config --global --add safe.directory "$pwdPathForward" 2>$null
} catch {}

git add .
if (-not $hasHead) {
    git commit -m 'Initial commit: sitio El Close de Jiet'
    Write-Host 'Primer commit creado.'
} else {
    git commit -m 'Update site' --allow-empty -q 2>$null | Out-Null
    Write-Host 'Commit creado (o actualizado).'
}

if (-not $RemoteUrl) {
    Write-Host 'No se proporcionó URL remota. Pasa la URL como argumento: .\push-to-github.ps1 -RemoteUrl "https://github.com/USUARIO/REPO.git"'
    exit 0
}

# Reemplazar remote origin si existe
try { git remote remove origin 2>$null } catch {}
git remote add origin $RemoteUrl
Write-Host "Remoto 'origin' establecido a: $RemoteUrl"

# Forzar rama main y push
git checkout -B main
Write-Host "Rama local preparada 'main'. Intentando push (pedirá credenciales si aplica)..."

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host 'Push completado correctamente.'
} else {
    Write-Error 'Error al hacer push. Revisa la salida anterior.'
}
