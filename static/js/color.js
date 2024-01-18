




const loadColor = () =>{

    fetch(`http://127.0.0.1:8000/cloth/color/`)
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
