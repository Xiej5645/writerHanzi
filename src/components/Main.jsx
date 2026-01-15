import { useState, useEffect } from 'react'
import { charDataS } from '../assets/extraC.js';
import Form from './Form.jsx';
import FeatureBox from './FeatureBox.jsx';
export default function Main() {


    //writer and form 
    const [userC, setUserC] = useState('凤');
    const [charArray, setCharArray] = useState(['凤']);
    var userCText = '';
    
    function handleSubmit(event) {
        event.preventDefault();
        var trimValue;
        if (event.target === document.getElementById('chara')) {
            trimValue = event.target.value;
            document.getElementById('chara').value = document.getElementById('chara').value.replace(/(?:^\s*)|[^\u4E00-\u9FFF]/gu, '');
        } //(?:^\s*)|[^\u4E00-\u9FFF]+/gu
        else {
            trimValue = event.target.elements.namedItem('chara').value;
        }
        trimValue = trimValue.trim().replace(/[^\p{Script=Han}]/gu, '');
        var inputs = trimValue;
        if (inputs.length > 0) {
            setUserC(inputs[0]);
            setCharArray(new Set(Array.from(inputs)));
            setCharArray(prev => Array.from(prev));
        }
    }

    useEffect(() => {
        if (userC) {
            const targetDiv = document.getElementById('character-target-div');
            const target = document.getElementById('target');
            targetDiv.innerHTML = '';
            target.innerHTML = '';
            // console.log("cleared");
            toWriter();
            const animateButton = document.getElementById("animate-button");
            animateButton.style.color = "#ffff00";
            const quizButton = document.getElementById("quiz-button");
            quizButton.style.color = "#ffffff";
            const quizButton1 = document.getElementById("quiz-button1");
            quizButton1.style.color = "#ffffff";
            const successMessage = document.getElementById('success-message');
            successMessage.innerHTML = `valid ${charArray.length}`;
            successMessage.style.display = 'block';  
        }
    }, [userC,charArray]);

    var writer;
    function toWriter() {
        if (userC == "為" || userC == "爲") {
            writer = HanziWriter.create('character-target-div', userC, {
                width: 300,
                height: 300,
                padding: 5,
                drawingWidth: 30,
                strokeColor: "#000",
                radicalColor: "rgb(0,0,255)",
                showOutline: true,
                strokeAnimationSpeed: 1, // 3x normal speed
                delayBetweenStrokes: 100, // milliseconds,
                delayBetweenLoops: 2000,
                showHintAfterMisses: 1,
                charDataLoader: function (char, onComplete) {
                    if (charDataS[char]) {
                        onComplete(charDataS[char]);
                    } else {
                        console.error('Character data not found for:', char);
                        // Optionally, you can call onComplete with default data or an empty object
                        onComplete({});
                    }
                }
            });
        }
        else {
            writer = HanziWriter.create("character-target-div", userC, {
                width: 300,
                height: 300,
                padding: 5,
                drawingWidth: 30,
                strokeColor: "#000",
                radicalColor: "rgb(0,0,255)",
                showOutline: true,
                strokeAnimationSpeed: 1, // 3x normal speed
                delayBetweenStrokes: 100, // milliseconds,
                delayBetweenLoops: 2000,
                showHintAfterMisses: 1,
            });
        }
        writer.loopCharacterAnimation();
        const targetSBox = document.getElementById("target");
        targetSBox.style.display = "flex";
        // writer.quiz();
        updateNavButtons((charArray).indexOf(userC));
        renderChar();
    }

    // computes the strokes for a character from svg
    function renderFanningStrokes(target, strokes) {
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.width = '75px';
        svg.style.height = '75px';
        svg.style.border = '1px solid #EEE'
        svg.style.marginRight = '3px'
        target.appendChild(svg);
        var group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        // set the transform property on the g element so the character renders at 75x75
        var transformData = HanziWriter.getScalingTransform(75, 75);
        group.setAttributeNS(null, 'transform', transformData.transform);
        svg.appendChild(group);
        strokes.forEach(function (strokePath) {
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttributeNS(null, 'd', strokePath);
            // style the character paths
            path.style.fill = '#555';
            group.appendChild(path);
        });
    }

    // custom render
    function renderChar() {
        if (userC == "為" || userC == "爲") {
            setUserC((userC == "為") ? "為" : "爲");
            //console.log("print",charData[userC]);
            var target = document.getElementById('target');
            for (var i = 0; i < charDataS[userC].strokes.length; i++) {
                var strokesPortion = charDataS[userC].strokes.slice(0, i + 1);
                renderFanningStrokes(target, strokesPortion);
            }

        } else if (userC) {
            HanziWriter.loadCharacterData(userC).then(function (charData) {
                var target = document.getElementById('target');
                for (var i = 0; i < charData.strokes.length; i++) {
                    var strokesPortion = charData.strokes.slice(0, i + 1);
                    renderFanningStrokes(target, strokesPortion);
                }
            });
        }
    }

    //limit checker
    const [isUnlimited, setIsUnlimited] = useState(true);
    function handleToggleChange() {
        setIsUnlimited(prev => !prev);
    }
    // --------------

    // IME
    var chineseInputInstance;
    var top, left;
    function loadIME() {
        if (chineseInputInstance) {
            const doc = document.getElementById('chinese-toolbar-1');
            // console.log('IME already loaded, change position');
            doc.style.top = top + 'px';
            doc.style.left = left + 'px';
            doc.style.position = 'absolute';
            return;
        }
        chineseInputInstance = $('textarea.chinese').chineseInput({
            debug: false,
            input: {
                initial: 'traditional',
                allowChange: true
            },
            allowHide: true,
            active: true
        });
        const doc = document.getElementById('chinese-toolbar-1');
        const toggle = document.getElementById('toggleInput');
        //get doc positions
        top = toggle.offsetTop - 13;
        left = toggle.offsetLeft - 6;
        // console.log(top, left);
        //set
        doc.style.top = top + 'px';
        doc.style.left = left + 'px';
        doc.style.position = 'absolute';
    }
    // ------------- 


    // updateNavButtons
    function updateNavButtons(currentIndex) {
        setPreStyle(prev => prev = (currentIndex === 0) ? "nav-button disabled left" : "nav-button left");
        setNextStyle(prev => prev = (currentIndex === charArray.length - 1) ? "nav-button disabled right" : "nav-button right");
    };

    const [preStyle, setPreStyle] = useState("nav-button disabled left");
    const [nextStyle, setNextStyle] = useState("nav-button disabled right");
    function prevItem() {
        const currentIndex = (charArray).indexOf(userC);
        if (currentIndex > 0) {
            setUserC(charArray[currentIndex - 1]);
        }
        else {
            updateNavButtons(currentIndex);
        }
    }

    function nextItem() {
        const currentIndex = (charArray).indexOf(userC);
        if (currentIndex < charArray.length - 1) {
            setUserC(prev => prev = charArray[currentIndex + 1]);
        } else {
            updateNavButtons(currentIndex);
        }
    }

    //keydown event
    const handleKeyDown = (event) => {
        if (event.target === document.body || event.target === document.getElementById('animate-button') || event.target === document.getElementById('quiz-button') || event.target === document.getElementById('quiz-button1')) {
            if (event.key === 'ArrowLeft') {
                setTimeout(() => {
                    prevItem();                    
                }, 200);
            }
            else if (event.key === 'ArrowRight') {
                setTimeout(() => {
                    nextItem();                    
                }, 200);
            }
        }

        if (event.key === 'Enter' && event.target === document.getElementById('chara')) {
            handleSubmit(event);
        }

        // console.log(event.key);
        const maxDecodedContainer = document.getElementById('maxDecoded');
        if (maxDecodedContainer != null && maxDecodedContainer.value != "") {
            const encodedState = maxDecodedContainer.value;
            maxDecodedContainer.value = "";
            let state = encodedState ? decodeState(encodedState) : [];
            restoreState(state);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        const animateButton = document.getElementById("animate-button");
        const quizButton = document.getElementById("quiz-button");
        const quizButton1 = document.getElementById("quiz-button1");
        animateButton.addEventListener("click", () => {
            const targetSBox = document.getElementById("target");
            targetSBox.style.display = "flex";
            writer.loopCharacterAnimation();
            animateButton.style.color = "yellow";
            quizButton.style.color = "white";
            quizButton1.style.color = "white";
        })
        quizButton.addEventListener("click", () => {
            const targetSBox = document.getElementById("target");
            targetSBox.style.display = "none";
            writer.showOutline();
            writer.quiz();
            animateButton.style.color = "white";
            quizButton.style.color = "yellow";
            quizButton1.style.color = "white";

        })
        quizButton1.addEventListener("click", () => {
            const targetSBox = document.getElementById("target");
            targetSBox.style.display = "none";
            writer.hideOutline();
            writer.quiz();
            animateButton.style.color = "white";
            quizButton.style.color = "white";
            quizButton1.style.color = "yellow";
        })

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            animateButton.removeEventListener("click", () => {
                const targetSBox = document.getElementById("target");
                targetSBox.style.display = "flex";
                writer.loopCharacterAnimation();
            })
            quizButton.removeEventListener("click", () => {
                const targetSBox = document.getElementById("target");
                targetSBox.style.display = "none";
                writer.showOutline();
                writer.quiz();
            })
            quizButton1.removeEventListener("click", () => {
                const targetSBox = document.getElementById("target");
                targetSBox.style.display = "none";
                writer.hideOutline();
                writer.quiz();
            })
        };
    }, [userC, charArray]);

    //time to get live urls

    // get the current date in EST
    function getCurrentESTDate() {
        const options = {
            timeZone: 'America/New_York',
            timeStyle: 'full',
            dateStyle: 'full'
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date());
    }
    const now = Date.now();
    // Function to get the current state of the input
    function getCurrentState() {
        const input = document.getElementById('chara');
        return [{
            id: input.id,
            content: input.value
        }];
    }
    // console.log(getCurrentState());

    // Function to encode state into a compact string (UTF-8 Safe Base64)
    function encodeState(state) {
        const jsonString = JSON.stringify(state);
        const utf8Encoder = new TextEncoder();
        const encodedData = utf8Encoder.encode(jsonString);
        let binaryString = '';
        for (let i = 0; i < encodedData.length; i++) {
            binaryString += String.fromCharCode(encodedData[i]);
        }
        return btoa(binaryString);
    }
    // console.log(encodeState(getCurrentState()));


    // Function to update the URL with the encoded state
    const MAX_URL_LENGTH = 1000;

    function updateUrlWithState(state) {
        const encodedState = encodeState(state);
        const encodedDataContainer = document.getElementById('maxEncoded');
        // console.log(encodedState.length);
        if (encodedState.length < MAX_URL_LENGTH) {
            history.replaceState(state, '', `?new=${encodedState}`);
            encodedDataContainer.innerHTML = "Encoded data that exceeds url max length goes here";
        } else {
            history.replaceState(state, '', `?msg=EXCEEDMAXLENGTH`);
            console.warn('Encoded state exceeds maximum URL length; not updating the URL.');
            encodedDataContainer.innerHTML = "";
            encodedDataContainer.innerHTML = encodedState;
        }
    }

    // update url 
    function getUrlUpdated() {
        if(document.getElementById('chara')){
            document.getElementById('chara').value = document.getElementById('chara').value.replace(/(?:^\s*)|[^\u4E00-\u9FFF|" "|\w]/gu, '');
            const state = getCurrentState();
            if (document.getElementById('chara').value != '') {
                updateUrlWithState(state);
            }
        }
    }
    
    const fileID = '6241b275-f27a-4dc9-88fb-cff322f9ad7a';
    const baseUrl = 'https://api.jsonstorage.net/v1/json/3236c746-fa3a-446c-a743-ce01c3b37dd4/82b15f8f-ecf2-4c9f-97a4-05739761b770';
    let data1 = null;
    async function getFileData() {
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            data1 = await response.json();
            console.log('Fetched Data:', data1);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        
    }
    
    // Function to decode a compact string into state (UTF-8 Safe Base64)
    function decodeState(encodedState) {
        const binaryString = atob(encodedState);
        const utf8Decoder = new TextDecoder();
        const decodedData = new Uint8Array(binaryString.split('').map(char => char.charCodeAt(0)));
        var decodedState = JSON.parse(utf8Decoder.decode(decodedData));
        return decodedState;
    }
    // decodeState(encodeState(getCurrentState()));
    
    // Function to get state from the URL
    async function getStateFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const encodedStateN = params.get('new');
        const encodedStateJ = params.get('short');
        const encodedStateT = params.get('t');
        if (encodedStateN) {
            // console.log("stateN checked:", encodedStateN);
            return decodeState(encodedStateN);
        }
        if (encodedStateJ) {
            console.log(200, getCurrentESTDate());
            await getFileData();
            console.log("stateJ checked:", data1[encodedStateJ].encodedData);
            const state = decodeState(data1[encodedStateJ].encodedData);
            console.log("decodedj", state);
            restoreState(state);
        }
        if (encodedStateT){
            console.log(200, `${getCurrentESTDate()}\n Loading terms`);
            const chara = document.getElementById('chara');
            chara.value = encodedStateT;
            const mockEvent = {
                preventDefault: () => {},
                target: {
                    elements: {
                        namedItem: (name) => {
                            if (name === 'chara') {
                                return { value: encodedStateT };
                            }
                            return null;
                        }
                    }
                }
            };
            handleSubmit(mockEvent);
            return true;
        }
        return false;
    }

    // Function to restore state from the URL
    function restoreState(state) {

        if (state.length > 0) {
            console.log("restoring state:", state);
            const input = document.getElementById(state[0].id);
            console.log(input);
            if (input) {
                input.value = state[0].content;
            }
        }
        const params = new URLSearchParams(window.location.search);
        const encodedStateS = params.has('sub');
        (encodedStateS) ? console.log("ready for submit") : null;
        // updateUrlWithState(state); //using onChange now 
    }

    // retore
    useEffect(() => {
        if (getStateFromUrl()) {
            getStateFromUrl().then(state => {
                restoreState(state);
            })
            console.log("state restored");
        }
    }, [])

    async function copyToClipboard(elementId) {
        const text = document.getElementById(elementId).innerText;
        await navigator.clipboard.writeText(text);
        console.log('Copied to clipboard:', text);
        alert('Copied to clipboard:');
    }

    return (
        <main>
            <h1>Learn Chinese Tool</h1>
            <p className="text-[16px]">
                Simple Free tool to learn Chinese, Recognize/Identify and Learn Chinese
                character and stroke order
            </p>

            <Form handleSubmit={handleSubmit} isUnlimited={isUnlimited} getUrlUpdated={getUrlUpdated}/>
            <FeatureBox isUnlimited={isUnlimited} handleToggleChange={handleToggleChange} loadIME={loadIME} userC={userC} />
            <div id="error-message" className="hidden error-message">invalid input</div>
            <div id="success-message" className="hidden success-message">valid input</div>
            <div id="buttons-container">
                {

                    Array.from(charArray).map((char) => (

                        <button key={char} className='charBtn' onClick={() => setUserC(char)}>{char}</button>
                    ))            
                
                }
            </div>
            
            <div id="containerC">
                <div id="character-target-div"></div>
                <button id="prevButton" className={preStyle} onClick={prevItem}>&#9664;</button>
                <button id="nextButton" className={nextStyle} onClick={nextItem}>&#9654;</button>
            </div>

            <div id="btnBox">
                <button id="animate-button" className="inline-flex h-6 items-center justify-center rounded-md bg-purple-950 px-6 font-medium text-neutral-50 transition active:scale-110">Animate</button>
                <button id="quiz-button" className="inline-flex h-6 items-center justify-center rounded-md bg-purple-950 px-6 font-medium text-neutral-50 transition active:scale-110">Quiz</button>
                <button id="quiz-button1" className="inline-flex h-6 items-center justify-center rounded-md bg-purple-950 px-6 font-medium text-neutral-50 transition active:scale-110">Quiz(no outline)</button>
            </div>
            <div id="target"></div>
            <div id="maxEncoded" style={{ border: "1px solid red", minWidth: "90%", overflowWrap: "break-word" }} onClick={() => { copyToClipboard('maxEncoded') }}>Encoded data that exceeds url max length goes here</div>
            <input id="maxDecoded" type="text" style={{ border: "1px solid green", minWidth: "90%", textAlign: "center" }} placeholder="Manual load data: Enter Encoded data" />

            <footer>
                <div style={{ textAlign: "left" }}>
                    <p>
                        Public Sources Used for this Private Project:
                    </p>
                    <ul style={{ listStyleType: "disc", textAlign: "left", paddingLeft: "20px" }}>
                        <li><a href="https://github.com/chanind/hanzi-writer" target="_blank">https://github.com/chanind/hanzi-writer(MIT License)</a></li>
                        <li><a href="https://github.com/Kaifuny/pinyin4js" target="_blank">https://github.com/Kaifuny/pinyin4js(MIT License)</a></li>
                        <li><a href="https://github.com/hermanschaaf/chinese-ime" target="_blank">https://github.com/hermanschaaf/chinese-ime(GNU Lesser General Public License v3.0)</a></li>
                        <li><a href="https://codepen.io/erikterwan/pen/EVzeRP" target="_blank">https://codepen.io/erikterwan/pen/EVzeRP(MIT License) for menu icon</a></li>
                    </ul>
                </div>
            </footer>
        </main>
    )
}