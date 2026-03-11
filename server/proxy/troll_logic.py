from flask import Flask, request, Response
import requests
import json
import sys

app = Flask(__name__)
GRAFANA_URL = "http://127.0.0.1:3000"

# Fonction pour forcer l'affichage des logs
def log(msg):
    print(msg, file=sys.stderr, flush=True)

@app.route('/', defaults={'path': ''}, methods=['GET', 'POST', 'PUT', 'DELETE'])
@app.route('/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy(path):
    # 1. On logue chaque requête POST pour voir ce qui arrive
    if request.method == "POST":
        log(f"--- TENTATIVE DE POST sur : {path} ---")

        # On essaie de lire les données JSON ou Form
        data = {}
        if request.is_json:
            data = request.get_json(silent=True) or {}
        else:
            data = request.form.to_dict()

        log(f"DATA REÇUE : {data}")

        # On cherche admin/admin de manière très large
        user = str(data.get('user', data.get('username', ''))).lower()
        password = str(data.get('password', '')).lower()

        if user == "admin" and password == "admin":
            log("!!! VICTOIRE : TROLL DÉCLENCHÉ !!!")
            return json.dumps({"message": "Logged in", "redirect": "/troll-page-visible/"}), 200, {'Content-Type': 'application/json'}

    # 2. PROXY VERS LE VRAI GRAFANA
    url = f"{GRAFANA_URL}/{path}"
    headers = {key: value for (key, value) in request.headers if key.lower() != 'host'}
    try:
        resp = requests.request(
            method=request.method,
            url=url,
            headers=headers,
            data=request.get_data(),
            cookies=request.cookies,
            allow_redirects=False)
        return Response(resp.content, resp.status_code, dict(resp.headers))
    except Exception as e:
        log(f"ERREUR PROXY : {e}")
        return "Erreur Grafana", 502

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)