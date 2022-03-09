$(window).on('load', function () {
    const FINISHED_EMOJI = "🚗💪";
    const FAILURE_EMOJI = "👉🚲👈";

    let makeGuesses = 4;
    let modelGuesses = 4;

    let makeCorrect = false;
    let modelCorrect = false;

    let makeTextBox = $("#make-tb");
    let modelTextBox = $("#model-tb");

    let makeButton = $("#make-btn");
    let modelButton = $("#model-btn");

    let makeGuessContainer = $("#make-guess-container");
    let modelGuessContainer = $("#model-guess-container");

    let answerContainer = $("#answer-container");

    let carImg = $("#car-img");

    let today = {
        make: "BUGATTI",
        model: "EB112",
        imgSource: "bugattieb112.png"
    }

    carImg.attr("src", today.imgSource);
    answerContainer.text(`${today.make} ${today.model}`);
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
            makeCorrect = true;
        }

        MakeGuessDecrement();
        WinHandler();
    }

    function MakeGuessDecrement() {
        if (makeGuesses-- === 0) {
            makeButton.attr("disabled", true);
            makeGuessContainer.append(GenerateFailure());
            answerContainer.css("visibility", "visible");
            return true;
        }
        return false;
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
            modelCorrect = true;
        }

        ModelGuessDecrement();
        WinHandler();
    }

    function ModelGuessDecrement() {
        if (modelGuesses-- === 0) {
            modelButton.attr("disabled", true);
            modelGuessContainer.append(GenerateFailure());
            answerContainer.css("visibility", "visible");
            return true;
        }
        return false;
    }

    function WinHandler() {
        if (makeCorrect && modelCorrect)
            answerContainer.css("visibility", "visible");
    }

    function GenerateDivs(correct, normalizedInputArray) {
        let flexGuess = GenerateFlexGuess();
        normalizedInputArray.forEach(letter => {
            let flexLetter;
            if (correct.includes(letter)) {
                correct = correct.replace(letter, "");
                flexLetter = GenerateFlexLetter(letter, "correct");
            }
            else {
                flexLetter = GenerateFlexLetter(letter, "incorrect");
            }
            flexGuess.append(flexLetter);
        });
        // letters left to be used.
        if (correct.length > 0)
            flexGuess.append(GenerateFlexLetter("¿?", "curious"));
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