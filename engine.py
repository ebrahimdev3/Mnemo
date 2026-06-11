import random
import os
import base64
from faker import Faker

class DataManager:
    """مسؤول عن التشفير، السجل، وتوليد الكلمات"""
    def __init__(self):
        self.fake = Faker()
        self.file_path = "leaderboard.bin"

    def get_diverse_item(self, stage):
        if stage <= 5:
            word = self.fake.word()
            while len(word) > 5: word = self.fake.word()
            return word
        elif stage <= 10:
            return random.choice([self.fake.color_name(), self.fake.city(), self.fake.first_name()])
        return random.choice([self.fake.company(), self.fake.job(), self.fake.word()])

    def save_to_leaderboard(self, name, score, stage):
        records = self.get_leaderboard()
        records.append({"name": name, "score": score, "stage": f"Stage {stage}"})
        records = sorted(records, key=lambda x: x['score'], reverse=True)[:5]
        
        with open(self.file_path, "w") as f:
            for r in records:
                raw = f"{r['name']}|{r['score']}|{r['stage']}"
                f.write(base64.b64encode(raw.encode()).decode() + "\n")

    def get_leaderboard(self):
        records = []
        if os.path.exists(self.file_path):
            with open(self.file_path, "r") as f:
                for line in f:
                    try:
                        dec = base64.b64decode(line.strip().encode()).decode()
                        p = dec.split("|")
                        records.append({"name": p[0], "score": int(p[1]), "stage": p[2]})
                    except: continue
        return records

class GameLogic:
    """مسؤول عن القواعد، النقاط، والحياة"""
    def __init__(self):
        self.score = 0
        self.lives = 3
        self.current_stage = 1
        self.sequence = []

    def reset_for_next_stage(self):
        self.sequence = []
        self.current_stage += 1
        self.score += 500

    def process_answer(self, user_list, is_fast): 
        # تم إصلاح المحاذاة وتحويل جميع الحروف للمقارنة بشكل آمن
        correct = [w.lower() for w in self.sequence]
        user_clean = [w.lower() for w in user_list] 
        
        if user_clean == correct:
            self.score += 150 if is_fast else 100
            return True
        self.lives -= 1
        self.sequence = [] 
        return False
