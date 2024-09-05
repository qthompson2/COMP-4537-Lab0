//CONSTANTS
const BUTTON_WIDTH = "10em";
const BUTTON_HEIGHT = "5em";
const ABSOLUTE = "absolute";

class Button {
    constructor(number, x, y) {
        this.number = number;
        this.x = x;
        this.y = y;
        this.active = true;

        this.buttonElement = document.createElement("button");
        this.buttonElement.style.width = BUTTON_WIDTH;
        this.buttonElement.style.height = BUTTON_HEIGHT;
        this.buttonElement.style.position = ABSOLUTE;
        this.buttonElement.style.left = this.x + "px";
        this.buttonElement.style.top = this.y + "px";
        this.buttonElement.innerText = this.number;

        this.colour = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        ];

        this.buttonElement.style.backgroundColor = `rgb(${this.colour[0]}, ${this.colour[1]}, ${this.colour[2]})`;


        document.body.appendChild(this.buttonElement);
    }

    juggle() {
        this.x = Math.abs(Math.floor(Math.random() * window.innerWidth) - this.buttonElement.getBoundingClientRect().width);
        this.y = Math.abs(Math.floor(Math.random() * window.innerHeight) - this.buttonElement.getBoundingClientRect().height);

        this.buttonElement.style.left = this.x + "px";
        this.buttonElement.style.top = this.y + "px";
    }

    toggleActive() {
        this.active = !this.active;
        this.buttonElement.innerText = this.active ? this.number : "";
    }

    setOnClick(func) {
        this.buttonElement.onclick = func;
    }
}