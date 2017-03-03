
var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'wine-glass', 'water-can' ];
var productsArray = [];
var max_clicks = 15;

function Product(name) {
  this.name = name;
  this.path = './assets/' + name + '.png';
  this.votes = 0;
  this.views = 0;
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
    if (this.clickedID === 'img0') {
      productsArray[this.nums[0]].votes++;
      localStorage.setItem(productsArray[this.nums[0]].name, productsArray[this.nums[0]].votes++);
    } else if (this.clickedID === 'img1') {
      productsArray[this.nums[1]].votes++;
      localStorage.setItem(productsArray[this.nums[1]].name, productsArray[this.nums[1]].votes++);
    } else {
      productsArray[this.nums[2]].votes++;
      localStorage.setItem(productsArray[this.nums[2]].name, productsArray[this.nums[2]].votes++);
    }
  },

  incrementViewTotal: function() {
    for(image in this.nums){
      productsArray[this.nums[image]].views++;
      localStorage.setItem(productsArray[this.nums[image]].name + '_views', productsArray[this.nums[image]].views);
    }
    tracker.resetRandom();
  },

  resetRandom: function() { this.nums = []; },

  helper: function() {
    tracker.incrementVote();
    tracker.incrementViewTotal();
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
    document.getElementsByClassName("chart")[0].className = 'chart';
    var ctx = document.getElementById("myChart").getContext("2d");

    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [productsArray[0].name, productsArray[1].name, productsArray[2].name, productsArray[3].name, productsArray[4].name],
        datasets: [{
          label: 'Number of Votes',
          data: [productsArray[0].votes, productsArray[1].votes, productsArray[2].votes, productsArray[3].votes, productsArray[4].votes],
          backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(153, 102, 255, 0.9)'
          ],
          borderColor: [
            'rgba(255,99,132,20)',
            'rgba(54, 162, 235, 20)',
            'rgba(255, 206, 86, 20)',
            'rgba(75, 192, 192, 20)',
            'rgba(153, 102, 255, 20)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {labels:{fontColor:"white", fontSize: 14, strokeStyle: "black"}},
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "white",
              fontSize: 18,
              stepSize: 1,
              beginAtZero:true
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: "white",
              fontSize: 16,
              stepSize: 1,
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
    tracer.incrementViewTotal();
    var results = document.getElementById('submit');
    results.addEventListener('click', function(e){
      e.preventDefault();
      tracker.displayResults();
      tracker.hideButton();
      tracker.getMostClicked();
      tracker.drawChart();
      // tracker.reset();
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
