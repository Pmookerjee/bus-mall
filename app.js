// 1. Generate three random, non-dupe images (part of the controller)
// 2. Object constructor for Products:
  // a. Include name, path, votes
// 3. A tracker object that will controll functionality of app
// 4. Event listener(s) for image clicks

var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'wine-glass', 'water-can' ];
var productsArray = [];
var max_clicks = 5;

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
  clicks: 0,

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

  helper: function() {
    nums = this.getRandomNums();
    this.drawImages(nums);
  },

  drawButton: function() {
      var newFieldset = document.getElementById('fieldset');
      var newInput = document.createElement('input');
      newInput.type = 'submit';
      newInput.value = 'View Results';
      // newInput.setAttribute('value', 'View Results');
      // newFieldset.appendChild(newInput);
  },

  displayResults: function() {
    var newUl = document.getElementById('results_list');
    for(var x in productsArray){
      var newLi = document.createElement('li');
      newLi.setAttribute('class', 'results_li');
      newLi.innerHTML = productsArray[x].name + ': ' + productsArray[x].votes + ' votes';
      newUl.appendChild(newLi);
    }
  }
}

var img = document.getElementById('images');

img.addEventListener('click', function(e) {
   var clickedID = e.target.id;
   tracker.clicks++;
      if(tracker.clicks < 3){
        tracker.incrementVote(clickedID);
        tracker.helper();
      } else {
      img.removeEventListener('click', function(){});
      tracker.drawButton();
      tracker.displayResults();
      }
})

  var nums = tracker.getRandomNums();
  tracker.drawImages(nums);
