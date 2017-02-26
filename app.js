
var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'wine-glass', 'water-can' ];
var productsArray = [];
var max_clicks = 15;

function Product(name) {
  this.name = name;
  this.path = name + '.png';
  this.votes = 0;
  this.displayed = 0;
}

(function() {

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

  drawImages: function(nums) {
    var el = document.getElementById('img0').setAttribute('src', productsArray[nums[0]].path);
    var el = document.getElementById('img1').setAttribute('src', productsArray[nums[1]].path);
    var el = document.getElementById('img2').setAttribute('src', productsArray[nums[2]].path);
  },

  incrementVote: function(clicked) {
    if (clicked === 'img0') { productsArray[this.nums[0]].votes++; }
    else if (clicked === 'img1') { productsArray[this.nums[1]].votes++;}
    else { productsArray[this.nums[2]].votes++;}
    productsArray[this.nums[0]].diplayed++;
    productsArray[this.nums[1]].diplayed++;
    productsArray[this.nums[2]].diplayed++;
    this.resetRandom();
  },

  resetRandom: function() { this.nums = []; },

  helper: function() {
    nums = this.getRandomNums();
    this.drawImages(nums);
  },

  unhideButton: function() {
    document.getElementById('fieldset').style.visibility = 'visible';
    document.getElementById('submit').style.visibility = 'visible';
  },

  hideButton: function() {
    document.getElementById('fieldset').style.visibility = 'hidden';
    document.getElementById('submit').style.visibility = 'hidden';
  },

  displayResults: function() {
    document.getElementById('results').innerHTML = 'Results';
    var newUl = document.getElementById('results_list');
    for(var x in productsArray){
      var newLi = document.createElement('li');
      newLi.setAttribute('class', 'results_li');
      newLi.innerHTML = 'The ' + productsArray[x].name + ':   ' + productsArray[x].votes + ' votes';
      newUl.appendChild(newLi);
    }
  },

  finish: function() {
    this.unhideButton();
    var results = document.getElementById('submit');
    results.addEventListener('click', function(e){
      e.preventDefault();
      tracker.displayResults();
      tracker.hideButton();
    })
  }
}

var img = document.getElementById('images');

img.addEventListener('click', function(e) {
  var clickedID = e.target.id;
  tracker.clicks++;
  tracker.incrementVote(clickedID);
  if(tracker.clicks < max_clicks){
    tracker.helper();
  } else {
    img.removeEventListener('click', function(){});
    tracker.finish();
  }
})

var nums = tracker.getRandomNums();
tracker.drawImages(nums);
