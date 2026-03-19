import random
import requests
import time

numbers = []

for i in range(0, 100):
        numbers.append(random.randint(912345678, 999999999))
        
for number in numbers:
    headers = {
        "User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:148.0) Gecko/20100101 Firefox/148.0",
        "Accept: application/json, text/plain, */*",
        "Content-Type: application/json"
    }
    data = {
        'telefone': number,
        'senha': '111111'
    }
    
    res = requests.post("http://localhost:5000/auth", json=data, allow_redirects=False, verify=False)
    print(res.text)
    time.sleep(1)