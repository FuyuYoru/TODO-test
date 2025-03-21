Развертывание проекта

SERVER:

1) git clone https://github.com/FuyuYoru/TODO-test.git .

2) cd server

3) npm install

4) Создайте файл .env

5) Заполнить файл следующими полями:

NODE_ENV='development'

DATABASE_URL="postgresql://ЛОГИН:ПАРОЛЬ@localhost:5432/НАЗВАНИЕ БД"

JWT_SECRET=""

6) Миграция базы данных:

npx prisma migrate dev

7) В проекте имеется скрипт seedDB для заполнения базы данных

npm run seedDB


8) npx prisma generate

9) Запуск проекта: 

npm run start

CLIENT:

1) Перейдите в папку проекта:

cd client

2) Установите зависимости

npm install

3) Создайте файл .env для клиента

VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENV=development

4) Запуск проекта:

npm run dev
