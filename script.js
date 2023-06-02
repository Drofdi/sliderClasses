"use strict";

class ImgSliderSelectors{
    constructor(){
        this.headBut = querySelectors.headButton
        this.headInput = querySelectors.headInput
        this.mainSlider = querySelectors.mainSlider
        this.mainImgLine = querySelectors.mainImgLine
        this.imgS = querySelectors.sliderImg
        this.buttonBack = querySelectors.buttonBack
        this.buttonNext = querySelectors.buttonNext
    }
}

let querySelectors = {
       headButton : document.querySelector('.headButton'),
       headInput : document.querySelector('.headInput'),
       mainSlider : document.querySelector('.mainSlider'),
       mainImgLine : document.querySelector('.mainImgLine'),
       sliderImg : document.querySelectorAll('.sliderImg'),
       buttonBack : document.querySelector('.back'),
       buttonNext : document.querySelector('.next'),
}


class Timer{
    constructor(){
        this.timer = this.timer.bind(this)
        this.destroyTimer = this.destroyTimer.bind(this)
    }

    timer(){
        this.interval = setInterval(slider.logics.nextSlide, 5000)
    }

    destroyTimer(){
        clearInterval(this.interval)
    }
}

class Sliderlogics{
    constructor(){
    this.selectors = new ImgSliderSelectors()
    this.x1 = 0
    this.x2 = 0
    this.offset = 0
    this.numberOfPictures = 1
    this.isMouseOn
    this.interval

    this.headButton = this.headButton.bind(this)
    this.pointerDown = this.pointerDown.bind(this)
    this.pointerMove = this.pointerMove.bind(this)
    this.pointerUp = this.pointerUp.bind(this)
    this.backSlide = this.backSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.backSlideButton = this.backSlideButton.bind(this)
    this.nextSlideButton = this.nextSlideButton.bind(this)
    }

    headButton(){
        this.numberOfPictures = this.selectors.headInput.value
        if (this.numberOfPictures < 1 || this.numberOfPictures > 3){
            throw new Error("Введите значение от 1 до 3")
        }
        if (this.numberOfPictures == 1){
            this.offset = 0
            this.selectors.mainImgLine.style.left = 0 + '%'
            for(let img of this.selectors.imgS){
                img.style.width = 100 + '%'  
            }
        }    
        if (this.numberOfPictures == 2){
            this.offset = 0
            this.selectors.mainImgLine.style.left = 0 + '%'
            for(let img of this.selectors.imgS){
                img.style.width = 50 + '%' 
            }
        }
        if (this.numberOfPictures == 3){
            this.offset = 0
            this.selectors.mainImgLine.style.left = 0 + '%'
            for(let img of this.selectors.imgS){
                img.style.width = 33.333 + '%'
            }
        }  
    }

    pointerDown(event){
        this.isMouseOn = true
        this.x1 = event.screenX
        this.selectors.mainSlider.addEventListener('pointermove', this.pointerMove)
    }

    pointerUp(){
        this.selectors.mainSlider.removeEventListener('pointermove', this.pointerMove)
    }

    pointerMove(event){
        this.x2 = event.screenX
        if(this.isMouseOn){
        if (this.x1 > this.x2){
            this.nextSlide()
            this.isMouseOn = false
            timer.destroyTimer()
            timer.timer()
        } else if (this.x2 > this.x1){
            this.backSlide()
            this.isMouseOn = false
            timer.destroyTimer()
            timer.timer()
        }
    }
    }

    backSlideButton(){
        this.backSlide()
        timer.destroyTimer()
        timer.timer()
    }

    nextSlideButton(){
        this.nextSlide()
        timer.destroyTimer()
        timer.timer()
    }


    backSlide(){
        if (this.numberOfPictures == 1){
            this.offset -= 100
                if (this.offset < 0){
                    this.offset = 100 * (this.selectors.imgS.length - 1)
                }
                this.selectors.mainImgLine.style.left = -this.offset + '%'
            }   
            if (this.numberOfPictures == 2){
                this.offset -= 50
                if (this.offset < 0){
                    this.offset = 50 * (this.selectors.imgS.length - 2)
                }
                this.selectors.mainImgLine.style.left = -this.offset + '%'
            }
            if (this.numberOfPictures == 3){
                this.offset -= 33.33
                if (this.offset < 0){
                    this.offset = 33.33 * (this.selectors.imgS.length - 3)
                }
                this.selectors.mainImgLine.style.left = -this.offset + '%'
            }
    }

    nextSlide(){
        if (this.numberOfPictures == 1){
            this.offset += 100
            if (this.offset > 100 * (this.selectors.imgS.length - 1)){
                this.offset = 0
            }
            this.selectors.mainImgLine.style.left = -this.offset + '%'
        }
        if (this.numberOfPictures == 2){
            this.offset += 50
            if (this.offset > 50 * (this.selectors.imgS.length - 2)){
                this.offset = 0
            }
            this.selectors.mainImgLine.style.left = -this.offset + '%'
        }
        if (this.numberOfPictures == 3){
            this.offset += 33.33
            if (this.offset > 33.33 * (this.selectors.imgS.length - 3)){
                this.offset = 0
            }
            this.selectors.mainImgLine.style.left = -this.offset + '%'
        }
    }
}

class ImgSlider{
    constructor(){
    this.selectors = new ImgSliderSelectors()
    this.logics = new Sliderlogics()
    this.setEvents = this.setEvents.bind(this)
    this.setEvents()
}
    setEvents(){
        this.selectors.mainSlider.addEventListener('pointerdown', this.logics.pointerDown)
        this.selectors.mainSlider.addEventListener('pointermove', this.logics.pointerMove)
        this.selectors.mainSlider.addEventListener('pointerup',this.logics.pointerUp)
        this.selectors.buttonBack.addEventListener('click', this.logics.backSlideButton)
        this.selectors.buttonNext.addEventListener('click', this.logics.nextSlideButton)
        this.selectors.headBut.addEventListener('click', this.logics.headButton)
    }
} 

let slider = new ImgSlider()
let timer = new Timer()
timer.timer()
