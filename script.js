// step 1
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js"

import { getDatabase, 
        ref, 
        push, 
        onValue,
        remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js"

// create a reference to push data (should be beside the database)
// step 2 edit the import {getDatabase} & firebase- app and change to firebase-database
const firebaseConfig = {
    // This is copied from firebase in google chrome
    databaseURL: "https://leads-tracker-e5d1d-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

// next create a reference in a database 
const referenceinDB = ref(database, "leads")
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")

const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

function render(leads) {
    let listItems = ""
    for(let i = 0; i < leads.length; i++) {
    listItems += `<li>
                    <a href='${leads[i]}' target='_blank'>
                        ${leads[i]}
                    </a>
                </li>`
    }
    ulEl.innerHTML = listItems
}
onValue(referenceinDB, function(snapshot) {
    const snapshotExists = snapshot.exists()
    if (snapshotExists) {
        const snapshotValues = snapshot.val()
        const leads = Object.values(snapshotValues)
        render(leads)  
    }
    
})
deleteBtn.addEventListener("click", function(){
    
    remove(referenceinDB)
    ulEl.innerHTML = ""
})
inputBtn.addEventListener("click", function() {
    // push the input values into the database
    push(referenceinDB, inputEl.value)
    inputEl.value = ""
})


