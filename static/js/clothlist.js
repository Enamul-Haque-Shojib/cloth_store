






const loadSize = () =>{

    fetch(`https://cloth-store-3scu.onrender.com/cloth/size/`)
    .then((res) => res.json())
    .then((data) => displaySize(data))
    .catch((err) => console.log(err));
};


const displaySize = (sizes) =>{
    const parent = document.getElementById('size-container');
    sizes.forEach(size => {
        // console.log(size)
        const li = document.createElement("li");
        li.innerHTML = `
        <a class="dropdown-item" href="#" onclick="searchItem('${size.name}')">${size.name}</a>
        `;   
        parent.appendChild(li);     
    });
}





loadSize();






const loadColor = () =>{

    fetch(`https://cloth-store-3scu.onrender.com/cloth/color/`)
    .then((res) => res.json())
    .then((data) => displayColor(data))
    .catch((err) => console.log(err));
};


const displayColor = (colors) =>{
    const parent = document.getElementById('color-container');
    colors.forEach(color => {
        // console.log(color)
        const li = document.createElement("li");
        li.innerHTML = `
        <a class="dropdown-item" href="#" onclick="searchItem('${color.name}')">${color.name}</a>
        `;   
        parent.appendChild(li);     
    });
}





loadColor();




const loadCategory = () =>{

    fetch(`https://cloth-store-3scu.onrender.com/cloth/category/`)
    .then((res) => res.json())
    .then((data) => displayCategory(data))
    .catch((err) => console.log(err));
};


// const displayCategory = (categories) =>{
//     const parent = document.getElementById('category-container');
//     categories.forEach(category => {
//         // console.log(category)
//         const div = document.createElement("div");
//         div.className = 'col text-dark btn btn-outline-warning';
//         div.innerHTML = `
//         <div onclick="searchItem('${category.name}')">${category.name}</div>
//         `;  
         
//         parent.appendChild(div);     
//     });
// }
const displayCategory = (categories) =>{
    const parent = document.getElementById('category-container');
    let count_cat = 1;
    categories.forEach(category => {
        // console.log(category)
        const div = document.createElement("div");

        div.addEventListener('click', function handleClick(event) {
            searchItem(category.name)
          });


        if (count_cat == 1){
            div.className = 'card card_large';
            div.style.backgroundImage = `url('${category.image}')`; 
            count_cat++;
        }else if(count_cat==2){
            div.className = 'card card_small';
            div.style.backgroundImage = `url('${category.image}')`;
            count_cat++;
        }else if(count_cat==3){
            div.className = 'card card_medium';
            div.style.backgroundImage = `url('${category.image}')`;
            count_cat=1;
        }

        div.innerHTML = `
        <h4>${category.name}</h4>
        `; 
         
         
        parent.appendChild(div);     
    });
}





loadCategory();



const parent = document.getElementById('cloth-container');

const loadCloth = (querySearch) =>{
parent.innerHTML = ``;
// console.log('>>>>>',querySearch)

let url;
if (querySearch.search){
  
  url = `https://cloth-store-3scu.onrender.com/cloth/list/?search=${querySearch.search}`
}else if (querySearch.order){
  
  url = `https://cloth-store-3scu.onrender.com/cloth/list/?ordering=${querySearch.order}` 
}else{
  
  url = `https://cloth-store-3scu.onrender.com/cloth/list/`
}
  
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayCloth(data))
    .catch((err) => console.log(err));
};


const displayCloth = (cloths) =>{
    cloths.forEach(cloth => {
        // console.log(cloth)
        
        const div = document.createElement("div");
        div.className = 'col-lg-4 col-sm-12 my-3 ';
        div.innerHTML = `
        
        <div class="h-100 shadow p-3 bg-body-tertiary rounded">
          <div class="card-body">
            <img src="${cloth.image}" class="card-img-top card-image" alt="...">
            <h5 class="card-title mt-2 text-danger">${cloth.name}</h5>
            <p class="card-text m-0">Price: $${cloth.price}</p>
            <p class="card-text m-0">Rating: ${cloth.rating}</p>
            <p class="card-text">Description: ${cloth.description.slice(0,50)}...</p>
            <p class="card-text">Category: <span class="bg-primary p-2 text-white rounded-2 fw-light">${cloth.category}</span></p>
            <p class="card-text"> Color:
            ${cloth.color.map((item) => {
                if (item=='Red'){
                    return `<span><img src="../static/images/red.png" class="color-image" alt="..."></span>`
                }else if(item=='Black'){
                    return `<span><img src="../static/images/black.png" class="color-image" alt="..."></span>`
                }
                else if(item=='White'){
                    return `<span><img src="../static/images/white.png" class="color-image" alt="..."></span>`
                }
                else if(item=='Green'){
                    return `<span><img src="../static/images/green.png" class="color-image" alt="..."></span>`
                }
                else if(item=='Orange'){
                    return `<span><img src="../static/images/orange.png" class="color-image" alt="..."></span>`
                }
                else if(item=='Pink'){
                    return `<span><img src="../static/images/pink.png" class="color-image" alt="..."></span>`
                }
                else if(item=='Sky'){
                    return `<span><img src="../static/images/sky.png" class="color-image" alt="..."></span>`
                }
                else if(item=='Blue'){
                    return `<span><img src="../static/images/blue.png" class="color-image" alt="..."></span>`
                }
                
            }).join(' ')}
            </p>
            <p class="card-text"> Size:
            ${cloth.Size.map((item) => {
                return `<span>${item}</span>`
            }).join(", ")}
            </p>
            <a href="https://cloth-store-3scu.onrender.com/cloth/clothdetails/${cloth.clothid}" class='text-decoration-none text-dark btn btn-warning d-flex justify-content-center align-item-center'>View Details</a>
            
            
            
          </div>
        </div>
      
        `;   
        parent.appendChild(div);     
    });
}


const handleSearch = () =>{
  const value = document.getElementById('search').value;
  loadCloth({'search': value});
}




const searchItem = (item)=>{
  loadCloth({'search': item});
}
const orderItem = (item)=>{
  loadCloth({'order': item});
}



loadCloth({'empty':''});



