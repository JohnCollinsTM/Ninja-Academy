/* globals define */

(function () {
    define(['game'], function (game) {
        function create() {
            var time = this;

            time.startTime = new Date();
            time.totalTime = 120;
            time.timeElapsed = 0;

            time.createTimer();

            time.gameTimer = game.time.events.loop(100, function () {
                time.updateTimer();
            });
        }

        function createTimer() {
            var time = this;

            time.timeLabel = time.game.add.text(400, 100, "00:00", { font: "100px Arial", fill: "#fff" });
            time.timeLabel.anchor.setTo(0.5, 0);
            time.timeLabel.align = 'center';
        }

        function updateTimer() {
            let time = this;

            let currentTime = new Date();
            let timeDifference = time.startTime.getTime() - currentTime.getTime();

            //Time elapsed in seconds
            time.timeElapsed = Math.abs(timeDifference / 1000);

            //Time remaining in seconds
            let timeRemaining = time.totalTime - time.timeElapsed;

            //Convert seconds into minutes and seconds
            let minutes = Math.floor(timeRemaining / 60);
            let seconds = Math.floor(timeRemaining) - (60 * minutes);

            //Display minutes, add a 0 to the start if less than 10
            let result = (minutes < 10) ? "0" + minutes : minutes;

            //Display seconds, add a 0 to the start if less than 10
            result += (seconds < 10) ? ":0" + seconds : ":" + seconds;

            time.timeLabel.text = result;
        }
    });
} ());