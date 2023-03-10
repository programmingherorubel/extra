const loadData = async()=>{
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    const res = await fetch(url)
    const data =await res.json()
    displayData(data.data.tools)
}



const displayData = (information)=>{
    const informations = information.slice(0,6)
    
    const mainContainer = document.getElementById('uiDataContainer')

    informations.forEach((singleInfo)=>{
        const div = document.createElement('div')
        
        const features = singleInfo.features
            div.classList.add('col')
        div.innerHTML=`
           
            <div class="card">
                <img src=${singleInfo.image} class="card-img-top" alt="...">
                <div class="card-body">
                    <div>
                        <ul>
                            <h5>Features</h5>
                            ${singleInfo.features.map(singleFeachers => `<li style="list-style:none">${singleFeachers}</li>`)}
                        </ul>
                        <div>
                            <h5 class="card-title">${singleInfo.name}</h5>
                        </div>
                        <div class="d-flex justify-content-md-between">
                            <h6><i class="fa-solid fa-calendar-days"></i> ${singleInfo.published_in}</h5>
                            <button type="button" onclick="modalInformation('${singleInfo.id}')" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <i class="fa-solid fa-arrow-right"></i>
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        `
        mainContainer.appendChild(div)
    })
}


const modalInformation = async(id)=>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res =await fetch(url)
    const data =await res.json()
    showModalDisplay(data.data)
}

const showModalDisplay = (info)=>{
    console.log(info)
    const priceInfo = info.pricing
    const img = info?.image_link[0]
    const  modalImgContainer = document.getElementById('modalImg')
    const  modalFirstDiv = document.getElementById('modalFirstDiv')
    
    
   
    modalImgContainer.innerHTML=`
        <img src=${img} class="card-img-top" alt="...">
        <div style="position: absolute;top: 0;right: 0;">
            <button class="btn btn-danger">${info?.accuracy?.score} Accuracy</button>
        </div>
        
    `
    modalFirstDiv.innerHTML=`
        <h5>${info.description}</h5>
        <div class="d-flex justify-content-md-between">
            <div class="p-2 text-success" style="background-color: white;">
            <h5>${priceInfo[0]?.plan}</h5>
            <h5>${priceInfo[0]?.price}</h5>
            </div>
            <div class="p-2 text-warning" style="background-color: white;">
            <h5>${priceInfo[1]?.plan}</h5>
            <h5>${priceInfo[1]?.price}</h5>
            </div>
            <div class="p-2 text-danger" style="background-color: white;">
            <h5>${priceInfo[2]?.plan}</h5>
            <h5>${priceInfo[2]?.price}</h5>
            </div>
        </div>
            <div class="d-flex justify-content-md-between">
                <ul>
                    <h5>Features</h5>
                    <li>${info.features?.[1]?.feature_name}</li>
                    <li>${info.features?.[2]?.feature_name}</li>
                    <li>${info.features?.[3]?.feature_name}</li>
                </ul>

                <ul>
                    <h5>integrations</h5>
                    ${info.integrations?.map(interation => `<li>${interation}</li>`)}
                </ul>
            </div>
    `
}

loadData()


