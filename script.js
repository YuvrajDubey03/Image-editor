const filters = {
    Brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
                 },
    Contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
 
    Saturation: {
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    HueRotation: {
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    Blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    Grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    Sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    Opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    Invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    }, 
}
const imageCanvas = document.querySelector("#image-canvas")
const imageInput = document.querySelector("#image-input")
const canvasCtx = imageCanvas.getContext("2d")
let file = null;
let image = null;




const filteContainer = document.querySelector(".filters")



function createfilterElement(name,unit="%",value,min,max){
    const div = document.createElement("div")
    div.classList.add("filter")

    const input = document.createElement("input")
    input.type = "range"
    input.value = value
   input.min = min
   input.max = max
    input.id= name

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input",()=>{
        filters[name].value =input.value
      applyFilter();
    })

    return div
}

    Object.keys(filters).forEach(key =>{
    const filterElement = createfilterElement(key, filters[key].unit,filters[key].value ,filters[key].min ,filters[key].max)

    filteContainer.appendChild(filterElement)

    })
  
imageInput.addEventListener("change",(event)=>{
  
  file = event.target.files[ 0 ]
    const imagePlaceholder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceholder.style.display = "none"
  
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () =>{
        image =img
        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img,0,0)
    }
   
})


 function applyFilter(){
    canvasCtx.clearRect(0,0,imageCanvas.width,imageCanvas.height);
    canvasCtx.filter =`
Brightness(${filters.Brightness.value}${filters.Brightness.unit})
Contrast(${filters.Contrast.value}${filters.Contrast.unit})
Saturate(${filters.Saturation.value}${filters.Saturation.unit})
Hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
Blur(${filters.Blur.value}${filters.Blur.unit})
Grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
Sepia(${filters.Sepia.value}${filters.Sepia.unit})
Opacity(${filters.Opacity.value}${filters.Opacity.unit})
Invert(${filters.Invert.value}${filters.Invert.unit})
`

    canvasCtx.drawImage(image,0,0)

 }