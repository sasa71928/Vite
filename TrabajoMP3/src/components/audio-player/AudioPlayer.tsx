import { useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface AudioPlayerProps {
  src: string; // url del audio
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // ref al audio
  const [isPlaying, setIsPlaying] = useState(false); // estado play/pause
  const [currentTime, setCurrentTime] = useState(0); // tiempo actual
  const [duration, setDuration] = useState(0); // duracion total
  const [volume, setVolume] = useState(1); // volumen

  // formato mm:ss
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // play / pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // actualizar tiempo
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // cambiar volumen
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  // obtener duracion
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // mover barra
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setCurrentTime(value);
  };

  // reset al terminar
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-2xl flex flex-col gap-4">
      {/* audio oculto */}
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        hidden
      />

      {/* controles principales */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            step="0.1"
            onChange={handleSeek}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{duration ? formatTime(duration) : "0:00"}</span>
          </div>
        </div>
      </div>

      {/* volumen */}
      <div className="flex items-center gap-3">
        <Volume2 className="text-gray-700" size={20} />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 accent-blue-500"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
