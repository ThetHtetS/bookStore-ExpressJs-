## Bookstore Rest API using Express Js and Mongo DB

In this porject, Token base authenticaton is used (josnwebtoken library),
NoSql Database (Mongo DB) , and password hash usin bcript library
and MVC design pattern is used.
For checking auth, verifyusertoken and verifyadmintoken middleware are used.


## Route

All Http method are supported, you can use http or https for your request


GET     /books                   //get all book   <br>
POST    /books                   //add new book
GET     /books/:id               // get book By ID
GET     /books/title/:title      // search book by title
PUT     /books/:id              //update book
DELETE  /books/:id              //delete book
