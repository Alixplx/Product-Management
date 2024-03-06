let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let crudStatus = 'Create'

// link id parameter from updateData fun
let temp

// get Total
function getTotal () {

    if (price.value != '') {

        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = '#0d72b0'

    } else {

        total.innerHTML = ''
        total.style.background = 'black'
    }
}

// Create Product
let dataProduct;

if (localStorage.product != null) {

    dataProduct = JSON.parse(localStorage.product)

} else {

    dataProduct = []
}

submit.onclick = function () {

    let newProduct = {

        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '' && category.value != '' && newProduct.count <= 100) {

        if (crudStatus === 'Create') {

            // Check if Count Input > 1 if yes Create Element by user Selected from count input
            if (newProduct.count > 1) {
    
                for (let i = 0; i < newProduct.count; i++) {
    
                    dataProduct.push(newProduct)
                }
    
            } else { // if user type 0 or -number, we create 1 element 
    
                dataProduct.push(newProduct)
            }
            
            clearInputs()
        }

    } else {

        dataProduct[temp] = newProduct
        crudStatus = 'Create'
        submit.innerHTML = 'Create'
        count.style.display = 'block'
    }

    // Save Local Storage
    localStorage.setItem('product',JSON.stringify(dataProduct))
    
    showData()
}

// Clear Inputs
function clearInputs() {

    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}

// Read Data
function showData() {

    getTotal()

    let table = ''

    for (let i = 0; i < dataProduct.length; i++) {

        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td> <button onclick="updateData(${i})" id="update">Update</button> </td>
            <td> <button onclick="deleteData(${i})" id="delete">Delete</button> </td>
        </tr>
        `
    }

    document.getElementById('tbody').innerHTML = table

    let deleteAllButton = document.getElementById('deleteAll')
    if (dataProduct.length > 0) {

        deleteAllButton.innerHTML = `
            <button class="delAll" onclick="deleteAll()"> Delete All ${dataProduct.length}</button>
        `
    } else {

        deleteAllButton.innerHTML = ''
    }
}


// Run ShowData fun EveryTime
showData()


// Delete Data
function deleteData(id) {

    dataProduct.splice(id, 1)
    localStorage.product = JSON.stringify(dataProduct)
    showData()
}

// Delete All Data
function deleteAll() {

    localStorage.clear()
    dataProduct.splice(0)
    showData()
}

// Update Data 
function updateData(id) {

    title.value = dataProduct[id].title
    price.value = dataProduct[id].price
    taxes.value = dataProduct[id].taxes
    ads.value = dataProduct[id].ads
    discount.value = dataProduct[id].discount
    getTotal()
    count.style.display = 'none'
    category.value = dataProduct[id].category
    submit.innerHTML = 'Update'
    crudStatus = 'Update'
    temp = id

    scroll({
        top:0,
        behavior: 'smooth'
    })
}

// Search
let searchStatus = 'title'

function getSearchStatus(id) {

    let searchInput = document.getElementById('search')

    if (id == 'searchTitle') {

        searchStatus = 'title'

    } else {

        searchStatus = 'category'
    }

    searchInput.placeholder = 'Search By '+searchStatus
    
    searchInput.focus()
    searchInput.value = ''
    showData()
}

function searchData(value) {

    let table = ''

    for (let i = 0; i < dataProduct.length; i++) {

        if (searchStatus == 'title') {

            if (dataProduct[i].title.includes(value.toLowerCase())) {
    
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td> <button onclick="updateData(${i})" id="update">Update</button> </td>
                        <td> <button onclick="deleteData(${i})" id="delete">Delete</button> </td>
                    </tr>
                `
            }
    
        } else {
    
            if (dataProduct[i].category.includes(value.toLowerCase())) {
    
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td> <button onclick="updateData(${i})" id="update">Update</button> </td>
                        <td> <button onclick="deleteData(${i})" id="delete">Delete</button> </td>
                    </tr>
                `
            }
        }
    }

    document.getElementById('tbody').innerHTML = table
}

// Dark Light Mode
const body = document.querySelector('body')
const toggle = document.getElementById('toggle')
const button = document.querySelector('button')
const searchTitle = document.getElementById('searchTitle')
const searchCategory = document.getElementById('searchCategory')

toggle.onclick = function() {

    toggle.classList.toggle('active')
    body.classList.toggle('active')
    button.classList.toggle('active')
    searchTitle.classList.toggle('active')
    searchCategory.classList.toggle('active')
}