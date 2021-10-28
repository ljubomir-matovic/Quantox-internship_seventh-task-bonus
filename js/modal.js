/**For given element function returns nth parent
 * @param {*} el
 * @param {*} num
 * @returns nth parent element
 */
var getParent = (el, num = 1) => {
    const body = document.querySelector("body");
    let i;
    for (i = 0; i < num && el != body; i++) el = el.parentElement;
    return el;
};
/**Returns number if positive or 0 else
 * @param {*} num
 * @returns number || 0
 */
var getPositive = (num) => (num > 0 ? num : 0);
var modal = function () {
    this.target = document.querySelector(".modal-container");
    /**Open given modal. If selected is passed as attribute check radio button
     * @param {*} modal
     * @param {*} selected
     */
    this.open = (modal) => {
        try {
            modal.style.display = "flex";
        } catch (err) {}
    };
    /**Close given modal
     * @param {*} modal
     */
    this.close = (modal) => {
        try {
            modal.style.display = "none";
        } catch (err) {}
    };
    /**Close modal if you click outside of modal
     * @param {*} target
     */
    this.closeOuter = (target) => {
        const close = this.close;
        target.addEventListener("click", (e) => {
            if (e.target == target) close(target);
        });
    };
    this.load = () => {
        this.close(this.target);
    };
    return this;
}.call({});
window.addEventListener("load", modal.load);
document
    .querySelector(".settings")
    .addEventListener("click", () => modal.open(modal.target));
modal.closeOuter(modal.target);
document
    .querySelector(".icon-close")
    .addEventListener("click", () => modal.close(modal.target));
