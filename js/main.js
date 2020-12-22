$( document ).ready(function() {
    
    var lastPos = 0; // track scroll position
    
    // on loading page: focus on selected project
    if(window.location.hash) {
        toggle_project_focus(location.hash.replace('#',''));
    }
    
    // manage focusing when clicking on a project's image
    $( "div.projectitem > a > img" ).on("click", function(e) {
        e.preventDefault();
        lastPos = $(window).scrollTop();
        toggle_project_focus($(this).parent().parent().attr("id"));
    });
    
    $(window).bind('hashchange',function(event){
        var hash = location.hash.replace('#','');
        if(hash == '') $(window).scrollTop(lastPos);
        alert(hash);
    });
});



function toggle_project_focus(project_id) {
    $( "div#projects" ).children("div.projectitem").each(function(i) {
        // ensure that targetted element is focused on
        if ( $(this).attr("id") == project_id ) {
            focus($(this));
        // for the non-targetted elements: toggle their focus
        } else {
            if ($(this).hasClass("outOfFocus")) {
                focus($(this));
            } else {
                defocus($(this));
            }
        }
    });
    
    // update page anchor
    var allProjectElemsInFocus = true;
    $( "div#projects" ).children("div.projectitem").each(function(i) {
        if ($(this).hasClass("outOfFocus")) {
            allProjectElemsInFocus = false;
            return false;
        }
    });
    if (allProjectElemsInFocus) {
        window.location.hash = "";
    } else {
        window.location.hash = "#".concat(project_id);
    }
}

function focus(elm) {
    // remove outOfFocus class
    if ( elm.hasClass("outOfFocus") ){
        elm.removeClass("outOfFocus");
    }
    // add inFocus class (if it doesn't already have it)
    if ( !elm.hasClass("inFocus") ) {
        elm.addClass("inFocus");
    }
}

function defocus(elm) {
    // remove inFocus class
    if ( elm.hasClass("inFocus") ){
        elm.removeClass("inFocus");
    }
    // add outOfFocus class (if it doesn't already have it)
    if ( !elm.hasClass("outOfFocus") ) {
        elm.addClass("outOfFocus");
    }
}