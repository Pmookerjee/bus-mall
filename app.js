
var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'wine-glass', 'water-can' ];
var productsArray = [];
var max_clicks = 3;

function Product(name) {
  this.name = name;
  this.path = './assets/' + name + '.png';
  this.votes = 0;
  this.displayed = 0;
}

(function() {

  for(var x in imageNames) {
    productsArray[x] = new Product(imageNames[x]);
  }
})()

var tracker = {
  nums: [],
  clicks: 0,
  clickedID: '',

  getRandomNums: function() {
    while(this.nums.length < 3){
      var rand = Math.floor(Math.random() * imageNames.length);
      if(this.nums.indexOf(rand) === -1){
        this.nums.push(rand);
      }
    }
    return this.nums;
  },

  drawImages: function(nums) {
    document.getElementById('img0').setAttribute('src', productsArray[nums[0]].path);
    document.getElementById('img1').setAttribute('src', productsArray[nums[1]].path);
    document.getElementById('img2').setAttribute('src', productsArray[nums[2]].path);
  },

  incrementVote: function() {
    if (this.clickedID === 'img0') { productsArray[this.nums[0]].votes++;
    console.log(productsArray[this.nums[0]].name + ' : ' + productsArray[this.nums[0]].votes); }
    else if (this.clickedID === 'img1') { productsArray[this.nums[1]].votes++;}
    else { productsArray[this.nums[2]].votes++;}
    productsArray[this.nums[0]].displayed++;
    productsArray[this.nums[1]].displayed++;
    productsArray[this.nums[2]].displayed++;
    this.resetRandom();
  },

  resetRandom: function() { this.nums = []; },

  helper: function() {
    console.log('clicks is: ' + this.clicks);
    tracker.incrementVote();
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
    document.getElementById('box').style.visibility = 'visible';
    var newUl = document.getElementById('results_list');
    for(var x in productsArray){
      var newLi = document.createElement('li');
      newLi.setAttribute('class', 'results_li');
      newLi.innerHTML = 'The ' + productsArray[x].name + ':   ' + productsArray[x].votes + ' votes';
      newUl.appendChild(newLi);
    }
  },

  drawChart: function() {
    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [productsArray[0].name, productsArray[1].name, productsArray[2].name, productsArray[3].name, productsArray[4].name], //this will hold the name of each product
        datasets: [{
          label: 'Number of Votes',
          data: [productsArray[0].votes, productsArray[1].votes, productsArray[2].votes, productsArray[3].votes, productsArray[4].votes],  //this will hold the votes for each product image
          //myChart.update (built in method) myChart.data.datasets[0].data[0] = 8;
          //data arrat should match the productImages array index
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',  //create a color property in constructor for each object? or... assign at render
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true
            }
          }]
        }
      }
    })
  },

  finish: function() {
    this.unhideButton();
    tracker.incrementVote();
    var results = document.getElementById('submit');
    results.addEventListener('click', function(e){
      e.preventDefault();
      tracker.displayResults();
      tracker.hideButton();
      tracker.getMostClicked();
      tracker.drawChart();
      tracker.reset();
    })
  },

  getMostClicked: function() {
    (productsArray).sort(function(a,b){
    return b.votes - a.votes;
    });
  },

  reset: function() {
    this.clicks = 0;
    for(var x in productsArray) { productsArray[x].votes = 0; }
  }
}

var img = document.getElementById('images');

img.addEventListener('click', function(e) {
    e.preventDefault();
    tracker.clickedID = e.target.id;
  ++tracker.clicks;
  if(tracker.clicks === max_clicks){
    img.removeEventListener('click', function(){});
    tracker.finish();
  } else if (tracker.clicks < max_clicks) {
    tracker.helper();
  }
})

var nums = tracker.getRandomNums();
tracker.drawImages(nums);
  tracker.drawChart();
