import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import golfBallImage from '/src/assets/golfball.png';

const ScoreCard = () => {
    const [scores, setScores] = useState(new Array(18).fill(0));
    const [pars, setPars] = useState(new Array(18).fill(4));
    const [selectedButtons, setSelectedButtons] = useState(new Array(18).fill(false));
    const [currentHole, setCurrentHole] = useState(1);
    const [scoreHistory, setScoreHistory] = useState([]); // Ny state-variabel för att lagra tidigare resultat

    const handleScoreChange = (score) => {
        const newScores = [...scores];
        newScores[currentHole - 1] = score;
        setScores(newScores);
        
        // Lägg till poängen för det aktuella hålet till scoreHistory
        const currentScore = {
            hole: currentHole,
            par: pars[currentHole - 1],
            score: score,
            totalScore: calculateScore(score, pars[currentHole - 1])
        };
        setScoreHistory([...scoreHistory, currentScore]); // Uppdatera scoreHistory

        setCurrentHole(currentHole + 1);
    };

    const handleParChange = (par) => {
        const newPars = [...pars];
        newPars[currentHole - 1] = par;
        setPars(newPars);
        setSelectedButtons([...selectedButtons, true]);
    };

    const handleParButtonClick = (par) => {
        handleParChange(par);
    };

    const calculateScore = (score, par) => {
        let result = 0;
        if (par === 3) {
            result = score === 2 ? 4 : score === 3 ? 3 : score === 4 ? 2 : score === 5 ? 1 : 0;
        } else if (par === 4) {
            result = score === 3 ? 4 : score === 4 ? 3 : score === 5 ? 2 : score === 6 ? 1 : 0;
        } else if (par === 5) {
            result = score === 4 ? 4 : score === 5 ? 3 : score === 6 ? 2 : score === 7 ? 1 : 0;
        }
        return result;
    };

    const calculateTotalScore = () => {
        return scores.reduce((total, score, index) => total + calculateScore(score, pars[index]), 0);
    };

    return (
        <div className='score-card-container'>
            <h2>ScoreCard</h2>
            <br />
            <br />
            <table>
                <thead>
                    <tr>
                        <th>Hole</th>
                        <th>Par</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {currentHole <= 18 && (
                        <tr key={currentHole}>
                            <td>{currentHole}</td>
                            <td>
                                <div className='par-btn-container'>
                                    <button onClick={() => handleParButtonClick(3)} className={`par-button ${selectedButtons[currentHole - 1] && pars[currentHole - 1] === 3 ? 'selected' : ''}`}>
                                        3
                                    </button>
                                    <button onClick={() => handleParButtonClick(4)} className={`par-button ${selectedButtons[currentHole - 1] && pars[currentHole - 1] === 4 ? 'selected' : ''}`}>
                                        4
                                    </button>
                                    <button onClick={() => handleParButtonClick(5)} className={`par-button ${selectedButtons[currentHole - 1] && pars[currentHole - 1] === 5 ? 'selected' : ''}`}>
                                        5
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div className='score-btn-container' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '0rem' }}>
                                    {[7, 6, 5, 4, 3, 2].map((score) => (
                                        <button
                                            key={score}
                                            onClick={() => handleScoreChange(score)}
                                            className={`score-button ${scores[currentHole - 1] === score ? 'selected' : ''}`}
                                        >
                                            <div>
                                                <img src={golfBallImage} alt="Golf Ball" />
                                                <span>{score}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='total-score'>Total Score: {calculateTotalScore()}</div>

            {/* Visa historik över tidigare hål */}
            <h3>Score History</h3>
            <ul>
                {scoreHistory.map((item, index) => (
                    <li key={index}>
                        Hole {item.hole}: Par {item.par}, Score {item.score}, Resultat: {item.totalScore}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ScoreCard;
