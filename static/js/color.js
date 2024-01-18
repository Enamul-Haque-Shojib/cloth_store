




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
