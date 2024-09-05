//CONSTANTS
const ABSOLUTE = "absolute";
const BUTTON_MESSAGE = "Go!";
const GAME_START_PROMPT = "How many buttons to create?";

class TextArea {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.textAreaElement = document.createElement("textarea");
        this.textAreaElement.style.position = ABSOLUTE;
        this.textAreaElement.style.resize = "none";
        this.textAreaElement.style.height = "30px";
        this.textAreaElement.style.width = "170px";
        this.textAreaElement.style.fontSize = "20px";
        this.textAreaElement.style.left = this.x + "px";
        this.textAreaElement.style.top = this.y + "px";

        document.body.appendChild(this.textAreaElement);

        this.prompTextElement = document.createElement("p");
        this.prompTextElement.innerText = GAME_START_PROMPT;
        this.prompTextElement.style.position = ABSOLUTE;
        this.prompTextElement.style.left = this.x + "px";
        this.prompTextElement.style.top = this.y - 40 + "px";

        document.body.appendChild(this.prompTextElement);

        this.buttonElement = document.createElement("button");
        this.buttonElement.style.position = ABSOLUTE;
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

//TEST
let textArea = new TextArea(100, 100);
textArea.setOnClick(() => {
    console.log(textArea.getText());
});