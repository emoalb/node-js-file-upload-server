$(() => {
    let loader = $('#loader');
    loader.hide();
    $('#button-upload').click((event) => {
        loader.show();
        event.preventDefault();
        let formData = $('#form-upload')[0];
        let form = new FormData(formData);
        console.log(formData);
        console.log(form);
        $.ajax({
            url: 'http://localhost:8000/upload',
            type: 'POST',
            data: form,
            cache: false,
            contentType: false,
            processData: false,
            success: function () {
                loader.hide();
            },
            error: function () {
                alert("error in ajax form submission");
            }
        });
    });
});
