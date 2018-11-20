
class Comment {
    constructor(attr) {
      this.title = attr.title;
      this.content = attr.content;
      this.id = attr.id;
      this.soupkitchenId = attr.soupkitchenId;
      this.userId = attr.userId;
    } 
 } 
    Comment.prototype.renderCommentHTML = function() {
          return `<section> 
              <p>${this.title} -- 
                ${this.content}
                Id: ${this.id} -- 
                soupkitchenId:${this.content}
                <span>"no comments yet" </span>
                <button id="new-comment" data-id=${this.soupkitchenId}  data-userId="${this.userId}">Add Comment</button>
                // how do I get data-id in here? 
              </p>
              </section>`      
    }  

// .data(userId)

function commentsFetch() {
 
    const commentRequest = new Request('/soupkitchens/id/comments.json', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })

    clearSoupKitchenDataAndTitle();
    addCommentsTitle();

    fetch(commentRequest)

    .then((res) => res.json())  
    .then(data => {
        const comments = data;
        //console.log("data:" data)
        console.log('id: ${comments.id}');
        // console.log("SKid:" ${this.soupkitchenId});
        // console.log("userId:" ${this.userId});
        comments.forEach(function(comment) {

            const eachComment = new Comment(comment);
            
            console.log("got to display comment")

             //alert($('#comments-data').data('id'));
    //const id =  $('#comments-button').data('id')
    // const id = $('button[data-id=${this.id}]')

             console.log(comment);
            $('#comments-data').append(eachComment.renderCommentHTML);
            }); 

          listenForReviewButtons();    
        }); 
    // .catch(error => console.error('Error:', error))
};

function addCommentsTitle() {
   alert( $('#comments-button').data('name'));
    const name = $('#comments-button').data('name')
    const commentsTitle = `<h4> Reviews of ${name}</h4>`;
    
        console.log("got to commentsTitle");
    
    const $titleDiv = $('#comments-title');
    if ($titleDiv.empty() ) {
      $titleDiv.prepend(commentsTitle);
    }
}
     
  
    // .catch(error => console.error('Error:', error));
 
//end bracket for commentFetch


// function precommentFetch() {
//     console.log("got to commentFetch");
//  $("#comments-title").append("Comments"); 
// // }
// function commentFetch() {
//     console.log("got to commentFetch");
//   $("#js-comments-data").append("hello"); 

//     const commentRequest = new Request('/comments', {
//       headers: new Headers({
//         'Content-Type': 'application/json'
//       })
//     })
//     clearSoupKitchenDataAndTitle();

//     addCommentsTitle();


//     fetch(commentRequest)
//     .then(console.log("got to commentRequest"))
//     // .then((res) => res.json())
//     // .then(console.log("got to res.json"))
//     // .then(data => {
//     //     const comments = data;

//     //   console.log(comments);
//     //     comments.forEach(function(comment) {

//     //       const commentInstance = new Comment(comment);

//         $("#comments-data").append("hello"); 
//        // NEXT: ADD A COMMENTS DIV
        
//         // $("#comments-data").append(commentInstance.renderCommentHTML()); 
//         // });
//         //clickAddCommentButton(commentInstance.id)
//         // $("#comments-data").append(addComment);
//       // })
  
//     // .catch(error => console.error('Error:', error));
 
// } //end bracket for commentFetch

 // function addCommentsTitle() {
 //    const commentsTitle = `<h4> Comments </h4>`;
 //    const $commentsTitleDiv = $('#comments-title');
 //    if ($commentsTitleDiv .empty() ) {
 //      $title.prepend(commentsTitle);
 //    }
 //  }

// function clickAddCommentButton() {}
// <button data-id=${this.soupkitchenId}  id="new-comment-${this.userId}">Add Comment</button>
  
          


// is this what i need to make button work, adding the dataset? 
// $("xxx").on('click', '.js-more', function(e) {
//     e.preventDefault();
//     var id = this.dataset.id;
//     fetch(" + id + ".json", function(data) {
//       $("#content-" + id).html(data.content)
//     });
//     )
//   });
// add to fetch request, 

