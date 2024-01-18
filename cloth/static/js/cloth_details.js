
const getParams=()=>{


let path = window.location.href.split('/');
let pathid = path.length;
let cloth_id = path[pathid-1];


fetch(`http://127.0.0.1:8000/cloth/list/${cloth_id}`)
.then((res) => res.json())
.then((data) => displayClothDetails(data));

}


const displayClothDetails = (cloth) => {
    // console.log(">>>>>>>>>>>>>>>>>",cloth.category);
    loadRecommendCloth(cloth.category, cloth.clothid);
    const parent = document.getElementById('cloth-details');
    const div = document.createElement("div");
    div.className = "card mb-3"
    div.innerHTML = `
    <img src="${cloth.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Name: ${cloth.name}</h5>
            <p class="card-text fw-bold">Price: $${cloth.price}</p>
            <p class="card-text">Description: ${cloth.description}</p>
            <p class="card-text fw-bold">Rating: ${cloth.rating}</p>
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

            <a href="http://127.0.0.1:8000/cloth/addcartlist/${cloth.clothid}" class="btn btn-success"><i class="fa-solid fa-cart-shopping"></i></a>
            <a href="http://127.0.0.1:8000/cloth/addwishlist/${cloth.clothid}" class="btn btn-success"><i class="fa-solid fa-heart"></i></a>
           
          </div>
  
    `;   
    parent.appendChild(div); 
    
}


getParams()

