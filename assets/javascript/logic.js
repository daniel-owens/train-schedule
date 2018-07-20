	  
var config = {
	apiKey: "AIzaSyCo4qTxf3wW1eSgGzmMH_QQHuslfi-oEqs",
	authDomain: "train-time-6af8d.firebaseapp.com",
	databaseURL: "https://train-time-6af8d.firebaseio.com",
	projectId: "train-time-6af8d",
	storageBucket: "",
	messagingSenderId: "227783394840"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFirst = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();
  

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    first: trainFirst,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);


  // Clears all of the text-boxes
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().name;
	var trainDestination = childSnapshot.val().destination;
	var trainFirst = childSnapshot.val().first;
	var trainFrequency = childSnapshot.val().frequency;


	console.log(trainName);
	console.log(trainDestination);
	console.log(trainFirst);
	console.log(trainFrequency);


var trainStartPretty = moment.unix(trainFirst).format("HH:mm");
trainStartPretty = moment(trainStartPretty, "hh:mm").subtract(1,"years")

var nextArrival = moment().diff(moment(trainStartPretty), "minutes")
var timeDifferece = nextArrival % trainFrequency
var minutesAway = trainFrequency - timeDifferece

nextArrival = moment().add(minutesAway, 'm').format("LT")
// moment.unix(nextArrival).format("HH:mm")

// var minutesAway = nextArrival % trainFrequency

$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td><td>"); 

});
















