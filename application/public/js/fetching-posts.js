let url = "https://jsonplaceholder.typicode.com/albums/2/photos";
let photoCount=0;


function buildCard(data){
    var cardDiv=document.createElement("div");
    cardDiv.setAttribute("class","product-card");
    var imgTag=document.createElement("img");
    imgTag.setAttribute("class","product-img");
    imgTag.setAttribute("src",data.thumbnailUrl);
    imgTag.setAttribute("alt","card image");
    var productInfo=document.createElement("div");
    productInfo.setAttribute("class","product-info");
    var titleTag=document.createElement("p");
    titleTag.setAttribute("class","product-title");
    titleTag.appendChild(document.createTextNode(data.title));
    productInfo.appendChild(titleTag);
    cardDiv.appendChild(imgTag);
    cardDiv.appendChild(productInfo);

    cardDiv.addEventListener("click",fadeOut);
    return cardDiv;
}

async function fetchWithJSDOMAPI(){
    try {
        var response = await fetch(url);
        var data = await response.json();

        var photoCountElement = document.getElementById("photoCount");
        var elements = data.map(buildCard);
        document.getElementById("photoGallery").append(...elements);

        photoCount = data.length;
        photoCountElement.innerHTML = "Number of photos: " + photoCount;


    } catch (err) {
        console.log(err);
    }

}
fetchWithJSDOMAPI();

function fadeOut(ev){
    var ele=ev.currentTarget;
    let opacity = 1;
    let timer = setInterval(function() {
        opacity -= 0.2;
        ele.style.opacity = opacity;
        if(opacity <= 0){
            clearInterval(timer);
            ele.parentNode.removeChild(ele);
            photoCount-=1;
            document.getElementById("photoCount").innerHTML = "Number of photos: " + photoCount;
        }
    }, 50);
}