function show(){
  document.getElementById('sidebar').classList.toggle('active');
}

const searchForm=document.querySelector('form');
const searchResultDiv=document.querySelector('.recipies');
const homeScreen=document.querySelector('.home');
const container=document.querySelector('.container');
let searchQuery='';
const API_ID='f0633fcd';
const API_KEY='f3deefcbc31e5ab183c8e204b511ce16';
let state=[];


searchForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  searchQuery=e.target.querySelector('input').value;
  console.log(searchQuery)
  showAllData();
})

async function getData(){
  const base=`https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${API_ID}&app_key=${API_KEY}&to=70`;
  const response= await fetch(base);
  const data= await response.json();
  return data.hits;
  
}
//state=await getData();
async function showAllData(){
  state=await getData();
  genHtml2(state);
  console.log(state);
}

function genHtml2(results){
  let html='';
  let li=[];
  
  for(let res of results){
    
    html+=`
    <div class="card">
    <img class="img" src="${res.recipe.image}" alt="">
    <div class="container">
    <div class="title">
    <h1>${res.recipe.label}</h1>
    
    <p>Style of cuisine: ${res.recipe.cuisineType}</p>
    <p>Style of Dish: ${res.recipe.dishType}</p>
    <p>Type of diet: ${res.recipe.dietLabels}</p>
    <p>Calories: ${res.recipe.calories}</p>
    <p>Yield: ${res.recipe.yield}</p>
    <p>Ingredients</p>
    `
      let ingredientArr=res.recipe.ingredientLines;
    if(ingredientArr !=null){
      let iCount=0;
      while(iCount<ingredientArr.length){
        //(check if working properly)console.log(res.recipe.ingredientLines[iCount]);
        html+=
          `
          <p>${ingredientArr[iCount]}</p>
          `
        iCount++;
      }
    }
    html+=
      `
      <a href="${res.recipe.url}">View recipe</a>
    
  </div>
    </div>
    
    </div>
      `
  }
  searchResultDiv.innerHTML=html;
}


async function getLowC(){
  const baseLC=`https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&diet=low-carb&dishType=Main-course&random=true&to=80`;
  const responseLC= await fetch(baseLC);
  const dataLC= await responseLC.json();

  console.log(dataLC.hits);
  genHtml2(dataLC.hits); 
}

async function getLf(){
  const baseLF=`https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&diet=low-fat&dishType=Desserts&random=true&to=80`;
  const responseLF= await fetch(baseLF);
  const dataLF= await responseLF.json();

  console.log(dataLF.hits);
  genHtml2(dataLF.hits); 
}

async function getKeto(){
  const baseK=`https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&health=keto-friendly&random=true&to=80`;
  const responseK= await fetch(baseK);
  const dataK= await responseK.json();

  console.log(dataK.hits);
  genHtml2(dataK.hits); 
}

async function getGluten(){
  const baseGl=`https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&health=gluten-free&random=true&to=80`;
  const responseGl= await fetch(baseGl);
  const dataGl= await responseGl.json();

  console.log(dataGl.hits);
  genHtml2(dataGl.hits); 
}

/*
async function getRand(){
  const baseR=`https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${API_ID}&app_key=${API_KEY}&mealType=Dinner&random=true&to=80`;
  const responseR= await fetch(baseR);
  const dataR= await responseR.json();

  console.log(dataR.hits);
  genRand(dataR.hits); 
  
}

function genRand(results){
  let html='';
  let li=[];
  
  for(let res of results){
    
    html+=`
    <div class="item">
    <img src="${res.recipe.image}" alt="">
    <div class="flex-container">
    <h1 class="title">${res.recipe.label}</h1>
    
    <p>Style of cuisine:${res.recipe.cuisineType}</p>
    <p>Style of Dish:${res.recipe.dishType}</p>
    <p>Type of diet:${res.recipe.dietLabels}</p>
    <p>Calories:${res.recipe.calories}</p>
    <p>Yield:${res.recipe.yield}</p>
    <p>Ingredients</p>
    `
      let ingredientArr=res.recipe.ingredientLines;
    if(ingredientArr !=null){
      let iCount=0;
      while(iCount<ingredientArr.length){
        //(check if working properly)console.log(res.recipe.ingredientLines[iCount]);
        html+=
          `
          <p>${ingredientArr[iCount]}</p>
          `
        iCount++;
      }
    }
    html+=
      `
      <a href="${res.recipe.url}">View recipe</a>
    
  </div>
    </div>
      `
  }
  homeScreen.innerHTML=html;
}
*/

