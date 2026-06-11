from flask import Flask, render_template, jsonify, request
from engine import GameLogic, DataManager

app = Flask(__name__)

logic = GameLogic()
data = DataManager()

@app.route('/')
def home():
    leaderboard = data.get_leaderboard()
    return render_template('index.html', leaderboard=leaderboard)

@app.route('/api/get_word', methods=['GET'])
def get_word():
    if logic.lives <= 0:
        logic.__init__()
        
    item = data.get_diverse_item(logic.current_stage)
    logic.sequence.append(item)
    
    # الرتم المعدل: الكلمة تبدأ بـ 2.5 ثانية وتتناقص ببطء وبحد أدنى 1.2 ثانية
    duration = max(1.2, 2.5 - (len(logic.sequence) * 0.05))
    
    return jsonify({
        "item": item,
        "duration": duration,
        "item_index": len(logic.sequence)
    })

@app.route('/api/check', methods=['POST'])
def check_answer():
    req_data = request.get_json()
    user_answer = req_data.get('answer', [])
    is_fast = req_data.get('is_fast', False)
    player_name = req_data.get('player_name', 'Hero')
    
    correct = logic.process_answer(user_answer, is_fast)
    
    if logic.lives <= 0:
        data.save_to_leaderboard(player_name, logic.score, logic.current_stage)
        
    return jsonify({
        "correct": correct,
        "score": logic.score,
        "lives": logic.lives,
        "stage": logic.current_stage,
        "correct_sequence": logic.sequence
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
