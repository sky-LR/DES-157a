(function(){

    "use strict";

    console.log("reading JS");

    const formRef = document.querySelector('form');
    const formContent = document.querySelectorAll('form section');
    const reading = document.querySelector('#reading');
    const btn = document.querySelectorAll('button');
    const orb = document.querySelector('#ball');
    const ballHolder = document.querySelector('#ballHolder');

    formContent.className = 'part1';

    console.log(formContent.className);

    btn[0].addEventListener('click',function(e){
        for(let i = 0; i<formContent.length; i++)
        formContent[i].className = 'part2';
    })

    btn[1].addEventListener('click',function(e){
        for(let i = 0; i<formContent.length; i++)
        formContent[i].className = 'part1';
    })

    formRef.addEventListener('submit', function(e){
        e.preventDefault();
        let color1 = document.querySelector('#color1').value;
        let color2 = document.querySelector('#color2').value;
        let time1 = document.querySelector('#time1').value;
        let ad1 = document.querySelector('#ad1').value;
        let item1 = document.querySelector('#item1').value;
        let time2 = document.querySelector('#time2').value;
        let time3 = document.querySelector('#time3').value;
        let place = document.querySelector('#place').value;
        let mus = document.querySelector('#mus').value;
        let item2 = document.querySelector('#item2').value;
        let insult = document.querySelector('#insult').value;

        let madlibOutput = `Welcome! I am the one and only phychosto. Ah yes I see right away that you have a ${color1} aura with a ${color2} glow eminating from it. That's the rarest kind you can have! You will discover I can see the future. In the next ${time1} you will come into contact with a ${ad1} ${item1}. Be sure to remember this yes? DO NOT touch this object for it harbors a terrible curse that will follow you for ${time2}. In the next ${time3} you will meet your soulmate in ${place} while ${mus} plays in the background. Be sure to keep a(n) ${item2} hanging above your bed to ensure this will happen. Now get out of here ${insult} I have other customers.`;

        console.log(madlibOutput);

        if(color1 && color2 && time1 && ad1 && item1 && time2 && time3 && place && mus && item2 && insult){
        reading.innerHTML = `${madlibOutput}`;
        reading.className = 'showing';
        orb.className = 'readingMode';
        ballHolder.className = 'hidden';
        } else{
            alert('Please fill out all parts of the form so I can read you!');
        }

    })



}())