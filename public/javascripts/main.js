$(() => {
//JQUERY STUFF IN HERE
    
    $.ajax({
        url: "http://127.0.0.1:3001/api",
        method:"GET"
    })
    .done((reviews)=> {
        console.log(reviews);
        renderReviews(reviews);
    });

    renderReviews = (reviews)=> {
        let recentReviews = "";

        /* reviews.forEach((review) => {
            recentReviews += "<div class='row'>";
            recentReviews += "<div class='col'>";
            recentReviews += review.country + " - <a data-toggle='modal' data-target='#modifyReview' data-reviewid='"+review.id+"'>Edit</a>"
            recentReviews += "</div></div>";
        });
        $(".top-reviews").append(recentReviews); */

        reviews.forEach((review) => {
            recentReviews += "<a data-toggle='modal' data-target='#modifyReview' data-reviewid='"+review.id+"'><div class='row'>"
            recentReviews += "<div class='userReview'>"
            recentReviews += "<div class='image col-2'>"
            recentReviews += "<img src='location.png'>"
            recentReviews += "</div>"
            recentReviews += "<div class='reviewContent col-10'>"
            recentReviews += "<h5 class='place'>"
            recentReviews += review.city + ", " + review.country
            recentReviews += "</h5>"
            recentReviews += "<h6 class='stars'>"
            recentReviews += "rated " + review.rating + " out of 5 stars"
            recentReviews += "</h6>"
            recentReviews += "<h6 class='user'>"
            recentReviews += review.username
            recentReviews += "</h6>"
            recentReviews += "<h7 class='theReview'>"
            recentReviews += review.review
            recentReviews += "</h7>"
            recentReviews += "</div></div></div></a>"
        });
        $(".top-reviews").append(recentReviews);
    };

    $('#modifyReview').on('show.bs.modal', (e) => {
        let clickedReview = $(e.relatedTarget);
        let reviewId = clickedReview.data('reviewid');
        console.log(reviewId);
        $.ajax({
            url: "http://127.0.0.1:3001/api/review/"+reviewId,
            method: "GET"
        })
        .done((results) => {
            console.log(results);
            
            $('input#username1').val(results.username);
            $('textarea#review1').val(results.review);
            $('input#city1').val(results.city);
            $('input#country1').val(results.country);
            $('#rating1').empty();
            let option = "";
            for(let x = 1; x <= 5; x++){
                if (x == results.rating){
                    console.log(results.rating);
                    option = "<option val='"+x+"' selected>"+x+"</option>";
                }else {
                    option = "<option val='"+x+"'>"+x+"</option>";
                }
                console.log(option);
                $('#rating1').append(option);

            }
            $('button#updateReview').attr('data-reviewid', results.id)
            $('button#deleteReview').attr('data-reviewid', results.id)
            
        })  
    })
    $('button#updateReview').on('click',(e) => {
        e.preventDefault();
        let clickedReview = $(e.currentTarget);
        let reviewId = clickedReview.data('reviewid');
        let data = {};
        let form = $(e.currentTarget).parent().parent();
        let username = $(form).find('input[name="username1"]').val();
        let review = $(form).find('textarea[name="review1"]').val(); 
        let city = $(form).find('input[name="city1"]').val();
        let country = $(form).find('input[name="country1"]').val();
        let rating = $(form).find('input[name="rating1"]').val();
        data.username = username;
        data.review = review
        data.city = city;
        data.country = country;
        data.rating = rating;

        console.log(data);

        $.ajax({
            url: "http://127.0.0.1:3001/api/review/"+reviewId +"/edit",
            method: "PUT",
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'JSON'
        })
        .done((response) => {
            console.log(response);
            $('#modifyReview').modal('hide');
        })
    })
    $('button#deleteReview').on('click',(e) => {
        e.preventDefault();
        let clickedReview = $(e.currentTarget);
        let reviewId = clickedReview.data('reviewid');
        console.log(reviewId);
        $.ajax({
            url: "http://127.0.0.1:3001/api/review/"+reviewId +"/delete",
            method: "DELETE"

        })
        .done((results) => {
            console.log(results);
            $('#modifyReview').modal('hide');
        })
    })
    $("#submitReview ").on("submit", (e) => {
        
        e.preventDefault();
        console.log(e.currentTarget);
        let values = $(e.currentTarget).serializeArray();
        console.log(values);
        let data = {};
        $(values).each((index, obj) => {
            data[obj.name] = obj.value;
        });
        console.log(data);
        $.ajax({
            url: "http://127.0.0.1:3001/api/create",
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'JSON'
        })
        .done((response) => {
            console.log(response);
            $('#addReview').modal('hide');
        }) 
    })

    /* $('#addReview').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
      }) */

}); 