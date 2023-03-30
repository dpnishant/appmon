$(document).ready(function() {
    $('body').prepend(`
        <div class="scroll-buttons-box">
            <a href="#" class="go-top">Back to Top</a>
            <a href="#" class="go-bottom">Back to Bottom</a>
        </div>`);

    var amountScrolledForTop = 500;
    var amountScrolledForBottom = 1500;
    var scrollContainerSelector = '#tblResultView_wrapper';
    $(scrollContainerSelector).scroll(function() {
        if ($('#tblResultView_wrapper').scrollTop() > amountScrolledForTop) {
            $('a.go-top').fadeIn('slow').css('display', 'inline-block');
        } else {
            $('a.go-top').fadeOut('slow');
        }

        if ($(scrollContainerSelector).scrollTop() > amountScrolledForBottom) {
            $('a.go-bottom').fadeIn('slow').css('display', 'inline-block');
        } else {
            $('a.go-bottom').fadeOut('slow');
        }
    });

    $('a.go-top').click(function() {
        $(scrollContainerSelector).animate({
            scrollTop: 0
        }, 700);
        return false;
    });
    $('a.go-bottom').click(function() {
        $(scrollContainerSelector).animate({
            scrollTop: $(scrollContainerSelector)[0].scrollHeight
        }, 700);
        return false;
    });
});
