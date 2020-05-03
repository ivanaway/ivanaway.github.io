$('document').ready(function() {
    $('#why-a').click(function() {
        if (document.getElementById('why').style == 'display:none') {
            document.getElementById('why').style = 'display:block';
        } else if (document.getElementById('why').style == 'display:block') {
            document.getElementById('why').style = 'display:none';
        }
    });
});