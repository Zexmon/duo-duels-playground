import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Player = 1 | 2;
type Cell = Player | null;
type Board = Cell[][];

const ROWS = 6;
const COLS = 7;

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  winningCells: [number, number][] | null;
  scores: { player1: number; player2: number };
}

const createEmptyBoard = (): Board => {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(null));
};

const checkWinner = (board: Board): { winner: Player | null; winningCells: [number, number][] | null } => {
  // Check horizontal
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const cell = board[row][col];
      if (cell && 
          cell === board[row][col + 1] && 
          cell === board[row][col + 2] && 
          cell === board[row][col + 3]) {
        return {
          winner: cell,
          winningCells: [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]]
        };
      }
    }
  }

  // Check vertical
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = board[row][col];
      if (cell && 
          cell === board[row + 1][col] && 
          cell === board[row + 2][col] && 
          cell === board[row + 3][col]) {
        return {
          winner: cell,
          winningCells: [[row, col], [row + 1, col], [row + 2, col], [row + 3, col]]
        };
      }
    }
  }

  // Check diagonal (top-left to bottom-right)
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const cell = board[row][col];
      if (cell && 
          cell === board[row + 1][col + 1] && 
          cell === board[row + 2][col + 2] && 
          cell === board[row + 3][col + 3]) {
        return {
          winner: cell,
          winningCells: [[row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]]
        };
      }
    }
  }

  // Check diagonal (top-right to bottom-left)
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 3; col < COLS; col++) {
      const cell = board[row][col];
      if (cell && 
          cell === board[row + 1][col - 1] && 
          cell === board[row + 2][col - 2] && 
          cell === board[row + 3][col - 3]) {
        return {
          winner: cell,
          winningCells: [[row, col], [row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3]]
        };
      }
    }
  }

  return { winner: null, winningCells: null };
};

const isBoardFull = (board: Board): boolean => {
  return board[0].every(cell => cell !== null);
};

export const GameBoard = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: 1,
    winner: null,
    winningCells: null,
    scores: { player1: 0, player2: 0 }
  });

  const dropPiece = useCallback((col: number) => {
    if (gameState.winner) return;

    const newBoard = gameState.board.map(row => [...row]);
    
    // Find the lowest empty row in the column
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][col] === null) {
        newBoard[row][col] = gameState.currentPlayer;
        
        const { winner, winningCells } = checkWinner(newBoard);
        
        if (winner) {
          const newScores = { ...gameState.scores };
          if (winner === 1) newScores.player1++;
          else newScores.player2++;
          
          setGameState({
            ...gameState,
            board: newBoard,
            winner,
            winningCells,
            scores: newScores
          });
          
          toast(`🎉 Player ${winner} wins!`, {
            description: `Score: Player 1: ${newScores.player1}, Player 2: ${newScores.player2}`
          });
        } else if (isBoardFull(newBoard)) {
          setGameState({
            ...gameState,
            board: newBoard,
            winner: null,
            winningCells: null
          });
          toast("🤝 It's a tie!", {
            description: "The board is full!"
          });
        } else {
          setGameState({
            ...gameState,
            board: newBoard,
            currentPlayer: gameState.currentPlayer === 1 ? 2 : 1
          });
        }
        return;
      }
    }
  }, [gameState]);

  const resetGame = () => {
    setGameState({
      ...gameState,
      board: createEmptyBoard(),
      currentPlayer: 1,
      winner: null,
      winningCells: null
    });
    toast("🎮 New game started!");
  };

  const resetScores = () => {
    setGameState({
      board: createEmptyBoard(),
      currentPlayer: 1,
      winner: null,
      winningCells: null,
      scores: { player1: 0, player2: 0 }
    });
    toast("📊 Scores reset!");
  };

  const isWinningCell = (row: number, col: number): boolean => {
    return gameState.winningCells?.some(([r, c]) => r === row && c === col) || false;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          Connect 4 Duel
        </h1>
        <p className="text-muted-foreground">Drop pieces to get 4 in a row!</p>
      </div>

      {/* Scoreboard */}
      <Card className="p-4 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-player1">Player 1</div>
            <div className="text-3xl font-black">{gameState.scores.player1}</div>
          </div>
          <div className="text-2xl font-bold text-muted-foreground">VS</div>
          <div className="text-center">
            <div className="text-2xl font-bold text-player2">Player 2</div>
            <div className="text-3xl font-black">{gameState.scores.player2}</div>
          </div>
        </div>
      </Card>

      {/* Game Status */}
      {!gameState.winner && (
        <Card className={`p-4 transition-all duration-300 ${
          gameState.currentPlayer === 1 
            ? 'bg-player1/10 border-player1/30 animate-pulse-glow' 
            : 'bg-player2/10 border-player2/30 animate-pulse-glow'
        }`}>
          <div className="text-center">
            <span className="text-lg font-semibold">Current Turn: </span>
            <span className={`text-xl font-bold ${
              gameState.currentPlayer === 1 ? 'text-player1' : 'text-player2'
            }`}>
              Player {gameState.currentPlayer}
            </span>
          </div>
        </Card>
      )}

      {gameState.winner && (
        <Card className="p-4 bg-win-color/10 border-win-color/30 animate-win-celebration">
          <div className="text-center">
            <span className="text-xl font-bold text-win-color">
              🏆 Player {gameState.winner} Wins! 🏆
            </span>
          </div>
        </Card>
      )}

      {/* Game Board */}
      <Card className="p-6" style={{ background: 'var(--gradient-board)' }}>
        <div className="grid grid-cols-7 gap-2 p-4 rounded-lg">
          {/* Column buttons */}
          {Array.from({ length: COLS }).map((_, col) => (
            <Button
              key={`col-${col}`}
              variant="ghost"
              size="sm"
              className="h-8 opacity-60 hover:opacity-100 transition-opacity"
              onClick={() => dropPiece(col)}
              disabled={gameState.winner !== null || gameState.board[0][col] !== null}
            >
              ↓
            </Button>
          ))}
          
          {/* Game board cells */}
          {gameState.board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-12 h-12 rounded-full border-2 border-border/30 
                  flex items-center justify-center transition-all duration-300
                  ${isWinningCell(rowIndex, colIndex) ? 'animate-win-celebration' : ''}
                `}
              >
                {cell && (
                  <div
                    className={`
                      w-10 h-10 rounded-full animate-drop-piece
                      ${cell === 1 
                        ? 'bg-gradient-to-br from-player1 to-player1/80 shadow-lg shadow-player1/30' 
                        : 'bg-gradient-to-br from-player2 to-player2/80 shadow-lg shadow-player2/30'
                      }
                      ${isWinningCell(rowIndex, colIndex) ? 'ring-2 ring-win-color' : ''}
                    `}
                    style={{ 
                      boxShadow: isWinningCell(rowIndex, colIndex) 
                        ? 'var(--shadow-win)' 
                        : 'var(--shadow-piece)' 
                    }}
                  />
                )}
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Controls */}
      <div className="flex gap-4">
        <Button 
          onClick={resetGame}
          variant="outline"
          className="bg-secondary/50 hover:bg-secondary/80"
        >
          🔄 New Game
        </Button>
        <Button 
          onClick={resetScores}
          variant="outline"
          className="bg-secondary/50 hover:bg-secondary/80"
        >
          📊 Reset Scores
        </Button>
      </div>
    </div>
  );
};