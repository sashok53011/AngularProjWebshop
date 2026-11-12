# Angular Webshop («Mein e-shop»)

Учебный интернет-магазин на **Angular 20**, созданный как практический проект по главам книги (HTTP-запросы, маршрутизация, формы, обработка ошибок, Angular Material). Данные о товарах берутся из публичного тестового API [fakestoreapi.com](https://fakestoreapi.com).

## Возможности

- Список товаров с загрузкой через **Resolver** (prefetching) и сортировкой (`SortPipe`)
- Карточка товара: изменение цены (PATCH), удаление (DELETE), добавление в корзину со Snackbar-уведомлением
- Создание товара с реактивной формой и кастомным валидатором цены (`priceMaximumValidator(1000)`)
- Корзина (`FormArray` для количества), доступная только после входа
- Аутентификация через токен (сигналы `signal` / `computed`)
- Глобальная обработка ошибок (`ErrorHandler`)
- Lazy loading маршрута профиля (`loadChildren`)
- Guard'ы: `authGuard` (canActivate / canMatch), `checkoutGuard` (canDeactivate, диалог подтверждения)
- UI на **Angular Material** (тулбар, таблица, диалог, снекбар, бейдж)

## Стек

| Компонент | Версия |
|---|---|
| Angular | 20.3 |
| Angular Material / CDK | 20.2 |
| RxJS | 7.8 |
| TypeScript | 5.9 |
| zone.js | 0.15 |
| Тесты | Karma + Jasmine |

## Быстрый старт

### Вариант 1: ярлыки (Windows)

В корне проекта созданы файлы-ярлыки — двойной клик запускает нужный процесс:

| Файл | Что делает |
|---|---|
| `start.bat` | Запуск dev-сервера (`ng serve`) на http://localhost:4200/ |
| `test.bat` | Запуск unit-тестов (`ng test`, Karma + Jasmine) |
| `build.bat` | Продакшн-сборка (`ng build`) в папку `dist/` |

При первом запуске ярлык автоматически выполнит `npm install`, если зависимости ещё не установлены.

### Вариант 2: командная строка

```bash
# установка зависимостей
npm install

# dev-сервер (http://localhost:4200/)
npm start

# unit-тесты
npm test

# продакшн-сборка (артефакты в dist/)
npm run build
```

## Структура проекта

```
src/app/
├── app.ts / app.html / app.css     # Оболочка: тулбар, навигация, футер
├── app.routes.ts                   # Маршруты приложения
├── app.config.ts                   # Провайдеры (router, http, settings, ErrorHandler)
├── app.setting.ts                  # InjectionToken APP_SETTINGS (title, version, apiUrl)
├── app-error-handler.ts            # Глобальный ErrorHandler
│
├── products.ts                     # Сервис товаров (CRUD + локальный кэш)
├── product.ts                     # Интерфейс Product
├── products-resolver.ts            # Resolver для prefetching списка товаров
├── auth.ts                         # Сервис аутентификации (сигналы)
├── auth-guard.ts                   # Guard: canActivate / canMatch
├── checkout-guard.ts               # Guard: canDeactivate (диалог при уходе из корзины)
├── cart-serv.ts                    # Сервис корзины (POST/PUT через defer)
├── cart-int.ts                     # Интерфейс корзины
│
├── product-list/                   # Список товаров
├── product-detail/                 # Детали товара (цена, удаление, в корзину)
├── product-create/                 # Форма создания товара
├── cart/                           # Корзина (FormArray)
├── checkout/                       # Диалог подтверждения (MatDialog)
├── auth-comp/                      # Кнопка входа/выхода
├── user/ + user.routes.ts          # Профиль (lazy route)
├── key-logger/                     # Демо: перехват клавиш (fromEvent + RxJS)
│
├── sort-pipe.ts                    # Пайп сортировки товаров
├── price-maximum.validator.ts      # Кастомный валидатор цены
├── price-maximum.ts                # Директива-обёртка валидатора (NG_VALIDATORS)
├── copyright.ts                    # Директива для футера
```

## Маршруты

| Путь | Компонент | Доступ |
|---|---|---|
| `/products` | Список товаров (resolver) | открыт |
| `/products/new` | Создание товара | открыт |
| `/products/:id` | Детали товара | открыт |
| `/cart` | Корзина | `authGuard` + `checkoutGuard` |
| `/user` | Профиль (lazy) | `authGuard` (canMatch) |
| `""`, `**` | редирект на `/products` | — |

## Ключевые моменты реализации

- **Кэш товаров** — `Products` хранит загруженные товары в массиве; повторные запросы идут из кэша.
- **Сигналы** — токен авторизации хранится в `signal`, состояние входа — `computed`.
- **RxJS** — `defer` в корзине выбирает POST/PUT, `switchMap` в деталях товара реагирует на смену параметра маршрута.
- **Guard'ы** — функциональные, с `inject()`; `checkoutGuard` открывает `MatDialog` вместо нативного `confirm`.
- **Конфигурация** — настройки приложения предоставляются через `InjectionToken`.

## Тесты

```bash
npm test
```

Тесты (Karma + Jasmine) — для каждого компонента/сервиса есть файл `*.spec.ts`.

## Полезные команды Angular CLI

```bash
ng generate component component-name   # новый компонент
ng generate service service-name       # новый сервис
ng build --watch --configuration development  # сборка в режиме наблюдения
```
