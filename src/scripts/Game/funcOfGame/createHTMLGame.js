function getStringHTMLGame() {
  return `<div class="manual-block">
    <div class="close">
    <button data-closeManual>close</button>
    </div>
    <h2>Hi there!</h2>
    <p>I'm Sr233/Sulti/Siarhei Saltanovich and I glad to see you in here!
    I hope, this app will help you to learn language faster!
    </p>
    <br>
    <h2>Rules of txt file</h2>
    <p>This is an example how you can put your words in your txt file:</p>
    <div class="img-wrapper">
    <img class="img-wrapper--img" src="./assets/Example1.png" alt="Example1">
    </div>
    <p>A first word is word from another language, a second word in your language.</p>
    <p>Stars means how much time you have been answering correct.</p>
    <br>
    <h2>How to play</h2>
    <p>You must write your word answer such as it in your txt file: </p>
    <div class="img-wrapper">
    <img class="img-wrapper--img" src="./assets/Example2.png" alt="Example2">
    </div>
    <br>
    <p>After that, if your answer is correct, you will receive:</p>
    <div class="img-wrapper">
    <img class="img-wrapper--img" src="./assets/Example3.png" alt="Example3">
    </div>
    <p>Then congratulations!</p>
    <br>
    <p>But if your answer wrong it will show you an answer, and then set to zero your stars. It means you must repeat your word so much time as you need.
    </p>
    <p>You must select how many stars do you need in there: </p>
    <div class="img-wrapper">
    <img class="img-wrapper--img" src="./assets/Example4.png" alt="Example4">
    </div>
    <p>Then you must wait for a new word.</p>
    <br>
    <h2>How can I save words?</h2>
    <p>You have 2 different buttons for saving: </p>
    <div class="img-wrapper">
    <img class="img-wrapper--img" src="./assets/Example5.png" alt="Example5">
    </div>
    <p>"Save learned words" means you can save your learned words file.</p>
    <p>"Save rest of words" means you can save your updated words file. You can see in the file updated words and new stars (if you answer is right)</p>
    <br>
    <h2>This is a video of manual, how you can use an app:</h2>
    <div class="img-wrapper">
    <video controls class="img-wrapper--img">
        <source src="./assets/Manual.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>
    </div>
</div>
<div>
    <div class="choosingFileBlock">
    <p class="description">Put your .txt file there: </p>
    <input type="file" data-loadFile>
    </div>
    <div class="mainBlock">
    <div class="words">
        <span data-englishWord>in English word</span> - <span data-translatedWord>translated word</span>
    </div>
    <div>
        <input type="text" data-addAnswer placeholder="Write your translated word" value="Choose file, press START">
        <button data-showLetter>Show +1 letter</button>
    </div>
    <div class="startBlock">
        <button data-start>START</button>
        <select name="select count"  data-selectAmount>
        <option value="1">1</option>
        <option value="2">2</option>
        <option selected value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>
    </div>
    <div class="buttons">
        <button data-deleteAllStars>Save words without stars</button>
        <button data-saveLearned>Save learned words</button>
        <button data-saveRest>Save rest of words</button>
    </div>
    </div>
</div>`;
}

export { getStringHTMLGame };