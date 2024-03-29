## Bookstore Rest API using Express Js and Mongo DB

In this porject, Token base authenticaton is used (josnwebtoken library),
NoSql Database (Mongo DB) , and password hash using bcript library
and MVC design pattern is used.
For checking auth, verifyusertoken and verifyadmintoken middleware are used.

## Route

All Http method are supported, you can use http or https for your request

## Books

GET /books --get all book <br>
POST /books --add new book <br>
GET /books/:id --get book By ID <br>
GET /books/title/:title -- search book by title <br>
PUT /books/:id --update book <br>
DELETE /books/:id --delete book <br>

## Category

GET /category <br>
GET /category/id <br>
POST /category <br>
PUT /category/id <br>
Delete /category/id <br>

## Order

GET /orders <br>
POST /orders <br>
GET /orders/id <br>
PUT /orders/id --update order status <br>
GET /users/userId/orders --get order by userId <br>
GET /orders?createdAt[gte]=${date.start}&createdAt[lt]=${date.end} -- get order between two date <br>
GET /orders?status=value -- get order by status (pending or finish) <br>
GET /orders/monthly/year --get order monthly total

## Review

GET /review/bookId --get review by book id <br>
POST /review -- save review <br>
DELETE /review <br>

## User

GET /users --get all user <br>
POST /users -- register user <br>
POST /users/login -- login <br>
GET /users/length -- get number of total user <br>
