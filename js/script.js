//CONSTANTS
const BUTTON_WIDTH = "10em";
const BUTTON_HEIGHT = "5em";
const ABSOLUTE_POSITION = "absolute";

class Button {
    constructor(number, x, y, parent) {
        this.number = number;
        this.x = x;
        this.y = y;
        this.active = true;

        this.buttonElement = document.createElement("button");
        this.buttonElement.style.left = this.x + "px";
        this.buttonElement.style.top = this.y + "px";
        this.buttonElement.innerText = this.number;

        this.buttonElement.classList.add("memory-button");

        this.colour = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255)
        ];

        this.buttonElement.style.backgroundColor = `rgb(${this.colour[0]}, ${this.colour[1]}, ${this.colour[2]})`;


        parent.appendChild(this.buttonElement);
    }

    juggle() {
        this.x = Math.abs(Math.floor(Math.random() * window.innerWidth) - this.buttonElement.getBoundingClientRect().width);
        this.y = Math.abs(Math.floor(Math.random() * window.innerHeight) - this.buttonElement.getBoundingClientRect().height);

        this.buttonElement.style.left = this.x + "px";
        this.buttonElement.style.top = this.y + "px";
    }

    setActive(newActive) {
        this.active = newActive;
        this.buttonElement.innerText = this.active ? this.number : "";
    }

    setOnClick(func) {
        this.buttonElement.onclick = func;
    }

    appendTo(parent) {
        parent.appendChild(this.buttonElement);
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
        this.buttonElement.innerText = GAME_START_BUTTON_MESSAGE;

        document.body.appendChild(this.buttonElement);
    }

    getText() {
        return this.textAreaElement.value;
    }

    setOnClick(func) {
        this.buttonElement.onclick = func;
    }

    hide() {
        this.textAreaElement.style.display = "none";
        this.prompTextElement.style.display = "none";
        this.buttonElement.style.display = "none";
    }

    show() {
        this.textAreaElement.style.display = "block";
        this.prompTextElement.style.display = "block";
        this.buttonElement.style.display = "block";
    }
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

class Game {
    constructor() {
        this.buttons = [];
        this.isJuggling = true;
        this.isGameOver = false;

        this.buttonRow = document.createElement("div");

        document.body.appendChild(this.buttonRow);

        this.userInput = new TextArea(10, 30);

        this.userInput.setOnClick(() => {
            if (Number(this.userInput.getText()) >= 3 && Number(this.userInput.getText()) <= 7) {
                this.run();
            } else {
                alert("Please enter a valid number between 3 & 7!");
            }
        })

        this.nextNumber = 1;
    }

    setButtonsActive(boolean) {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].setActive(boolean);
        }
    }

    async checkNumber(number) {
        if (!this.isJuggling && !this.isGameOver) {
            if (number == this.nextNumber) {
                this.nextNumber++;
                this.buttons[number - 1].setActive(true);
                if (this.nextNumber === this.buttons.length + 1) {
                    await sleep(1);
                    this.isGameOver = true;
                    alert(GAME_WIN_MESSAGE);
                }
            } else {
                this.setButtonsActive(true);
                this.isGameOver = true;
                alert(GAME_LOSE_MESSAGE);
            }
        }
    }

    async run() {
        this.userInput.hide();

        for (let i = 0; i < Number(this.userInput.getText()); i++) {
            this.buttons[i] = new Button(i + 1, 0, 0, this.buttonRow);

            this.buttons[i].setOnClick(() => {
                this.checkNumber(i + 1);
            })
        }

        await sleep(1000 * this.buttons.length);

        this.setButtonsActive(false);

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].appendTo(document.body);
        }

        for (let i = 0; i < this.buttons.length; i++) {
            for (let i = 0; i < this.buttons.length; i++) {
                this.buttons[i].juggle();
            }
            await sleep(2000);
        }
        this.isJuggling = false;
    }
}

addEventListener("load", () => {
    new Game();
});