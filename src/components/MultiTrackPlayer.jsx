import {
    useEffect,
    useRef
} from "react"

import WaveSurfer
from "wavesurfer.js"

export default function MultiTrackPlayer({
    stems
}) {

    const waveRefs =
        useRef([])

    const containerRefs =
        useRef([])

    useEffect(() => {

        if (!stems.length) {
            return
        }

        waveRefs.current = []

        stems.forEach(
            (stem, index) => {

                const ws =
                    WaveSurfer.create({

                        container:
                            containerRefs.current[index],

                        waveColor:
                            "#52525b",

                        progressColor:
                            "#ffffff",

                        height: 70,

                        barWidth: 2,

                        responsive: true
                    })

                ws.load(stem.url)

                waveRefs.current.push(ws)
            }
        )

        return () => {

            waveRefs.current.forEach(
                (ws) => ws.destroy()
            )
        }

    }, [stems])

    function playAll() {

        waveRefs.current.forEach(
            (ws) => ws.play()
        )
    }

    function pauseAll() {

        waveRefs.current.forEach(
            (ws) => ws.pause()
        )
    }

    function stopAll() {

        waveRefs.current.forEach(
            (ws) => {

                ws.stop()
            }
        )
    }

    return (

        <div className="
            w-full
            flex
            flex-col
            gap-6
        ">

            <div className="
                flex
                gap-4
            ">

                <button
                    onClick={playAll}
                    className="
                        bg-white
                        text-black
                        px-4
                        py-2
                        rounded-xl
                    "
                >
                    Play
                </button>

                <button
                    onClick={pauseAll}
                    className="
                        bg-zinc-800
                        px-4
                        py-2
                        rounded-xl
                    "
                >
                    Pause
                </button>

                <button
                    onClick={stopAll}
                    className="
                        bg-red-500
                        px-4
                        py-2
                        rounded-xl
                    "
                >
                    Stop
                </button>

            </div>

            {
                stems.map(
                    (stem, index) => (

                    <div
                        key={stem.name}
                        className="
                            bg-zinc-900
                            p-4
                            rounded-2xl
                        "
                    >

                        <h3 className="
                            mb-3
                            font-semibold
                        ">
                            {stem.name}
                        </h3>

                        <div
                            ref={(el) =>
                                containerRefs.current[index] = el
                            }
                        ></div>

                    </div>
                ))
            }

        </div>
    )
}