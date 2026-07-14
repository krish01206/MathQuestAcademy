import React from "react";

function QuestionCard({
  questionData,
  onAnswerSelected,
  selectedAnswer,
  isCorrect,
  disabled
}) {
  const { question, options, answer, level } = questionData;

  const getDifficultyBadgeColor = (lvl) => {
    switch (lvl) {
      case "easy":
        return "var(--color-success)";
      case "medium":
        return "var(--color-warning)";
      case "hard":
        return "var(--color-danger)";
      default:
        return "var(--color-primary)";
    }
  };

  return (
    <div className="card-game mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span 
          className="badge" 
          style={{ 
            backgroundColor: getDifficultyBadgeColor(level),
            fontSize: "0.9rem",
            padding: "0.5rem 1rem",
            borderRadius: "12px",
            textTransform: "capitalize"
          }}
        >
          ⚡ {level}
        </span>
        <span className="text-muted fw-bold" style={{ fontSize: "0.95rem" }}>
          📐 Math Quest
        </span>
      </div>

      <h3 className="mb-4 text-center" style={{ fontWeight: 800, color: "var(--text-main)", fontSize: "1.6rem" }}>
        {question}
      </h3>

      <div className="options-grid">
        {options.map((option) => {
          const isCurrentSelected = selectedAnswer === option;
          const isOptionCorrect = option === answer;
          
          let optionClass = "question-option";
          if (selectedAnswer) {
            if (isOptionCorrect) {
              optionClass += " correct";
            } else if (isCurrentSelected) {
              optionClass += " incorrect";
            }
            optionClass += " disabled";
          }

          return (
            <button
              key={option}
              className={optionClass}
              onClick={() => !disabled && onAnswerSelected(option)}
              disabled={disabled}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer && (
        <div 
          className="mt-4 p-3 text-center" 
          style={{ 
            borderRadius: "16px", 
            backgroundColor: isCorrect ? "rgba(60, 212, 160, 0.1)" : "rgba(249, 90, 90, 0.1)",
            border: `2px solid ${isCorrect ? "var(--color-success)" : "var(--color-danger)"}`,
            animation: "bounceIn 0.4s ease-out"
          }}
        >
          {isCorrect ? (
            <div className="fw-bold" style={{ color: "var(--color-success)", fontSize: "1.1rem" }}>
              🎉 Superb Job! That is 100% correct! (+10 XP)
            </div>
          ) : (
            <div>
              <div className="fw-bold" style={{ color: "var(--color-danger)", fontSize: "1.1rem" }}>
                😅 Not quite, but nice try!
              </div>
              <div className="mt-1 fw-bold text-muted">
                The correct answer was <span className="text-success">{answer}</span>. Let's tackle the next one!
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
