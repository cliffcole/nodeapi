$(() => {
//JQUERY STUFF IN HERE

    $("#submitReview ").on("submit", (e) => {
        
        e.preventDefault();
        let values = $(e.currentTarget).serializeArray();
        console.log(values);
        let data = {};
        $(values).each((index, obj) => {
            data[obj.name] = obj.value;
        });
        console.log(data);
        $.ajax({
            url: "http://localhost:3000/api/create",
            method: "POST",
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'JSON'
        })
        .done((response) => {
            console.log(response);
        }) 
    })

}); 