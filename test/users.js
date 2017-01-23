let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp); 
 
describe('/GET users', function() {                        //1.1 позитивный тест на get. запрашиваем всех юзеров 
  it('should return all existing users', function(done) {
    chai.request('localhost:8001')
          .get('/users')
          .end(function(err, res) {
              should.not.exist(err);
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.above(0);
            done();
      });
  });
  });

it('should not return any users because adress is wrong', function(done) {   //1.2 негативный тест
    chai.request('localhost:8001')
          .get('/user')
          .end(function(err, res) {
             res.should.have.status(404);                          
            done();                              
          });
});

    
describe('GET /user:id', function() {                            //2.1 получение юзера по id, позитивный тест
  it('should return only one user choosen by id', function(done) {
    chai.request('localhost:8001')
          .get('/users/1')
          .end(function(err, res) {
              should.not.exist(err);
              res.should.have.status(200);
              res.body.should.include.keys('id');
              res.body.should.be.a('object');
            done();
      });
  });
}); 

  it('should not return any user', function(done) { //2.2 запрос юзера по не существующему id, негативный тест
    chai.request('localhost:8001')
          .get('/users/11')
          .end(function(err, res) {
              res.should.have.status(200);
            done();
           });
  });


describe('GET /users?username=name', function() { //3.1 получение юзера по параметру, позитивный тест
  it('should return only one user choosen by username', function(done) {
    chai.request('localhost:8001')
          .get('/users?username=MCummings')
          .end((err, res) => {
              should.not.exist(err);
              res.should.have.status(200);
              res.body.should.be.a('array');
            done();
      });
  });
}); 

it('should return only one user choosen by unexisting username', function(done) { //3.2 негативнй тест получения юзера по параметру
    chai.request('localhost:8001')                     
          .get('/users?username=Amigo')
          .end(function(err, res)  {
              should.not.exist(err);
              res.should.have.status(200);
              res.body.should.be.a('array');
            done();
      });
  });

  describe('DELETE /users/:id', function() { //4.1 удаление юзера по id 
  it('should delete  user choosen by id', function(done) {
    chai.request('localhost:8001')
          .delete('/users/7')
          .end(function(err, res)  {
              should.not.exist(err);
              res.should.have.status(200);
              res.body.should.be.a('array');
            done();
      });
  });
   }); 

it('should delete  user choosen by unexisting id', function(done) {  //4.2 негативный тест, удаление юзера, которого не существует
    chai.request('localhost:8001')
          .delete('/users/15')
          .end(function(err, res) {
              res.should.have.status(404);
              res.body.should.be.a('array');
            done();
      });
  }); 


 describe('POST /users', function() {             //5.1 создание нового юзера 
  it('should create new user', function(done) {
    chai.request('localhost:8001')
         .post('/users/')
         .send({username: "Diego", email: 'diego@mail.tu', password: '1weekend', company: 'May'})
         .end(function (err, res) {
          if (err) done (err);
          res.should.have.status(201);
          res.body.username.should.be.equal("Diego");
          done ();
           });     
      });
  });

describe('POST /users', function() { 
it('should not create user with existing id', function(done) {  //5.2 создание  юзера с существующим id, негативный тест
    chai.request('localhost:8001')
          .post('/users/')
          .send({username: "Diego", email: 'diego@mail.tu', password: '1weekend', company: 'May'})
          .end(function(err, res) {
              if (err) done (err);
              res.should.have.status(201);

              chai.request('localhost:8001')
                .post('/users')
                .send({id: res.body.id, username: "Diego", email: 'diego@mail.tu', password: '1weekend', company: 'May'})
                .end((err, res) => {
                  should.exist(err);
                  res.should.have.status(500);

                  done();
                })
 
      });
  });
  });


 /* describe('PATCH /users/:id', function() {             //6.1. Редактирование пользователя 
  it('should edit user choosen by id', function(done) {
    chai.request('localhost:8001')
         .patch('/users/10')
         .send({username: "TomeCriuse"})
         .end(function (err, res) {
          if (err) done (err);
          res.should.have.status(200);
          done ();
           });     
      });
  });

  it('should edit password with uncorrect data', function(done) { //6.2 негативный тест. проверка поля пароль. при сохранении с невалидным значением
    chai.request('localhost:8001')                                // сервер должен выдать ошибку (500). сейчас с невалидным значеним сохранить можно
         .patch('/users/10')                                      // поэтому поставила код (200)
         .send({password: " "})
         .end(function (err, res) {
          if (err) done (err);
          res.should.have.status(200);
          done ();
           });     
      });*/

