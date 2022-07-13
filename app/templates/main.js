const metrics_cards = document.getElementById('metrics_cards')
const execution = document.getElementById('execution')

const tp_metrics_card = document.getElementById('metrics_card').content

const fragment = document.createDocumentFragment()


document.addEventListener('DOMContentLoaded',e =>{fetch_metrics()})
execution.addEventListener('click', e => {preds_execution(e)})

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
    if (e.target.classList.contains('btn-dark')){
        execution.innerHTML = '<h5>Proceso en ejecución...</h5>'
        const signal = {proceed:'OK'}
        fetch_model(signal)
    }
    e.stopPropagation()
}

async function fetch_model(signal) {
    try{
        const response = await fetch('http://localhost:5000/sales_prediction',{
            method: 'post',
            body: JSON.stringify(signal),
            headers: {'Content-Type':'application/json'}
        })

        const data = await response.json()
        show_preds_summary(data)
    }
    catch(error){
        console.log('Error: ', error.message)
    }
}