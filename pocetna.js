// ovo mi ne radi trenutno

$('.obrazac').dialog({
    autoOpen: false,
    resizable: false,
    modal: true,
    buttons: [
        {
            text:'Odustani',
            click: ()=>{
                $('.obrazac').dialog('close');
            }
        }
    ]
});

$('#click').on('click', function(e) {
    e.preventDefault();
    $('.obrazac').dialog('open');
});



