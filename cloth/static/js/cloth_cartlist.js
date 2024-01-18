const loadClothCartList = () =>{
    fetch('https://cloth-store-3scu.onrender.com/cloth/cartlist/')
    .then((res) => res.json())
    .then((data) => displayClothCartList(data))
    .catch((err) => console.log(err));
};


const displayClothCartList = (cloths) =>{
  const parent = document.getElementById('cloth-cartlist');
    cloths.forEach(cloth => {
        // console.log('>>>>>>>>>>>',cloth)
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${cloth.name}</td>
        <td>${cloth.price}</td>
        <td><a class="btn btn-outline-success" href="https://cloth-store-3scu.onrender.com/cloth/addcartlistplus/${cloth.clothid}">+</a> ${cloth.quantity} <a class="btn btn-outline-danger" href="http://127.0.0.1:8000/cloth/addcartlistminus/${cloth.clothid}">-</a></td>
        <td><a class="btn btn-danger" href="https://cloth-store-3scu.onrender.com/cloth/deletecartlist/${cloth.id}"><i class="fa-solid fa-trash"></i></a></td>
      
        `;   
        parent.appendChild(tr);     
    });
}

loadClothCartList();