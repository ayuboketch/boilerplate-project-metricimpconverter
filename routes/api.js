'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    console.log('query:'+ JSON.stringify(req.query.input));
    let inp = req.query.input;  
    var initNum = convertHandler.getNum(inp);
    var initUnit = convertHandler.getUnit(inp);

    if (initNum == "invalid number" && initUnit == "invalid unit") {
      res.json('invalid number and unit');
    } else if (initNum == "invalid number") {
      res.json('invalid number');
    } else if (initUnit == "invalid unit") {
      res.json('invalid unit');
    }

    var returnNum = convertHandler.convert(initNum,initUnit);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    var retString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum:  returnNum,
      returnUnit: returnUnit,
      string: retString
    });
    
      
  });

};
