

const loadClothWishList = () =>{
    fetch('https://cloth-store-3scu.onrender.com/cloth/wishlist/')
    .then((res) => res.json())
    .then((data) => displayClothWishList(data))
    .catch((err) => console.log(err));
};


const displayClothWishList = (cloths) =>{
    cloths.forEach(cloth => {
        console.log(cloth)
        const parent = document.getElementById('cloth-wishlist');
        const div = document.createElement("div");
        div.className = 'col-3 my-3';
        div.innerHTML = `
        
        <div class="card h-100">
          <div class="card-body">
            <img src="${cloth.image}" class="card-img-top" alt="...">
            <h5 class="card-title">${cloth.name}</h5>
            <p class="card-text fw-bold">Price: ${cloth.price}</p>
            <p class="card-text">${cloth.description.slice(0,95)}</p>
            <p class="card-text fw-bold">Category: <span class="bg-primary p-2 text-white rounded-2 fw-light">${cloth.category}</span></p>
            <a href="https://cloth-store-3scu.onrender.com/cloth/clothdetails/${cloth.clothid}" class='text-decoration-none text-dark btn btn-warning' >View Details</a>
            <a class="btn btn-danger" href="https://cloth-store-3scu.onrender.com/cloth/deletewishlist/${cloth.id}"><i class="fa-solid fa-trash"></i></a>
          </div>
        </div>
      
        `;   
        parent.appendChild(div);     
    });
}

loadClothWishList();