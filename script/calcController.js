class calcController {
    constructor() {
        this._lastOperation = '';
        this._lastNumber = '';
        this._operation = [];
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate = new Date();

        this.initialize();
        this.initButtonsEvents();
        this.initKeyBoard();
    }

    initialize() {
        this.setDisplayDateTime();

        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
        this.setLastNumberToDisplay();
    }

    initKeyBoard() {
        document.addEventListener("keyup", e => {
            console.log(e.key); 
    
            switch (e.key) {
                case "Escape":
                    this.clearALL();
                    break;
                case "Backspace":
                    this.clearEntry();
                    break;
                
                case "+":
                case "-":
                case "*":
                case "/":
                case "%":
                    this.addOperation(e.key);
                    break;
                
                case "Enter":
                case "=":
                    this.calc();
                    break;
                
                case ".":
                case ",":
                    this.addDot();
                    break;
                
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    this.addOperation(parseInt(e.key));
                    break;
            }
        });
    }

    addEventListenerAll(element, events, fn) {
        events.split(" ").forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearALL() {
        this._operation = [];
        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {
        return ['+', '-', '*', '%', '/', '.'].indexOf(value) > -1;
    }

    pushOperation(value) {
        this._operation.push(value);

        if (this._operation.length > 3) {
            this.calc();
        } else {
            this.setLastNumberToDisplay();
        }
    }

    getResult() {
        return eval(this._operation.join(""));

    }

    calc() {
        let last = '';
        this._lastOperation = this.getLastItem()

        if (this._operation.length < 3 ) {

            let firstItem = this._operation[0]
            this._operation = [firstItem, this._lastOperation, this._lastNumber ]
        }
        if (this._operation.length > 3) {
            last = this._operation.pop();

            
            this._lastNumber = this.getResult()
        }

        else if ( this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false)
        }

        
        let result = this.getResult()

        if (last == '%') {
            result /= 100;
            this._operation = [result]
        } else {
            this._operation = [result];
            if (last) this._operation.push(last)
        }

  

        this.setLastNumberToDisplay();
    }

    getLastItem(isOperator = true) {
        let lastItem = null;
    
        for (let i = this._operation.length - 1; i >= 0; i--) {
            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }
    
        if (!lastItem) {
            lastItem = isOperator ? this._lastOperation : this._lastNumber;
        }
    
        return lastItem;
    }


setLastNumberToDisplay() {
    let lastNumber = this.getLastItem(false)
    if (!lastNumber) lastNumber = 0;
    this.displayCalc = lastNumber;
}

addOperation(value) {
    let lastOperation = this.getLastOperation();

    if (isNaN(lastOperation)) {
        if (this.isOperator(value)) {
            this.setLastOperation(value);
        } else {
            this.pushOperation(value);
        }
    } else {
        if (this.isOperator(value)) {
            this.pushOperation(value);
        } else {
            let newValue = lastOperation.toString() + value.toString();
            this.setLastOperation(Number(newValue));
        }
    }

    this.setLastNumberToDisplay();
}

execBtn(value) {
    switch (value) {
        case "ac":
            this.clearALL();
            break;
        case "ce":
            this.clearEntry();
            break;

        case "soma":
            this.addOperation("+");
            break;
        case "subtracao":
            this.addOperation("-");
            break;
        case "divisao":
            this.addOperation("/");
            break;
        case "multiplicacao":
            this.addOperation("*");
            break;
        case "porcento":
            this.addOperation("%");
            break;
        case "igual":
            this.calc();
            break;

        case "ponto":
            this.addDoth();
            break;

        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            this.addOperation(parseInt(value));
            break;
    }
}

initButtonsEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn) => {
        this.addEventListenerAll(btn, "click", (e) => {
            let textBtn = btn.className.baseVal.replace("btn-", "");
            btn.style.cursor = "pointer";

            this.execBtn(textBtn);
        });
    });
}

setDisplayDateTime() {
    let now = new Date();
    this.displayDate = now.toLocaleDateString(this._locale);
    this.displayTime = now.toLocaleTimeString(this._locale);
}

    get displayTime() {
    return this._timeEl.innerHTML;
}
    set displayTime(value) {
    this._timeEl.innerHTML = value;
}

    get displayDate() {
    return this._dateEl.innerHTML;
}
    set displayDate(value) {
    this._dateEl.innerHTML = value;
}

    get displayCalc() {
    return this._displayCalcEl.innerHTML;
}
    set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
}

    get currentDate() {
    return new Date();
}
    set currentDate(value) {
    this._currentDate = value;
}
}
