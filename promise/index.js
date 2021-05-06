var name = "The Window";
var object = {
  name : "My Object",
  getNameFunc : function(){
    console.log('this---', this.name)
    return function(){
      return this.name;  
    };
  }
};
console.log( object.getNameFunc()());

object.getNameFunc() // function() { return this.name }


function zero(arr) {
  let len = arr.length
  for(; !arr[--len]; arr.pop())
  console.log('ar---', arr)
  return arr
}

console.log('zero-----', zero([6, 9, 0, 12, '', 19]))