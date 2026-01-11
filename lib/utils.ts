import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function playChime() {
  if (typeof window === 'undefined') return;

  // Create a gentle chime using Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

  // Create oscillator for a gentle tone
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Gentle bell-like tone
  oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
  oscillator.type = 'sine';

  // Envelope for gentle fade in and out
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 1);

  // Second tone (harmony)
  setTimeout(() => {
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();

    osc2.connect(gain2);
    gain2.connect(audioContext.destination);

    osc2.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
    osc2.type = 'sine';

    gain2.gain.setValueAtTime(0, audioContext.currentTime);
    gain2.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.1);
    gain2.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.8);

    osc2.start(audioContext.currentTime);
    osc2.stop(audioContext.currentTime + 0.8);
  }, 200);
}

// Encouraging messages for task completion
export const encouragingMessages = [
  "Nice work! One down.",
  "You did it!",
  "Progress feels good.",
  "Keep that momentum going.",
  "Well done!",
  "Another one complete.",
  "You're on a roll!",
  "That's the way!",
  "Crushed it.",
  "Way to go!",
];

export function getRandomEncouragement(): string {
  return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
}

// Time perception calibration messages
export const calibrationMessages = {
  shorter: "Time flew by! You were in the zone.",
  accurate: "Nice time awareness!",
  longer: "That's okay - some tasks need more focus.",
};

export function getCalibrationMessage(
  actualMinutes: number,
  perceivedMinutes: number
): string {
  const ratio = perceivedMinutes / actualMinutes;
  if (ratio < 0.7) return calibrationMessages.shorter;
  if (ratio > 1.3) return calibrationMessages.longer;
  return calibrationMessages.accurate;
}
