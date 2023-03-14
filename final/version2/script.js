(function () {
    'use strict';

    console.log('reading JS');

    // const navLinks = document.querySelectorAll('nav ul li a');
    const headerHeight = 400;
    const allPics = document.querySelector('#allPics');
    const buttons = document.querySelectorAll('button');

    //USER TESTING
    const overlay = document.querySelector('#testingOverlay');
    const overlayButton = document.querySelector('#closeOverlay');
    const shadow = document.querySelector('#shadow')
    overlayButton.addEventListener("click", function(event){
        event.preventDefault();
        overlay.style.visibility = "hidden";
        shadow.style.visibility = "hidden";
    });





    window.addEventListener('load',function(){
        const posts = document.querySelectorAll('section');
        let postTops = [];
        let pagetop;
        let counter = 0;
        let prevCounter = 0;
        let doneResizing;

        posts.forEach(function(post){
            postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
        });

        window.addEventListener('scroll',function(){
            pagetop = window.pageYOffset + headerHeight;
            // console.log(pagetop);

            if (pagetop > 220 && pagetop > postTops[counter]){
                counter++;
                console.log(`scrolling down ${counter}`);
            } else if(counter > 1 && pagetop < postTops[counter-1]){
                counter--;
                console.log(`scrolling up ${counter}`);
            }

            if (pagetop < postTops[0]){
                counter = 0;
                prevCounter = 0;
                console.log(`scrolling up ${counter}`);
            }

            //Turns the rainbow halftone effect on and off
            if (counter != prevCounter && counter != 0){
                if (prevCounter != 0){
                    document.querySelector(`#instrument${prevCounter} .halftone1`).style.visibility = "hidden";
                    document.querySelector(`#instrument${prevCounter} .halftone2`).style.visibility = "hidden";
                }

                document.querySelector(`#instrument${counter} .halftone1`).style.visibility = "visible";
                document.querySelector(`#instrument${counter} .halftone2`).style.visibility = "visible";
                prevCounter = counter;
            } 
            else if (counter == 0){
                    document.querySelector(`#instrument1 .halftone1`).style.visibility = "hidden";
                    document.querySelector(`#instrument1 .halftone2`).style.visibility = "hidden";
            }

            //Rotates the images so the right one is showing
            switch(counter){
                case 0: allPics.className = 'defaultPos'; break;
                case 1: allPics.className = 'pic1'; break;
                case 2: allPics.className = 'pic2'; break;
                case 3: allPics.className = 'pic3'; break;
                case 4: allPics.className = 'pic4'; break;
                case 5: allPics.className = 'pic5'; break;
                default: allPics.className = 'defaultPos';
            }

        }); //end Window scroll

        window.addEventListener('resize', function () {

            // clear the timer
            clearTimeout(doneResizing);
        
            // start a timer that calls the resetPagePosition function in 500ms
            doneResizing = setTimeout(function () {
                resetPagePosition();
            }, 500);
        });

        function resetPagePosition() {
            // clear out the postTop values
            postTops = [];
        
            // push the new top values for each post in the posts array
            posts.forEach(function (post) {
                postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
            });
        
            // create a new variable to hold the position of the document
            const pagePosition = window.pageYOffset + headerHeight;
        
            // set the counter to 0
            counter = 0;
        
            // increment the counter based on the pagePosition 
            postTops.forEach(function (post) { if (pagePosition > post) { counter++; } });
        } 
    })//end window load

//add sound capabilities for buttons
    const steinbergerSound = new Audio('sounds/steinberger.wav');
    const toyPianoSound = new Audio('sounds/toyPiano.wav');
    const lesPaulSound = new Audio('sounds/lesPaul.wav');
    const monotronSound = new Audio('sounds/monotron.wav');
    const recordingKingSound = new Audio('sounds/recordingKing.wav');
    
    buttons.forEach(function(btn) {
        btn.addEventListener("click", function(event){
            event.preventDefault();
            event.target.className = 'rainbowFlashAnimation';
            setTimeout(() => {
                event.target.className = null;
              }, 1000);
            const thisButtonID = btn.getAttribute("id");
            console.log(thisButtonID);
            switch (thisButtonID){
                case 'steinbergerPlay': steinbergerSound.play(); break;
                case 'toyPianoPlay': toyPianoSound.play(); break;
                case 'lesPaulPlay': lesPaulSound.play(); break;
                case 'monotronPlay': monotronSound.play(); break;
                case 'recordingKingPlay': recordingKingSound.play(); break;
                default : console.log('not a sound button');
            };
        
        });
    });

})(); // end IIFE