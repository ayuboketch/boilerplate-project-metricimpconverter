const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Convert Handler', function() {
    
    test('whole number', function(done) {
      assert.equal(convertHandler.getNum('10Km'),10);
      done();
    });
    
    test('decimal', function(done) {
      assert.equal(convertHandler.getNum('2.4Gal'),2.4)
      done();
    });
    
    test('fractional', function(done) {
      assert.equal(convertHandler.getNum('1/2L'),0.5)
      done();
    });
    
    test('fractional decimal', function(done) {
      assert.equal(convertHandler.getNum('9.5/2L'),4.75)
      done();
    });
    
    test('invalid input', function(done) {
      let input = '4/5.6//7kg';
      let expected = 'invalid number';
      assert.equal(convertHandler.getNum(input), expected);
      done();
    });
    
    test('default', function(done) {
      assert.equal(convertHandler.getNum('kg'), 1);
      done();
    }); 
    
  });
  
  suite('convert handler II', function() {
    
    test('units I', function(done) {
      let valInp = ['gal','mi','km','lbs','kg'];
      valInp.forEach(function(unit) {
      assert.equal(convertHandler.getUnit(unit), unit);
      });
      done();
    });

   test('units II', function(done) {
      assert.equal(convertHandler.getUnit("l"), "L");
      done();
    });
    
    test('wrong unit', function(done) {
      let input = 'min';
      let expected = 'invalid unit';
      assert.equal(convertHandler.getUnit(32 + input), expected);
      done();
    });  
    
  });
  
  
  suite('convert III', function() {
    
    test('return correct', function(done) {
      let possibleInputs = ['gal','l','mi','km','lbs','kg'];
      let excpectedOutcome = ['L','gal','km','mi','kg','lbs'];
      possibleInputs.forEach(function(elm, i) {
        assert.equal(convertHandler.getReturnUnit(elm), excpectedOutcome[i]);
      });
      done();
    });
    
  });
  
  
  suite('spell out', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let shortUnits = ["gal",'l','mi','km','lbs','kg'];
      let longUnits = ['gallons','litres','miles','kilometers',
      'pounds','kilograms'];
      shortUnits.forEach(function(elm, i) {
        assert.equal(convertHandler.spellOutUnit(elm), longUnits[i]);
      });
          done();
      });
  });

  
  suite('convert IV', function() {
    
    test('gal to L', function(done) {
      assert.approximately(convertHandler.convert(1,'gal'),3.78541,0.1); //0.1 tolerance
      done();
    });
    
    test('L to gal', function(done) {
      assert.approximately(convertHandler.convert(1,"l"),0.26417,0.1); //0.1 tolerance
      done();
    });
    
    test('mi to km', function(done) {
      assert.approximately(convertHandler.convert(1,'mi'),1.60934,0.1); //0.1 tolerance
      done();
    });
    
    test('km to mi', function(done) {
      assert.approximately(convertHandler.convert(1,'km'),0.62137,0.1); //0.1 tolerance
      done();
    });
    
    test('lbs to kg', function(done) {
      assert.approximately(convertHandler.convert(1,'lbs'),0.453592,0.1); //0.1 tolerance
      done();
    });
    
    test('kg to lbs', function(done) {
      assert.approximately(convertHandler.convert(1,'kg'),2,20462,0.1); //0.1 tolerance
      done();
    });
    
  });


});