// https://api.nytimes.com/svc/books/v3/lists/names.json

document.getElementById("bookslist");
async function getList(){
    
    try{
        let fetchList= await fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=rbNTcSQg2dzNAIvk4fOcqzQ0QxTvOoVd`)
        let allList= await fetchList.json()
        return allList
        
    }catch(error){
        console.log(error, "Lista no se pudo cargar")
    }
}
//Pintamos la lista
getList().then(function showBooks(allList){
    let bookResults= allList.results
    bookResults.forEach((cat,index) => {
        let listname= document.createElement("h2")
        let oldest= document.createElement("oldest")
        let newest= document.createElement("newest")
        let updated= document.createElement("updated")
        let readmore = document.createElement("button")
        let booksection= document.createElement("div")
        let listContainer= document.getElementById("dash")
        oldest.className="oldest"
        newest.className="newest"
        updated.className="updated"
        readmore.className="readmore"
    booksection.append(listname,oldest,newest,updated,readmore)
    listContainer.append(booksection) 

    listname.innerHTML = cat.list_name
    oldest.innerHTML = `Oldest: ${cat.oldest_published_date} <br>`
    newest.innerHTML = `Newest: ${cat.newest_published_date} <br>`
    updated.innerHTML = `Updated: ${cat.updated} <br>`
    readmore.innerHTML = "Read More";
    
    

            readmore.addEventListener('click',
            async function getBooks(){
                let booksfetch = await fetch(`https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=rbNTcSQg2dzNAIvk4fOcqzQ0QxTvOoVd`);
                let booksdata = await booksfetch.json();

                let results = booksdata.results.lists.books;
                listContainer.remove();
                  
                const h2 = document.createElement("h2");
                h2.innerHTML = cat.display_name;
                let backbtn = document.createElement("div");
                backbtn.innerHTML = 
                `<form>
                    <input type="submit" value="Go Back"/>
                </form>`;
                document.body.append(h2,backbtn);
                let newDash = document.createElement("section");
                newDash.id = "newDash";

               


});
    
})
    })
