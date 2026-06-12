let startTime = 0;
let correctAnswer = 0;
let itemCount = 0;
let playerHeroName = "Hero";

document.getElementById('action-btn').addEventListener('click', startGame);

function startGame() {
    const nameInput = document.getElementById('player-name');
    if (nameInput.style.display !== 'none') {
        playerHeroName = nameInput.value.trim() || "Hero";
        nameInput.style.display = 'none';
    }
    
    document.getElementById('action-btn').style.display = 'none';
    document.getElementById('user-input').classList.add('word-hidden');
    
    // بدء العد التنازلي (3 ثوانٍ) قبل جلب أول كلمة
    runCountdown(3); 
}

function runCountdown(seconds) {
    const countdownDiv = document.getElementById('countdown');
    const statusMsg = document.getElementById('status-msg');
    
    statusMsg.innerText = 'Prepare your mind...';
    countdownDiv.classList.remove('word-hidden');
    countdownDiv.innerText = seconds;

    const interval = setInterval(() => {
        seconds--;
        if (seconds > 0) {
            countdownDiv.innerText = seconds;
        } else if (seconds === 0) {
            countdownDiv.innerText = 'GO!';
            countdownDiv.style.color = '#238636'; // تغيير اللون للأخضر عند الانطلاق
        } else {
            clearInterval(interval);
            countdownDiv.classList.add('word-hidden');
            countdownDiv.style.color = '#58a6ff'; // إعادة اللون الأزرق الافتراضي
            getNextWord(); // انطلاق اللعبة وجلب الكلمة الأولى
        }
    }, 1000);
}

function getNextWord() {
    fetch('/api/get_word')
        .then(response => response.json())
        .then(data => {
            const flashDiv = document.getElementById('word-flash');
            itemCount = data.item_index;
            document.getElementById('status-msg').innerText = `Item ${itemCount}`;
            
            flashDiv.innerText = data.item;
            flashDiv.classList.remove('word-hidden');
            
            setTimeout(() => {
                flashDiv.classList.add('word-hidden');
                
                // تفعيل المشتت الرياضي من الكلمة الثانية فصاعداً
                if (itemCount >= 2) {
                    triggerMathGate();
                } else {
                    enableInput();
                }
            }, data.duration * 1000);
        });
}

function triggerMathGate() {
    document.getElementById('status-msg').innerText = '';
    const mathGate = document.getElementById('math-gate');
    const mathQ = document.getElementById('math-question');
    const mathA = document.getElementById('math-answer');
    
    const n1 = Math.floor(Math.random() * 12) + 2;
    const n2 = Math.floor(Math.random() * 12) + 2;
    correctAnswer = n1 + n2;
    
    mathQ.innerText = `${n1} + ${n2} = ?`;
    mathA.value = '';
    mathGate.classList.remove('word-hidden');
    mathA.disabled = false;
    mathA.focus();
    
    mathA.onkeydown = function(e) {
        if (e.key === 'Enter') {
            if (parseInt(mathA.value) === correctAnswer) {
                mathGate.classList.add('word-hidden');
                enableInput();
            } else {
                document.getElementById('status-msg').innerText = '❌ Wrong calculation! Try again.';
                mathA.value = '';
                mathA.focus();
            }
        }
    };
}

function enableInput() {
    document.getElementById('status-msg').innerText = `Type the ${itemCount} items in order:`;
    const inputField = document.getElementById('user-input');
    inputField.classList.remove('word-hidden');
    inputField.disabled = false;
    inputField.value = '';
    inputField.focus();
    
    startTime = Date.now();
    
    inputField.onkeydown = function(e) {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    };
}

function submitAnswer() {
    const inputField = document.getElementById('user-input');
    // تنظيف المدخلات وتحويلها لأحرف صغيرة لمنع مشاكل الـ Case-Sensitivity
    const answer = inputField.value.trim().toLowerCase().split(/\s+/);
    inputField.disabled = true;
    
    const timeTaken = (Date.now() - startTime) / 1000;
    const isFast = timeTaken <= (itemCount * 3.5); 

    fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: answer, is_fast: isFast, player_name: playerHeroName })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('stage').innerText = data.stage;
        document.getElementById('lives').innerText = data.lives;
        document.getElementById('score').innerText = data.score;

        if (data.correct) {
            document.getElementById('status-msg').innerText = '✅ Correct!';
            inputField.classList.add('word-hidden');
            setTimeout(getNextWord, 1000);
        } else {
            inputField.classList.add('word-hidden');
            if (data.lives <= 0) {
                document.getElementById('status-msg').innerText = '💀 GAME OVER!';
                document.getElementById('action-btn').innerText = 'Restart';
                document.getElementById('action-btn').style.display = 'block';
                // إظهار حقل الاسم مجدداً عند إعادة تشغيل اللعبة
                document.getElementById('player-name').style.display = 'block';
            } else {
                document.getElementById('status-msg').innerText = '❌ Wrong! Sequence reset.';
                setTimeout(getNextWord, 2000);
            }
        }
    });
}
