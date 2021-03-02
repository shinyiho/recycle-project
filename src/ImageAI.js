import React, { useEffect, useRef, useState } from "react";
import ml5 from "ml5";
let classifier;
const ImageAI = ({ setsearchterm }) => {
  // const URL = "https://teachablemachine.withgoogle.com/models/NvjC7RVLO/";
  // const modelURL = URL + "model.json";
  // const metadataURL = URL + "metadata.json";
  const videoRef = useRef(null);
  const [start, setStart] = useState(false);
  const [result, setResult] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    classifier = ml5.imageClassifier("./model/model.json", () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setLoaded(true);
      });
    });
  }, []);

  useEffect(() => {
    let classifyInterval;
    if (classifier && start) {
      classifyInterval = setInterval(() => {
        console.log(classifier);

        classifier.classify(videoRef.current, (error, results) => {
          if (error) {
            console.error(error);
            return;
          }
          let found = results.filter((item) => item.confidence > 0.7);
          setResult(found[0].label);
          setsearchterm(found[0].label);
          console.log(result);
        });
      }, 500);
    }
    return () => {
      clearInterval(classifyInterval);
    };
  }, [start]);

  const toggle = () => {
    setStart(!start);
    setResult([]);
  };

  return (
    <div>
      <video ref={videoRef} style={{ transform: "scale(-1, 1)" }} width="200" height="150" />
      {/* <button onClick={beginclassify}>start</button> */}
      {loaded && <button onClick={() => toggle()}>{start ? "Stop" : "Start"}</button>}
      <h3>{result}</h3>
    </div>
  );
};

export default ImageAI;
