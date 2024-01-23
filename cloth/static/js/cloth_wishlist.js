console.log("wisht")

const loadClothWishList = () =>{
    fetch('http://127.0.0.1:8000/cloth/wishlist/')
    .then((res) => res.json())
    .then((data) => displayClothWishList(data))
    .catch((err) => console.log(err));
};



const deletewishlist = (id) => {
  const csrftoken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='))
      .split('=')[1];
  fetch(`http://127.0.0.1:8000/cloth/deletewishlist/${id}`, {
  method: 'DELETE',
  headers: { "content-type": "application/json", "X-CSRFToken": csrftoken },
  
  })
.then(data => {
  // console.log(data);
  window.location.href = "http://127.0.0.1:8000/cloth/clothwishlist/";
})
.catch(err => console.log(err));
}



const displayClothWishList = (cloths) =>{
    cloths.forEach(cloth => {
        // console.log(cloth)
        const parent = document.getElementById('cloth-wishlist');
        const div = document.createElement("div");
        div.className = 'col-lg-3 col-sm-1 my-3';
        div.innerHTML = `
        
        <div class="card h-100">
          <div class="card-body">
            <img src="${cloth.image}" class="card-img-top" alt="...">
            <h5 class="card-title">${cloth.name}</h5>
            <p class="card-text fw-bold">Price: ${cloth.price}</p>
            <p class="card-text">${cloth.description.slice(0,95)}</p>
            <p class="card-text fw-bold">Category: <span class="bg-primary p-2 text-white rounded-2 fw-light">${cloth.category}</span></p>
            <a href="http://127.0.0.1:8000/cloth/clothdetails/${cloth.clothid}" class='text-decoration-none text-dark btn btn-warning' >View Details</a>
            <button class="btn btn-danger" onclick="deletewishlist(${cloth.id})"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
      
        `;   
        parent.appendChild(div);     
    });
}




loadClothWishList();