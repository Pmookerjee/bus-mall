
var imageNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'wine-glass', 'water-can' ];
var productsArray = [];
var max_clicks = 15;

function Product(name) {
  this.name = name;
  this.path = './assets/' + name + '.png';
  this.votes = localStorage.getItem(this.name + '_votes') || 0;
  this.views = localStorage.getItem(this.name + '_views') || 0;
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
      localStorage.setItem(productsArray[this.nums[0]].name + '_votes', productsArray[this.nums[0]].votes);
    } else if (this.clickedID === 'img1') {
      productsArray[this.nums[1]].votes++;
      localStorage.setItem(productsArray[this.nums[1]].name + '_votes', productsArray[this.nums[1]].votes);
    } else {
      productsArray[this.nums[2]].votes++;
      localStorage.setItem(productsArray[this.nums[2]].name+ '_votes', productsArray[this.nums[2]].votes);
    }
  },

  incrementViewTotal: function() {
    for(image in this.nums){
      productsArray[this.nums[image]].views++;
      localStorage.setItem(productsArray[this.nums[image]].name + '_views', productsArray[this.nums[image]].views);
    }
    this.resetRandom();
  },

  resetRandom: function() { this.nums = []; },

  helper: function() {
    this.incrementVote();
    this.incrementViewTotal();
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

  disableHover: function() {
    for(var i=0; i<3; i++){
      var el = document.getElementById('img' + i);
      el.className = '';
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
          type: 'bar',
          label: ' Number of Votes',
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
          borderWidth: 10
        },
        {
          type: 'line',
          label: ' Number of Views',
          data: [productsArray[0].views, productsArray[1].views, productsArray[2].views, productsArray[3].views, productsArray[4].views],
        }]
      },
      options: {
        legend: {labels:{fontColor:"black", fontSize: 14, strokeStyle: "black"}},
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "black",
              fontSize: 16,
              stepSize: 5,
              beginAtZero:true,
              maxTicksLimit: 10,
              maxRotation: 2,
              autoSkip: true
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: "black",
              fontSize: 16,
              stepSize: 1,
              beginAtZero:true
            },
            barPercentage: 0.9,
            barThickness: 50
          }],
        }
      }
    })
  },

  drawTable: function() {
    document.getElementById('box').style.visibility = 'visible';
    var table = document.getElementById('table');
    for (var index in productsArray){
      var newTr = document.createElement('tr');
      var newTh = document.createElement('th');
      newTh.innerHTML = productsArray[index].name;
      var views = document.createElement('td');
      views.innerHTML = productsArray[index].views;
      var votes = document.createElement('td');
      votes.innerHTML = productsArray[index].votes;
      var percent = document.createElement('td');
      percent.innerHTML = Math.round((productsArray[index].votes/productsArray[index].views) * 100);
      if (isNaN(percent.innerHTML)) { percent.innerHTML = 0; }
      var recommend = document.createElement('td');
      if(percent.innerHTML > 30) {
        recommend.innerHTML = 'YES';
        recommend.setAttribute('class', 'yes');
        newTh.setAttribute('class', 'yes');
      } else {
        recommend.innerHTML = 'NO';
        recommend.setAttribute('class', 'no');
        newTh.setAttribute('class', 'no');
      }
      table.appendChild(newTr);
      newTr.appendChild(newTh);
      newTr.appendChild(views);
      newTr.appendChild(votes);
      newTr.appendChild(percent);
      newTr.appendChild(recommend);
    }
  },

  finish: function() {
    this.unhideButton();
    this.disableHover();
    this.incrementVote();
    this.incrementViewTotal();
    var results = document.getElementById('submit');
    results.addEventListener('click', function(e){
      e.preventDefault();
      tracker.hideButton();
      tracker.getMostClicked();
      tracker.drawChart();
      tracker.drawTable();
    })
  },

  getMostClicked: function() {
    (productsArray).sort(function(a,b){
      return b.votes - a.votes;
    });
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

var clear = document.getElementById('clear');
clear.addEventListener('click', function(e){
  localStorage.clear();
  location.reload(false);
})

var nums = tracker.getRandomNums();
tracker.drawImages(nums);
