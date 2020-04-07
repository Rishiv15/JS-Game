var basket = $('#basket'),
    container = $('#container'),
    hen = $('.hen'),
    eggs = $('.egg'),
    egg1 = $('#egg1'),
    egg2 = $('#egg2'),
    egg3 = $('#egg3'),
    restart = $('#restart'),
    score_span = $('#score'),
    go = $("#go"),
    score1 = $('#score1'),
    life_span = $('#life'),
    floor = $('#floor'),
    easy = $('#easy');
    hard = $('#hard');
    final_score = $("#disp_score")
    basket_height = basket.height(),
    container_height = container.height(),
    egg_height = eggs.height(),
    egg_initial_position = parseInt(eggs.css('top')),
    score = 0,
    life = 8,
    speed1 = 2,
    speed2 = 2,
    speed3 = 2,
    input = "e",
    max_speed = 15,
    counter = 0,
    score_updated = false,
    game = 0,
    anim_id = 0,
    egg_current_position = 0,
    egg_top = 0,
    basket_top = container_height - basket_height,
    bullseye_num = 0;
    diff  ="easy";
    rand = 0;
    color = "white";

life_span.text(life);

$(function () { 

    get_diff();

    if(diff === "hard")
        get_speed();
        
        game = function () {
        
        if (check_egg_hits_floor(egg1) || check_egg_hits_basket(egg1)) {
            rand_color(egg1);
            set_egg_to_initial_position(egg1);
        } 
        else {
            egg_down1(egg1);
        }

        if (check_egg_hits_floor(egg2) || check_egg_hits_basket(egg2)) {
            rand_color(egg2);
            set_egg_to_initial_position(egg2);
        } 
        else {
            setTimeout(function(){
            egg_down2(egg2);
        }, 500)};
        
        if (check_egg_hits_floor(egg3) || check_egg_hits_basket(egg3)) {
            rand_color(egg3);
            set_egg_to_initial_position(egg3);
        } 
        else {
            setTimeout(function(){
                egg_down3(egg3);
            },400);
        }

        if (life > 0) {
            anim_id = requestAnimationFrame(game);
        } 
        else {
            stop_game();
        }
    };

    anim_id = requestAnimationFrame(game);

});

function get_diff(){

    input = prompt("Press 'e' or cancel for easy mode and press 'h' for hard mode. Please read the rules at the bottom of the page as well :)");

    if(input === "e" || input === "E"){
        diff = "easy";
        easy.addClass("selected");
        hard.removeClass("selected");
    }
        
    else if(input === "h" || input === "H"){
        diff = "hard";
        life = 7;
        hard.addClass("selected");
        easy.removeClass("selected");
        life_span.text(life);
    }
}

$(document).on('mousemove', function (e) {
    basket.css('left', e.pageX);
});


function egg_down1(egg) {

    egg1_current_position = parseInt(egg1.css('top'));
    egg1.css('top', egg1_current_position + speed1);
}


function egg_down2(egg) {

    egg2_current_position = parseInt(egg2.css('top'));
    egg2.css('top', egg2_current_position + speed2);
}

function egg_down3(egg) {

    egg3_current_position = parseInt(egg3.css('top'));
    egg3.css('top', egg3_current_position + speed3);
}

function get_speed(){
    speed1 = Math.floor(Math.random() * 2 + 2);
    speed2 = Math.floor(Math.random() * 2 + 2);
    speed3 = Math.floor(Math.random() * 2 + 2);
}

function rand_color(egg) {
    rand = Math.floor(Math.random() * 7 + 1);

    if(rand<=4 && rand>=1)
        egg.css('background-color', '#fff');

    else if(rand == 5)
        egg.css('background-color', 'red');

    else if(rand == 6)
        egg.css('background-color', 'yellow');

    else if(rand == 7)
        egg.css('background-color', 'black');
}

function check_egg_hits_floor(egg) {

    if (collision(egg, floor)) {
        show_bulls_eye(egg);
        decrement_life(egg);
        return true;
    }
    return false;
}

function set_egg_to_initial_position(egg) {

    egg.css('top', egg_initial_position);
}

function show_bulls_eye(egg) {

    bullseye_num = egg.attr('data-bullseye');
    $('#bullseye' + bullseye_num).show();
    hide_bulls_eye(bullseye_num);
}

function hide_bulls_eye(bullseye_num) {

    setTimeout(function () {
        $('#bullseye' + bullseye_num).hide();
    }, 800);
}

function decrement_life(egg) {

    if($(egg).css("background-color") != "rgb(255, 0, 0)" && $(egg).css("background-color") != "rgb(0, 0, 0)")
        life--;
    life_span.text(life);
}

function check_egg_hits_basket(egg) {

    if (collision(egg, basket)) {
        egg_top = parseInt(egg.css('top'));
        if (egg_top < basket_top) {
            update_score(egg);
            return true;
        }
    }
    return false;
}

function update_score(egg) {

    color = $(egg).css("background-color");

    if(color == "rgb(255, 255, 255)"){
        score++;
    }
        
    else if(color == "rgb(255, 0, 0)"){
        score--;
    }

    else if(color == "rgb(255, 255, 0)"){
        score+=2;
    }
        
    else if(color == "rgb(0, 0, 0)") {
        score--;
        life--;
        life_span.text(life);
    }

    if (score % 7 === 0 && speed1 <= max_speed && diff === "hard") {
        speed1++;
    }

    if (score % 10 === 0 && speed2 <= max_speed && diff === "hard") {
        speed2++;
    }

    if (score % 11 === 0 && speed3 <= max_speed && diff === "hard") {
        speed3++;
    }

    score_span.text(score);
    score1.text(score);
}

function collision($div1, $div2) {

    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left ;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2 ;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

function stop_game() {
    cancelAnimationFrame(anim_id);
    final_score.slideDown();
    final_score.text("Score: " + score);
    restart.slideDown();
}

restart.click(function () {
    location.reload();
});

go.click(function () {
    location.reload();
})