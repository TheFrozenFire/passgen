(function($) {
    $(function() {
        var options = {};
    
        $('#options *[data-autosave]').each(function() {
            var name = $(this).attr('data-autosave');
            
            options[name] = '';
        });
        
        chrome.runtime.sendMessage({
            sender: 'options',
            method: 'get-option',
            data: options
        }, function(data) {
            console.log(data);
            $.each(data, function(name, value) {
                $('#options *[data-autosave="' + name + '"]').val(value);
            });
        });
    });

    $('#options *[data-autosave]').change(function() {
        var name = $(this).attr('data-autosave');
        var value = $(this).val();
        var data = {};
        
        data[name] = value;
        
        chrome.runtime.sendMessage({
            sender: 'options',
            method: 'save-option',
            data: data
        });
    });
}) (window.jQuery);
