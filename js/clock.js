var clock = function () {
    this.startTime = [25, 5, 10];
    this.currentTime = [
        { minutes: 25, seconds: 0 },
        { minutes: 5, seconds: 0 },
        { minutes: 10, seconds: 0 },
    ];
    this.ticks = [-1, -1, -1];
    this.paused = true;
    /**
     * @returns active tab key
     */
    this.getKey = () =>
        Number(document.querySelector(".tab.active").getAttribute("key"));
    /**Display time
     * @param obj \{minutes,seconds}
     */
    this.displayTime = function ({ minutes, seconds }) {
        minutes = minutes.toString().padStart(2, "0");
        seconds = seconds.toString().padStart(2, "0");
        this.minutesEl.innerHTML = minutes;
        this.secondsEl.innerHTML = seconds;
        clock.setProgress();
    }.bind({
        minutesEl: document.querySelector(".minutes"),
        secondsEl: document.querySelector(".seconds"),
    });
    /**Set button name and onclick function
     */
    this.setButton = function () {
        let key = clock.getKey();
        if (
            clock.currentTime[key].minutes == 0 &&
            clock.currentTime[key].seconds == 0
        ) {
            this.h3.innerHTML = "restart";
            this.h3.onclick = clock.reset;
        } else if (!clock.paused) {
            this.h3.innerHTML = "pause";
            this.h3.onclick = clock.pause;
        } else {
            this.h3.innerHTML = "start";
            this.h3.onclick = clock.tick;
        }
    }.bind({
        h3: document.querySelector(".stopwatch > h3"),
    });
    /**Update circular progress
     */
    this.setProgress = function () {
        let key = clock.getKey();
        let max = clock.startTime[key] * 60;
        let time =
            clock.currentTime[key].minutes * 60 +
            clock.currentTime[key].seconds;
        this.el.forEach((e) => {
            e.style["stroke-dashoffset"] = this.offSet * (time / max);
        });
    }.bind({
        el: document.querySelectorAll(".progress-ring > circle"),
        offSet: 1036.73,
    });
    /**Pause clock*/
    this.pause = () => {
        this.paused = true;
        this.setButton();
        let key = this.getKey();
        clearInterval(this.ticks[key]);
    };
    /**Reset clock*/
    this.reset = () => {
        let key = this.getKey();
        this.currentTime[key] = { minutes: this.startTime[key], seconds: 0 };
        this.displayTime(this.currentTime[key]);
        this.setButton();
    };
    /**Change time */
    this.tock = () => {
        let key = this.getKey();
        let target = this.currentTime[key];
        if (target.minutes == 0 && target.seconds == 0) {
            this.pause();
            return;
        }
        if (target.seconds) target.seconds--;
        else {
            target.minutes--;
            target.seconds = 59;
        }
        this.displayTime(target);
    };
    /**Start ticking*/
    this.tick = () => {
        let key = this.getKey();
        let i;
        i = setInterval(this.tock, 1000);
        setTimeout(() => {
            this.paused = false;
            this.setButton();
        }, 1000);
        this.ticks[key] = i;
    };
    this.load = () => {
        this.displayTime(this.currentTime[0]);
    };
    return this;
}.call({});
window.addEventListener("load", clock.load);
window.addEventListener("load", clock.setButton);
