document.addEventListener('DOMContentLoaded', function(e) {


    (function addModal() {
        let screen = document.createElement('div')
        screen.className = "password-modal fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
        screen.style.backgroundColor = "black"

        let form = document.createElement('form')
        form.className = "flex flex-column items-center justify-center p4"
        form.style.backgroundColor = "white"
        form.innerHTML = `<div class="error-field"></div><label>Please enter your password</label><br><input class="password-field" type="password" /><br><input type="submit" />`

        screen.appendChild(form)

        document.body.appendChild(screen)
    })()

    function removeModal() {
        let modal = document.querySelector('.password-modal')
        modal.style.display = "none"
    }

    var databaseRef = firebase.database().ref('addresses-list/')
    databaseRef.on('child_added', function (snapshot) {
        let data = snapshot.val()
        for (let i in data) {
            if (data[i] !== "") {
                let parsedData = beautifyAddress(data[i])
                addAddressToTable(parsedData)
            }
        }
    })

    document.addEventListener('click', function(e) {
        e.preventDefault()
      
        if (e.target.type === "submit") {
            let enteredPass = document.querySelector('.password-field').value
            
            if (enteredPass === "jerseyground") {
                removeModal()
            } else {
                let errorDiv = document.querySelector('.error-field')
                let errorMessage = document.createElement('p')
                errorMessage.innerHTML = `You've entered an invalid password, please try again`
                errorMessage.style.color = "red"
                errorDiv.appendChild(errorMessage)
            }  
        }

    })

    function beautifyAddress(address) {
        return address.split(" ").map(el => el[0].toUpperCase() + el.slice(1)).join(" ")
    }

    function addAddressToTable(parsedAddress) {
        let table = document.querySelector('table')
        let newRow = document.createElement('tr')
        newRow.innerHTML = `<td>${parsedAddress}</td>`
        table.appendChild(newRow)
    }
})
