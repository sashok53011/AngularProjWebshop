@echo off
chcp 65001 >nul
title Angular Webshop - Production Build
echo ============================================
echo  Сборка продакшн-версии (ng build)
echo ============================================
if not exist node_modules (
  echo Зависимости не установлены, выполняется npm install...
  call npm install || goto :error
)
call npm run build || goto :error
echo.
echo Готово: артефакты находятся в папке dist\
pause
goto :end

:error
echo.
echo Ошибка: сборка завершилась с ошибкой.
pause
exit /b 1

:end
