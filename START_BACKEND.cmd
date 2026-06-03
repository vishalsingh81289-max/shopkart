@echo off
echo ============================================
echo  ShopKart Backend
echo ============================================
echo.
echo Starting Spring Boot backend on port 8080...
echo.
cd /d "%~dp0backend"
call mvn spring-boot:run
