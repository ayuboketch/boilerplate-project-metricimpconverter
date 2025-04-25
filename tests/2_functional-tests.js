const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

   suite('Routing', function() {
    
    suite('/api/convert Get', function() {
      
      test('Convert 10L ', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'L');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
      });
      
      test('Convert 32g (invalid input unit)', function(done) {
        //review this one
        chai.request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end(function(err, res){
          assert.equal(res.body, 'invalid unit');
          done();
          });
      });
      
      test('Convert 3//7.2/4kg (invalid number)', function(done) {
        //review this one
        chai.request(server)
        .get('/api/convert')
        .query({input: '3//7.2/4kg'})
        .end(function(err, res){
          assert.equal(res.body, 'invalid number');
          done();
          });
      });  
      
      test('Convert 3//7.2/4kilomegagram (invalid number and unit)', function(done) {
        //review this one
        chai.request(server)
        .get('/api/convert')
        .query({input: '3//7.2/4kilomegagram'})
       .end(function(err, res){
          assert.equal(res.body, 'invalid number and unit');
          done();
          });
      });
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
          .get('/api/convert')
          .query({input: 'kg'})
          .end((err, res)=> {
            assert.equal(res.body.returnNum, 2.20462);
          });
        done();
      });
      
    });

  });


});
