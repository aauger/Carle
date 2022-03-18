$(window).on('load', async function () {
    const FINISHED_EMOJI = "🚗💪";
    const FAILURE_EMOJI = "👉🚲👈";

    let makeTextBox = $("#make-tb");
    let modelTextBox = $("#model-tb");

    let makeButton = $("#make-btn");
    let modelButton = $("#model-btn");

    let makeGuessContainer = $("#make-guess-container");
    let modelGuessContainer = $("#model-guess-container");

    let answerContainer = $("#answer-container");

    let carImg = $("#car-img");

    let gameState = {
        make: {
            guesses: 4,
            button: makeButton,
            guessContainer: makeGuessContainer,
            correct: false,
        },
        model: {
            guesses: 4,
            button: modelButton,
            guessContainer: modelGuessContainer,
            correct: false,
        }
    }

    let today = await fetch('http://localhost:4567/car').then(res => res.json());

    carImg.attr("src", `images/${today.image_src}`);
    answerContainer.text(`${today.year} ${today.make} ${today.model}`);
    answerContainer.css("visibility", "hidden");

    makeButton.on('click', MakeClick);
    modelButton.on('click', ModelClick);

    function MakeClick() {
        let text = makeTextBox.val();

        if (!text)
            return;

        makeTextBox.val("");
        let upperCase = text.toUpperCase();

        let normalizedArray = [...upperCase];
        let correct = today.make;
        let flexGuess = GenerateDivs(correct, normalizedArray);
        makeGuessContainer.append(flexGuess);

        if (upperCase === today.make) {
            makeGuessContainer.append(GenerateFinished());
            makeButton.attr("disabled", true);
            gameState.makeCorrect = true;
        }

        GuessDecrement(gameState.make);
        WinHandler();
    }

    function ModelClick() {
        let text = modelTextBox.val();

        if (!text)
            return;

        modelTextBox.val("");
        let upperCase = text.toUpperCase();
        let normalizedArray = [...upperCase];

        let correct = today.model;
        let flexGuess = GenerateDivs(correct, normalizedArray);
        modelGuessContainer.append(flexGuess);

        if (upperCase === today.model) {
            modelGuessContainer.append(GenerateFinished());
            modelButton.attr("disabled", true);
            gameState.modelCorrect = true;
        }

        GuessDecrement(gameState.model);
        WinHandler();
    }

    function GuessDecrement(component) {
        if (component.guesses-- === 0) {
            component.button.attr("disabled", true);
            component.guessContainer.append(GenerateFailure());
            answerContainer.css("visibility", "visible");
            return true;
        }
        return false;
    }

    function WinHandler() {
        if (gameState.makeCorrect && gameState.modelCorrect)
            answerContainer.css("visibility", "visible");
    }

    function GenerateDivs(correct, normalizedInputArray) {
        let flexGuess = GenerateFlexGuess();

        normalizedInputArray.forEach((letter, idx) => {
            let flexLetter;
            if (correct.includes(letter)) {
                if (correct[0] === letter)
                    flexLetter = GenerateFlexLetter(letter, "correct")
                else
                    flexLetter = GenerateFlexLetter(letter, "correct-unorder");
                correct = correct.replace(letter, "");
            }
            else {
                flexLetter = GenerateFlexLetter(letter, "incorrect");
            }
            flexGuess.append(flexLetter);
        });
        // letters left to be used.
        if (correct.length > 0)
            flexGuess.append(GenerateFlexLetter("❔", "curious"));
        return flexGuess;
    }

    function GenerateFlexGuess() {
        let flexGuess = $("<div></div>");
        flexGuess.addClass("flex-guess");
        return flexGuess;
    }

    function GenerateFlexLetter(letter, classType) {
        let flexLetter = $("<div></div>");
        flexLetter.text(letter);
        flexLetter.addClass("flex-letter");
        flexLetter.addClass(classType);
        return flexLetter;
    }

    function GenerateFinished() {
        return $(`<div style=\"font-size:x-large\">${FINISHED_EMOJI}<div>`);
    }

    function GenerateFailure() {
        return $(`<div style=\"font-size:x-large\">${FAILURE_EMOJI}</div>`);
    }
});