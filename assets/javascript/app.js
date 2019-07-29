$(document).ready(function () {
    var options = [
        {
            question: "What is Earth's largest continent?", 
            choice: ["Antarctica", "Asia", "Europe", "North America"],
            answer: 1,
            photo: "assets/images/asia.jpeg"
         },
         {
            question: "What razor-thin country accounts for more than half of the western coastline of South America?", 
            choice: ["Chile", "Ecuador", "Peru", "Bolivia"],
            answer: 0,
            photo: "assets/images/chile.jpeg"
         }, 
         {
            question: "What country has the most natural lakes?", 
            choice: ["India", "Australia", "Canada", "United States" ],
            answer: 2,
            photo: "assets/images/canada.jpeg"
        }, 
        {
            question: "What is the driest place on Earth?", 
            choice: ["Atacama desert", "Kufra, Libya", "McMurdo, Antarctica", "Sahara Desert" ],
            answer: 2,
            photo: "assets/images/mcmurdo.jpeg"
        }, 
        {
            question: "What city is the capital of Australia?", 
            choice: ["Melbourne", "Sydney", "Perth", "Canberra" ],
            answer: 3,
            photo: "assets/images/perth.jpeg"
        }, 
        {
            question: "What is the smallest independent country on Earth?", 
            choice: ["Nauru", "Vatican City", "Grenada", "Monaco" ],
            answer: 1,
            photo: "assets/images/vatican.jpeg"
        }, 
        {
            question: "What is the deepest point in Earth's oceans?", 
            choice: ["Tonga Trench", "Mariana Trench", "Java Trench", "Eurasian Basin" ],
            answer: 1,
            photo: "assets/images/marianaTrench.jpeg"
        }, 
        {
            question: "What is the oldest active volcano on Earth?", 
            choice: ["Mount Etna", "Mount Fuji", "Mount Yasur", "Mount Olympus" ],
            answer: 0,
            photo: "assets/images/etna.jpeg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 10;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })

    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }

    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    function displayQuestion() {
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
   
    }
    
    
    $(".answerchoice").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })
    