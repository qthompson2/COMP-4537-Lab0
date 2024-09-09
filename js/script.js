//Written with Github Copilot

//CONSTANTS
const GAME_BUTTON_CLASS = "memory-button";
const TEXT_AREA_POSITION = "absolute";
const TEXT_AREA_WIDTH = "170px";
const TEXT_AREA_HEIGHT = "24.4px";
const TEXT_AREA_BUTTON_HEIGHT = "30px";
const TEXT_AREA_FONT_SIZE = "20px";
const TEXT_AREA_RISIZE_MODE = "none";

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

        this.buttonElement.classList.add(GAME_BUTTON_CLASS);

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
        this.textAreaElement.style.position = TEXT_AREA_POSITION;
        this.textAreaElement.style.resize = TEXT_AREA_RISIZE_MODE;
        this.textAreaElement.style.height = TEXT_AREA_HEIGHT;
        this.textAreaElement.style.width = TEXT_AREA_WIDTH;
        this.textAreaElement.style.fontSize = TEXT_AREA_FONT_SIZE;
        this.textAreaElement.style.left = this.x + "px";
        this.textAreaElement.style.top = this.y + "px";

        document.body.appendChild(this.textAreaElement);

        this.prompTextElement = document.createElement("p");
        this.prompTextElement.innerText = GAME_START_PROMPT;
        this.prompTextElement.style.position = TEXT_AREA_POSITION;
        this.prompTextElement.style.left = this.x + "px";
        this.prompTextElement.style.top = this.y - 40 + "px";

        document.body.appendChild(this.prompTextElement);

        this.buttonElement = document.createElement("button");
        this.buttonElement.style.position = TEXT_AREA_POSITION;
        this.buttonElement.style.height = TEXT_AREA_BUTTON_HEIGHT;
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

//Sleep Function from: https://builtin.com/software-engineering-perspectives/javascript-sleep
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

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
                alert(INVALID_INPUT_MESSAGE);
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