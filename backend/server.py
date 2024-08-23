from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from crew import run_crew

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/api/run-crew', methods=['POST'])
def api_run_crew():
    data = request.json
    topic = data.get('topic')
    if not topic:
        return jsonify({'error': 'Topic is required'}), 400
    
    socketio.start_background_task(run_crew_task, topic)
    return jsonify({'message': 'Task started'}), 202

def run_crew_task(topic):
    try:
        for progress in run_crew(topic):
            if isinstance(progress, str):
                socketio.emit('progress', {'message': progress})
            else:
                socketio.emit('result', {'data': progress})
    except Exception as e:
        socketio.emit('error', {'message': str(e)})

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000)