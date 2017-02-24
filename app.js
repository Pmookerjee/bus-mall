// 1. Generate three random, non-dupe images (part of the controller)
// 2. Object constructor for Products:
  // a. Include name, path, votes
// 3. A tracker object that will controll functionality of app
// 4. Event listener(s) for image clicks

var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'wine-glass', 'water-can' ];
var productsArray = [];

function Product(name) {
    this.name = name;
    this.path = name + '.jpg';
    this.votes = 0;
}

// a simple IIFE to build all the product images
(function() {
  // build the objects
  for(var x in imageNames) {
    productsArray[x] = new Product(imageNames[x]);
  }
})()

var tracker = {
  clicks: 0,
  min: 0,
  max: imageNames.length,

  getRandomNums: function() {
     var nums = [];
     console.log('num length is ' + nums.length);
     while(nums.length < 3){
       var rand = Math.floor(Math.random() * (this.max - this.min) + this.min);
       console.log('rand is ' + rand);
       if(nums.indexOf(rand) === -1){
         nums.push(rand);
       }
     }
    return nums;
  },
  drawImages: function() {

  },
  incrementVote: function(image) {

  },
  displayResults: function() {

  }

}

// someEl.addEventListener('click', function(e) {
//   // does some stuff on click
// })

var nums = tracker.getRandomNums();
console.log('nums are ' + nums[0] + ', ' + nums[1] + ', ' + nums[2]);
