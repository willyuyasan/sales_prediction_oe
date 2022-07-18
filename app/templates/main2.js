

const form_file_upload = document.getElementById('form_file_upload')
const container = document.getElementById('container')

form_file_upload.addEventListener('submit', e=>{catch_input(e)})


const catch_input = e =>{
    e.preventDefault()
    var input_file = new FormData(form_file_upload)
    upload_input(input_file)
}

async function upload_input(input_file) {
    try{
        const response = await fetch('upload.php',{
                                                    method: 'post',
                                                    body: input_file,
                                                    })
        const data = await response.json()
        console.log('Success: File uploaded')
    } catch(error) {
        console.log('Error: ', error.message)
        const data = {output:'Upload error!'}
    }
}


const file = './outputs/dataset_predict_20220713041844.csv'
container.querySelector('a').setAttribute('href',file)


