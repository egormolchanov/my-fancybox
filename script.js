//fancybox version 2

const arrayImage = ['image/img1.jpg',
                    'image/img2.jpg', 
                    'image/img3.jpg'];

let blockGellery = document.querySelector('.block-gallery');

//add image gallery
const addImageGallery = () => {
    blockGellery.innerHTML = '';
    
    arrayImage.forEach((elemtnt, index) => {
        blockGellery.innerHTML += `<div class="gallery-image" data-image="${index}">
                                        <img class="gallery-image__img" src="${elemtnt}" alt="">
                                        <span class="gallery-image__magnifier">&telrec;</span>
                                </div>`
    });
}

addImageGallery();


// const loadFile = url => {
//     return new Promise((resolve, reject) => {
//         const xhr = new XMLHttpRequest();
//         xhr.responseType = 'blob';

//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === XMLHttpRequest.DONE) {
                
//                 xhr.addEventListener('load', () => {
//                     resolve();
//                 });


//                 xhr.addEventListener('error', () => {
//                     reject();
//                 });
//             }
//         }

//         xhr.open('GET', url);
//         xhr.send();
//     });
// }

const loadFile = async url => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        arrayImage.push(url);
        addImageGallery();
        let startFancyBox = wrapperFancyBox();
        startFancyBox();
      }
    } catch (e) {
        alert('Image not found');
    }
  }


//Add new image
document.querySelector('#sendImage').onclick = () => {

    const urlImage = document.querySelector('#addImage').value;

    loadFile(urlImage);

    // loadFile(urlImage)
    //     .then(() => {
    //         arrayImage.push(urlImage);
    //     })
    //     .then(() => {
    //         addImageGallery();
    //         let startFancyBox = wrapperFancyBox();
    //         startFancyBox();
    //     })
    //     .catch(() => {
    //         alert('Image not found');
    //     })
}


const wrapperFancyBox = () => {
    let galleryImage = document.querySelectorAll('.gallery-image'),
        insideGalleryImage = document.querySelectorAll('.gallery-image__img'),
        magnifier = document.querySelectorAll('.gallery-image__magnifier'),
        openImage,
        countIndex,
        wrapperOpenImage,
        buttonArrowLeft,
        buttonArrowRight,
        countNumberImageNow = 0,
        countNumberImage;

    
    return function fancyBox() {

        //open a large image
        const lookImage = event => {

            countIndex = event.path[1].attributes['data-image'].value;
            countNumberImageNow = 1 + Number(event.path[1].attributes['data-image'].value);
            
            //create wrapper
                wrapperOpenImage = document.createElement('div');
                wrapperOpenImage.classList.add('big-image');  
            blockGellery.appendChild(wrapperOpenImage);

            //creating a large image
                openImage = document.createElement('img');
                openImage.src = arrayImage[countIndex];
            wrapperOpenImage.appendChild(openImage);
            
            //create shadow
            const shadowOverlap = document.createElement('div');
                shadowOverlap.id ='shadow-overlap';
            document.body.appendChild(shadowOverlap);

            //create wrapper button left
            const wrapperButtonArrowLeft = document.createElement('div');
                wrapperButtonArrowLeft.classList.add('wrapper-button-arrow-left');
            wrapperOpenImage.appendChild(wrapperButtonArrowLeft);

            //create wrapper button right
            const wrapperButtonArrowRight = document.createElement('div');
                wrapperButtonArrowRight.classList.add('wrapper-button-arrow-right');
            wrapperOpenImage.appendChild(wrapperButtonArrowRight);

            //create count number
                countNumberImage = document.createElement('div');
                countNumberImage.classList.add('count-number-image');
                countNumberImage.innerHTML = `<p>${countNumberImageNow}/${arrayImage.length}</p>`;
            wrapperOpenImage.appendChild(countNumberImage);

            //show large image
            setTimeout(() => {
                wrapperOpenImage.classList.add('opacity');
            },250)

            //hide large image
            shadowOverlap.addEventListener('click', shadowOverlapHidn );

            wrapperButtonArrowLeft.addEventListener('mouseover', createButtonArrowLeft); 
            wrapperButtonArrowRight.addEventListener('mouseover', createButtonArrowRight); 

            wrapperButtonArrowLeft.addEventListener('mouseout', hidnButtonArrowLeft);
            wrapperButtonArrowRight.addEventListener('mouseout', hidnButtonArrowRight);

            wrapperButtonArrowLeft.addEventListener('mousedown', downClickButtonArrowLeft);
            wrapperButtonArrowRight.addEventListener('mousedown', downClickButtonArrowRight);

            wrapperButtonArrowLeft.addEventListener('mouseup', upClickButtonArrowLeft); 
            wrapperButtonArrowRight.addEventListener('mouseup', upClickButtonArrowRight); 
        }



        //hide large image
        const shadowOverlapHidn = () => {
            document.querySelector('.big-image').remove();
            document.querySelector('#shadow-overlap').remove();
        }

        //hover over a small image
        const onmouseoverImage = event => {
            if (event.target.tagName == 'IMG' || event.target.tagName == 'SPAN') {
                insideGalleryImage[event.path[1].attributes['data-image'].value].classList.add('on-mouseover-image');
                magnifier[event.path[1].attributes['data-image'].value].classList.add('magnifier');
            }
        }

        //remove mouse over a small image
        const onmouseoutImage = event => {
            if (event.target.tagName == 'IMG' || event.target.tagName == 'SPAN') {
                insideGalleryImage[event.path[1].attributes['data-image'].value].classList.remove('on-mouseover-image');
                magnifier[event.path[1].attributes['data-image'].value].classList.remove('magnifier');
            }
        }

        //event tracking
        galleryImage.forEach( elemtnt => elemtnt.addEventListener('click', lookImage));
        galleryImage.forEach( elemtnt => elemtnt.addEventListener('mouseover', onmouseoverImage));
        galleryImage.forEach( elemtnt => elemtnt.addEventListener('mouseout', onmouseoutImage));

        //show button arrow
        const createButtonArrowLeft = () => {
                buttonArrowLeft = document.createElement('div');
                buttonArrowLeft.classList.add('button-arrow-left');
            wrapperOpenImage.appendChild(buttonArrowLeft);
        }

        //show button arrow
        const createButtonArrowRight = () => {
                buttonArrowRight = document.createElement('div');
                buttonArrowRight.classList.add('button-arrow-right');
            wrapperOpenImage.appendChild(buttonArrowRight);
        }

        //hidden button arrow
        const hidnButtonArrowLeft = () => {
            buttonArrowLeft.remove();
        }

        //hidden button arrow
        const hidnButtonArrowRight = () => {
            buttonArrowRight.remove();
        }

        //click animation button
        const downClickButtonArrowLeft = () => {
            buttonArrowLeft.style.left= '0px';

        }
        //click animation button
        const downClickButtonArrowRight = () => {
            buttonArrowRight.style.right= '0px';
        }

        //button left
        const upClickButtonArrowLeft = () => {
            buttonArrowLeft.style.left= '5px';
            
            if (countIndex == 0) {
                countIndex = arrayImage.length-1 ;
                countNumberImageNow = arrayImage.length;
            } else {
                countIndex--;
                countNumberImageNow--;
            }  

            openImage.src = arrayImage[countIndex];

            //count nubmer image
            countNumberImage.innerHTML = `<p>${countNumberImageNow}/${arrayImage.length}</p>`;

        }

        //button right
        const upClickButtonArrowRight = () => {
            buttonArrowRight.style.right = '5px';

            if (countIndex == arrayImage.length-1) {
                countIndex = 0 ;
                countNumberImageNow = 1;
            } else {
                countIndex++;
                countNumberImageNow++;
            }  

            openImage.src = arrayImage[countIndex];

            //count nubmer image
            countNumberImage.innerHTML = `<p>${countNumberImageNow}/${arrayImage.length}</p>`;
        }
    }
}

let startFancyBox = wrapperFancyBox();
startFancyBox();



