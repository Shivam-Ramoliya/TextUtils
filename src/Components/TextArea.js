import React, { useState, useEffect } from 'react';

export default function TextArea(props) {
    // State hooks to manage original and converted text
    const [originalText, setOriginalText] = useState("Enter your text here.");
    const [convertedText, setConvertedText] = useState("");

    // Utility: Returns style based on light/dark mode
    const getModeClass = () => {
        return props.mode === 'dark'
            ? {
                backgroundColor: '#1e293b',
                color: '#f0f9ff',
                border: '1px solid #334155',
                boxShadow: '0 0 7px rgba(255, 255, 255, 1)',
                transition: 'all 0.5s ease',
                borderRadius: '0.5rem',
            }
            : {
                backgroundColor: '#f0f9ff',
                color: '#1e293b',
                border: '1px solid #dbeafe',
                boxShadow: '0 0 7px rgba(0, 0, 0, 1)',
                transition: 'all 0.5s ease',
                borderRadius: '0.5rem',
            };
    };

    // Updates originalText and clears convertedText when typing
    const handleChange = (event) => {
        setOriginalText(event.target.value);
        setConvertedText("");
    };

    // Copies converted text to clipboard
    const handleCopyText = () => {
        navigator.clipboard.writeText(convertedText);
        props.showAlert("Text copied to Clipboard!", "success");
    };

    // Clears both original and converted text
    const handleClearText = () => {
        setOriginalText("");
        setConvertedText("");
        props.showAlert("Text cleared!", "success");
    };

    // ================= CASE CONVERSION =================

    const handleUPClick = () => {
        setConvertedText(originalText.toUpperCase());
        props.showAlert("Converted to UpperCase!", "success");
    };

    const handleLOWClick = () => {
        setConvertedText(originalText.toLowerCase());
        props.showAlert("Converted to LowerCase!", "success");
    };

    const handleSentenceCase = () => {
        const newText = originalText
            .toLowerCase()
            .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        setConvertedText(newText);
        props.showAlert("Converted to SentenceCase!", "success");
    };

    const handleCapitalizedCase = () => {
        const newText = originalText
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());
        setConvertedText(newText);
        props.showAlert("Converted to CapitalizedCase!", "success");
    };

    const handleAlternatingCase = () => {
        let newText = '';
        for (let i = 0; i < originalText.length; i++) {
            newText += i % 2 === 0
                ? originalText[i].toLowerCase()
                : originalText[i].toUpperCase();
        }
        setConvertedText(newText);
        props.showAlert("Converted to AlternatingCase!", "success");
    };

    const handleInverseCase = () => {
        const newText = [...originalText]
            .map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase())
            .join('');
        setConvertedText(newText);
        props.showAlert("Converted to InverseCase!", "success");
    };

    // ================= TEXT CLEANUP =================

    const handleSpaces = () => {
        let newText = originalText.split(/[ ]+/).join(" ");
        setConvertedText(newText);
        props.showAlert("Extra spaces removed!", "success");
    };

    const handleRemoveAllSpaces = () => {
        const newText = originalText.replace(/\s+/g, '');
        setConvertedText(newText);
        props.showAlert("All spaces removed!", "success");
    };

    const handleRemoveNumbers = () => {
        setConvertedText(originalText.replace(/[0-9]/g, ''));
        props.showAlert("All numbers removed!", "success");
    };

    const handleRemovePunctuation = () => {
        setConvertedText(originalText.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g, ''));
        props.showAlert("All punctuation removed!", "success");
    };

    // ================= TRANSFORMATIONS =================

    const handleReverse = () => {
        let newtext = "";
        for (let i = originalText.length - 1; i >= 0; i--) {
            newtext += originalText[i];
        }
        setConvertedText(newtext);
        props.showAlert("Text reversed!", "success");
    };

    const handleVowelConsonant = () => {
        const text = originalText.toLowerCase();
        let vowels = 0, consonants = 0, others = 0;

        for (let char of text) {
            if (/[a-z]/.test(char)) {
                if ("aeiou".includes(char)) vowels++;
                else consonants++;
            } else {
                others++;
            }
        }

        const summary =
            `Vowels: ${vowels}\nConsonants: ${consonants}\nOther Characters: ${others}`;
        setConvertedText(summary);
        props.showAlert("Vowel/Consonant frequency calculated!", "success");
    };

    const handleCharFrequency = () => {
        const freq = {};
        for (let char of originalText) {
            freq[char] = (freq[char] || 0) + 1;
        }

        const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
        const output = sorted.map(([char, count]) => `'${char}': ${count}`).join('\n');

        setConvertedText(output);
        props.showAlert("Character frequency calculated!", "success");
    };

    // ================= SPEECH =================

    const handleSpeak = () => {
        // Stop any ongoing speech first
        window.speechSynthesis.cancel();

        const msg = new SpeechSynthesisUtterance(originalText);
        props.showAlert("Text to Speech activated!", "success");

        setTimeout(() => {
            window.speechSynthesis.speak(msg);
        }, 300);
    };

    // Stop speech when component unmounts or on reload
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    useEffect(() => {
        window.speechSynthesis.cancel();
    }, [originalText]);

    // ================= ENCODING/DECODING =================

    const handleBase64Encode = () => {
        setConvertedText(btoa(originalText));
        props.showAlert("Encoded to Base64!", "success");
    };

    const handleBase64Decode = () => {
        try {
            setConvertedText(atob(originalText));
            props.showAlert("Decoded from Base64!", "success");
        } catch {
            props.showAlert("Invalid Base64 Text!", "danger");
        }
    };

    // ================= NUMBER CONVERSIONS =================

    const handleDecimalToRoman = () => {
        const num = parseFloat(originalText.trim());

        if (!Number.isInteger(num) || num <= 0 || num >= 4000) {
            props.showAlert("Enter a whole number between 1 and 3999 for Roman conversion.", "danger");
            return;
        }

        const romanMap = [
            [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
            [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
            [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
        ];

        let result = '';
        let value = num;

        for (let [decimal, roman] of romanMap) {
            while (value >= decimal) {
                result += roman;
                value -= decimal;
            }
        }

        setConvertedText(result);
        props.showAlert("Converted to Roman numeral!", "success");
    };

    const handleRomanToDecimal = () => {
        const roman = originalText.trim().toUpperCase();

        if (!roman) {
            props.showAlert("Please enter Roman numerals to convert.", "warning");
            return;
        }

        const romanMap = {
            I: 1, V: 5, X: 10, L: 50,
            C: 100, D: 500, M: 1000
        };

        let total = 0, prev = 0;

        for (let i = roman.length - 1; i >= 0; i--) {
            const curr = romanMap[roman[i]];
            if (!curr) {
                props.showAlert("Invalid Roman numeral input.", "danger");
                return;
            }
            total += (curr < prev) ? -curr : curr;
            prev = curr;
        }

        setConvertedText(total.toString());
        props.showAlert("Converted to Decimal!", "success");
    };

    const handleDecimalToBinary = () => {
        const num = parseFloat(originalText.trim());

        if (isNaN(num)) {
            props.showAlert("Invalid input! Please enter a valid number.", "danger");
            return;
        }

        const integerPart = Math.floor(num);
        let binary = integerPart.toString(2);

        const fracPart = num - integerPart;
        if (fracPart > 0) {
            binary += '.';
            let fraction = fracPart;
            let precision = 8;

            while (fraction > 0 && precision--) {
                fraction *= 2;
                if (fraction >= 1) {
                    binary += '1';
                    fraction -= 1;
                } else {
                    binary += '0';
                }
            }
        }

        setConvertedText(binary);
        props.showAlert("Converted to Binary!", "success");
    };

    const handleBinaryToDecimal = () => {
        const binary = originalText.trim();

        if (!binary) {
            props.showAlert("Please enter a binary number.", "warning");
            return;
        }

        if (!/^[01]+(\.[01]+)?$/.test(binary)) {
            props.showAlert("Invalid binary input! Only 0s and 1s allowed.", "danger");
            return;
        }

        const [intPart, fracPart] = binary.split('.');
        let decimal = parseInt(intPart, 2);

        if (fracPart) {
            let fraction = 0;
            for (let i = 0; i < fracPart.length; i++) {
                if (fracPart[i] === '1') {
                    fraction += 1 / Math.pow(2, i + 1);
                }
            }
            decimal += fraction;
        }

        setConvertedText(decimal.toString());
        props.showAlert("Converted to Decimal!", "success");
    };

    const handleDecimalToHex = () => {
        const num = parseFloat(originalText.trim());

        if (isNaN(num)) {
            props.showAlert("Invalid decimal input.", "danger");
            return;
        }

        const intPart = Math.floor(num);
        let hex = intPart.toString(16).toUpperCase();

        const fracPart = num - intPart;
        if (fracPart > 0) {
            hex += '.';
            let fraction = fracPart;
            let precision = 8;

            while (fraction > 0 && precision--) {
                fraction *= 16;
                let digit = Math.floor(fraction);
                hex += digit.toString(16).toUpperCase();
                fraction -= digit;
            }
        }

        setConvertedText(hex);
        props.showAlert("Converted to Hexadecimal!", "success");
    };

    const handleHexToDecimal = () => {
        const hex = originalText.trim().toUpperCase();

        if (!hex) {
            props.showAlert("Please enter a hexadecimal number.", "warning");
            return;
        }

        if (!/^[0-9A-F]+$/i.test(hex)) {
            props.showAlert("Invalid hexadecimal input!", "danger");
            return;
        }

        const decimal = parseInt(hex, 16).toString(10);
        setConvertedText(decimal);
        props.showAlert("Converted to Decimal!", "success");
    };

    const handleHexToBinary = () => {
        const hex = originalText.trim().toUpperCase();

        if (!hex) {
            props.showAlert("Please enter a hexadecimal number.", "warning");
            return;
        }

        if (!/^[0-9A-F]+$/i.test(hex)) {
            props.showAlert("Invalid hexadecimal input!", "danger");
            return;
        }

        const binary = parseInt(hex, 16).toString(2);
        setConvertedText(binary);
        props.showAlert("Converted to Binary!", "success");
    };

    const handleBinaryToHex = () => {
        const binary = originalText.trim();

        if (!binary) {
            props.showAlert("Please enter a binary number.", "warning");
            return;
        }

        if (!/^[01]+$/.test(binary)) {
            props.showAlert("Invalid binary input!", "danger");
            return;
        }

        const hex = parseInt(binary, 2).toString(16).toUpperCase();
        setConvertedText(hex);
        props.showAlert("Converted to Hexadecimal!", "success");
    };

    // ================= TEXT STATISTICS =================

    const OriginalwordCount = originalText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const OriginalcharCount = originalText.length;

    const ConvertedwordCount = convertedText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const ConvertedcharCount = convertedText.length;

    // ================= RENDER JSX =================

    return (
        <div className="container my-4">
            <h1 className="mb-4">{props.heading}</h1>

            {/* Original Text Area */}
            <div className="row align-items-start mb-4">
                <div className="col-md-8">
                    <div className="mb-3 position-relative">
                        <label htmlFor="originalTextArea" className="form-label d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Original Text</h5>
                            <div className="d-flex gap-2 m-2">
                                <button type="button" disabled={originalText.length === 0} className="btn btn-sm btn-outline-danger" onClick={handleClearText}>
                                    Clear
                                </button>
                                <button type="button" disabled={originalText.length === 0} className="btn btn-sm btn-outline-info" onClick={handleSpeak}>
                                    🔊
                                </button>
                            </div>
                        </label>
                        <textarea
                            className="form-control"
                            style={getModeClass()}
                            id="originalTextArea"
                            value={originalText}
                            onChange={handleChange}
                            rows="7"
                        ></textarea>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="p-4 mt-5" style={getModeClass()}>
                        <h4 className="text-center mb-3">Your Text summary for the original Text.</h4>
                        <br></br>
                        <p><strong>{OriginalwordCount}</strong> Words and <strong>{OriginalcharCount}</strong> Characters.</p>
                    </div>
                </div>
            </div>

            {/* Converted Text Area */}
            <div className="row align-items-start mb-4">
                <div className="col-md-8">
                    <div className="mb-3 position-relative">
                        <label htmlFor="convertedTextArea" className="form-label d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Converted Text</h5>
                            <div className="d-flex gap-2 m-2">
                                <button type="button" disabled={convertedText.length === 0} className="btn btn-sm btn-outline-success" onClick={handleCopyText}>
                                    Copy
                                </button>
                            </div>
                        </label>

                        <textarea
                            className="form-control"
                            style={getModeClass()}
                            id="convertedTextArea"
                            value={convertedText}
                            readOnly
                            rows="7"
                        ></textarea>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="p-4 mt-5" style={getModeClass()}>
                        <h4 className="text-center mb-3">Your Text summary for the converted Text.</h4>
                        <br></br>
                        <p><strong>{ConvertedwordCount}</strong> Words and <strong>{ConvertedcharCount}</strong> Characters.</p>
                    </div>
                </div>
            </div>

            {/* Utility Buttons Sections */}
            <div className="mb-4 d-flex flex-column flex-wrap gap-4">

                {/* Case Conversion */}
                <div>
                    <h6 className="mb-2">🔤 Case Conversion</h6>
                    <div className="d-flex flex-wrap gap-2">
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleUPClick}>UPPERCASE</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleLOWClick}>lowercase</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleSentenceCase}>Sentence case</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleCapitalizedCase}>Capitalized Case</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleAlternatingCase}>aLtErNaTiNg cAsE</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleInverseCase}>InVeRsE CaSe</button>
                    </div>
                </div>

                {/* Text Cleanup */}
                <div>
                    <h6 className="mb-2">🧹 Text Cleanup</h6>
                    <div className="d-flex flex-wrap gap-2">
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleSpaces}>Remove Extra Spaces</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleRemoveAllSpaces}>Remove All Spaces</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleRemoveNumbers}>Remove Numbers</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleRemovePunctuation}>Remove Punctuation</button>
                    </div>
                </div>

                {/* Transformations */}
                <div>
                    <h6 className="mb-2">🔁 Transformations</h6>
                    <div className="d-flex flex-wrap gap-2">
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleReverse}>Reverse</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleVowelConsonant}>Vowel/Consonant</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleCharFrequency}>Character Frequency</button>
                    </div>
                </div>

                {/* Encoding / Decoding */}
                <div>
                    <h6 className="mb-2">🔐 Encoding / Decoding</h6>
                    <div className="d-flex flex-wrap gap-2">
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleBase64Encode}>Base64 Encode</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleBase64Decode}>Base64 Decode</button>
                    </div>
                </div>

                {/* Number Conversions */}
                <div>
                    <h6 className="mb-2">🔢 Number Conversions</h6>
                    <div className="d-flex flex-wrap gap-2">
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleDecimalToRoman}>Decimal to Roman</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleRomanToDecimal}>Roman to Decimal</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleDecimalToBinary}>Decimal to Binary</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleBinaryToDecimal}>Binary to Decimal</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleDecimalToHex}>Decimal to Hex</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleHexToDecimal}>Hex to Decimal</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleHexToBinary}>Hex to Binary</button>
                        <button disabled={originalText.length === 0} className="btn btn-info" onClick={handleBinaryToHex}>Binary to Hex</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
