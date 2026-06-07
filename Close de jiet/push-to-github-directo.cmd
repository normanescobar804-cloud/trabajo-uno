@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"
echo Conectando con el repositorio remoto...

git remote remove origin 2>nul
git remote add origin https://github.com/normanescobar804-cloud/Tienda-de-JIET.git
git branch -M main
echo Agregando archivos al commit...
git add .
git commit -m "Subiendo proyecto a GitHub" 2>nul
echo Empujando a GitHub...
git push -u origin main
echo.
echo Si te pide usuario/contraseña, usa tu usuario de GitHub y un token personal como contraseña.
echo Presiona una tecla para cerrar...
	pause >nul
