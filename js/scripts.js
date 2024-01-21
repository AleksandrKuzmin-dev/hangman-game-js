document.addEventListener('DOMContentLoaded', () => {
    const hideWordElement = document.querySelector('.game__word-text'),
          questionElement = document.querySelector('.game__question-value'),
          errorsElement = document.querySelector('.game__error-value'),
          img = document.querySelector('.hangman-box__img'),
          keyboards = document.querySelector('.game__keyboards'),
          loseModal = document.querySelector('.modal-lose'),
          victoryModal = document.querySelector('.modal-victory'),
          modalWord = document.querySelectorAll('.modal__value'),
          key = document.querySelectorAll('.game__key'),
          newGameBtn = document.querySelectorAll('.modal__button');

    let question,
        word,
        symbols,
        guessed = 0,
        errorsValue = 0;

    function setRandomWord(words){
        const quantityWords = words.length ;
        const randomNumber = Math.floor(Math.random() * (quantityWords - 0 + 1));

        question = words[randomNumber].question;
        word = words[randomNumber].answer.toUpperCase();
        questionElement.textContent = question;

        for(let i = 0; i < word.length; i++){
            const symbolElement = document.createElement('li');
            symbolElement.classList.add('game__word-symbol');
            hideWordElement.append(symbolElement);
        };
        errorsElement.textContent = `${errorsValue}/6`;
        symbols = document.querySelectorAll('.game__word-symbol');
        modalWord.forEach(e => e.textContent = word);
        console.log(question, word);
    };

    function checkSymbol(symbol){
        let found = false;
        let lastFindPosition = word.indexOf(symbol);

        while(lastFindPosition != -1) {
            found = true;
            guessed++;
            symbols[lastFindPosition].textContent = symbol;
            symbols[lastFindPosition].classList.add('game__word-symbol_guessed');
            lastFindPosition = word.indexOf(symbol, lastFindPosition + 1);
        };

        if (!found) {
            errorsValue++;
            errorsElement.textContent = `${errorsValue}/6`;
            img.src = `./images/${errorsValue}.jpg`;
            console.log(img.src);
        };

        if(errorsValue >= 6) lose();
        if(guessed == word.length) victory();
    };

    function lose(){
        loseModal.classList.remove('none');
    }

    function victory(){
        victoryModal.classList.remove('none');
    }

    function newGame(){
        errorsValue = 0;
        guessed = 0;

        loseModal.classList.add('none');
        victoryModal.classList.add('none');
        symbols.forEach(item => item.remove());

        key.forEach(item => {
            item.classList.remove('game__key_used');
            item.removeAttribute('disabled');
        });

        setRandomWord(answerlist);
    };
    
    keyboards.addEventListener('click', (e) => {
        if (e.target.classList.contains('game__key')){
            e.target.classList.add('game__key_used');
            e.target.setAttribute('disabled', '');
            checkSymbol(e.target.textContent);
        };
    });

    newGameBtn.forEach(item => {
        item.addEventListener('click', newGame);
    });
    
    setRandomWord(answerlist);
});

