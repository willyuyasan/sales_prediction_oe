const metrics_cards = document.getElementById('metrics_cards')
const execution = document.getElementById('execution')
const form_file_upload = document.getElementById('form_file_upload')

const cont_results = document.getElementById('cont_results')

const tp_metrics_card = document.getElementById('metrics_card').content
const tp_pred_summary = document.getElementById('pred_summary').content
const tp_pred_summary_items = document.getElementById('pred_summary_items').content

const graphs_summary = document.getElementById('graphs_summary').content

const fragment = document.createDocumentFragment()


document.addEventListener('DOMContentLoaded',e =>{fetch_metrics()})
//execution.addEventListener('click', e => {preds_execution(e)})
form_file_upload.addEventListener('submit', e=>{preds_execution(e)})

const fetch_metrics = async () => {
    const res = await fetch('./model_app/model_metrics.json')
    const data = await res.json()
    show_metrics(data)
}

const show_metrics = data => {
    data.forEach(element => {
        const clone = tp_metrics_card.cloneNode(true)
        clone.querySelector('h5').textContent = 'Tienda: ' + element.store
        clone.querySelectorAll('td')[1].textContent = element.rmse
        clone.querySelectorAll('td')[3].textContent = element.pp_error
        clone.querySelectorAll('td')[5].textContent = element.r2
        fragment.appendChild(clone)
    });
    metrics_cards.appendChild(fragment)
}

const preds_execution = e => {
    e.preventDefault()
    var input_file = new FormData(form_file_upload)
    file_name = input_file.get("myfile").name

    if (file_name===""){
        execution.innerHTML = '<h5>No se ha especificado archivo, especifique uno y vuelva a intentarlo</h5>'
        return
    }

    upload_input(input_file)
    //e.stopPropagation()
}


async function upload_input(input_file) {
    try{
        const response = await fetch('upload.php',{
                                                    method: 'post',
                                                    body: input_file,
                                                    })
        const data = await response.json()
        console.log('Success: File uploaded')
        preds_execution2()

    } catch(error) {
        console.log('Error: ', error.message)
        const data = {output:'Upload error!'}
    }
}

const preds_execution2 = () => {
        execution.innerHTML = '<h5>Proceso en ejecución...</h5>'
        const signal = {proceed:'OK'}
        fetch_model(signal)
}


async function fetch_model(signal) {
    try{
        let domain = window.location.origin
        let port = 5000
        let url = `${domain}:${port}/sales_prediction`

        const response = await fetch(url,{
            method: 'post',
            body: JSON.stringify(signal),
            headers: {'Content-Type':'application/json'}
        })

        const data = await response.json()
        fetch_summary_preds(data)
    }
    catch(error){
        console.log('Error: ', error.message)

        execution.innerHTML = `
        <h5>El proceso fallo!</h5> 
        <h5>Pongase en contacto con el area de ciencia de datos</h5>
        <h5>${error.message}</h5>
        `
    }
}

const fetch_summary_preds = async (data) => {
        const response = await fetch('./outputs/prediction_summary.json')
        const data2 = await response.json()
        if (data.prediction_process === 'Successfully'){
            execution.innerHTML = '<h5>Proceso finalizado!</h5>'
            ofile_name = data.file_name
            show_summaries(data2,ofile_name)
        }
}

const show_summaries = (data,ofile_name) => {

    const clone = tp_pred_summary.cloneNode(true)
    
    //genera el link de descarga
    clone.querySelectorAll('a')[0].setAttribute('href','./outputs/' + ofile_name)

    data.forEach(element => {
        const clone2 = tp_pred_summary_items.cloneNode(true)
        
        clone2.querySelectorAll('td')[0].textContent = element.Store
        clone2.querySelectorAll('td')[1].textContent = element.min_date
        clone2.querySelectorAll('td')[2].textContent = element.max_date
        clone2.querySelectorAll('td')[3].textContent = element.observations
        clone2.querySelectorAll('td')[4].textContent = element.min_sales
        clone2.querySelectorAll('td')[5].textContent = element.max_sales
        clone2.querySelectorAll('td')[6].textContent = element.avg_sales
        clone2.querySelectorAll('td')[7].textContent = element.std_sales

        //console.log(clone2)
        clone.getElementById('items').appendChild(clone2)
    } )
    
    fragment.appendChild(clone)
    cont_results.appendChild(fragment)
    show_graphs()
}

const show_graphs = () => {
    const clone = graphs_summary.cloneNode(true)
    fragment.appendChild(clone)
    cont_results.appendChild(fragment)
}