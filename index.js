
// 意見を追加するプログラム
    //HTML要素の取得
    const form = document.getElementById('form')
    const text = document.getElementById('text')
    const ul = document.getElementById('ul')

    // パソコン以外ではsetting画面を非表示にする
    const setting = document.getElementById('setting')
    // osを判定
    let os = window.navigator.userAgent.toLowerCase()
    if(os.indexOf("android") !== -1 || os.indexOf("iphone") !== -1 || os.indexOf("ipad") !== -1){
        setting.classList.add('No_setting')
    } else {
        ;
    } 

    // ローカルストレージのデータをブラウザに表示する
    const todos = JSON.parse(localStorage.getItem('todos'));
    if(todos){
        todos.forEach(todo => {
            add(todo);
        });
    };

    // テキスト追加
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        add()
        remove()
    });

    // 削除
    const deletion = document.getElementById('deletion');
    deletion.addEventListener('click', () => {
        deletionText()
    })
    document.addEventListener('keydown', function(event){
        if(os.indexOf("mac os x") !== -1){
            if(event.metaKey && event.key === 'd'){
                event.preventDefault()
                deletionText()
            }
        } else if(os.indexOf("windows nt") !== -1){
            if(event.ctrlKey && event.key === 'd'){
                event.preventDefault()
                deletionText()
            }
        } else {
            ;
        }
    });
    function deletionText(){
        const confirm = window.confirm('すべてのテキストを削除しますか？');
        if(confirm){
            localStorage.clear();
            window.location.reload();
        } else {
            ;   
        }
    };

    // DOM操作
    const plus = document.getElementById('plus');
    const config = document.getElementById('config');
    const add_display = document.getElementById('add_display');
    const black_board = document.getElementById('black_board');
    const setting_display = document.getElementById('setting_display');
    // 
    const opacity1 = window.getComputedStyle(plus).opacity;
    const opacity2 = window.getComputedStyle(deletion).opacity;
    // クリックイベント
    plus.addEventListener('click', () => {
        plusText();
    });
    document.addEventListener('keydown', function(event){
        if(os.indexOf("mac os x") !== -1){
            if(event.metaKey && event.key === 'a'){
                event.preventDefault()
                plusText();
            }
        } else if(os.indexOf("windows nt") !== -1){
            if(event.ctrlKey && event.key === 'a'){
                event.preventDefault()
                plusText();
            }
        } else {
            ;
        }
    });
    function plusText(){
        add_display.classList.toggle('display');
        black_board.classList.toggle('display');
        plus.classList.toggle('display');
    }
    // remove and Add
    function remove(){
        add_display.classList.remove('display');
        black_board.classList.remove('display');
        plus.classList.remove('display');
    }
    function Add(){
        add_display.classList.add('display');
        black_board.classList.add('display');
        plus.classList.add('display');
    }
    // 
    config.addEventListener('click', (event) => {
        setting_display.classList.toggle('display');
        plus.classList.toggle('none');
        deletion.classList.toggle('none')
    });
    

    // add
    function add(op){
        const li = document.createElement('li');
        let opinion = text.value;
        if(op){
            opinion = op;
        };
        if(opinion){
            li.innerText = opinion;
            li.classList.add('opinion');
            li.addEventListener('click', () => {
                deletionLi()
            });
            function deletionLi(){
                // PC以外では発動しないようにする
                if(os.indexOf("android") !== -1 || os.indexOf("iphone") !== -1 || os.indexOf("ipad") !== -1){
                    ;
                } else {
                    const conf = window.confirm('このテキストを削除しますか？')
                    if(conf){
                        li.remove()
                        save()
                    } else {
                        ;   
                    }
                } 
            };
            ul.appendChild(li);
            text.value = "";
            save();
        };
    };

    // save
    function save(){
        const lists = document.querySelectorAll('li');
        let todos = [];
        lists.forEach(list => { 
            todos.push(list.innerText);
        });
        localStorage.setItem("todos", JSON.stringify(todos))
    }


