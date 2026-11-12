@echo off
chcp 65001 >nul
title Angular Webshop - Dev Server
echo ============================================
echo  Запуск dev-сервера Angular (ng serve)
echo ============================================
if not exist node_modules (
  echo Зависимости не установлены, выполняется npm install...
  call npm install || goto :error
)
call npm start || goto :error
goto :end

:error
echo.
echo Ошибка: не удалось запустить приложение.
pause
exit /b 1

:end
