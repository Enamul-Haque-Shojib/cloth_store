




const loadCategory = () =>{

    fetch(`https://cloth-store-3scu.onrender.com/cloth/category/`)
    .then((res) => res.json())
    .then((data) => displayCategory(data))
    .catch((err) => console.log(err));
};


const displayCategory = (categories) =>{
    const parent = document.getElementById('category-container');
    categories.forEach(category => {
        // console.log(category)
        const div = document.createElement("div");
        div.className = 'col text-dark btn btn-outline-warning';
        div.innerHTML = `
        <div onclick="searchItem('${category.name}')">${category.name}</div>
        `;   
        parent.appendChild(div);     
    });
}





loadCategory();
