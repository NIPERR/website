document.addEventListener('DOMContentLoaded', function() {
    const userInput = document.getElementById('userInput');
    const output = document.querySelector('.output');
    const terminalBody = document.querySelector('.terminal-body');

    // Function to focus on userInput field
    function focusUserInput() {
        userInput.focus();
    }

    // Initial focus on page load
    focusUserInput();

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const command = userInput.value.trim();
            const response = processCommand(command);
            if (command) {
                // Create a new div element for the command entered
                const commandOutput = document.createElement('div');
                commandOutput.classList.add('command-line');
                output.appendChild(commandOutput); // Append command to output
            }
            userInput.value = '';
            focusUserInput(); // Keep focus on input field after enter
            if (response) {
                // Create a new div element for the response
                const responseOutput = document.createElement('div');
                responseOutput.classList.add('response-line');
                output.appendChild(responseOutput); // Append response to output
                animateTypeOut(responseOutput, response); // Trigger typing animation for response
            }
        }
    });

    function processCommand(command) {
        const cmd = command.toLowerCase();

        // Handle different commands
        switch (cmd) {
            case 'omnie':
                return 'Cześć! Z tej strony NIPER, tworze filmy technologiczne oraz interesuje mnie informatyka';
            case 'komenda':
                return 'Rodzaje poleceń:\n<div class="help-text-container"><pre class="help-text">omnie\nkomenda\nkontakt\nwyczyść</pre></div>';
            case 'kontakt':
                return 'cześć! Możesz się ze mną skontaktować przez discorda! https://discord.gg/niper';
            case 'wyczyść':
                clearTerminal();
                return ''; // Return empty string after clearing terminal
            case '':
                return ''; // Handle empty input gracefully
            default:
                if (cmd.startsWith('echo ')) {
                    return cmd.substring(5); // Echo back the text after 'echo '
                }
                return `Polecenie nie znalezione: ${command}`;
        }
    }

    function clearTerminal() {
        output.innerHTML = ''; // Clear the output content
        // Scroll to the top after clearing
        terminalBody.scrollTop = 0;
    }

    // Ensure userInput remains focused when clicking away
    document.addEventListener('click', function(event) {
        if (!userInput.contains(event.target)) {
            focusUserInput();
        }
    });

    function animateTypeOut(element, text) {
        element.innerHTML = ''; // Clear existing text
        let i = 0;

        function type() {
            if (i < text.length) {
                let currentChar = text.charAt(i);
                if (currentChar === '<') {
                    const endTagIndex = text.indexOf('>', i);
                    if (endTagIndex !== -1) {
                        element.innerHTML += text.substring(i, endTagIndex + 1);
                        i = endTagIndex + 1;
                    }
                } else {
                    element.innerHTML += currentChar;
                    i++;
                }
                setTimeout(type, 50); // Adjust typing speed here
            }
        }

        type();
    }
});
