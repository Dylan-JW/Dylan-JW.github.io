$( document ).ready(function() {
    
    var lastPos = 0; // track scroll position
    
    // on loading page
    // give all projectitem the inFocus class
    $( "div#projects" ).children("div.projectitem").each(function(i) {
        focus($(this));
    });
    // if an anchor is in the URL already, focus on the selected project
    if(window.location.hash) {
        toggle_project_focus(location.hash.replace('#',''));
    }
    
    // manage focusing when clicking on a project's image
    $( "div.projectitem > a" ).on("click", function(e) {
        e.preventDefault();
        lastPos = $(window).scrollTop();
        toggle_project_focus($(this).parent().attr("id"));
    });
    
    $(window).bind('hashchange',function(event){
        var hash = location.hash.replace('#','');
        if(hash == '') $(window).scrollTop(lastPos);
    });
});



function toggle_project_focus(project_id) {
    
    

    var targetAlreadyInFocus = $( "div#projects > div.projectitem#".concat(project_id) ).hasClass("inFocus");
    $( "div#projects" ).children("div.projectitem").each(function(i) {
        // ensure that targetted element is focused on
        if ( $(this).attr("id") == project_id ) {
            focus($(this));
        } else {
            // if target is already in focus, either no elements are selected or it is the only one selected
            // so toggle all others
            if (targetAlreadyInFocus) {
                if ($(this).hasClass("outOfFocus")) {
                    focus($(this));
                } else {
                    defocus($(this));
                }
            // otherwise, another element must be selected
            // so just defocus all others
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