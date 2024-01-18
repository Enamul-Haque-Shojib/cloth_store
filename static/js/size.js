




const loadSize = () =>{

    fetch(`http://127.0.0.1:8000/cloth/size/`)
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
