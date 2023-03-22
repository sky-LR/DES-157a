(function () {
    'use strict';

    console.log('reading JS');

    // const navLinks = document.querySelectorAll('nav ul li a');
    const headerHeight = 400;
    const allPics = document.querySelector('#allPics');
    const buttons = document.querySelectorAll('button');
    const sections = document.querySelectorAll('section');
    const scrollReminder = document.querySelector('#scrollReminder');
    const sectionH3 = document.querySelectorAll('h3');
    let reminderTimer;
    let snapTimer;

    // //USER TESTING
    // const overlay = document.querySelector('#testingOverlay');
    // const overlayButton = document.querySelector('#closeOverlay');
    // const shadow = document.querySelector('#shadow')
    // overlayButton.addEventListener("click", function(event){
    //     event.preventDefault();
    //     overlay.style.visibility = "hidden";
    //     shadow.style.visibility = "hidden";
    // });
    // //END USER TESTING

    //Shows the Scroll reminder
    function showScroll() {
        scrollReminder.className = 'showing';
    };

    //Snaps the current section to the top of the page
    function snapTo(counter,postTops){
        window.scrollBy({
            top: postTops[counter-1] - window.pageYOffset +1,
            behavior: 'smooth'
        });
    };

    //Sets the clasname for the h3s
    // for(let i=0; i<sectionH3.length; i++){
    //     sectionH3[i].className = 'h3OffScreen'
    // }


    //Things to be run once the window loads
    window.addEventListener('load',function(){
        const posts = document.querySelectorAll('section');
        let postTops = [];
        let pagetop;
        let counter = 0;
        let prevCounter = 0;
        let doneResizing;

        //Puts the y offset of each section in the postTops array
        posts.forEach(function(post){
            postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
        });

        //show scroll reminder after 3 seconds
        reminderTimer = setTimeout(showScroll, 3000);

        //Things to be run on scroll
        window.addEventListener('scroll',function(){
            pagetop = window.pageYOffset + headerHeight;

            //Increments or decrements the counter when you scroll to a new section 
            if (pagetop > 220 && pagetop > postTops[counter]){
                counter++;
                console.log(`scrolling down ${counter}`);
            } else if(counter > 1 && pagetop < postTops[counter-1]){
                counter--;
                console.log(`scrolling up ${counter}`);
            }

            //Sets the counter to 0 for the title section
            if (pagetop < postTops[0]){
                counter = 0;
                prevCounter = 0;
                console.log(`scrolling up ${counter}`);
            }

            //clear the scroll reminder as soon as you scroll
            clearTimeout(reminderTimer);

            //Snaps to the current section after a period of inaction
            clearTimeout(snapTimer);
            snapTimer = setTimeout(snapTo, 500, counter, postTops);

            //If you're on the title section and you haven't scrolled in a while show the scroll reminder
            if (counter == 0){
                scrollReminder.className = 'hidden';
                clearTimeout(reminderTimer);
                reminderTimer = setTimeout(showScroll, 2000);
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


            //Rotates the images so the correct one is showing. Slides in the h3 heading for each section
            switch(counter){
                case 0: 
                    allPics.className = 'defaultPos';
                    sectionH3[counter].style.transform = 'translate(-100%,0)';
                break;
                case 1: 
                    allPics.className = 'pic1';
                    sectionH3[0].style.transform = 'translate(0,0)';
                    sectionH3[1].style.transform = 'translate(-100%,0)';
                break;
                case 2: 
                    allPics.className = 'pic2';
                    sectionH3[1].style.transform = 'translate(0,0)';
                    sectionH3[2].style.transform = 'translate(-100%,0)';
                    sectionH3[0].style.transform = 'translate(-100%,0)';
                break;
                case 3: 
                    allPics.className = 'pic3';
                    sectionH3[2].style.transform = 'translate(0,0)';
                    sectionH3[3].style.transform = 'translate(-100%,0)';
                    sectionH3[1].style.transform = 'translate(-100%,0)';
                break;
                case 4: 
                    allPics.className = 'pic4';
                    sectionH3[3].style.transform = 'translate(0,0)';
                    sectionH3[4].style.transform = 'translate(-100%,0)';
                    sectionH3[2].style.transform = 'translate(-100%,0)';
                break;
                case 5: 
                    allPics.className = 'pic5';
                    sectionH3[4].style.transform = 'translate(0,0)';
                    sectionH3[3].style.transform = 'translate(-100%,0)';
                break;
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

            //Plays the correct sound, applies animation and removes animation when sound is over (I'm well aware this could be optimized so there's not as much repeated code but I am too tired to figure it out)
            switch (thisButtonID){
                case 'steinbergerPlay': 
                    steinbergerSound.play(); document.querySelector(`#instrument1 .halftone2`).classList.add('jitter');
                    setTimeout(() => {
                        document.querySelector(`#instrument1 .halftone2`).classList.remove('jitter');
                      }, (steinbergerSound.duration * 1000)); 
                break;
                case 'toyPianoPlay': 
                    toyPianoSound.play(); document.querySelector(`#instrument2 .halftone2`).classList.add('jitter'); 
                    setTimeout(() => {
                        document.querySelector(`#instrument2 .halftone2`).classList.remove('jitter');
                      }, (toyPianoSound.duration * 1000)); 
                break;
                case 'lesPaulPlay': 
                    lesPaulSound.play(); document.querySelector(`#instrument3 .halftone2`).classList.add('jitter'); 
                    setTimeout(() => {
                        document.querySelector(`#instrument3 .halftone2`).classList.remove('jitter');
                      }, (lesPaulSound.duration * 1000)); 
                break;
                case 'monotronPlay': monotronSound.play(); 
                    document.querySelector(`#instrument4 .halftone2`).classList.add('jitter'); 
                    setTimeout(() => {
                        document.querySelector(`#instrument4 .halftone2`).classList.remove('jitter');
                      }, (monotronSound.duration * 1000));  
                break;
                    
                case 'recordingKingPlay': 
                    recordingKingSound.play(); document.querySelector(`#instrument5 .halftone2`).classList.add('jitter'); 
                    setTimeout(() => {
                        document.querySelector(`#instrument5 .halftone2`).classList.remove('jitter');
                      }, (recordingKingSound.duration * 1000));  
                break;
                    
                default : console.log('not a sound button');
            };

        });
    });

})(); // end IIFE