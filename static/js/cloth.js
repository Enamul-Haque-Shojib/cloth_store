const parent = document.getElementById('cloth-container');

const loadCloth = (querySearch) =>{
parent.innerHTML = ``;
// console.log('>>>>>',querySearch)

let url;
if (querySearch.search){
  
  url = `http://127.0.0.1:8000/cloth/list/?search=${querySearch.search}`
}else if (querySearch.order){
  
  url = `http://127.0.0.1:8000/cloth/list/?ordering=${querySearch.order}` 
}else{
  
  url = `http://127.0.0.1:8000/cloth/list/`
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
        div.className = 'col-sm-4';
        div.innerHTML = `
        
        <div class="card h-100">
          <div class="card-body">
            <img src="${cloth.image}" class="card-img-top" alt="...">
            <h5 class="card-title">${cloth.name}</h5>
            <p class="card-text fw-bold">Price: ${cloth.price}</p>
            <p class="card-text fw-bold">Rating: ${cloth.rating}</p>
            <p class="card-text">Description: ${cloth.description.slice(0,95)}</p>
            <p class="card-text fw-bold">Category: <span class="bg-primary p-2 text-white rounded-2 fw-light">${cloth.category}</span></p>
            <p class="card-text fw-bold">Quantity: <span class="fw-bold">${cloth.quantity}</span></p>
            <p class="card-text fw-bold"> Color:
            ${cloth.color.map((item) => {
                return `<span>${item}</span>`
            })}
            </p>
            <p class="card-text fw-bold"> Size:
            ${cloth.Size.map((item) => {
                return `<span>${item}</span>`
            })}
            </p>
            <a href="http://127.0.0.1:8000/cloth/clothdetails/${cloth.clothid}" class='text-decoration-none text-dark btn btn-warning'>View Details</a>
            
            
            
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
