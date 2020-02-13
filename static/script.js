function humbMenu(){var a=document.getElementById("myTopnav");"topnav"===a.className?a.className+=" responsive":a.className="topnav"}
document.addEventListener("DOMContentLoaded",function(){var lazyloadImages=document.querySelectorAll("img");var lazyloadThrottleTimeout;function lazyload(){if(lazyloadThrottleTimeout){clearTimeout(lazyloadThrottleTimeout)}
lazyloadThrottleTimeout=setTimeout(function(){var scrollTop=window.pageYOffset;lazyloadImages.forEach(function(img){if(img.offsetTop<(window.innerHeight+scrollTop)){img.src=img.dataset.src;img.classList.remove('lazy')}});if(lazyloadImages.length==0){document.removeEventListener("scroll",lazyload);window.removeEventListener("resize",lazyload);window.removeEventListener("orientationChange",lazyload)}},10)}
document.addEventListener("scroll",lazyload);window.addEventListener("resize",lazyload);window.addEventListener("orientationChange",lazyload)})
let slug=window.location.pathname.replace(/\/+$/,'').substr(1)
function fillStar(stars){for(var i=0;i<stars;i++){document.querySelectorAll(".rate svg")[i].style.fill="gold"}}
function getRate(rating){fetch(`https://us-central1-ratingsystem-d54ce.cloudfunctions.net/app/rating/${slug}`,{method:'GET',async:!1,}).then((res)=>res.json()).then(data=>{let avg=data.reduce((a,b)=>a+b,0)/data.length
if(data.length!==0){document.querySelector(".rate label").innerHTML=avg.toFixed(2)+"/"+data.length}
if(avg<2){fillStar(1)}else if(avg<3){fillStar(2)}else if(avg<4){fillStar(3)}else if(avg<5){fillStar(4)}else{fillStar(5)}}).catch((err)=>console.log(err))}
window.onload=getRate;function rate(rating){fetch('https://us-central1-ratingsystem-d54ce.cloudfunctions.net/app/rate',{method:'POST',async:!1,headers:{'Content-Type':'application/json'},body:JSON.stringify({slug:slug,rate:rating})}).then((res)=>{document.querySelector(".rate legend").innerHTML="Terimakasih .."}).catch((err)=>console.log(err))}
