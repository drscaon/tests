/*
 Author: Daniel Regis SARMENTO CAON
 drscaon@gmail.com
*/

module.exports = function(fullInput) {

  function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

  function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return mergeDeep(target, ...sources);
  }

  function arrayToObjChain(keyChain, value){ //input: 'a.b.c','y'   output: {a:{b:{c:'y'}}}
    let slidingOutput = {};
    let keyArray = keyChain.split('.');
    let lastObj = {};
    lastObj[keyArray[keyArray.length-1]]  = value;

    for(let i=keyArray.length-2;i>=0;i--){
      let lastOutput = slidingOutput ;
      let key = keyArray[i];
      slidingOutput = {};
      slidingOutput[key] = lastObj;
      lastObj = slidingOutput;
    }
    return slidingOutput;
  }

  function strToObj(input){
    for(let i=0; i< Object.keys(input).length; i++){
      if(typeof Object.keys(input)[i] === 'string'){
        if(Object.keys(input)[i].indexOf('.')>=0){
          let backupElement = input[Object.keys(input)[i]].slice();
          let backupKey = Object.keys(input)[i];
          delete input[Object.keys(input)[i]];
          let newObj = arrayToObjChain(backupKey, backupElement);
          mergeDeep(input, newObj);
        }
        else{
          // console.log('no need to expand');
          // TODO : possible improvement, continue evaluating its children
        }
      }
      else{
        console.log('typeof : other (unexpected)');
      }
    };
    return input;
  };

  return strToObj(fullInput);
};
