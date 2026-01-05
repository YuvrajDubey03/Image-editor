let filters = {
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
const resetButton = document.querySelector("#reset-btn")
const downloadButton = document.querySelector("#download-btn")
const presetcontainer = document.querySelector(".presets")
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

function createElement(){
        Object.keys(filters).forEach(key =>{
    const filterElement = createfilterElement(key, filters[key].unit,filters[key].value ,filters[key].min ,filters[key].max)

    filteContainer.appendChild(filterElement)

    })
}
  
createElement();

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


const filterMap = {
  Brightness: "brightness",
  Contrast: "contrast",
  Saturation: "saturate",
  HueRotation: "hue-rotate",
  Blur: "blur",
  Grayscale: "grayscale",
  Sepia: "sepia",
  Opacity: "opacity",
  Invert: "invert"
};

function applyFilter() {
  if (!image) return;

  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  const filterString = Object.keys(filters)
    .map(key => {
      const { value, unit } = filters[key];
      return `${filterMap[key]}(${value}${unit})`;
    })
    .join(" ");

  canvasCtx.filter = filterString;
  canvasCtx.drawImage(image, 0, 0);
}

// reset button
 resetButton.addEventListener("click",()=>{
    filters = {
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
applyFilter();
filteContainer.innerHTML=""
createElement();

 })

//  download button

downloadButton.addEventListener("click",()=>{
 const link = document.createElement("a")
 link.download = "Edited-Image.png"
link.href =imageCanvas.toDataURL()
link.click()    


})


 const presets = {
  Drama: {
    Brightness: 110,
    Contrast: 150,
    Saturation: 135,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 10,
    Opacity: 100,
    Invert: 0
  },

  Vintage: {
    Brightness: 105,
    Contrast: 90,
    Saturation: 70,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 10,
    Sepia: 45,
    Opacity: 100,
    Invert: 0
  },

  OldSchool: {
    Brightness: 95,
    Contrast: 110,
    Saturation: 60,
    HueRotation: 0,
    Blur: 1,
    Grayscale: 20,
    Sepia: 35,
    Opacity: 100,
    Invert: 0
  },

  Cinematic: {
    Brightness: 95,
    Contrast: 140,
    Saturation: 85,
    HueRotation: 10,
    Blur: 0,
    Grayscale: 5,
    Sepia: 10,
    Opacity: 100,
    Invert: 0
  },

  Warm: {
    Brightness: 110,
    Contrast: 105,
    Saturation: 120,
    HueRotation: 20,
    Blur: 0,
    Grayscale: 0,
    Sepia: 15,
    Opacity: 100,
    Invert: 0
  },

  Cold: {
    Brightness: 100,
    Contrast: 115,
    Saturation: 80,
    HueRotation: 200,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0
  },

  Fade: {
    Brightness: 115,
    Contrast: 80,
    Saturation: 75,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 5,
    Sepia: 10,
    Opacity: 100,
    Invert: 0
  },

  BlackWhite: {
    Brightness: 100,
    Contrast: 120,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 0
  },

  Soft: {
    Brightness: 108,
    Contrast: 90,
    Saturation: 95,
    HueRotation: 0,
    Blur: 2,
    Grayscale: 0,
    Sepia: 5,
    Opacity: 100,
    Invert: 0
  }
};

// ---------- PRESET APPLY ----------

function applyPreset(presetName) {
  if (!presets[presetName] || !image) return;

  const preset = presets[presetName];

  Object.entries(preset).forEach(([filterName, value]) => {
    if (filters[filterName]) {
      filters[filterName].value = value;

      const slider = document.getElementById(filterName);
      if (slider) slider.value = value;
    }
  });

  applyFilter();
}

// create preset buttons
Object.keys(presets).forEach(presetName => {
  const presetButton = document.createElement("button");
  presetButton.className = "btn";
  presetButton.innerText = presetName;

  presetButton.addEventListener("click", () => {
    applyPreset(presetName);
  });

  presetcontainer.appendChild(presetButton);
});
