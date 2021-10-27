var clock = function () {
    this.startTime = [25, 5, 10];
    this.currentTime = [
        { minutes: 25, seconds: 0 },
        { minutes: 5, seconds: 0 },
        { minutes: 10, seconds: 0 },
    ];
    this.ticks = [-1, -1, -1];
    this.getKey = () =>
        Number(document.querySelector(".tab.active").getAttribute("key"));
    this.displayTime = function ({ minutes, seconds }) {
        minutes = minutes.toString().padStart(2, "0");
        seconds = seconds.toString().padStart(2, "0");
        this.minutesEl.innerHTML = minutes;
        this.secondsEl.innerHTML = seconds;
    }.bind({
        minutesEl: document.querySelector(".minutes"),
        secondsEl: document.querySelector(".seconds"),
    });
    this.pause = () => {
        let key = this.getKey();
        clearInterval(this.ticks[key]);
    };
    this.reset = () => {
        let key = this.getKey();
        this.currentTime[key] = { minutes: this.startTime[i], seconds: 0 };
    };
    this.tock = () => {
        let key = this.getKey();
        let target = this.currentTime[key];
        if (target.minutes == 0 && target.seconds == 0) this.pause();
        if (target.seconds) target.seconds--;
        else {
            target.minutes--;
            target.seconds = 59;
        }
        this.displayTime(target);
    };
    this.tick = () => {
        let key = this.getKey();
        let i;
        i = setInterval(this.tock, 1000);
        this.ticks[key] = i;
    };
    this.load = () => {
        this.displayTime(this.currentTime[0]);
    };
    return this;
}.call({});
window.addEventListener("load", clock.load);
