class calcController {
    constructor(){
        this._dispalyCalcEl = document.querySelector("#display")
        this._dateEl =  document.querySelector("#data")
        this._timeEl =  document.querySelector("#hora")
        
        this._currentDate;
        this.initialize();
    }

    initialize(){
     
     this._dateEl.innerHTML = "24/01/25"
     this._timeEl.innerHTML = "12:30"

    }

    get displayCalc(){

        return this._dispalyCalcEl.innerHTML;
    }

    set _dispalyCalc(valor){
        this._dispalyCalcEl.innerHTML = valor;
    }


    get currentDate(){
        this.currentDate
    }

    set currentDate(valor){
        this._currentDate = valor;
    }
}


