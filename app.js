// 1. Generate three random, non-dupe images (part of the controller)
// 2. Object constructor for Products:
  // a. Include name, path, votes
// 3. A tracker object that will controll functionality of app
// 4. Event listener(s) for image clicks

var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'wine-glass', 'water-can' ];
var productsArray = [];
var max_clicks = 15;

function Product(name) {
    this.name = name;
    this.path = name + '.png';
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
  min: 0,
  max: imageNames.length,
  nums: [],

  getRandomNums: function() {

     while(this.nums.length < 3){
       var rand = Math.floor(Math.random() * (this.max - this.min) + this.min);
       if(this.nums.indexOf(rand) === -1){
         this.nums.push(rand);
       }
     }
    return this.nums;
  },
  // setDisplayedProducts: function(nums) {
  //   for(var x in nums){ this.displayedProducts.push(nums[x]);
  //   console.log('displayedProducts is ' + this.displayedProducts[x]);}
  // },
  drawImages: function(nums) {
    var el = document.getElementById('img0').setAttribute('src', productsArray[nums[0]].path);
    var el = document.getElementById('img1').setAttribute('src', productsArray[nums[1]].path);
    var el = document.getElementById('img2').setAttribute('src', productsArray[nums[2]].path);
  },
  incrementVote: function(clicked) {
    if (clicked === 'img0') {
       productsArray[this.nums[0]].votes++;
       console.log('productArray: ' + productsArray[this.nums[0]].name + ' has ' + productsArray[this.nums[0]].votes) + ' votes';
    }
    else if (clicked === 'img1') { productsArray[this.nums[1]].votes++;}
    else { productsArray[this.nums[2]].votes++;}
    this.resetRandom();
  },
  resetRandom: function() { this.nums = []; },

  displayResults: function() {
  }
}

var img = document.getElementById('images');
img.addEventListener('click', function(e) {
   var clickedID = e.target.id;
   tracker.incrementVote(clickedID);
})

for(var i=0; i<max_clicks; i++){
var nums = tracker.getRandomNums();
tracker.drawImages(nums);

}
