
const loadClothDetails=()=>{


    let path = window.location.href.split('/');
    let pathid = path.length;
    let cloth_id = path[pathid-1];
    
    
    fetch(`https://cloth-store-3scu.onrender.com/cloth/list/${cloth_id}`)
    .then((res) => res.json())
    .then((data) => displayClothDetails(data));
    
    }
    
    
    const displayClothDetails = (cloth) => {
        // console.log(">>>>>>>>>>>>>>>>>",cloth.category);
        loadRecommendCloth(cloth.category, cloth.clothid);
        const parent = document.getElementById('cloth-details');
        const div = document.createElement("div");
        div.className = "row g-0 "
        div.innerHTML = `



        <div class="col-lg-4">
        <img src="${cloth.image}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-lg-8">
        <div class="card-body ps-2">
        <h2 class="card-title fw-bold">Name: ${cloth.name}</h2>
        <p class="card-text fw-bold fs-4">Price: $${cloth.price}</p>
        <p class="card-text">Description: ${cloth.description}</p>
        <p class="card-text fw-bold">Rating: ${cloth.rating}</p>
        <p class="card-text fw-bold">Category: <span class="bg-primary p-2 text-white rounded-2 fw-light">${cloth.category}</span></p>
        <p class="card-text fw-bold">Quantity: <span class="fw-bold">${cloth.quantity}</span></p>
        <p class="card-text"> Color:
        ${cloth.color.map((item) => {
            if (item=='Red'){
                return `<span><img src="../../static/images/red.png" class="color-image" alt="..."></span>`
            }else if(item=='Black'){
                return `<span><img src="../../static/images/black.png" class="color-image" alt="..."></span>`
            }
            else if(item=='White'){
                return `<span><img src="../../static/images/white.png" class="color-image" alt="..."></span>`
            }
            else if(item=='Green'){
                return `<span><img src="../../static/images/green.png" class="color-image" alt="..."></span>`
            }
            else if(item=='Orange'){
                return `<span><img src="../../static/images/orange.png" class="color-image" alt="..."></span>`
            }
            else if(item=='Pink'){
                return `<span><img src="../../static/images/pink.png" class="color-image" alt="..."></span>`
            }
            else if(item=='Sky'){
                return `<span><img src="../../static/images/sky.png" class="color-image" alt="..."></span>`
            }
            else if(item=='Blue'){
                return `<span><img src="../../static/images/blue.png" class="color-image" alt="..."></span>`
            }
            else if(item=='Yellow'){
                return `<span><img src="../../static/images/yellow.png" class="color-image" alt="..."></span>`
            }
            
        }).join(' ')}
        </p>
  
        <p class="card-text fw-bold"> Size:
        ${cloth.Size.map((item) => {
            return `<span>${item}</span>`
        }).join(', ')}
        </p>

        <a href="https://cloth-store-3scu.onrender.com/cloth/addcartlist/${cloth.clothid}" class="btn btn-success fs-5">Add to Card<i class="fa-solid fa-cart-shopping ms-1"></i></a>
        <a href="https://cloth-store-3scu.onrender.com/cloth/addwishlist/${cloth.clothid}" class="btn btn-success fs-5">Add to wish<i class="fa-solid fa-heart ms-1"></i></a>
        </div>
      </div>
      
        `;   
        parent.appendChild(div); 
        
    }
    
    
    loadClothDetails()
    
    





const loadClothCartList = () =>{
    fetch('https://cloth-store-3scu.onrender.com/cloth/cartlist/')
    .then((res) => res.json())
    .then((data) => displayClothCartList(data))
    .catch((err) => console.log(err));
};






const deletecartlist = (id) => {
    const csrftoken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='))
        .split('=')[1];
    fetch(`https://cloth-store-3scu.onrender.com/cloth/deletecartlist/${id}`, {
    method: 'DELETE',
    headers: { "content-type": "application/json", "X-CSRFToken": csrftoken },
    
    })
  .then(data => {
    // console.log(data);
    window.location.href = "https://cloth-store-3scu.onrender.com/cloth/clothcartlist/";
  })
  .catch(err => console.log(err));
}

const displayClothCartList = (cloths) =>{
  const parent = document.getElementById('cloth-cartlist');
    cloths.forEach(cloth => {
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td><img src="${cloth.image}" class="cdlist-image" alt="..."></td>
        <td><a href="https://cloth-store-3scu.onrender.com/cloth/clothdetails/${cloth.clothid}">${cloth.name}</a></td>
        <td>$${cloth.price}</td>
        <td><a class="btn btn-outline-success fw-bold" href="https://cloth-store-3scu.onrender.com/cloth/addcartlistplus/${cloth.clothid}">+</a> ${cloth.quantity} <a class="btn btn-outline-danger fw-bold" href="https://cloth-store-3scu.onrender.com/cloth/addcartlistminus/${cloth.clothid}">-</a></td>
        <td><button class="btn btn-danger" onclick="deletecartlist(${cloth.id})"><i class="fa-solid fa-trash"></i></button></td>
      
        `;   
        parent.appendChild(tr);     
    });
}

loadClothCartList();






const loadClothWishList = () =>{
    fetch('https://cloth-store-3scu.onrender.com/cloth/wishlist/')
    .then((res) => res.json())
    .then((data) => displayClothWishList(data))
    .catch((err) => console.log(err));
};



const deletewishlist = (id) => {
  const csrftoken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      .split('=')[1];
  fetch(`https://cloth-store-3scu.onrender.com/cloth/deletewishlist/${id}`, {
  method: 'DELETE',
  headers: { "content-type": "application/json", "X-CSRFToken": csrftoken },
  
  })
.then(data => {
  // console.log(data);
  window.location.href = "https://cloth-store-3scu.onrender.com/cloth/clothwishlist/";
})
.catch(err => console.log(err));
}



const displayClothWishList = (cloths) =>{
    cloths.forEach(cloth => {
        // console.log(cloth)
        const parent = document.getElementById('cloth-wishlist');
        const div = document.createElement("div");
        div.className = 'col-3 my-3';
        div.innerHTML = `
        
        <div class="h-100 shadow p-3 bg-body-tertiary rounded">
          <div class="card-body">
            <img src="${cloth.image}" class="card-img-top wish-image" alt="...">
            <h5 class="card-title mt-1">${cloth.name}</h5>
            <p class="card-text m-0">Price: ${cloth.price}</p>
            <p class="card-text mb-1">Rating: ${cloth.rating}</p>
            <p class="card-text">Category: <span class="bg-primary p-2 text-white rounded-2 fw-light">${cloth.category}</span></p>
            <a href="https://cloth-store-3scu.onrender.com/cloth/clothdetails/${cloth.clothid}" class='text-decoration-none text-dark btn btn-warning' >View Details</a>
            <button class="btn btn-danger" onclick="deletewishlist(${cloth.id})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      
        `;   
        parent.appendChild(div);     
    });
}



loadClothWishList();





const parent = document.getElementById('recommend-container');
let cloth_id;
const loadRecommendCloth = (querySearch, id) =>{
    cloth_id = id
    console.log(querySearch)
parent.innerHTML = ``;

    fetch(`https://cloth-store-3scu.onrender.com/cloth/list/?search=${querySearch}`)
    .then((res) => res.json())
    .then((data) => displayRecommendCloth(data))
    .catch((err) => console.log(err));
};


const displayRecommendCloth = (cloths) =>{
    cloths.forEach(cloth => {
        console.log(cloth)
        if (cloth.clothid!= cloth_id){
            const div = document.createElement("div");
            div.className = 'col';
            div.innerHTML = `
            <div class="h-100 shadow p-3 bg-body-tertiary rounded">
                <div class="card-body">
                <img src="${cloth.image}" class="card-img-top rec-image" alt="...">
                  <h5 class="card-title text-danger mt-1">${cloth.name}</h5>
                  <p class="card-text m-0">Price: $${cloth.price}</p>
                  <p class="card-text m-0">Quantity: ${cloth.quantity}</p>
                  <p class="card-text mb-1-0">Rating: ${cloth.rating}</p>
                  <a href="https://cloth-store-3scu.onrender.com/cloth/clothdetails/${cloth.clothid}" class='text-decoration-none text-dark btn btn-warning d-flex justify-content-center align-items-center' >View Details</a>
                  
                </div>
              </div>
            `;   
            parent.appendChild(div);
        }
             
    });
}




