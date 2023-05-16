# Тестове завдання від dzen studio

## Demo
http://docke-loadb-8r52xxw2p8b0-1042232020.eu-north-1.elb.amazonaws.com/

## Викристані технології

### Backend
* TypeScript
* Nest JS
* OOP
* MySQL
* Redis
* TypeORM
* Multer
* Websockets
* Queue
* Cache

### Frontend
* TypeScript
* React
* React Router
* Websockets
* Custom hooks

### Other
* Docker
* Docker compose
* Git

## Короткий опис та особливості
Робота складається з фронт та бекенд частин. Фронт запускається на порту 3000, Бекенд на 5000. Бекенд залежить від підключення до MySQL та Redis. В директорії /server/sql-db представлена модель та зв'язки між таблицями реляційної БД, яку використовує додаток (сумісна з MySQL Workbench).
Таблиця comment являє собою таблицю деревовидної структури. 
API:

GET 200
	
	/api/comment - Останні 25 коментарів і загальна їх кількість

	Query: 
		skip?: number
		sortField?: userName | email | createdAt
		direction?: asc | desc

	Response:
		{
			comment: CommentDto[] | [],
			count: number
		}

	Приклад:
	/api/comment?skip=2&sortField=email&direction=asc
	Поверне другу сторінку коментарів з 25 по 50 або пустий масив, відсортований по полю Email в зростаючому порядку

GET 200
	
	/api/comment/:id - Коментар по заданому ID

	Response:
		data: CommentDto

POST 201
	
	/api/comment/create - Новий коментар

	Response:
		data: CommentDto

GET 200
	
	/api/upload/:id - Завантажений користувачем контент по заданому ID

	Response:
		file: StreamableFile

## Щоб запустити проект через Docker
1. Необхідно, щоб на локальному ПК були вільні порти 3000 (Frontend), 5000 (Backend), 3306 (MySQL), 6379 (Redis) для уникнення конфлікту з Docker контейнерами;
2. На локальному ПК мають бути встановлені Docker, Docker compose;
3. В корні проекту відкрити термінал;
4. Ввести команду `docker-compose up`;
5. Дочекатися пока скачаються та встановляться образи необхідних контейнерів;
6. Перейти в браузері http://localhost:3000 для відображення фронтенд частини додатку;

## Щоб запустити проект на локальному ПК
1. Необхідно, щоб на ПК були встановлені Redis (порт 6379) та MySQL (порт 3306);
2. Замінити значення в файлі /server/.env на :

	* MYSQL_URL=127.0.0.1
	* MYSQL_PASS= <ПАРОЛЬ ВІД КОРИСТУВАЧА ROOT MYSQL>
	* REDIS_URL=127.0.0.1

3. Створити нову базу даних в MySQL під назвою "dzen"
4. Відкрити в терміналі директорію /server
5. Виконати `npm install`
6. Виконати `npm run start:dev`
7. Відкрити в терміналі директорію /client
8. Виконати `npm install`
9. Виконати `npm start`

