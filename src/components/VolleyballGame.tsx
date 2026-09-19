import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { soundManager } from '../utils/audio';
import { VOLLEYBALL_QUESTIONS } from '../data/volleyballData';
import { VolleyballQuestion, AIDifficulty } from '../types';
import {
  Trophy,
  RotateCcw,
  Volume2,
  VolumeX,
  Users,
  Bot,
  Zap,
  Clock,
  Sparkles,
  ChevronRight,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';

interface VolleyballGameProps {
  onGoToCourse?: () => void;
}

const TARGET_SCORE = 10;
const CANVAS_WIDTH = 920;
const CANVAS_HEIGHT = 500;
const GROUND_Y = 435;
const NET_WIDTH = 14;
const NET_HEIGHT = 145;
const NET_X = CANVAS_WIDTH / 2 - NET_WIDTH / 2;
const NET_Y = GROUND_Y - NET_HEIGHT;
const GRAVITY = 0.38;

export const VolleyballGame: React.FC<VolleyballGameProps> = ({ onGoToCourse }) => {
  const { currentUser, updateUserStats } = useAuth();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game configuration states
  const [isVsAI, setIsVsAI] = useState<boolean>(true);
  const [aiDifficulty, setAiDifficulty] = useState<AIDifficulty>('normal');
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(soundManager.muted);

  // Match states
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [isPausedForQuiz, setIsPausedForQuiz] = useState<boolean>(false);
  const [p1Score, setP1Score] = useState<number>(0);
  const [p2Score, setP2Score] = useState<number>(0);
  const [p1SuperPower, setP1SuperPower] = useState<string | null>(null);
  const [p2SuperPower, setP2SuperPower] = useState<string | null>(null);

  // Match over state
  const [matchWinner, setMatchWinner] = useState<'p1' | 'p2' | null>(null);

  // Quiz Modal state
  const [currentQuiz, setCurrentQuiz] = useState<VolleyballQuestion | null>(null);
  const [quizTimer, setQuizTimer] = useState<number>(15);
  const [scoringPlayerNum, setScoringPlayerNum] = useState<1 | 2>(1);
  const [quizFeedback, setQuizFeedback] = useState<{
    correct: boolean;
    explanation: string;
    didYouKnow?: string;
  } | null>(null);

  // Internal physics refs
  const p1Ref = useRef({
    x: 180,
    y: GROUND_Y,
    vx: 0,
    vy: 0,
    radius: 38,
    isGrounded: true,
    speed: 6.8,
    jumpPower: -11.8,
    hasSuperJump: false,
    spikeCooldown: 0,
  });

  const p2Ref = useRef({
    x: 740,
    y: GROUND_Y,
    vx: 0,
    vy: 0,
    radius: 38,
    isGrounded: true,
    speed: 6.8,
    jumpPower: -11.8,
    hasSuperJump: false,
    spikeCooldown: 0,
  });

  const ballRef = useRef({
    x: 230,
    y: 190,
    vx: 2.5,
    vy: -2.5,
    radius: 17,
    rotation: 0,
    isSpiked: false,
    trail: [] as Array<{ x: number; y: number; opacity: number }>,
  });

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const timerIntervalRef = useRef<number | null>(null);

  // Toggle audio
  const handleToggleAudio = () => {
    soundManager.init();
    const muted = soundManager.toggleMute();
    setIsSoundMuted(muted);
  };

  // Sound init on interaction
  const initAudio = () => {
    soundManager.init();
  };

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      initAudio();
      keysPressed.current[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Reset ball and positions after point or serve
  const resetEntities = useCallback((servingPlayer: 1 | 2) => {
    const p1 = p1Ref.current;
    const p2 = p2Ref.current;
    const ball = ballRef.current;

    p1.x = 200;
    p1.y = GROUND_Y;
    p1.vx = 0;
    p1.vy = 0;
    p1.isGrounded = true;

    p2.x = 720;
    p2.y = GROUND_Y;
    p2.vx = 0;
    p2.vy = 0;
    p2.isGrounded = true;

    if (servingPlayer === 1) {
      ball.x = 240;
      ball.y = 190;
      ball.vx = 3;
      ball.vy = -3.5;
    } else {
      ball.x = 680;
      ball.y = 190;
      ball.vx = -3;
      ball.vy = -3.5;
    }
    ball.isSpiked = false;
    ball.trail = [];
  }, []);

  // Start new match
  const startNewMatch = () => {
    initAudio();
    soundManager.playWhistle();
    setP1Score(0);
    setP2Score(0);
    setP1SuperPower(null);
    setP2SuperPower(null);
    p1Ref.current.hasSuperJump = false;
    p1Ref.current.jumpPower = -11.8;
    p2Ref.current.hasSuperJump = false;
    p2Ref.current.jumpPower = -11.8;

    setMatchWinner(null);
    setIsPausedForQuiz(false);
    setCurrentQuiz(null);
    resetEntities(1);
    setIsGameRunning(true);
  };

  // Trigger Volleyball Quiz when a player scores
  const triggerQuiz = (scoringPlayer: 1 | 2) => {
    setIsPausedForQuiz(true);
    setScoringPlayerNum(scoringPlayer);

    // Pick a random volleyball question
    const randomQuestion = VOLLEYBALL_QUESTIONS[Math.floor(Math.random() * VOLLEYBALL_QUESTIONS.length)];
    setCurrentQuiz(randomQuestion);
    setQuizTimer(15);
    setQuizFeedback(null);

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = window.setInterval(() => {
      setQuizTimer((prev) => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          handleQuizAnswer(-1, randomQuestion);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Process Quiz Answer
  const handleQuizAnswer = (selectedIndex: number, question: VolleyballQuestion) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    const isCorrect = selectedIndex === question.correctIndex;

    if (isCorrect) {
      soundManager.playCorrect();
      soundManager.playPowerUp();

      // Bonus point and Super Jump
      if (scoringPlayerNum === 1) {
        setP1Score((s) => {
          const next = s + 1;
          if (next >= TARGET_SCORE) {
            handleVictory(1);
          }
          return next;
        });
        setP1SuperPower('⚡ Super Salto & Remate');
        p1Ref.current.hasSuperJump = true;
        p1Ref.current.jumpPower = -14.8;
      } else {
        setP2Score((s) => {
          const next = s + 1;
          if (next >= TARGET_SCORE) {
            handleVictory(2);
          }
          return next;
        });
        setP2SuperPower('⚡ Super Salto & Remate');
        p2Ref.current.hasSuperJump = true;
        p2Ref.current.jumpPower = -14.8;
      }

      setQuizFeedback({
        correct: true,
        explanation: question.explanation,
        didYouKnow: question.didYouKnow,
      });
    } else {
      soundManager.playWrong();
      setQuizFeedback({
        correct: false,
        explanation: question.explanation,
        didYouKnow: question.didYouKnow,
      });
    }

    // Resume game after brief feedback preview
    setTimeout(() => {
      setCurrentQuiz(null);
      setQuizFeedback(null);

      // Check if target reached after bonus
      setP1Score((s1) => {
        setP2Score((s2) => {
          if (s1 >= TARGET_SCORE || s2 >= TARGET_SCORE) {
            // Already handled
          } else {
            resetEntities(scoringPlayerNum === 1 ? 2 : 1);
            setIsPausedForQuiz(false);
          }
          return s2;
        });
        return s1;
      });
    }, 2800);
  };

  // Victory celebration
  const handleVictory = (winner: 1 | 2) => {
    soundManager.playVictory();
    setIsGameRunning(false);
    setMatchWinner(winner === 1 ? 'p1' : 'p2');

    if (winner === 1 && currentUser) {
      updateUserStats({
        matchesPlayed: (currentUser.matchesPlayed || 0) + 1,
        matchesWon: (currentUser.matchesWon || 0) + 1,
        totalPoints: (currentUser.totalPoints || 0) + 15,
      });
    } else if (currentUser) {
      updateUserStats({
        matchesPlayed: (currentUser.matchesPlayed || 0) + 1,
        totalPoints: (currentUser.totalPoints || 0) + 5,
      });
    }
  };

  // Main Game Loop using Canvas
  useEffect(() => {
    let animationFrameId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const render = () => {
      if (isGameRunning && !isPausedForQuiz) {
        const p1 = p1Ref.current;
        const p2 = p2Ref.current;
        const ball = ballRef.current;
        const keys = keysPressed.current;

        // Player 1 Controls (A, D, W)
        p1.vx = 0;
        if (keys['KeyA']) p1.vx = -p1.speed;
        if (keys['KeyD']) p1.vx = p1.speed;
        if (keys['KeyW'] && p1.isGrounded) {
          p1.vy = p1.jumpPower;
          p1.isGrounded = false;
          soundManager.playJump();
        }

        // Player 2 Controls or AI Logic
        if (!isVsAI) {
          p2.vx = 0;
          if (keys['ArrowLeft']) p2.vx = -p2.speed;
          if (keys['ArrowRight']) p2.vx = p2.speed;
          if (keys['ArrowUp'] && p2.isGrounded) {
            p2.vy = p2.jumpPower;
            p2.isGrounded = false;
            soundManager.playJump();
          }
        } else {
          // AI Logic
          const targetX = ball.x > NET_X ? ball.x : CANVAS_WIDTH * 0.74;
          const diffX = targetX - p2.x;

          let speedMod = 0.85;
          if (aiDifficulty === 'facil') speedMod = 0.65;
          if (aiDifficulty === 'campeon') speedMod = 1.05;

          if (Math.abs(diffX) > 10) {
            p2.vx = diffX > 0 ? p2.speed * speedMod : -p2.speed * speedMod;
          } else {
            p2.vx = 0;
          }

          // AI Jump & Spike
          if (
            ball.x > NET_X + 25 &&
            ball.x < CANVAS_WIDTH - 25 &&
            ball.y < GROUND_Y - 50 &&
            ball.y > GROUND_Y - 170 &&
            p2.isGrounded
          ) {
            const jumpDistanceTrigger = aiDifficulty === 'campeon' ? 55 : 42;
            if (Math.abs(p2.x - ball.x) < jumpDistanceTrigger) {
              p2.vy = p2.jumpPower;
              p2.isGrounded = false;
              soundManager.playJump();
            }
          }
        }

        // Apply Player 1 Physics
        p1.x += p1.vx;
        p1.y += p1.vy;
        if (!p1.isGrounded) p1.vy += GRAVITY;
        if (p1.y >= GROUND_Y) {
          p1.y = GROUND_Y;
          p1.vy = 0;
          p1.isGrounded = true;
        }
        // P1 Bounds (Court Left to Net)
        if (p1.x - p1.radius < 15) p1.x = p1.radius + 15;
        if (p1.x + p1.radius > NET_X - 4) p1.x = NET_X - 4 - p1.radius;

        // Apply Player 2 Physics
        p2.x += p2.vx;
        p2.y += p2.vy;
        if (!p2.isGrounded) p2.vy += GRAVITY;
        if (p2.y >= GROUND_Y) {
          p2.y = GROUND_Y;
          p2.vy = 0;
          p2.isGrounded = true;
        }
        // P2 Bounds (Net to Court Right)
        if (p2.x - p2.radius < NET_X + NET_WIDTH + 4) p2.x = NET_X + NET_WIDTH + 4 + p2.radius;
        if (p2.x + p2.radius > CANVAS_WIDTH - 15) p2.x = CANVAS_WIDTH - 15 - p2.radius;

        // Ball Trail
        ball.trail.unshift({ x: ball.x, y: ball.y, opacity: 1 });
        if (ball.trail.length > 7) ball.trail.pop();
        ball.trail.forEach((t) => (t.opacity *= 0.7));

        // Ball Physics
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vy += GRAVITY * 0.72; // floaty volleyball feel
        ball.rotation += ball.vx * 0.04;

        // Ball Wall Collisions
        if (ball.x - ball.radius <= 10) {
          ball.x = ball.radius + 10;
          ball.vx = -ball.vx * 0.75;
          soundManager.playNetBounce();
        }
        if (ball.x + ball.radius >= CANVAS_WIDTH - 10) {
          ball.x = CANVAS_WIDTH - 10 - ball.radius;
          ball.vx = -ball.vx * 0.75;
          soundManager.playNetBounce();
        }
        // Ceiling
        if (ball.y - ball.radius <= 10) {
          ball.y = ball.radius + 10;
          ball.vy = -ball.vy * 0.65;
        }

        // Net Collisions
        if (ball.x + ball.radius > NET_X && ball.x - ball.radius < NET_X + NET_WIDTH) {
          if (ball.y + ball.radius > NET_Y) {
            soundManager.playNetBounce();
            if (ball.y < NET_Y + 12) {
              ball.vy = -Math.abs(ball.vy) * 0.75;
              ball.y = NET_Y - ball.radius;
            } else {
              if (ball.x < CANVAS_WIDTH / 2) {
                ball.x = NET_X - ball.radius;
                ball.vx = -Math.abs(ball.vx) * 0.75;
              } else {
                ball.x = NET_X + NET_WIDTH + ball.radius;
                ball.vx = Math.abs(ball.vx) * 0.75;
              }
            }
          }
        }

        // Collision Helper
        const checkPlayerCollision = (player: typeof p1, isLeft: boolean) => {
          const dx = ball.x - player.x;
          const dy = ball.y - player.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = player.radius + ball.radius;

          if (dist < minDist) {
            // Is this a spike? (Player in the air, ball near top, near the net)
            const isAirborne = !player.isGrounded && player.y < GROUND_Y - 40;
            const nearNet = isLeft ? player.x > NET_X - 110 : player.x < NET_X + NET_WIDTH + 110;

            if (isAirborne && nearNet && ball.y < player.y) {
              // Powerful Smash / Remate
              soundManager.playHit('smash');
              ball.isSpiked = true;
              const angle = isLeft ? Math.PI * 0.28 : Math.PI * 0.72; // steep downwards
              const spikePower = player.hasSuperJump ? 17.5 : 15;
              ball.vx = Math.cos(angle) * spikePower;
              ball.vy = Math.sin(angle) * spikePower;
            } else {
              // Regular Volleyball Touch (Bump / Set)
              const touchType = dy < -player.radius * 0.4 ? 'set' : 'bump';
              soundManager.playHit(touchType);
              ball.isSpiked = false;

              let angle = Math.atan2(dy, dx);
              // Ensure ball pops upward
              if (angle > -0.2 && angle < Math.PI + 0.2) {
                angle = isLeft ? -Math.PI * 0.35 : -Math.PI * 0.65;
              }

              const bounceSpeed = player.hasSuperJump ? 14 : 12.2;
              ball.vx = Math.cos(angle) * bounceSpeed;
              ball.vy = Math.sin(angle) * bounceSpeed - 1.8;
            }

            // Push ball outside player
            ball.x = player.x + Math.cos(Math.atan2(dy, dx)) * (minDist + 2);
            ball.y = player.y + Math.sin(Math.atan2(dy, dx)) * (minDist + 2);
          }
        };

        checkPlayerCollision(p1, true);
        checkPlayerCollision(p2, false);

        // Ground Score Check (Point to either team)
        if (ball.y + ball.radius >= GROUND_Y) {
          soundManager.playWhistle();

          if (ball.x < NET_X) {
            // Fell in P1 court -> Point for P2!
            setP2Score((s) => {
              const newScore = s + 1;
              if (newScore >= TARGET_SCORE) {
                handleVictory(2);
              } else {
                triggerQuiz(2);
              }
              return newScore;
            });
          } else {
            // Fell in P2 court -> Point for P1!
            setP1Score((s) => {
              const newScore = s + 1;
              if (newScore >= TARGET_SCORE) {
                handleVictory(1);
              } else {
                triggerQuiz(1);
              }
              return newScore;
            });
          }
        }
      }

      // DRAWING SCENE
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // 1. Gymnasium / Court Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.4, '#131b2e');
      bgGrad.addColorStop(1, '#1e293b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Stadium Arena Lights in background
      for (let i = 80; i < CANVAS_WIDTH; i += 180) {
        ctx.beginPath();
        ctx.arc(i, 40, 30, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251, 191, 36, 0.05)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(i, 40, 12, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
      }

      // 2. Volleyball Court Floor (Polished Taraflex / Parquet)
      const floorGrad = ctx.createLinearGradient(0, GROUND_Y, 0, CANVAS_HEIGHT);
      floorGrad.addColorStop(0, '#f59e0b');
      floorGrad.addColorStop(1, '#d97706');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);

      // Baseline line
      ctx.fillStyle = '#b45309';
      ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 4);

      // Attack Lines (3-meter lines on left and right)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 6]);

      // Left 3m line
      const line3mLeft = NET_X - 160;
      ctx.beginPath();
      ctx.moveTo(line3mLeft, GROUND_Y);
      ctx.lineTo(line3mLeft, CANVAS_HEIGHT);
      ctx.stroke();

      // Right 3m line
      const line3mRight = NET_X + NET_WIDTH + 160;
      ctx.beginPath();
      ctx.moveTo(line3mRight, GROUND_Y);
      ctx.lineTo(line3mRight, CANVAS_HEIGHT);
      ctx.stroke();

      ctx.setLineDash([]);

      // Floor text labels for 6th grade learning
      ctx.font = '10px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'center';
      ctx.fillText('LÍNEA DE ATAQUE 3M', line3mLeft, GROUND_Y + 28);
      ctx.fillText('LÍNEA DE ATAQUE 3M', line3mRight, GROUND_Y + 28);

      // Outer court boundary border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 15, CANVAS_WIDTH - 20, GROUND_Y - 15);

      // 3. Volleyball Net & Posts
      // Net Pole
      ctx.fillStyle = '#475569';
      ctx.fillRect(NET_X - 2, NET_Y, NET_WIDTH + 4, NET_HEIGHT);

      // White Net Mesh
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(NET_X, NET_Y, NET_WIDTH, NET_HEIGHT);

      // Net grid mesh lines
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      for (let y = NET_Y + 8; y < GROUND_Y; y += 12) {
        ctx.beginPath();
        ctx.moveTo(NET_X, y);
        ctx.lineTo(NET_X + NET_WIDTH, y);
        ctx.stroke();
      }

      // Top White Band
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(NET_X - 3, NET_Y, NET_WIDTH + 6, 10);

      // Official Antennas (Varillas delimitadoras rojiblancas)
      const drawAntenna = (x: number) => {
        const h = 45;
        for (let seg = 0; seg < h; seg += 9) {
          ctx.fillStyle = (seg / 9) % 2 === 0 ? '#ef4444' : '#ffffff';
          ctx.fillRect(x, NET_Y - seg - 9, 3, 9);
        }
      };
      drawAntenna(NET_X);
      drawAntenna(NET_X + NET_WIDTH - 3);

      // 4. Players
      const drawPlayer = (
        p: typeof p1Ref.current,
        teamColor: string,
        accentColor: string,
        label: string,
        isLeft: boolean
      ) => {
        ctx.save();

        // Shadow
        ctx.beginPath();
        ctx.ellipse(p.x, GROUND_Y + 3, p.radius * 0.88, 7, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
        ctx.fill();

        // Super Jump Aura Glow
        if (p.hasSuperJump) {
          ctx.beginPath();
          ctx.arc(p.x, p.y - 12, p.radius + 8, Math.PI, 0, false);
          ctx.strokeStyle = 'rgba(250, 204, 21, 0.8)';
          ctx.lineWidth = 4;
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Body Dome (Volleyball Slime/Player)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, Math.PI, 0, false);
        ctx.closePath();

        const pGrad = ctx.createLinearGradient(p.x, p.y - p.radius, p.x, p.y);
        pGrad.addColorStop(0, accentColor);
        pGrad.addColorStop(1, teamColor);
        ctx.fillStyle = pGrad;
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        // Player Headband / Jersey Number
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 12px "Cabinet Grotesk", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, p.x, p.y - 8);

        // Eye looking toward the ball
        const eyeOffset = isLeft ? 10 : -10;
        const eyeX = p.x + eyeOffset;
        const eyeY = p.y - p.radius * 0.52;

        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Pupil aiming at ball
        const angleToBall = Math.atan2(ballRef.current.y - eyeY, ballRef.current.x - eyeX);
        const pupilX = eyeX + Math.cos(angleToBall) * 3;
        const pupilY = eyeY + Math.sin(angleToBall) * 3;

        ctx.beginPath();
        ctx.arc(pupilX, pupilY, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();

        // Little glint
        ctx.beginPath();
        ctx.arc(pupilX - 1.5, pupilY - 1.5, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.restore();
      };

      // Draw P1 (Cyan/Blue - Student)
      drawPlayer(p1Ref.current, '#0284c7', '#38bdf8', currentUser?.name?.slice(0, 4) || 'P1', true);

      // Draw P2 (Rose/Purple - Rival / AI)
      drawPlayer(p2Ref.current, '#e11d48', '#fb7185', isVsAI ? 'IA' : 'P2', false);

      // 5. Ball Trail
      const ball = ballRef.current;
      ball.trail.forEach((t) => {
        ctx.beginPath();
        ctx.arc(t.x, t.y, ball.radius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = ball.isSpiked
          ? `rgba(239, 68, 68, ${t.opacity * 0.4})`
          : `rgba(245, 158, 11, ${t.opacity * 0.35})`;
        ctx.fill();
      });

      // 6. Draw Official Mikasa Style Volleyball
      ctx.save();
      ctx.translate(ball.x, ball.y);
      ctx.rotate(ball.rotation);

      // Ball base
      ctx.beginPath();
      ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.isSpiked ? '#f97316' : '#fbbf24';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#1e3a8a';
      ctx.stroke();

      // Volleyball blue curved waves
      ctx.beginPath();
      ctx.arc(0, 0, ball.radius, -Math.PI * 0.35, Math.PI * 0.35);
      ctx.fillStyle = '#1d4ed8';
      ctx.fill();

      // Seam Lines
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(0, 0, ball.radius, -Math.PI * 0.4, Math.PI * 0.4);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, ball.radius, Math.PI * 0.6, Math.PI * 1.4);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(-ball.radius, 0);
      ctx.lineTo(ball.radius, 0);
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isGameRunning, isPausedForQuiz, isVsAI, aiDifficulty, resetEntities]);

  // Touch handlers for mobile / tablet students
  const handleTouchStart = (key: string) => {
    initAudio();
    keysPressed.current[key] = true;
  };
  const handleTouchEnd = (key: string) => {
    keysPressed.current[key] = false;
  };

  return (
    <div id="volleyballGameContainer" className="w-full max-w-5xl mx-auto flex flex-col items-center gap-4">
      {/* Top Match Control Header */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3.5 sm:p-4 rounded-2xl shadow-xl backdrop-blur-md">
        {/* Game Mode Selector */}
        <div className="flex items-center gap-2">
          <button
            id="toggleAiModeBtn"
            onClick={() => {
              setIsVsAI(!isVsAI);
              startNewMatch();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
              isVsAI
                ? 'bg-blue-600/30 border-blue-500 text-blue-300'
                : 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
            }`}
          >
            {isVsAI ? <Bot className="w-4 h-4" /> : <Users className="w-4 h-4" />}
            <span>{isVsAI ? '1P vs Entrenador IA' : '2 Jugadores (1 vs 1)'}</span>
          </button>

          {isVsAI && (
            <select
              id="aiDifficultySelect"
              value={aiDifficulty}
              onChange={(e) => setAiDifficulty(e.target.value as AIDifficulty)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-2.5 py-1.5 font-medium focus:border-amber-400 focus:outline-none"
            >
              <option value="facil">Nivel: Principiante</option>
              <option value="normal">Nivel: 6to Grado Normal</option>
              <option value="campeon">Nivel: Campeón Intercolegial</option>
            </select>
          )}
        </div>

        {/* Match Target & Audio Controls */}
        <div className="flex items-center gap-2">
          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Objetivo: 10 Puntos</span>
          </span>

          <button
            id="soundMuteBtn"
            onClick={handleToggleAudio}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title={isSoundMuted ? 'Activar Sonido' : 'Silenciar'}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          <button
            id="restartMatchBtn"
            onClick={startNewMatch}
            className="px-3 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Scoreboard Bar with 10-Point Progress */}
      <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {/* Player 1 Team */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 font-black text-xl shadow-inner">
              P1
            </div>
            <div>
              <div className="text-sm font-bold text-cyan-300 flex items-center gap-1.5">
                <span>{currentUser?.name || 'Tú (Estudiante 6to)'}</span>
                {p1SuperPower && (
                  <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-black animate-pulse">
                    {p1SuperPower}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">Teclas: [ A ] [ D ] [ W ] para rematar</p>
            </div>
          </div>

          {/* Central Match Score */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 bg-slate-950 px-6 py-2 rounded-2xl border border-slate-800 shadow-inner">
              <span className={`text-4xl font-black ${p1Score >= 9 ? 'text-amber-400 animate-pulse' : 'text-cyan-400'}`}>
                {p1Score}
              </span>
              <span className="text-slate-500 font-bold text-2xl">:</span>
              <span className={`text-4xl font-black ${p2Score >= 9 ? 'text-amber-400 animate-pulse' : 'text-rose-400'}`}>
                {p2Score}
              </span>
            </div>
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider mt-1">
              {p1Score >= 9 || p2Score >= 9 ? '¡PUNTO PARA PARTIDO (MATCH POINT)!' : 'SET EN DISPUTA'}
            </span>
          </div>

          {/* Player 2 Team */}
          <div className="flex items-center gap-3 text-right">
            <div>
              <div className="text-sm font-bold text-rose-300 flex items-center justify-end gap-1.5">
                {p2SuperPower && (
                  <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-black animate-pulse">
                    {p2SuperPower}
                  </span>
                )}
                <span>{isVsAI ? 'Entrenador IA' : 'Jugador 2'}</span>
              </div>
              <p className="text-[11px] text-slate-400">{isVsAI ? 'Modo Inteligente' : 'Teclas: [ ◄ ] [ ► ] [ ▲ ]'}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-rose-300 font-black text-xl shadow-inner">
              {isVsAI ? 'IA' : 'P2'}
            </div>
          </div>
        </div>

        {/* 10-Point Score Progress Bars */}
        <div className="grid grid-cols-2 gap-4 mt-1 pt-2 border-t border-slate-800/80">
          <div className="w-full">
            <div className="flex justify-between text-[11px] font-semibold text-cyan-400 mb-1">
              <span>Progreso a 10 pts</span>
              <span>{p1Score} / 10</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${Math.min(100, (p1Score / TARGET_SCORE) * 100)}%` }}
              />
            </div>
          </div>

          <div className="w-full">
            <div className="flex justify-between text-[11px] font-semibold text-rose-400 mb-1">
              <span>Progreso a 10 pts</span>
              <span>{p2Score} / 10</span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300"
                style={{ width: `${Math.min(100, (p2Score / TARGET_SCORE) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas Court Frame */}
      <div className="w-full relative aspect-[16/9] max-h-[520px] bg-slate-950 rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Start / Overlay Screen */}
        {!isGameRunning && !matchWinner && (
          <div
            id="startMatchOverlay"
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20"
          >
            <div className="max-w-md bg-slate-900 border border-slate-700/90 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 animate-scale-in">
              <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 text-3xl shadow-lg">
                🏐
              </div>
              <h3 className="text-2xl font-black text-white font-display">
                Partido de Voleibol - 6to Grado
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                ¡Gana el primero en llegar a <strong>10 puntos</strong>! Al anotar un punto, responde una trivia oficial de voleibol para desbloquear <strong>Puntos Extras</strong> o el <strong>Super Salto</strong>.
              </p>

              <div className="w-full bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-left text-xs space-y-1.5">
                <div className="text-amber-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Consejos Técnicos de Educación Física:</span>
                </div>
                <p className="text-slate-300">• Salta cerca de la red para rematar con fuerza hacia abajo.</p>
                <p className="text-slate-300">• Amortigua los saques del rival colocándote bajo el balón.</p>
              </div>

              <button
                id="startPlayBtn"
                onClick={startNewMatch}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-base shadow-xl transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Flame className="w-5 h-5" />
                <span>¡SACAR Y EMPEZAR PARTIDO (A 10 PTS)!</span>
              </button>
            </div>
          </div>
        )}

        {/* Victory Screen */}
        {matchWinner && (
          <div
            id="victoryMatchOverlay"
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30"
          >
            <div className="max-w-md bg-slate-900 border-2 border-amber-400/80 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4 animate-scale-in">
              <div className="w-20 h-20 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 text-4xl shadow-lg">
                🏆
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
                  ¡FINAL DEL PARTIDO!
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
                  {matchWinner === 'p1' ? `¡${currentUser?.name || 'Estudiante P1'} es Campeón!` : '¡Victoria para el Rival!'}
                </h3>
              </div>

              <p className="text-sm text-slate-300">
                Resultado final: <strong className="text-amber-400">{p1Score}</strong> - <strong className="text-rose-400">{p2Score}</strong>.
              </p>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 rounded-2xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>¡Excelente desempeño combinando destreza física y reglas de voleibol!</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full mt-2">
                <button
                  id="playAgainBtn"
                  onClick={startNewMatch}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow transition"
                >
                  Jugar Revancha a 10 Pts
                </button>

                {onGoToCourse && (
                  <button
                    id="goToCourseFromGameBtn"
                    onClick={onGoToCourse}
                    className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow transition flex items-center justify-center gap-1.5"
                  >
                    <span>Ir al Curso Oficial</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Volleyball Trivia Modal (Triggered on point score) */}
        {isPausedForQuiz && currentQuiz && (
          <div
            id="volleyballQuizOverlay"
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-4 z-40"
          >
            <div className="w-full max-w-lg bg-slate-900 border-2 border-amber-400/80 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 animate-scale-in">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-800 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>¡Punto para {scoringPlayerNum === 1 ? (currentUser?.name || 'Jugador 1') : (isVsAI ? 'Entrenador IA' : 'Jugador 2')}!</span>
                </span>

                <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-full border border-slate-800 text-amber-400 font-extrabold text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{quizTimer}s</span>
                </div>
              </div>

              {/* Category & Question */}
              <div className="text-center py-1">
                <span className="text-[11px] font-black uppercase tracking-wider bg-amber-400/10 text-amber-300 px-2.5 py-1 rounded-md mb-2 inline-block">
                  {currentQuiz.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {currentQuiz.question}
                </h4>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQuiz.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={quizFeedback !== null}
                    onClick={() => handleQuizAnswer(idx, currentQuiz)}
                    className={`text-left p-3 rounded-2xl text-xs sm:text-sm font-medium border transition flex items-center justify-between ${
                      quizFeedback !== null
                        ? idx === currentQuiz.correctIndex
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950/50 border-slate-800 text-slate-500'
                        : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 hover:border-amber-400 text-slate-200'
                    }`}
                  >
                    <span>{opt}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </div>

              {/* Answer Feedback Banner */}
              {quizFeedback && (
                <div
                  className={`p-3 rounded-2xl text-xs transition-all ${
                    quizFeedback.correct
                      ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-200'
                      : 'bg-rose-500/20 border border-rose-500 text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-sm mb-1">
                    {quizFeedback.correct ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">¡Respuesta Correcta! (+1 Punto y Super Poder ⚡)</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-400" />
                        <span className="text-rose-300">Respuesta Incorrecta o Tiempo Agotado</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed">{quizFeedback.explanation}</p>
                  {quizFeedback.didYouKnow && (
                    <p className="mt-1.5 text-[11px] text-amber-300 font-semibold flex items-center gap-1">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>Dato curioso: {quizFeedback.didYouKnow}</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Touch On-Screen Controls for Tablets and Mobile */}
      <div className="w-full grid grid-cols-2 gap-3 sm:hidden">
        {/* P1 Controls */}
        <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-cyan-500/30 flex flex-col items-center">
          <span className="text-[10px] font-bold text-cyan-300 mb-1.5">P1 - Controles Táctiles</span>
          <div className="flex gap-2">
            <button
              onTouchStart={() => handleTouchStart('KeyA')}
              onTouchEnd={() => handleTouchEnd('KeyA')}
              onMouseDown={() => handleTouchStart('KeyA')}
              onMouseUp={() => handleTouchEnd('KeyA')}
              className="w-12 h-12 rounded-xl bg-cyan-600/80 active:bg-cyan-500 text-white font-bold text-lg flex items-center justify-center shadow"
            >
              ◄
            </button>
            <button
              onTouchStart={() => handleTouchStart('KeyW')}
              onTouchEnd={() => handleTouchEnd('KeyW')}
              onMouseDown={() => handleTouchStart('KeyW')}
              onMouseUp={() => handleTouchEnd('KeyW')}
              className="w-12 h-12 rounded-xl bg-amber-400 active:bg-amber-300 text-slate-950 font-black text-lg flex items-center justify-center shadow"
            >
              ▲
            </button>
            <button
              onTouchStart={() => handleTouchStart('KeyD')}
              onTouchEnd={() => handleTouchEnd('KeyD')}
              onMouseDown={() => handleTouchStart('KeyD')}
              onMouseUp={() => handleTouchEnd('KeyD')}
              className="w-12 h-12 rounded-xl bg-cyan-600/80 active:bg-cyan-500 text-white font-bold text-lg flex items-center justify-center shadow"
            >
              ►
            </button>
          </div>
        </div>

        {/* P2 Controls */}
        <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-rose-500/30 flex flex-col items-center">
          <span className="text-[10px] font-bold text-rose-300 mb-1.5">
            {isVsAI ? 'Entrenador IA (Automático)' : 'P2 - Controles Táctiles'}
          </span>
          <div className="flex gap-2">
            <button
              disabled={isVsAI}
              onTouchStart={() => handleTouchStart('ArrowLeft')}
              onTouchEnd={() => handleTouchEnd('ArrowLeft')}
              onMouseDown={() => handleTouchStart('ArrowLeft')}
              onMouseUp={() => handleTouchEnd('ArrowLeft')}
              className="w-12 h-12 rounded-xl bg-rose-600/80 active:bg-rose-500 disabled:opacity-40 text-white font-bold text-lg flex items-center justify-center shadow"
            >
              ◄
            </button>
            <button
              disabled={isVsAI}
              onTouchStart={() => handleTouchStart('ArrowUp')}
              onTouchEnd={() => handleTouchEnd('ArrowUp')}
              onMouseDown={() => handleTouchStart('ArrowUp')}
              onMouseUp={() => handleTouchEnd('ArrowUp')}
              className="w-12 h-12 rounded-xl bg-amber-400 active:bg-amber-300 disabled:opacity-40 text-slate-950 font-black text-lg flex items-center justify-center shadow"
            >
              ▲
            </button>
            <button
              disabled={isVsAI}
              onTouchStart={() => handleTouchStart('ArrowRight')}
              onTouchEnd={() => handleTouchEnd('ArrowRight')}
              onMouseDown={() => handleTouchStart('ArrowRight')}
              onMouseUp={() => handleTouchEnd('ArrowRight')}
              className="w-12 h-12 rounded-xl bg-rose-600/80 active:bg-rose-500 disabled:opacity-40 text-white font-bold text-lg flex items-center justify-center shadow"
            >
              ►
            </button>
          </div>
        </div>
      </div>

      {/* Keyboard Legend & Pedagogical Rules */}
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-3 sm:p-4 text-xs text-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Reglamento Oficial:</strong> Se juega a <strong>10 puntos</strong>. El balón dentro de las líneas es válido. No toques la red.
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>P1: [A][D] mover, [W] saltar</span>
          <span className="text-slate-600">|</span>
          <span>P2: [◄][►] mover, [▲] saltar</span>
        </div>
      </div>
    </div>
  );
};
