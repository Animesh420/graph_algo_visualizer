#!/bin/bash

# --- Pathfinding Visualizer Project Startup Script ---
# Usage: ./start_project.sh [--debug]

DEBUG_MODE=0

if [[ "$1" == "--debug" ]]; then
    DEBUG_MODE=1
fi

echo "Starting Pathfinding Visualizer..."

cd "$(dirname "$0")"

echo "Checking and freeing ports 5000 and 8000 if needed..."
fuser -k 5000/tcp 2>/dev/null
fuser -k 8000/tcp 2>/dev/null

if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi
source .venv/bin/activate
echo "Virtual environment activated."

echo "Installing Python dependencies..."
pip install -r backend/requirements.txt

if [ $DEBUG_MODE -eq 1 ]; then
    echo "Starting backend server in DEBUG mode (attach VS Code debugger)..."
    echo "Please use VS Code 'Run & Debug' (F5) with the provided launch.json."
    # Start frontend only, let VS Code handle backend
    cd frontend
    python3 -m http.server 8000 &
    FRONTEND_PID=$!
    cd ..
    echo "Frontend running at http://localhost:8000"
    echo "Attach VS Code debugger for backend."
    trap "echo 'Stopping frontend server...'; kill $FRONTEND_PID" SIGINT
    wait
else
    echo "Starting backend server (app.py) in normal mode..."
    cd backend
    export FLASK_APP=app.py
    export FLASK_ENV=development
    flask run --host=0.0.0.0 --port=5000 &
    BACKEND_PID=$!
    cd ..

    sleep 2

    echo "Starting frontend server..."
    cd frontend
    python3 -m http.server 8000 &
    FRONTEND_PID=$!
    cd ..

    echo "Backend running at http://localhost:5000"
    echo "Frontend running at http://localhost:8000"

    trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID" SIGINT
    wait
fi
