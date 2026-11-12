@echo off
chcp 65001 >nul
title Angular Webshop - Unit Tests
echo ============================================
echo  Запуск unit-тестов (Karma + Jasmine)
echo ============================================
if not exist node_modules (
  echo Зависимости не установлены, выполняется npm install...
  call npm install || goto :error
)
call npm test || goto :error
goto :end

:error
echo.
echo Ошибка: тесты завершились с ошибкой.
pause
exit /b 1

:end
