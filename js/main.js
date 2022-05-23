$( document ).ready(function() {
    
    // on loading page
    // give all projectitem the inFocus class
    $( "div.projectitem" ).each(function(i) {
        focus($(this));
    });
    // if an anchor is in the URL already, focus on the selected project
    if(window.location.hash) {
        toggle_project_focus(location.hash.replace('#',''));
    }
    
    // manage focusing when clicking on a project's image
    $( "div.projectitem > a" ).on("click", function(e) {
        e.preventDefault();
        toggle_project_focus($(this).parent().attr("id"));
    });
    
    
    // lose focus when clicking on the body
    $(window).on("click", function(e) {
        var singleProjectInFocus = true;
        $( "div.projectitem" ).each(function(i) {
            if ($(this).hasClass("inFocus")) {
                if (singleProjectInFocus == true) {
                    singleProjectInFocus = $(this).attr("id");
                } else {
                    singleProjectInFocus = false;
                }
            }
        });
        if (singleProjectInFocus == false) {
            // pass
        } else if (singleProjectInFocus == true) {
            // pass - this should never happen as at least 1 project should always be in focus
        } else {
            if (document.getElementById(singleProjectInFocus).contains(e.target)){
                // pass - clicked inside of focused project
            } else {
                toggle_project_focus(singleProjectInFocus);
            }
        }
    });
});



function toggle_project_focus(project_id) {
    
    var targetAlreadyInFocus = $( "div.projectitem#".concat(project_id) ).hasClass("inFocus");
    $( "div.projectitem" ).each(function(i) {
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
    $( "div.projectitem" ).each(function(i) {
        if ($(this).hasClass("outOfFocus")) {
            allProjectElemsInFocus = false;
            return false;
        }
    });
    if (allProjectElemsInFocus) {
        // clear hash using Lea Verou's method for changing hash without scrolling
        // https://lea.verou.me/2011/05/change-url-hash-without-page-jump/
        if(window.history.pushState) {
            window.history.pushState(null, null, "#");
        }
        else {
            window.location.hash = "#";
        }
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