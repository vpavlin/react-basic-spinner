import React, { useEffect, useState } from "react"
import "./spinner.scss"

interface Props {
    isPaused:boolean
    timeout:string
    iterationCount?:number
    color?:string | undefined
    
    handleIteration: () => Promise<void>
}

const Spinner = (props:Props) => {
    const [ isPaused, setPaused ] = useState(props.isPaused)
    const [ blocked, setBlocked ] = useState(false)

    const handleFinish = () => {
    }

    const handleIteration = async () =>{
        setBlocked(true)
        try {
            await props.handleIteration()
        } finally {
            setBlocked(false)
        }
    }

    const handleClick = () => {
        setPaused(!isPaused)
    }

    if (props.color) {
        document.documentElement.style.setProperty('--base-fill-color', props.color)
    }

    useEffect(() => {
        setPaused(props.isPaused)
    }, [props.isPaused])


    return (
        <span onClick={handleClick}>
            <svg className={`spinner`} viewBox="0 0 50 50">
                <circle 
                    className={`path`} 
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                    style={{
                        animationPlayState: blocked ? "paused" : isPaused ? "paused" : "running",
                        animationDuration: props.timeout,
                        animationIterationCount: props.iterationCount? props.iterationCount.toString() : "infinite"
                    }}
                    onAnimationIterationCapture={handleIteration}
                    onAnimationEnd={handleFinish}

                />
                { isPaused ?
                    <>
                        <polygon points="20 15 35 25 20 35" className="fill" />
                    </>
                    :
                    <>
                        <rect x="18" y="15" width="5" height="20" className="fill" />
                        <rect x="27" y="15" width="5" height="20" className="fill" />
                    </>
                }



            </svg>
    </span>
  )

}

export default Spinner
