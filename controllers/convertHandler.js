function ConvertHandler() {

  this.getNum = function(input) {
    let charLoc = input.indexOf(input.match(/[a-zA-Z]/));
    let numString = input.substr(0,charLoc)
                    
    let result = eval(numString);
    //console.log("eval: "+result);
    if (numString.length == 0) result = 1;
    if (numString.includes("//"))  result = 'invalid number';
    
    return result;
  };
  
  this.getUnit = function(input) {
    let charLoc = input.indexOf(input.match(/[a-zA-Z]/));
    let unit = input.substr(charLoc,9999).toLowerCase();
    let result = unit;
    
    let validLCUnits = ["gal","l","mi","km","lbs","kg"]; 
    if(validLCUnits.indexOf(unit.toLowerCase()) < 0) result = 'invalid unit';
    if (result == 'l') result = "L";
    console.log("unit:"+result)
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    if (initUnit == undefined) return undefined;
    let iu = initUnit.toLowerCase();
    let result = "";
    if (iu == "gal") result = "L";
    if (iu == "l")   result = "gal";
    if (iu == "mi")  result = "km";
    if (iu == "km")  result = "mi";
    if (iu == "lbs") result = "kg";
    if (iu == "kg")  result = "lbs";   
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    if (unit == undefined) return "invalid unit";
    let iu = unit.toLowerCase();
    let result = "";
    if (iu == "gal") result = "gallons";
    if (iu == "l")   result = "litres";
    if (iu == "mi")  result = "miles";
    if (iu == "km")  result = "kilometers";
    if (iu == "lbs") result = "pounds";
    if (iu == "kg")  result = "kilograms"; 
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    if (initUnit == undefined) return undefined;
    let iu = initUnit.toLowerCase();
    //console.log(iu+" initNum:" +initNum)
    let result = 0;

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    if (iu == "gal") result = initNum*galToL;
    if (iu == "l")   result = initNum/galToL;
    if (iu == "mi")  result = initNum*miToKm;
    if (iu == "km")  result = initNum/miToKm;
    if (iu == "lbs") result = initNum*lbsToKg;
    if (iu == "kg")  result = initNum/lbsToKg;

    result = result.toFixed(5);

    return parseFloat(result);
  };

  
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (initUnit == "invalid unit" || initNum == "invalid number") return undefined;

    let result = initNum + " " 
    + this.spellOutUnit(initUnit)
    + " converts to "+returnNum+" "
    + this.spellOutUnit(returnUnit);
    
    console.log(result);
    return result;
  };
  

  
}

module.exports = ConvertHandler;
