var form = function () {
    this.fonts = [...document.querySelectorAll(".change-font label")];
    this.colors = [...document.querySelectorAll(".change-color label")];
    this.numbers = [
        document.querySelector("[name='pomodoro']"),
        document.querySelector("[name='short-break']"),
        document.querySelector("[name='long-break']"),
    ];
    this.activeFont = 0;
    this.activeColor = 0;
    /**Increment value of input[type="number"]
     * @param {*} e
     */
    this.increment = (e) => {
        let parent = e.target.parentElement;
        parent = parent.querySelector("input[type='number']");
        parent.value = Number(parent.value) + Number(parent.step);
    };
    /**Decrement value of input[type="number"]
     * @param {*} e
     */
    this.decrement = (e) => {
        let parent = e.target.parentElement;
        parent = parent.querySelector("input[type='number']");
        parent.value = Number(parent.value) - Number(parent.step);
    };
    this.changeFont = (e) => {
        if (e.pointerId == 0) {
            let target = e.target;
            let key = target.getAttribute("data-index");
            this.fonts[this.activeFont].className = "";
            this.activeFont = key;
            this.fonts[this.activeFont].className = "active";
        }
    };
    this.changeColor = (e) => {
        if (e.pointerId == 0) {
            let target = e.target;
            let key = target.getAttribute("data-index");
            this.colors[this.activeColor].className = "";
            this.activeColor = key;
            this.colors[this.activeColor].className = "active";
        }
    };
    this.submit = (e) => {
        e.preventDefault();
        let i, n;
        for (i = 0; i < 3; i++) {
            n = Number(this.numbers[i].value);
            clock.startTime[i] = n;
            clock.currentTime[i] = { minutes: n, seconds: 0 };
            try {
                clock.pause();
            } catch (err) {}
        }
        document.querySelector(".container").className = `container ${
            document.querySelector(`input[name="font"]:checked`).value
        } ${document.querySelector(`input[name="color"]:checked`).value}`;
        clock.displayTime(clock.currentTime[clock.getKey()]);
        clock.setProgress();
        clock.setButton();
        modal.close(modal.target);
    };
    return this;
}.call({});
document.querySelector(".modal form").addEventListener("submit", form.submit);
document
    .querySelectorAll(".arrow-up")
    .forEach((a) => a.addEventListener("click", form.increment));
document
    .querySelectorAll(".arrow-down")
    .forEach((a) => a.addEventListener("click", form.decrement));
document
    .querySelectorAll(".change-font label")
    .forEach((l) => l.addEventListener("click", form.changeFont));
document
    .querySelectorAll(".change-color label")
    .forEach((l) => l.addEventListener("click", form.changeColor));
document.querySelector(".settings").addEventListener("click", () => {
    let i;
    for (i = 0; i < 3; i++) {
        form.numbers[i].value = clock.startTime[i];
    }
    let root = document.querySelector(".container").classList;
});
