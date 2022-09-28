function setContent(index,page,click){
    setActive(index);
    checkTB();
    //preset content
    $('#locName').html(data[index].name);
    $('#locDesc').html(data[index].desc);
    $('#cur').html(page);
    if(!click){
        $('#st').attr("src",data[index].media.photo);
        loadVideo(index,false);
    }
}

function setActive(index){     
    let curr = $('.active');
    if(curr.length > 0){
        curr[0].className = curr[0].className.replace(" active", "");
    }
    $('.btn_loc').eq(index).addClass("active")
}

function checkTB(){
    pre = $('#pre>div>a');
    nextup = $('#nextup>div>a');
    ($('.active').is(":first-child") && $page == 1)?pre.addClass("top"):pre.removeClass("top");
    ($('.active').is(":last-child") && $page == 2)?nextup.addClass("end"):nextup.removeClass("end");
}

function removeAllClass(){
    $('#st')[0].className = $('#st')[0].className.replace($('#st').attr('class'),"animated fadeOut");
    $('#nd')[0].className = $('#nd')[0].className.replace($('#nd').attr('class'),"animated fadeOut");
    //swipe animation time
    setTimeout(()=>{
        $('#st')[0].className = $('#st')[0].className.replace($('#st').attr('class'),"animated fadeIn");
        $('#nd')[0].className = $('#nd')[0].className.replace($('#nd').attr('class'),"animated fadeIn");
    },400)
}

function loadVideo(index){
    $('#nd>source').attr("src",data[index].media.video);
    $('#nd')[0].load();
    $('#nd')[0].play();
}

$(()=>{
    //add loc list
    data.map((value,index)=>{
        $('.left.middle').append('<div class="btn_loc"><button>' + value.name + '</button></div>')
    })
    
    $page = parseInt($('#cur').html());
    $index = 0;
    setContent(0,$page,false);
    //setting when active
    $('.btn_loc:first-child').addClass("active");
    $('#pre>div>a').addClass("top");

    //list click listener
    $('.btn_loc').click(function(){
        //get data
        $index = parseInt($(this).index());
        $('#st').addClass('animated fadeOut');
        $('#nd').addClass('animated fadeOut');
        $('#locSltbox .btn a').addClass('change')
        //fadeout time
        setTimeout(()=>{
            setContent($index,$page=1,false);
            $('#nd').addClass('nextimg')
            //remove class
            removeAllClass()
        },100);
        //fadein time(fadeOut + swipe + fadeIn)
        setTimeout(()=>{
            $('#st').removeClass('animated fadeIn');
            $('#nd').removeClass('animated fadeIn');
            $('#locSltbox .btn a').removeClass('change')
        },600)
        //check top/bottom
        pre = $('#pre>div>a');
        nextup = $('#nextup>div>a');
        ($('.active').is(":first-child") && $page == 1)?$('#pre>div>a').addClass("top"):pre.removeClass("top");
        ($('.active').is(":last-child") && $page == 2)?$('#nextup>div>a').addClass("end"):nextup.removeClass("end");
    })
        
    //page click listener
    $('#pre').click(function(){
        if(!$('#pre>div>a').hasClass('top') && !$('#locSltbox .btn a').hasClass('change')){
            $('#cur').html($page-=1).html();
            if($page == 1) {
                $('#st').attr("src",data[$index].media.photo);

                $('#st')[0].className = $('#st')[0].className.replace($('#st').attr('class'),"previmg");
                setTimeout(()=>{
                    $('#st').removeClass('previmg');
                    $('#nd').removeClass('swipeL');
                },1);
                setTimeout(()=>{
                    $('#nd>source').attr("src","");
                },401)
            }
            //change row
            if($page == 0){
                loadVideo($index-1);
                $('#nd')[0].className = $('#nd')[0].className.replace($('#nd').attr('class'),"previmg swipeL");
                setTimeout(()=>{
                    $('#st')[0].className = $('#st')[0].className.replace($('#st').attr('class'),"swipeR");
                    $('#nd').removeClass('previmg');
                    setContent($index-=1,$page+=2,true)
                },1)
            }
            checkTB();
        }else console.log("top")
    })
    $('#nextup').click(function(){
        if(!$('#nextup>div>a').hasClass('end') && !$('#locSltbox .btn a').hasClass('change')){
            $('#st').addClass('swipeL');
            $('#nd').addClass('swipeL');
            $('#cur').html($page+=1);
            if($page == 2) {
                loadVideo($index);
                $('#nd')[0].className = $('#nd')[0].className.replace($('#nd').attr('class'),"nextimg swipeL");
                setTimeout(()=>{
                    $('#nd').removeClass('nextimg');
                },1);
            }
            //change row
            if($page == 3){
                $('#st').attr("src",data[$index+1].media.photo);
                $('#st')[0].className = $('#st')[0].className.replace($('#st').attr('class'),"nextimg");
                $('#nd')[0].className = $('#nd')[0].className.replace($('#nd').attr('class'),"swipe2L");
                setTimeout(()=>{
                    $('#st').removeClass('nextimg');
                },1)
                setTimeout(()=>{
                    $('#nd>source').attr("src","");
                },400)
                setContent($index+=1,$page-=2,true);
            }
            checkTB();
        }else console.log("end")
    })
})