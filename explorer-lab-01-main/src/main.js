import "./css/index.css"
import Imask from "imask"

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
const colors = {
    visa: ["#436D99", "2D57F2"], 
    mastercard:["#DF6F29", "#C69347"], 
    default: ["black", "green"],    
    } 

    ccBgColor01.setAttribute("fill", colors[type][0]) 
    ccBgColor02.setAttribute("fill", colors[type][1])
    ccLogo.setAttribute("src", `cc-${type}.svg`)
}

setCardType("mastercard")

const securitycode = document.querySelector("#security-code")
const secutityCodePattern = {
    mask: "0000"
}

const secutityCodeMask = Imask(securitycode, secutityCodePattern)

const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
    mask: "MM{/}YY", 
    blocks:{
        MM:{
            mask:Imask.MaskedRange,
            from: 1,
            to: 12
        },
        YY:{
            mask:Imask.MaskedRange,
            from: 22,
            to: 32
        }
    }

}

const securityDateMask = Imask(expirationDate, expirationDatePattern)


const CardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
    mask:[
        {
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardType: "visa"
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardType: "mastercard"
        },
        {
            mask: "0000 0000 0000 0000",
            cardType: "default"
        }
    ],
    dispatch: function(appended, dynamicMasked){
        const number = (dynamicMasked.value + appended).replace(/\D/g, "")
        const foundMask = dynamicMasked.compiledMasks.find(function(item){
         return number.match(item.regex)   
        })
        return foundMask
    }
}

const CardNumberMask = Imask(CardNumber, cardNumberPattern)