// function loadScript(url, callback ) {
//     const scriptEl = document.createElement('script');
//     scriptEl.src = url;
//     scriptEl.type = "application/javascript";
//     scriptEl.onload = callback();
//
//     document.body.appendChild(scriptEl);
// }

//the improved function receives as an input an array of objects, each object contains a url and a callback function to execute.
function loadScript( array ) { //[{ url: url, callback: callback}, {}]
    array.forEach( item => {
        const scriptEl = document.createElement('script');
        scriptEl.src = item.url;
        scriptEl.type = "application/javascript";
        scriptEl.onload = item.callback();

        document.body.appendChild(scriptEl);
    } )

}

