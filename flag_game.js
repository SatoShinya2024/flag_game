function game_start(){
    let difficulty = document.getElementById("difficulty_selection").value;
    start_animation();
    start_whistle();
    setTimeout(() => {
        game_routing(difficulty, false, false, 0);
    }, 4500);
}
function start_animation(){
    let controled_contents = document.getElementById("announcement_wrapper");
    let count = 3;
    controled_contents.innerHTML = "<div style='text-align: center;'>" + count + "</div>";
    count--;
    let interval = setInterval(() => {
        if(count > 0){
            controled_contents.innerHTML = "<div style='text-align: center;'>" + count + "</div>";
            count--;
        }else{
            controled_contents.innerHTML = "<div style='text-align: center;'>" +  "スタート！" + "</div>";
            clearInterval(interval);
        }
    }, 1000);
}
function start_whistle(){
    const start_whistle = new Audio("se/start_whistle.mp3");
    start_whistle.play();
}

class Player{
    red_flag_status = false;
    white_flag_status = false;
    score = 0;
    constructor(red_key, white_key, name, japanese_name){
        this.red_key = red_key;
        this.white_key = white_key;
        this.name = name;
        this.answer_box = name + "_answer";
        this.score_box = name + "_score";
        this.japanese_name = japanese_name;
    }
    addScore(num){
        if(this.score > -100){
            this.score += num;
        }
        document.getElementById(this.score_box).innerHTML = this.score;
    }
    get_standby(){
        document.getElementById(this.answer_box).innerHTML = "";
        document.addEventListener("keydown", this.Get_standby, true);
    }
    raise_red_flag(){
        document.removeEventListener("keydown", this.Get_standby, true);
        document.addEventListener("keydown", this.Raise_red_flag, true);
    }
    raise_white_flag(){
        document.removeEventListener("keydown", this.Get_standby, true);
        document.addEventListener("keydown", this.Raise_white_flag, true);
    }
    lower_red_flag(){
        document.removeEventListener("keydown", this.Get_standby, true);
        document.addEventListener("keydown", this.Lower_red_flag, true);
    }
    lower_white_flag(){
        document.removeEventListener("keydown", this.Get_standby, true);
        document.addEventListener("keydown", this.Lower_white_flag, true);
    }
    Get_standby = (e) => {
        if(e.key == this.red_key || e.key == this.white_key){
            new Audio("se/whistle02.mp3").play();
            this.addScore(-1);
            document.getElementById(this.answer_box).innerHTML = "<img src='img/batsu.png'>";
        }
    }
    Raise_red_flag = (e) => {
        if(e.key == this.red_key){
            if(this.white_flag_status){
                document.getElementById(this.name).setAttribute("src", "img/" + this.name + "/pause04.png")
            }else{
                document.getElementById(this.name).setAttribute("src", "img/" + this.name + "/pause03.png")
            }
            new Audio("se/swing.mp3").play();
            this.addScore(1);
            document.getElementById(this.answer_box).innerHTML = "<img src='img/maru.png' alt='maru'>";
            this.red_flag_status = true;
            document.removeEventListener("keydown", this.Raise_red_flag, true);
        }else if(e.key == this.white_key){
            new Audio("se/whistle02.mp3").play();
            this.addScore(-1);
            document.getElementById(this.answer_box).innerHTML = "<img src='img/batsu.png' alt='batsu'>";
            this.red_flag_status = true;
            document.removeEventListener("keydown", this.Raise_red_flag, true);
        } 
    }
    Raise_white_flag = (e) => {
        if(e.key == this.white_key){
            if(this.red_flag_status){
                document.getElementById(this.name).setAttribute("src", "img/" + this.name + "/pause04.png")
            }else{
                document.getElementById(this.name).setAttribute("src", "img/" + this.name + "/pause02.png")
            }
            new Audio("se/swing.mp3").play();
            document.getElementById(this.answer_box).innerHTML = "<img src='img/maru.png'>";
            this.addScore(1);
            this.white_flag_status = true;
            document.removeEventListener("keydown", this.Raise_white_flag, true);
        }else if(e.key == this.red_key){
            new Audio("se/whistle02.mp3").play();
            this.addScore(-1);
            document.getElementById(this.answer_box).innerHTML = "<img src='img/batsu.png'>";
            this.white_flag_status = true;
            document.removeEventListener("keydown", this.Raise_white_flag, true);
        }
    }
    Lower_red_flag = (e) => {
        if(e.key == this.red_key){
            if(this.white_flag_status){
                document.getElementById(this.name).setAttribute("src", "img/" + this.name + "/pause02.png")
            }else{
                document.getElementById(this.name).setAttribute("src", "img/" + this.name + "/pause01.png")
            }
            new Audio("se/swing.mp3").play();
            document.getElementById(this.answer_box).innerHTML = "<img src='img/maru.png'>";
            this.addScore(1);
            this.red_flag_status = false;
            document.removeEventListener("keydown", this.Lower_red_flag, true);
        }else if(e.key == this.white_key){
            new Audio("se/whistle02.mp3").play();
            this.addScore(-1);
            document.getElementById(this.answer_box).innerHTML = "<img src='img/batsu.png'>";
            this.red_flag_status = false;
            document.removeEventListener("keydown", this.Lower_red_flag, true);
        }
    }
    Lower_white_flag = (e) => {
        if(e.key == this.white_key){
            if(this.red_flag_status){
                document.getElementById(this.name).setAttribute("src", "img/" + this.name + "/pause03.png")
            }else{
                document.getElementById(this.name).setAttribute("src", "img/" + this.name + "/pause01.png")
            }
            new Audio("se/swing.mp3").play();
            document.getElementById(this.answer_box).innerHTML = "<img src='img/maru.png'>";
            this.addScore(1);
            this.white_flag_status = false;
            document.removeEventListener("keydown", this.Lower_white_flag, true);
        }else if(e.key == this.red_key){
            new Audio("se/whistle02.mp3").play();
            this.addScore(-1);
            document.getElementById(this.answer_box).innerHTML = "<img src='img/batsu.png'>";
            this.white_flag_status = false;
            document.removeEventListener("keydown", this.Lower_white_flag, true);
        }
    }
}

function game_routing(difficulty, global_red_flag_status, global_white_flag_status, count){
    let folder = "voice/" + difficulty + "/";
    let voice_file_name;
    let standby_time = 1500;
    let action_time = 500;
    document.getElementById("announcement_wrapper").innerHTML = "";
    if(difficulty == "hard"){
        standby_time = 800;
        action_time = 300;
    }else if(difficulty == "very_hard"){
        standby_time = 550;
        action_time = 250;
    }

    if(!global_white_flag_status && !global_red_flag_status){
        voice_file_name = ["raise_white.wav", "raise_red.wav", "dont_raise_white.wav", "dont_raise_red.wav"];
    }else if(global_white_flag_status && !global_red_flag_status){
        voice_file_name = ["lower_white.wav", "raise_red.wav", "dont_lower_white.wav", "dont_raise_red.wav"];
    }else if(!global_white_flag_status && global_red_flag_status){
        voice_file_name = ["raise_white.wav", "lower_red.wav", "dont_raise_white.wav", "dont_lower_red.wav"];
    }else if(global_white_flag_status && global_red_flag_status){
        voice_file_name = ["lower_white.wav", "lower_red.wav", "dont_lower_white.wav", "dont_lower_red.wav"];
    }

    
    const rnd = Math.floor(Math.random() * 4);
    new Audio(folder + voice_file_name[rnd]).play();

    // const announcement_wrapper = document.getElementById("announcement_wrapper");
    // let message = "";
    // if(voice_file_name[rnd] == "raise_white.wav"){
    //     message = "<div class='" + difficulty + "_fade_text'><span style='color: white;'>白</span>、上げて</div>";
    // }else if(voice_file_name[rnd] == "raise_red.wav"){
    //     message = "<div class='" + difficulty + "_fade_text'><span style='color: red;'>赤</span>、上げて</div>";
    // }else if(voice_file_name[rnd] == "dont_raise_white.wav"){
    //     message = "<div class='" + difficulty + "_fade_text'><span style='color: white;'>白</span>、上げないで</div>";
    // }else if(voice_file_name[rnd] == "dont_raise_red.wav"){
    //     message = "<div class='" + difficulty + "_fade_text'><span style='color: red;'>赤</span>、上げないで</div>";
    // }else if(voice_file_name[rnd] == "lower_white.wav"){
    //     message = "<div class='" + difficulty + "_fade_text'><span style='color: white;'>白</span>、下げて</div>";
    // }else if(voice_file_name[rnd] == "lower_red.wav"){
    //     message = "<div class='" + difficulty + "_fade_text'><span style='color: red;'>赤</span>、下げて</div>";
    // }else if(voice_file_name[rnd] == "dont_lower_white.wav"){
    //     message = "<div class='" + difficulty + "_fade_text'><span style='color: white;'>白</span>、下げないで</div>";
    // }else if(voice_file_name[rnd] == "dont_lower_red.wav"){
    //     message = "<div class='" + difficulty + "_fade_text'><span style='color: red;'>赤</span>、下げないで</div>";
    // }

    // setTimeout(() => {
    //     announcement_wrapper.innerHTML = message;
    // }, standby_time / 2)
    players_array.forEach((value) => {
        value.get_standby();
    })

    setTimeout(() => {
        players_array.forEach((value) => {
            if(rnd == 0 && !global_white_flag_status){
                value.raise_white_flag();
            }else if(rnd == 0 && global_white_flag_status){
                value.lower_white_flag();
            }else if(rnd == 1 && !global_red_flag_status){
                value.raise_red_flag();
            }else if(rnd == 1 && global_red_flag_status){
                value.lower_red_flag();
            }
        })
    }, standby_time)

    if(rnd == 0 || rnd == 1){
        count++;
    }

    setTimeout(() => {
        if(rnd == 0 && !global_white_flag_status){
            global_white_flag_status = true;
        }else if(rnd == 0 && global_white_flag_status){
            global_white_flag_status = false;
        }else if(rnd == 1 && !global_red_flag_status){
            global_red_flag_status = true;
        }else if(rnd == 1 && global_red_flag_status){
            global_red_flag_status = false;
        }
        players_array.forEach((value) => {
            document.removeEventListener("keydown", value.Raise_white_flag, true);
            document.removeEventListener("keydown", value.Raise_red_flag, true);
            document.removeEventListener("keydown", value.Lower_white_flag, true);
            document.removeEventListener("keydown", value.Lower_red_flag, true);
            let img = document.getElementById(value.name);
            if(!global_white_flag_status && !global_red_flag_status){
                img.setAttribute("src", "img/" + value.name + "/pause01.png");
            }else if(global_white_flag_status && !global_red_flag_status){
                img.setAttribute("src", "img/" + value.name + "/pause02.png");
            }else if(!global_white_flag_status && global_red_flag_status){
                img.setAttribute("src", "img/" + value.name + "/pause03.png");
            }else if(global_white_flag_status && global_red_flag_status){
                img.setAttribute("src", "img/" + value.name + "/pause04.png");
            }
            if(global_red_flag_status != value.red_flag_status || global_white_flag_status != value.white_flag_status){
                new Audio("se/whistle02.mp3").play();
                value.addScore(-1);
                value.red_flag_status = global_red_flag_status;
                value.white_flag_status = global_white_flag_status;
                document.getElementById(value.answer_box).innerHTML = "<img src='img/batsu.png'>";
            }
        })
        if(count != 10){
            setTimeout(() => {
                game_routing(difficulty, global_red_flag_status, global_white_flag_status, count);
            }, 1000)
        }else{
            show_result_dialog();
        }
    }, standby_time + action_time);
    
}

function show_result_dialog(){
    new Audio("se/whistle04.mp3").play();
    document.getElementById("announcement_wrapper").innerHTML = "<div style='text-align: center;'>" +   "終了！" + "</div>";

    players_array.sort((a, b) => b.score - a.score);
    document.getElementById("score_display").innerHTML = "<div>" + players_array[0].japanese_name + "の得点：" + players_array[0].score + "</div>";
    for(let i = 1; i < players_array.length; i++){
        document.getElementById("score_display").innerHTML += "<div>" + players_array[i].japanese_name + "の得点：" + players_array[i].score + "</div>";
    }

    setTimeout(() => {
        document.getElementById("dialog_result").showModal();
    }, 2000)
}