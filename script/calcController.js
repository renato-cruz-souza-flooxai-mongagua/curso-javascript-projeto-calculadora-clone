class calcController {
    constructor(){
        this._displayCalc = "0"
        this._currentDate;
        this.initialize();

    }

    initialize(){
      
       let dispalyCalcEl = document.querySelector("#display")
       let dateEl =   document.querySelector("#data")
       let timeEl =  document.querySelector("#hora")

       dispalyCalcEl.innerHTML = "4567"
     dateEl.innerHTML = "24/01/25"
     timeEl.innerHTML = "12:30"

    }

    get displayCalc(){

        return this._displayCalc;
    }

    set displayCalc(valor){
        this._displayCalc = valor;
    }


    get currentDate(){
        this.currentDate
    }

    set currentDate(valor){
        this._currentDate = valor;
    }
}


