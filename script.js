let display=document.querySelector("#booksDisplay");
let sitem=document.querySelector('#searchedInput');
let homeBtn=document.querySelector('#home');
//Fetching Books
fetch("https://booklibraryapi.onrender.com/Book").then(res=>res.json())
.then((data)=>{
    let Books=[];
    Books=data.Result;
    Books.forEach((book)=>{
        display.innerHTML+=`<div class="card  m-2  text-center book ${book.category.name} ${book.tag.name} " >
        <div class="card-body">
        <img src="${book.image}" class="card-img img-fluid " style="width:200px;" alt="...">
          <h5  class="bookName card-title">${book.name}</h5>
          <p class="authorName">${book.author.name}</p>
          <a href="${book.pdf_url}" target="_blank" class="btn oplink" style="background-color:wheat;">Read Now <i class="fas fa-book-open"></i></a>
          <button class="btn bookMarkAdd" type="button" style="background-color:wheat;" >Add to Bookmark <i class="far fa-bookmark"></i></button>
          </div>
          </div>
          `
    })
})
homeBtn.addEventListener('click',()=>{
    let books=document.querySelectorAll('.book');
    books.forEach((book)=>{
        book.style.display="block";
    })
    cattoggle.forEach((cat)=>{ cat.parentNode.parentNode.childNodes[1].textContent="Categories";})
    tags.forEach((tg)=>{ tg.parentNode.parentNode.childNodes[1].textContent="Tags";})
})
//Search
sitem.addEventListener('keydown',(e)=>{
    let text=e.target.value;
    let sinput=text.toLowerCase();
    let name=document.querySelectorAll('.bookName');
    name.forEach((n)=>{
        let givenName=n.textContent.toLowerCase();
        if(givenName.includes(sinput)){
            n.parentElement.parentElement.style.display="block";
        }
        else{
            n.parentElement.parentElement.style.display="none";
        }
    })
    if(e.key==="Enter"){
        search();
    }
})
function search(){
    let text=sitem.value;
    let sinput=text.toLowerCase();
    let name=document.querySelectorAll('.bookName');
    let authorName=document.querySelectorAll('.authorName');
    name.forEach((n)=>{
        let searchGiven=n.textContent.toLowerCase();
        if(searchGiven.includes(sinput)){
            n.parentElement.parentElement.style.display="block";
        }
        else{
            n.parentElement.parentElement.style.display="none";
        }
        console.log(searchGiven.includes(sinput));
    })
    authorName.forEach((n)=>{
        let searchGiven=n.textContent.toLowerCase();
        if(searchGiven.includes(sinput)){
            n.parentElement.parentElement.style.display="block";
        }
        else{
            n.parentElement.parentElement.style.display="none";
        }
    })
}
let sbtn=document.querySelector('#searchBtn');
sbtn.addEventListener('click',()=>{
search();
})
//Choose Category
let cattoggle=document.querySelectorAll('.cate');
cattoggle.forEach((cat)=>{
    cat.addEventListener('click',()=>{
        let category=cat.textContent;
        let books=document.querySelectorAll('.book');
        cat.parentNode.parentNode.childNodes[1].textContent=category;
        tags.forEach((tg)=>{ tg.parentNode.parentNode.childNodes[1].textContent="Tags";})
        books.forEach((book)=>{
            if(book.classList.contains(category)){
                book.style.display="block";
            }else if(category==="All"){
                book.style.display="block";
                cat.parentNode.parentNode.childNodes[1].textContent="All Categories";
            }
            else{
                book.style.display="none";
            }
        })
    })
})
//Choose Tags
let tags=document.querySelectorAll('.tag');
tags.forEach((tg)=>{
    tg.addEventListener('click',()=>{
        let tag=tg.textContent;
        let books=document.querySelectorAll('.book');
        tg.parentNode.parentNode.childNodes[1].textContent=tag;
        cattoggle.forEach((cat)=>{
            cat.parentNode.parentNode.childNodes[1].textContent="Categories";
        })
        books.forEach((book)=>{
            console.log(book.classList)
            if(book.classList.contains(tag)){
                book.style.display="block";
            }else if(tag==="Best Selling"){
                let tg="Best";
                if(book.classList.contains(tg)){
                    book.style.display="block";
                }else{
                    book.style.display="none";
                }
            }else if(tag==="Top Selling"){
                let tg="Top";
                if(book.classList.contains(tg)){
                    book.style.display="block";
                }else{
                    book.style.display="none";
                }
            }else if(tag==="All"){
                book.style.display="block";
                tg.parentNode.parentNode.childNodes[1].textContent="All Tags";
            }
            else{
                book.style.display="none";
            }
        })
    })
})
//Bookmark
let Bookmark=document.getElementById('bookmarkDisplay');
let container = document.getElementById('container');
display.addEventListener('click', function(event) {
  if (event.target.classList.contains('bookMarkAdd')) {
    let ba = event.target;
   ba.innerHTML=`Bookmark Added <i class="fas fa-bookmark"></i>`
    let book = ba.parentNode;
    let bookName=book.querySelector('.bookName').textContent;
    let bookAuthor=book.querySelector('.authorName').textContent;
    let bookImage=book.querySelector('img').src;
    let href=book.querySelector('.oplink').href;
    let bmk=`
    <tr>
    <td><img src="${bookImage}" class=" img-fluid " style="width:100px;" alt="..."></td>
    <td>${bookName}</td>
    <td>${bookAuthor}</td>
    <td><a href="${href}" target="_blank" class="btn btn-info">Read Now <i class="fas fa-book-open"></i></a></td>
    </tr>
    `
    Bookmark.innerHTML+=bmk;
  }
});
let loadingIndicator=document.getElementById("loading");
document.onreadystatechange=()=>{
   if(document.readyState !== "complete"){
    document.querySelector('body').style.visibility="hidden";
    loadingIndicator.style.visibility="visible";
   }else{
    setTimeout(()=>{
        document.querySelector('body').style.visibility="visible"
        loadingIndicator.style.display="none";
    },3000)
   }
}