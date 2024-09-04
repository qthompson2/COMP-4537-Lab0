//CONSTANTS
const BUTTON_WIDTH = "10em";
const BUTTON_HEIGHT = "5em";
const BUTTON_POSITION = "absolute";

class Button {
    constructor(number, x, y) {
        this.number = number;
        this.x = x;
        this.y = y;
        this.active = true;

        this.button_element = document.createElement("button");
        this.button_element.style.width = BUTTON_WIDTH;
        this.button_element.style.height = BUTTON_HEIGHT;
        this.button_element.style.position = BUTTON_POSITION;
        this.button_element.style.left = this.x + "px";
        this.button_element.style.top = this.y + "px";
        this.button_element.innerText = this.number;

        this.colour = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        ];

        this.button_element.style.backgroundColor = `rgb(${this.colour[0]}, ${this.colour[1]}, ${this.colour[2]})`;


        document.body.appendChild(this.button_element);
    }

    juggle() {
        this.x = Math.abs(Math.floor(Math.random() * window.innerWidth) - this.button_element.getBoundingClientRect().width);
        this.y = Math.abs(Math.floor(Math.random() * window.innerHeight) - this.button_element.getBoundingClientRect().height);

        this.button_element.style.left = this.x + "px";
        this.button_element.style.top = this.y + "px";
    }

    toggleActive() {
        this.active = !this.active;
        this.button_element.innerText = this.active ? this.number : "";
    }
}