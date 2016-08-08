global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    console.log('works?');
   
    before(function(done) {
      // this server object is used from the server.js script
        server.runServer(function() {
            Item.create({name: 'Broad beans'},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
            });
        });
    });

    // actual tests
    it('should list items on GET', function(done) {
        console.log('in the get');
        // the server object is not called because the app obejct already 
        // is an expoerted obejct with the server as part of it
           chai.request(app)
              .get('/items')
              .end(function(err, res) {
                 should.equal(err, null);
                 res.should.have.status(200);
                 res.should.be.json;
                 res.body.should.be.a('array');
                 done();
           });   
    });
    //
    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property('name');
                res.body.name.should.be.a('string');
                done();
            });
    });
    //
    it('should edit an item on put', function(done){
       chai.request(app)
           .put('/items/Kale')
           .send({'name':'Dorian'})
           .end(function(err, res){
               should.equal(err, null);
               res.should.have.status(200);
               res.should.be.json;
               res.body.should.have.property('name');
               done();    
           });
    });
    it('should delete an item on delete', function(done){
       chai.request(app)
          .delete('/items/Peppers')
          .end(function(err, res){
             should.equal(err, null);
             res.should.have.status(200);
             res.should.be.json;
             done();
          }); 
    });      
    //
    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});