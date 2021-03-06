function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//Business Logic
var scores, currentScore, currentPlayer;
var player = [];
var currentSlide = 0;
var rollBtn = $("#roll");
var holdBtn = $("#hold");
var newGame = $("#newGame");
var letsPlay = $("#play");

function init() {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  rollBtn.removeAttr("disabled");
  holdBtn.removeAttr("disabled");
  $("#score0").text(0);
  $("#score1").text(0);
  $("#current0").text(0);
  $("#current1").text(0);
}

function roll() {
  var die = Math.floor(Math.random() * 6) + 1;
  $("#rollDice").text(die);
  if (die === 1) {
    alert("Sorry " + player[currentPlayer] + ", you rolled a one!");
    currentScore = 0;
    $("#current" + currentPlayer).text(currentScore);
    currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  } else {
    currentScore += die;
    $("#current" + currentPlayer).text(currentScore);
  }
}

function hold() {
  scores[currentPlayer] += currentScore;
  $("#score" + currentPlayer).text(scores[currentPlayer]);
  if (scores[currentPlayer] >= 100) {
    alert(player[currentPlayer] + " is the WINNER!!!");
    rollBtn.attr("disabled", "disabled");
    holdBtn.attr("disabled", "disabled");
  } else {
    currentScore = 0;
    $("#current" + currentPlayer).text(currentScore);
    currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  }
}

function slideQuestion(n) {
  $(".slide")
    .eq(currentSlide)
    .removeClass("slide-active");
  $(".slide")
    .eq(n)
    .addClass("slide-active");
  currentSlide = n;
}
slideQuestion(0);

function nextsSlide() {
  slideQuestion(currentSlide + 1);
}
//User Interface Logic
$(document).ready(function() {
  init();
  rollBtn.click(roll);
  holdBtn.click(hold);
  newGame.click(init);
  $("#next").click(nextsSlide);
  $("#gamers").submit(function(e) {
    player[0] = $("#gamer1").val();
    player[1] = $("#gamer2").val();
    $("#p1").text(player[0].toUpperCase());
    $("#p2").text(player[1].toUpperCase());
    if ($("#gamer1").val() === "" || $("#gamer2").val() === "") {
      alert("Please Enter both players names to continue!!!");
    } else {
      $("#gamers").hide();
      $("#game").addClass("slide-active");
    }
    e.preventDefault();
  });
});