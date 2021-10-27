var tab = function () {
    this.className = "active";
    this.tabs = [...document.querySelectorAll(".tab")];
    this.activeTab = 0;
    this.tabs[this.activeTab].classList.add(this.className);
    this.toogleActive = (e) => {
        let key = Number(e.target.getAttribute("key"));
        if (key != this.activeTab) {
            try {
                clock.pause();
                // console.log("paused");
            } catch (err) {}
            this.tabs[this.activeTab].classList.remove(this.className);
            this.activeTab = key;
            this.tabs[this.activeTab].classList.add(this.className);
            clock.displayTime(clock.currentTime[key]);
        }
    };
    this.tabs.forEach((t) => {
        t.addEventListener("click", this.toogleActive);
    });
    return this;
}.call({});
