import {
    useEffect,
    useRef,useState
} from "react"

import WaveSurfer
from "wavesurfer.js"

export default function WaveformPlayer({

    audioUrl,
    waveRefs,
    index

}) {
    const [muted, setMuted] =
    useState(false)
    const [solo, setSolo] =
    useState(false)

    function toggleMute() {

    if (!waveSurfer.current) {
        return
    }

    if (muted) {

        waveSurfer.current.setVolume(1)

    } else {

        waveSurfer.current.setVolume(0)
    }

    setMuted(!muted)
}
function toggleSolo() {

    if (!waveRefs.current) {
        return
    }

    if (!solo) {

        // Mute others
        waveRefs.current.forEach(
            (ws, i) => {

                if (!ws) return

                if (i === index) {

                    ws.setVolume(1)

                } else {

                    ws.setVolume(0)
                }
            }
        )

    } else {

        // Restore all
        waveRefs.current.forEach(
            (ws) => {

                if (!ws) return

                ws.setVolume(1)
            }
        )
    }

    setSolo(!solo)
}

    const waveformRef =
        useRef(null)

    const waveSurfer =
        useRef(null)

    useEffect(() => {

        if (!waveformRef.current) {
            return
        }
if (waveSurfer.current) {

    try {

        waveSurfer.current.destroy()

    } catch {}
}

        // Create wavesurfer
        waveSurfer.current =
            WaveSurfer.create({

                container:
                    waveformRef.current,

                waveColor:
                    "#52525b",

                progressColor:
                    "#ffffff",

                cursorColor:
                    "#ffffff",

                barWidth: 2,

                barGap: 1,

                barRadius: 4,

                height: 90,

                responsive: true
            })
            waveRefs.current[index] =
    waveSurfer.current

        // Load audio
        waveSurfer.current.load(
            audioUrl
        )
return () => {

    if (waveSurfer.current) {

        try {

            waveSurfer.current.destroy()

            waveRefs.current[index] =
                null

        } catch (error) {

            console.log(
                "WaveSurfer cleanup"
            )
        }
    }
}
    }, [audioUrl,waveRefs,index])

    function togglePlay() {

        if (waveSurfer.current) {

    waveSurfer.current.playPause()
}
    }

    return (

        <div className="
            w-full
        ">

            <div
                ref={waveformRef}
            ></div>

            <div className="
    flex
    gap-4
    mt-5
    justify-center
">

    <button
        onClick={togglePlay}
        className="
            bg-white
            text-black
            px-5
            py-2.5
            rounded-2xl
            text-sm
            font-bold
            shadow-lg
            hover:scale-105
            transition-all
            duration-300
        "
    >
        ▶ Play
    </button>

    <button
    onClick={toggleMute}

    style={
        muted
        ? {
            boxShadow:
            "0 0 25px rgba(239,68,68,0.9)"
          }
        : {}
    }

    className={`
        px-5
        py-2.5
        rounded-2xl
        text-sm
        font-bold
        transition-all
        duration-300
        border-2

        ${
            muted
            ? `
                bg-red-500
                border-red-300
                text-white
                scale-110
              `
            : `
                bg-zinc-800
                border-zinc-700
                text-zinc-300
                hover:bg-zinc-700
              `
        }
    `}
>
    🔇 {muted ? "Muted" : "Mute"}
</button>

    <button
    onClick={toggleSolo}

    style={
        solo
        ? {
            boxShadow:
            "0 0 25px rgba(34,197,94,0.9)"
          }
        : {}
    }

    className={`
        px-5
        py-2.5
        rounded-2xl
        text-sm
        font-bold
        transition-all
        duration-300
        border-2

        ${
            solo
            ? `
                bg-green-500
                border-green-300
                text-white
                scale-110
              `
            : `
                bg-zinc-800
                border-zinc-700
                text-zinc-300
                hover:bg-zinc-700
              `
        }
    `}
>
    🎧 {solo ? "Soloed" : "Solo"}
</button>

</div>
        </div>
    )
}