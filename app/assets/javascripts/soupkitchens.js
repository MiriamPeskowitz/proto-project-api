$(document).ready(function() {
   attachEventListeners();
})

const attachEventListeners = function() {
  $('#soupkitchen-button').on('click',
    soupkitchensFetch)
  
  $('#foodpantry-button').on('click', 
    foodpantriesFetch);

  $('#comments-button').on('click', commentsFetch);

  $('#new-comment-form').on('click', newCommentFormFetch);

  $('#render-form').on('submit', submitNewComment)
  
  // loads new comment form -- gets to  /soupkitchens/:id/comments/new
}

class Soupkitchen {
    constructor(attr) {
      this.name = attr.name; 
      this.address = attr.address;
      this.zipcode = attr.zipcode;
      this.notes = attr.notes;
      this.id = attr.id;
    }
}

Soupkitchen.prototype.formatHTML = function() {
 
   return `<section>
          <p> ${this.name}</p>
          <p> ${this.address}</p>
          <p> ${this.zipcode}</p>
          <p> Hours: ${this.notes}</p>
          <button id="comments-button" data-id=${this.id} data-name=${this.name}> See Reviews </button> 
           <button id="new-comment-form" data-id=${this.id}>Add a Review</button> 
          <div id="comments-data"></div>
          <div id="toggle-comments-data"></div>
          </section>`
  }

//where do I want to put it in the dom
//where do I fetch the data 

function soupkitchensFetch(){
    const indexRequest = new Request('/soupkitchens', {
       headers: new Headers({
      'Content-Type': 'application/json'
        })
     })
    clearFoodpantryDataAndTitle();

    addSoupkitchensTitle();

    fetch(indexRequest)
      // .then(res => handleStatusCode(res))    
      .then((res) => res.json())
      .then(data => {
        const soupkitchens = data;

        soupkitchens.forEach(function(soupkitchen){

          const kitchen = new Soupkitchen(soupkitchen);  //this creates the instance
          $('#soupkitchen-data').append(kitchen.formatHTML());
          })
        attachEventListeners();
        })
      .then($('#comments-button').on('click', commentsFetch)) 
      .catch(error => console.error('Error:', error));
    }; 


function addSoupkitchensTitle() {
  const soupkitchenTitle = `<h4 id="soupkitchen-title"> Soupkitchens </h4>`;
  const $title = $('#soupkitchen-data');
  if ($title.empty() ) {
    $title.prepend(soupkitchenTitle);
  };
}
 
function clearFoodpantryDataAndTitle() {
    $('#foodpantry-title').html("");
    $('#foodpantry-data').html("");
  }

// function handleMessages(res) {
//   if (res.ok) {
//     throw Message(res.message) 
//   }  
//   return res;}
