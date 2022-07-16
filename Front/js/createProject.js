import projectList from './projectList.js';

$(function(){

    $('.button-close').click(function(){
        $('#projectSection').parent().css('display', 'none');
        $('.project-template-intro').css('display','flex');
        $('.project-template-main').css('display','none');
    });
    $('.button-create-template').click(function(){
        $('.project-template-intro').css('display','none');
        $('.project-template-main').css('display','flex');
    })
    $('.button-go-back').click(function(){
        $('.project-template-main').css('display','none');
        $('.project-template-intro').css('display','flex');
    })

    // 프로젝트 만들기, 수정
    $('.js-submit-project').click(function(){

        if($('#projectTitleInput').val()===""){
            $('.alert-wrap').css('display', 'block');

            setTimeout(function() {
                $('.alert-wrap').fadeOut(500, "swing");
            }, 2000);

            return;
        }

        if($(this).html()=='프로젝트 만들기'){
            let accessToken= window.localStorage.getItem('accessToken');
            let memNo= window.localStorage.getItem('memNo');
            $.ajax({
                type: 'POST',
                url: 'http://localhost:8080/api/rooms',
                data: JSON.stringify({"rmTitle":$('#projectTitleInput').val(), "rmDes":$('#projectContentsInput').val(), "rmAdmin" : memNo}),
                contentType: 'application/json; charset=utf-8',
                beforeSend: function (xhr) {      
                    xhr.setRequestHeader("token",accessToken);
                },
                success: function (result, status, xhr) {
                    // 프로젝트 리스트 업데이트
                    projectList();
                    // 해당 프로젝트 피드로 이동
                    // rmNo을 알 수 없는데 그냥 통신 한 번 더 해야하나?
                },
                error: function (xhr, status, err) {

                }
            });
            
            // input, textarea 비우기
            $('#projectTitleInput').val('');
            $('#projectContentsInput').val('');

            // 생성한 프로젝트 피드로 이동
        }
        else{
            let accessToken= window.localStorage.getItem('accessToken');
            let memNo= window.localStorage.getItem('memNo');
            $.ajax({
                type: 'PUT',
                url: 'http://localhost:8080/api/rooms/'+$('#detailSettingProjectSrno').text(),
                data: JSON.stringify({"rmNo":$('#detailSettingProjectSrno').text(), "rmTitle":$('#projectTitleInput').val(), "rmDes":$('#projectContentsInput').val()}),
                contentType: 'application/json; charset=utf-8',
                beforeSend: function (xhr) {      
                    xhr.setRequestHeader("token",accessToken);
                },
                success: function (result, status, xhr) {},
                error: function (xhr, status, err) {
                }
            });

            // input, textarea 비우기
            $('#projectTitleInput').val('');
            $('#projectContentsInput').val('');
        }

        // 새 프로젝트 생성 관련 모달 안보이도록
        $('#projectSection').parent().css('display', 'none');
        $('.project-template-intro').css('display','flex');
        $('.project-template-main').css('display','none');
    });
});