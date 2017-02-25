// 1. Generate three random, non-dupe images (part of the controller)
// 2. Object constructor for Products:
  // a. Include name, path, votes
// 3. A tracker object that will controll functionality of app
// 4. Event listener(s) for image clicks

var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'wine-glass', 'water-can' ];
var productsArray = [];

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
    console.log('clickedID is ' + clicked);
    if (clicked === 'img0') { productsArray[nums[0]].votes++;
    console.log('first image is ' + productsArray[nums[0]]);}
    else if (clicked === 'img1') { productsArray[nums[1]].votes++;}
    else { productsArray[nums[2]].votes++;}
    console.log('productsArray[2].votes is ' + productsArray[nums[2]].votes);
  },
  displayResults: function() {
  }
}

img.addEventListener('click', function(e) {
   var clickedID = e.target.id;
   tracker.incrementVote(clickedID);
})

var nums = tracker.getRandomNums();
// tracker.setDisplayedProducts(nums);
tracker.drawImages(nums);
var img = document.getElementById('images');
