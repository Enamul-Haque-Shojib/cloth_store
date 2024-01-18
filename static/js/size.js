




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
