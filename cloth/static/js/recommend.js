

const parent = document.getElementById('recommend-container');
let cloth_id;
const loadRecommendCloth = (querySearch, id) =>{
    cloth_id = id
    console.log(querySearch)
parent.innerHTML = ``;

    fetch(`http://127.0.0.1:8000/cloth/list/?search=${querySearch}`)
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
            <div class="card h-100">
                <img src="${cloth.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${cloth.name}</h5>
                  <p class="card-text">Price: $${cloth.price}</p>
                  <p class="card-text">Quantity: ${cloth.quantity}</p>
                  <a href="http://127.0.0.1:8000/cloth/clothdetails/${cloth.clothid}" class='text-decoration-none text-dark btn btn-warning' >View Details</a>
                  
                </div>
              </div>
            `;   
            parent.appendChild(div);
        }
             
    });
}




