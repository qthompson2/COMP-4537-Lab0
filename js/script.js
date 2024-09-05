//CONSTANTS
const BUTTON_WIDTH = "10em";
const BUTTON_HEIGHT = "5em";
const ABSOLUTE_POSITION = "absolute";
const GAME_START_PROMPT = "How many buttons to create?";
const GAME_START_BUTTON_MESSAGE = "Go!";

class Button {
    constructor(number, x, y) {
        this.number = number;
        this.x = x;
        this.y = y;
        this.active = true;

        this.buttonElement = document.createElement("button");
        this.buttonElement.style.width = BUTTON_WIDTH;
        this.buttonElement.style.height = BUTTON_HEIGHT;
        this.buttonElement.style.position = ABSOLUTE_POSITION;
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

class TextArea {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.textAreaElement = document.createElement("textarea");
        this.textAreaElement.style.position = ABSOLUTE_POSITION;
        this.textAreaElement.style.resize = "none";
        this.textAreaElement.style.height = "30px";
        this.textAreaElement.style.width = "170px";
        this.textAreaElement.style.fontSize = "20px";
        this.textAreaElement.style.left = this.x + "px";
        this.textAreaElement.style.top = this.y + "px";

        document.body.appendChild(this.textAreaElement);

        this.prompTextElement = document.createElement("p");
        this.prompTextElement.innerText = GAME_START_PROMPT;
        this.prompTextElement.style.position = ABSOLUTE_POSITION;
        this.prompTextElement.style.left = this.x + "px";
        this.prompTextElement.style.top = this.y - 40 + "px";

        document.body.appendChild(this.prompTextElement);

        this.buttonElement = document.createElement("button");
        this.buttonElement.style.position = ABSOLUTE_POSITION;
        this.buttonElement.style.height = "30px";
        this.buttonElement.style.left = this.x + this.textAreaElement.getBoundingClientRect().width + 5 + "px";
        this.buttonElement.style.top = this.y + "px";
        this.buttonElement.innerText = BUTTON_MESSAGE;

        document.body.appendChild(this.buttonElement);
    }

    getText() {
        return this.textAreaElement.value;
    }

    setOnClick(func) {
        this.buttonElement.onclick = func;
    }
}