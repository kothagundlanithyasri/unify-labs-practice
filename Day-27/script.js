const API = "http://localhost:3000";


function addProduct(){

const name = document.getElementById("name").value;
const price = document.getElementById("price").value;
const stock = document.getElementById("stock").value;

fetch(API+"/product",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
price,
stock
})

})
.then(res=>res.json())
.then(data=>alert("Product Added"));

}



function updateStock(){

const id = document.getElementById("updateId").value;
const stock = document.getElementById("updateStock").value;

fetch(API+"/product/"+id,{

method:"PATCH",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
stock
})

})
.then(res=>res.json())
.then(data=>alert("Stock Updated"));

}



function deleteProduct(){

const id = document.getElementById("deleteId").value;

fetch(API+"/product/"+id,{

method:"DELETE"

})
.then(res=>res.text())
.then(data=>alert("Product Deleted"));

}