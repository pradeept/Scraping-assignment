import axios from "axios"

const GOOGLE_BASE_URL = `https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_CUSTOM_API_KEY}&cx=${process.env.REACT_APP_CX}&fields=items(link)`;
const SCRAPING_BASE_URL = `https://app.scrapingbee.com/api/v1` ;



//To get top 5 urls from Google's search page
export async function handleCustomSearch(query){
    const urls = [];
    return axios.get( `${GOOGLE_BASE_URL}&q=${query}`)
    .then((result)=>{
        result.data.items.filter((item,index)=>index<1).map((url)=>{
           return urls.push(url);
        })
        return urls;
    }) 
    .catch((e)=>{
        console.log(e);
    })
}



//To get the text from 5 urls. It returns promises
export async function getText(urls){
    const extractedText = []
    const texts = urls.map((item)=>{
        return axios.get(SCRAPING_BASE_URL, {
            params: {
                'api_key': process.env.REACT_APP_SCRAPINGBEE_API_KEY,
                'url': item.link, 
                'extract_rules': '{"text":"body"}', 
            } 
        }).then(function (response) {
            extractedText.push(response.data);
            return response.data
        })
        .catch((e)=>{
            console.log(e)
        })
    });
    return texts;
}


