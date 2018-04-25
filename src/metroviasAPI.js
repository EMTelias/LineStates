export function getLinesStatus(handler){
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var targetUrl = 'http://www.metrovias.com.ar/Subterraneos/Estado?site=Metrovias';
    fetch(proxyUrl + targetUrl).then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                return handler(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                return null;
            }
        )
}