from flask import Flask, request, jsonify

app = Flask(__name__)

# Expected ROM ranges per injury + week
EXPECTED_ROM = {
    "knee": {
        "week1": {"min": 10, "max": 30},
        "week2": {"min": 25, "max": 45},
        "week3": {"min": 40, "max": 60},
        "week4": {"min": 55, "max": 80},
    }
}

@app.route("/recommend-week", methods=["POST"])
def recommend_week():
    data = request.json

    injury = data["injury"]
    actual_rom = data["actualROM"]
    reported_week = data["reportedWeek"]

    injury_data = EXPECTED_ROM.get(injury)

    if not injury_data:
        return jsonify({"error": "Unknown injury"}), 400

    # Default recommendation
    recommended = "week1"

    for week, rom_range in injury_data.items():
        if actual_rom >= rom_range["min"]:
            recommended = week

    return jsonify({
        "recommendedWeek": recommended,
        "actualROM": actual_rom,
        "reportedWeek": reported_week
    })

if __name__ == "__main__":
    app.run(debug=True)
