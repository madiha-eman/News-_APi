console.log("768")
// initialization the nwes api parameters
let source = "bbc-news"
let ApiKey = 'f43e82e91fb04a6c826d8d795b347b41';

let newsAccordion = document.getElementById('newsAccordion');
//  create an ajax get request 
let xhr = new XMLHttpRequest();

xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${ApiKey}`, true)

xhr.onload = function () {
    if (this.status === 200) {
        let news = JSON.parse(this.responseText)
        let articles = news.articles
        // console.log(news)
        let str = ""
        articles.forEach(function (element, index) {
            str += `<div class="card">
                        <div class="card-header" id="heading${index}">
                            <h2 class="mb-0">
                                <button class="btn btn-link collapsed cardtxt" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="true" aria-controls="collapse${index}">
                                    <b>Breaking News ${index +1} </b>${element.title} 
                                </button>
                            </h2>
                        </div>

                        <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}"
                            data-parent="#newsAccordion">
                            <div class="card-body">
                             ${element.content}. <a href="${element['url']}" target="_blank"> Read more</a>
                            </div>
                        </div>
                      </div>`
            //   console.log(index)
            newsAccordion.innerHTML = str;
        })

    }
    else {
        console.log('Error')
    }
}

xhr.send();
//  searchAble
let search = document.getElementById('searchTxt');
search.addEventListener('input', searchAble);

function searchAble() {
    // console.log(search.value)

    let inputVal = search.value;
    let Card = document.getElementsByClassName('card')
    Array.from(Card).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("button")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
}