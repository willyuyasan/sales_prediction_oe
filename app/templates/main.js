const contenedor = document.getElementById('contenedor')
const contenedor2 = document.getElementById('contenedor2')
const fragment = document.createDocumentFragment()

const tpformulario = document.getElementById('formulario').content
const tpfeedback = document.getElementById('feedback').content

let dc_form = {}

//Events
document.addEventListener('DOMContentLoaded', e => { showform(dc_form) });
contenedor.addEventListener('submit', e=>{workformdata(e)})
contenedor2.addEventListener('submit', (e)=>{savesfeedback(e)})

const showform = dc_form => {
    contenedor.innerHTML = ''   
    contenedor2.innerHTML = ''
    const clone = tpformulario.cloneNode(true)
    fragment.appendChild(clone)
    contenedor.appendChild(fragment)
}



//Validates and saves the form data with the php api
const workformdata = e => {
    e.preventDefault()
    const formdata = new FormData(contenedor.querySelector('form')) //passing the data form
    formdata.append('id_form',Date.now())
    //console.log(formdata)
    savesformdata(formdata) //Using the php api
}

// Function to connect to the php that saves the data form
async function savesformdata(formdata) {
    try{
        const response = await fetch('process_form.php',{
                                                        method: 'post',
                                                        body: formdata,
                                                        })
        const data = await response.json()
        formvalidation(data)
        getformdata(formdata)


    } catch(error) {
        //console.error(error)
        console.log('Error: ', error.message);
    }
}

//Function to validate the data form
const formvalidation = data => {
    const r = data.output
    if (r!=='Record saved'){
        alert('Formulario incompleto');
        throw new Error(r);
    }; 
    return r.output;
}

//Function to get the form data into a object
const getformdata = formdata => {
    const id_form = formdata.get("id_form")
    const name = formdata.get("name")
    const words = formdata.get("words")
    const age = formdata.get("age")
    const genre = formdata.get("genre")
    const labor_status = formdata.get("labor_status")
    const check = formdata.get("check")
    
    const dc_form = {
        id_form : id_form,
        name : name,
        words : words,
        age : age,
        genre : genre,
        labor_status: labor_status,
        check:check
    };

    happiness_model(dc_form)
}


// Function to connect to the model_api
// await fetch('http://pyapp_host:5000/happiness_model' Not working
async function happiness_model(dc_form) {
    try{
        const response = await fetch('http://localhost:5000/happiness_model',{
                            method:'post',
                            body: JSON.stringify(dc_form),
                            headers: {
                                'Content-Type':'application/json'
                            } });

        const data = await response.json()
        
        dc_form["happiness_probability"] = data.happiness_probability

        localStorage.setItem('dc_form', JSON.stringify(dc_form))

        console.log(dc_form)

        showresponse(data)

    } catch(error) {
        //console.error(error);
        console.log('Error: ', error.message);
    };
};




const showresponse = data => {

    const happiness_probability = data.happiness_probability
 
    contenedor.innerHTML = ''
    const clone = tpfeedback.cloneNode(true)
    clone.querySelectorAll('h1')[1].textContent = happiness_probability + '%'
    fragment.appendChild(clone)
    contenedor2.appendChild(fragment)
}


const savesfeedback = (e) => {
    e.preventDefault()
    var formdata2 = new FormData(contenedor2.querySelector('form'))

    dc_form = JSON.parse(localStorage.getItem('dc_form'))

    //happiness_probability = contenedor2.querySelectorAll('h1')[1].textContent.substring(0,2)
    id_form = dc_form.id_form
    happiness_probability = dc_form.happiness_probability

    formdata2.append('id_form',id_form)
    formdata2.append('happiness_probability',happiness_probability)

    console.log(formdata2.get('real_happiness'), formdata2.get('happiness_probability'))
    savesfeeddata(formdata2)
}

// Function to connect to the php that saves the data feedback form
async function savesfeeddata(formdata2) {
    try{
        const response = await fetch('feedback_form.php',{
                                                        method: 'post',
                                                        body: formdata2,
                                                        })
        const data = await response.json()
        formvalidation2(data)
        showform(dc_form)

    } catch(error) {
        //console.error(error)
        console.log('Error: ', error.message);
    }
}

//Function to validate the data form
const formvalidation2 = data => {
    const r = data.output
    if (r!=='Feedback saved'){
        alert('No se pudo salvar el feedback: ' + r)
        throw new Error(r)
    }
    console.log(r)
}



