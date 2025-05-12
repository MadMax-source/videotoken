"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
    src: string
    title?: string
    poster?: string
    autoPlay?: boolean
    height?: string
    className?: string;
}

export default function VideoPlayer({ src, title, poster, autoPlay = false, height = "600px", className = "relative w-full md:max-w-full lg:max-w-lg overflow-hidden rounded-lg bg-black shadow-xl border border-gray-300" }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [volume, setVolume] = useState(1)
    const [showVolumeSlider, setShowVolumeSlider] = useState(false)
    const [isToggling, setIsToggling] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const setVideoData = () => {
            if (video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
                setDuration(video.duration)
            }
        }

        const updateTime = () => {
            setCurrentTime(video.currentTime)
        }

        const handlePlay = () => setIsPlaying(true)
        const handlePause = () => setIsPlaying(false)
        const handleLoadedData = () => setIsLoading(false)

        // Add multiple event listeners to ensure duration is captured
        video.addEventListener("loadedmetadata", setVideoData)
        video.addEventListener("durationchange", setVideoData)
        video.addEventListener("loadeddata", handleLoadedData)
        video.addEventListener("canplay", setVideoData)
        video.addEventListener("timeupdate", updateTime)
        video.addEventListener("play", handlePlay)
        video.addEventListener("pause", handlePause)

        // Initial attempt to get duration if already available
        if (video.readyState >= 1 && video.duration) {
            setVideoData()
        }

        return () => {
            video.removeEventListener("loadedmetadata", setVideoData)
            video.removeEventListener("durationchange", setVideoData)
            video.removeEventListener("loadeddata", handleLoadedData)
            video.removeEventListener("canplay", setVideoData)
            video.removeEventListener("timeupdate", updateTime)
            video.removeEventListener("play", handlePlay)
            video.removeEventListener("pause", handlePause)
        }
    }, [])

    const togglePlay = async () => {
        const video = videoRef.current
        if (!video || isToggling) return

        setIsToggling(true)

        try {
            if (isPlaying) {
                video.pause()
            } else {
                setIsLoading(true)
                // play() returns a promise that can be rejected
                await video.play().catch((error) => {
                    // If the error is an AbortError, it's usually because play was interrupted
                    // by a pause call, which is not a critical error, so we can just log it
                    if (error.name !== "AbortError") {
                        console.error("Error playing video:", error)
                    }
                })
            }
        } catch (error) {
            console.error("Error toggling play state:", error)
        } finally {
            setIsLoading(false)
            // Reset the toggling state after a short delay to prevent rapid clicks
            setTimeout(() => setIsToggling(false), 300)
        }
    }

    const toggleMute = () => {
        const video = videoRef.current
        if (!video) return

        video.muted = !isMuted
        setIsMuted(!isMuted)
    }

    const handleVolumeChange = (value: number[]) => {
        const video = videoRef.current
        if (!video) return

        const newVolume = value[0]
        video.volume = newVolume
        setVolume(newVolume)
        if (newVolume === 0) {
            video.muted = true
            setIsMuted(true)
        } else if (isMuted) {
            video.muted = false
            setIsMuted(false)
        }
    }

    const handleSeek = (value: number[]) => {
        const video = videoRef.current
        if (!video) return

        video.currentTime = value[0]
        setCurrentTime(value[0])
    }

    const handleFullscreen = () => {
        const video = videoRef.current
        if (!video) return

        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            video.requestFullscreen()
        }
    }

    const skipBackward = () => {
        const video = videoRef.current
        if (!video) return

        video.currentTime = Math.max(0, video.currentTime - 10)
    }

    const skipForward = () => {
        const video = videoRef.current
        if (!video) return

        video.currentTime = Math.min(duration, video.currentTime + 10)
    }

    const formatTime = (time: number) => {
        if (isNaN(time) || !isFinite(time)) return "0:00"

        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    return (
        <div
            className={className}
            style={{ height: height || "auto", maxHeight: "80vh" }}
        >
            {title && (
                <div className="absolute inset-x-0 top-0 z-10 p-4 text-lg urbanist font-medium text-white bg-gradient-to-b from-black/70 to-transparent">
                    {title}
                </div>
            )}

            <video
                ref={videoRef}
                className="w-full h-full object-contain"
                poster={poster}
                autoPlay={autoPlay}
                playsInline
                preload="metadata"
                onLoadStart={() => setIsLoading(true)}
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="w-12 h-12 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
                </div>
            )}

            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent">
                <div className="px-4 pt-8 pb-2">
                    <Slider
                        value={[currentTime]}
                        min={0}
                        max={duration || 100}
                        step={0.01}
                        onValueChange={handleSeek}
                        className="w-full [&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&>span:first-child_span]:bg-primary"
                    />
                </div>

                <div className="flex items-center justify-between px-4 pb-4">
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={skipBackward}>
                            <SkipBack className="w-5 h-5" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white hover:bg-white/10"
                            onClick={togglePlay}
                            disabled={isToggling}
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin" />
                            ) : isPlaying ? (
                                <Pause className="w-6 h-6 fill-white" />
                            ) : (
                                <Play className="w-6 h-6 fill-white" />
                            )}
                        </Button>

                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={skipForward}>
                            <SkipForward className="w-5 h-5" />
                        </Button>

                        <div className="relative flex items-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white hover:bg-white/10"
                                onClick={toggleMute}
                                onMouseEnter={() => setShowVolumeSlider(true)}
                                onMouseLeave={() => setShowVolumeSlider(false)}
                            >
                                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </Button>

                            {showVolumeSlider && (
                                <div
                                    className="absolute bottom-full left-0 mb-2 p-2 bg-black/80 rounded-md w-24"
                                    onMouseEnter={() => setShowVolumeSlider(true)}
                                    onMouseLeave={() => setShowVolumeSlider(false)}
                                >
                                    <Slider
                                        value={[isMuted ? 0 : volume]}
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        onValueChange={handleVolumeChange}
                                        className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-primary [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&>span:first-child_span]:bg-primary"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="text-sm text-white ml-2">
                            {formatTime(currentTime)} / {formatTime(duration || 0)}
                        </div>
                    </div>

                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={handleFullscreen}>
                        <Maximize className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}



