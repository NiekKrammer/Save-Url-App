let input = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabBtn = document.getElementById("tab-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("input") )

if (leadsFromLocalStorage) {
    input = leadsFromLocalStorage
    render(input)
}

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        input.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(input) )
        render(input)
    })
})
 
function render(tabs) {
    let listItems = ""
    for (let i = 0; i < tabs.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${tabs[i]}'>
                    ${tabs[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function() {
    localStorage.clear()
    input = []
    render(input)
})

inputBtn.addEventListener("click", function() {
    input.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("input", JSON.stringify(input) )
    render(input)
})