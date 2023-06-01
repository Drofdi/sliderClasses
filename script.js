"use strict";

class Slider{
    constructor(){
    this.headBut = document.querySelector('.headButton')
    this.headInput = document.querySelector('.headInput')
    this.mainSlider = document.querySelector('.mainSlider')
    this.mainImgLine = document.querySelector('.mainImgLine')
    this.imgS = document.querySelectorAll('.sliderImg')
    this.buttonBack = document.querySelector('.back')
    this.buttonNext = document.querySelector('.next')
    this.points = document.querySelector('.points')


    this.x1 = 0
    this.x2 = 0
    this.offset = 0
    this.numberOfPictures = 1
    this.isMouseOn
    this.interval


    this.setEvents = this.setEvents.bind(this)
    this.pointerDown = this.pointerDown.bind(this)
    this.pointerMove = this.pointerMove.bind(this)
    this.pointerUp = this.pointerUp.bind(this)
    this.backSlide = this.backSlide.bind(this)
    this.nextSlide = this.nextSlide.bind(this)
    this.timer = this.timer.bind(this)
    this.destroyTimer = this.destroyTimer.bind(this)
    this.backSlideButton = this.backSlideButton.bind(this)
    this.nextSlideButton = this.nextSlideButton.bind(this)
    this.headButton = this.headButton.bind(this)

    this.timer()
    this.setEvents()
    }

    timer(){
        this.interval = setInterval(this.nextSlide, 5000)
    }

    destroyTimer(){
        clearInterval(this.interval)
    }

    setEvents(){
        this.mainSlider.addEventListener('pointerdown', this.pointerDown)
        this.mainSlider.addEventListener('pointermove', this.pointerMove)
        this.mainSlider.addEventListener('pointerup',this.pointerUp)
        this.buttonBack.addEventListener('click', this.backSlideButton)
        this.buttonNext.addEventListener('click', this.nextSlideButton)
        this.headBut.addEventListener('click',this.headButton)
    }

    headButton(){
        this.numberOfPictures = this.headInput.value
        if (this.numberOfPictures < 1 || this.numberOfPictures > 3){
            throw new Error("Введите значение от 1 до 3")
        }
        if (this.numberOfPictures == 1){
            for(let img of this.imgS){
                img.style.width = 853 + 'px'
                this.mainImgLine.style.left = -0 + 'px'
            }
        }    
        if (this.numberOfPictures == 2){
            for(let img of this.imgS){
                img.style.width = 426.5 + 'px'
                this.mainImgLine.style.left = -0 + 'px'
            }
        }
        if (this.numberOfPictures == 3){
            for(let img of this.imgS){
                img.style.width = 284.3 + 'px'
                this.mainImgLine.style.left = -0 + 'px'
            }
        }  
    }

    pointerDown(event){
        this.isMouseOn = true
        this.x1 = event.screenX
        this.mainSlider.addEventListener('pointermove', this.pointerMove)
    }

    pointerUp(){
        this.mainSlider.removeEventListener('pointermove', this.pointerMove)
    }

    pointerMove(event){
        this.x2 = event.screenX
        if(this.isMouseOn){
        if (this.x1 > this.x2){
            this.nextSlide()
            this.isMouseOn = false
            this.destroyTimer()
            this.timer()
        } else if (this.x2 > this.x1){
            this.backSlide()
            this.isMouseOn = false
            this.destroyTimer()
            this.timer()
        }
    }
    }

    backSlideButton(){
        this.backSlide()
        this.destroyTimer()
        this.timer()
    }

    nextSlideButton(){
        this.nextSlide()
        this.destroyTimer()
        this.timer()
    }

    backSlide(){
        if (this.numberOfPictures == 1){
            this.offset -= 853
                if (this.offset < 0){
                    this.offset = 3412
                }
        
                this.mainImgLine.style.left = -this.offset + 'px'
            }   
            if (this.numberOfPictures == 2){
                this.offset -= 426.5
                if (this.offset < 0){
                    this.offset = 1279.5
                }
        
                this.mainImgLine.style.left = -this.offset + 'px'
            }
            if (this.numberOfPictures == 3){
                this.offset -= 284.333
                if (this.offset < 0){
                    this.offset = 568.666
                }
        
                this.mainImgLine.style.left = -this.offset + 'px'
            }
    }

    nextSlide(){
        if (this.numberOfPictures == 1){
            this.offset += 853
            if (this.offset > 3412){
                this.offset = 0;
            }
    
            this.mainImgLine.style.left = -this.offset + 'px'
        }
        if (this.numberOfPictures == 2){
            this.offset += 426.5
            if (this.offset > 1279.5){
                this.offset = 0;
            }
    
            this.mainImgLine.style.left = -this.offset + 'px'
        }
        if (this.numberOfPictures == 3){
            this.offset += 284.333
            if (this.offset > 568.666){
                this.offset = 0;
            }
    
            this.mainImgLine.style.left = -this.offset + 'px'
        }
    }
}


new Slider()