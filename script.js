const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var follow = document.getElementById("followcircle");

function animehere() {
    var temp = gsap.timeline();

    temp.from("#nav" ,{
            y : '-10',
            opacity : 0,
            duration : 1,
            ease : Expo.easeInOut,
    })
        .to(".boundingelem" , {
            y:0,
            duration:2,
            ease : Expo.easeInOut,
            stagger : .2,
            delay: -1
    })
        .from("#head_bottom" ,{
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,
        })
}

function circleskewer() {
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove" , function (dets) {
        clearTimeout(nomtimeitis);

        xscale = gsap.utils.clamp(0.75,1.25,dets.clientX - xprev);
        yscale = gsap.utils.clamp(0.75,1.25,dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        follower(xscale,yscale);

        var nomtimeitis = setTimeout(function() {
            document.querySelector("#followcircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(1 , 1)`;
        },100);

    });
}

function follower(xscale,yscale) {
    window.addEventListener("mousemove",function (dets) {
        document.querySelector("#followcircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${xscale} , ${yscale})`;
    })
}
animehere();

follower();

circleskewer();

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var rotatediff = 0;

    elem.addEventListener("mouseenter",function(delta){
        var hty = delta.clientY - elem.getBoundingClientRect().top;
        rotatediff = delta.clientX - rotate;
        rotate = delta.clientX;

        gsap.to(elem.querySelector("img") , {
            opacity: 1,
            ease: Expo.Power2,
            top: hty,
            left: delta.clientX,
            rotate: gsap.utils.clamp(-20,20,rotatediff*0.5)
        })
        follow.style = "height: 70px; width: 70px; opacity:0.7 ;"
    });
    
    elem.addEventListener("mousemove",function(delta){
        var hty = delta.clientY - elem.getBoundingClientRect().top;
        rotatediff = delta.clientX - rotate;
        rotate = delta.clientX;

        gsap.to(elem.querySelector("img") , {
            opacity: 1,
            ease: Power2,
            top: hty,
            left: delta.clientX,
            rotate: gsap.utils.clamp(-20,20,rotatediff*0.5)
        })
        follow.style = "height: 70px; width: 70px; opacity:0.7 ;"
    });

    elem.addEventListener("mouseleave",function(){
        gsap.to(elem.querySelector("img") , {
            opacity: 0,
            ease: Power2,
            duration: 0.5,
            left: 0,
            bottom: 0
        });
        follow.style = "height: 14px; width: 14px; opacity:1"
    });

    
});



setInterval(function(){
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var period = hours < 12 ? 'AM' : 'PM';

    var formattedHours = hours % 12 || 12;

    var formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
    document.querySelector("#time").innerHTML= "";
    document.querySelector("#time").innerHTML= `${formattedHours}:${formattedMinutes} ${period} IST`;
    console.log(document.querySelector("#time"));
}, 60000);