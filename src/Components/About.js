import React from 'react';

export default function About(props) {

    const getModeClass = () => {
        return props.mode === 'dark'
            ? {
                backgroundColor: '#1e293b',
                color: '#f0f9ff',
                border: '1px solid #334155',
                boxShadow: '0 0 3px rgba(255, 255, 255, 1)',
                transition: 'all 0.5s ease',
                borderRadius: '0.5rem',
            }
            : {
                backgroundColor: '#f0f9ff',
                color: '#1e293b',
                border: '1px solid #dbeafe',
                boxShadow: '0 0 3px rgba(0, 0, 0, 1)',
                transition: 'all 0.5s ease',
                borderRadius: '0.5rem',
            };
    };

    const containerStyle = () => {
        return {
            ...getModeClass(),
            padding: '20px',
            borderRadius: '12px',
        };
    };

    return (
        <>
            <div className="container my-5" style={containerStyle()}>
                <h2 className="mb-4 text-center">About TextUtils</h2>

                <div className="accordion accordion-flush" id="accordionFlushExample">
                    {[
                        {
                            title: "What is TextUtils?",
                            body: "TextUtils is a lightweight, responsive web app developed using React and Bootstrap. It was built by Shivam S. Ramoliya, a passionate developer focused on creating intuitive tools that simplify everyday tasks."
                        },
                        {
                            title: "What TextUtis do?",
                            body: "We offer powerful yet simple text manipulation features like case conversions, space/punctuation removal, character analysis, text-to-speech, and more — all accessible in a user-friendly interface."
                        },
                        {
                            title: "What's Our Mission?",
                            body: "Our mission is to empower users with smart, privacy-focused tools that streamline text editing. We aim to keep everything fast, secure, and local — with no server-side processing."
                        },
                        {
                            title: "Which Technologies are Used?",
                            body: "TextUtils is built using React.js, Bootstrap 5, HTML, CSS, and JavaScript to deliver a clean and efficient single-page experience."
                        },
                        {
                            title: "Author & License",
                            body: "Developed by Shivam S. Ramoliya and licensed under the MIT License. The project is open-source and available on GitHub for anyone to use or contribute to."
                        }
                    ].map((item, index) => (
                        <div className="accordion-item" key={index} style={getModeClass()}>
                            <h2 className="accordion-header">
                                <button
                                    className="accordion-button collapsed"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#flush-collapse${index}`}
                                    aria-expanded="false"
                                    aria-controls={`flush-collapse${index}`}
                                    style={getModeClass()}
                                >
                                    <b>{item.title}</b>
                                </button>
                            </h2>
                            <div
                                id={`flush-collapse${index}`}
                                className="accordion-collapse collapse"
                                data-bs-parent="#accordionFlushExample"
                            >
                                <div className="accordion-body">
                                    {item.body}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container my-5 p-4 rounded-3" style={containerStyle()}>
                <h3 className="mb-4 text-center">📬 Contact Us</h3>
                <ul className="list-unstyled fs-5">
                    <li className="mb-2">
                        🌐 GitHub:{" "}
                        <a
                            href="https://github.com/Shivam-Ramoliya"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: props.mode === 'dark' ? '#93c5fd' : '#0d47a1' }}
                        >
                            github.com/Shivam-Ramoliya
                        </a>
                    </li>
                    <li className="mb-2">
                        💼 LinkedIn:{" "}
                        <a
                            href="https://www.linkedin.com/in/ramoliya-shivam-sureshbhai-753265287/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: props.mode === 'dark' ? '#93c5fd' : '#0d47a1' }}
                        >
                            linkedin.com/in/ramoliya-shivam-sureshbhai-753265287
                        </a>
                    </li>
                    <li>
                        📧 Email:{" "}
                        <a
                            href="mailto:shivamramoliya2005@gmail.com"
                            style={{ color: props.mode === 'dark' ? '#93c5fd' : '#0d47a1' }}
                        >
                            shivamramoliya2005@gmail.com
                        </a>
                    </li>
                </ul>
            </div>

        </>
    );
}
