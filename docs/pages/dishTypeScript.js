function show(){
  document.getElementById('sidebar').classList.toggle('active');
}
const searchForm=document.querySelector('form');
const searchResultDiv=document.querySelector('.recipies');
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
  const base=`https://api.edamam.com/api/recipes/v2?type=public&app_id=${API_ID}&app_key=${API_KEY}&dishType=${searchQuery}&random=true&to=100`;
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
    
    </div>
      `
  }
  searchResultDiv.innerHTML=html;
}
