// stable elements from original HTML
let counterVar = document.querySelector("h1#counter")
let pauseButton = document.querySelector("#pause")
let plusButton = document.querySelector("#plus")
let minusButton = document.querySelector("#minus")
let likeButton = document.querySelector("#heart")
let theForm = document.querySelector("#comment-form")
let likeSection = document.querySelector("ul.likes")
let commentList = document.querySelector("#list")


// a function that adds to the Counter
function addToCounter() {
    let stringToNumber = parseInt(counterVar.textContent)
    let addOne = stringToNumber + 1
    counterVar.textContent = addOne
    return counterVar
}

// a function that uses same logic as above but to subtract
function subtractFromCounter() {
    let stringToNumber = parseInt(counterVar.textContent)
    let subtractOne = stringToNumber - 1
    counterVar.textContent = subtractOne
    return counterVar
}

// global variable for the setInterval ID 
// needed inside multiple functions
let autoCounter

// function that calls the addToCounter function once a second
function autoCount() {
    autoCounter = setInterval(addToCounter, 1000)
}

// event listener to initiate the autoCount function at page load
let initiateAutoCount = document.addEventListener("DOMContentLoaded", autoCount())


// function that stops the setInterval (using global ID variable)
function stopAutoCount() {
    clearInterval(autoCounter)
}

// establishes an empty object to track numbers in the counter
let numberTracker = {}

// starts by setting likeSection to empty string, so already-posted likes are not
// copied over on every click
// then, for every number stored to the numberTracker object via a click event, 
// a new "li" is created, it's innerText is set to the number of times that number
// has been clicked (by using the number as the key in the numberTracker object)
// "time" vs "times" is assigned based on number of likes
// and then the new "li" is appended to the likeSection "ul"
// adapted from Eric's solution posted in Slack
function renderLikes(){
    likeSection.innerHTML = ""
    for (let number in numberTracker){
        const newLike = document.createElement("li")
        if (numberTracker[number] > 1){
            newLike.innerText = `${number} has been liked ${numberTracker[number]} times`
        } else {
            newLike.innerText = `${number} has been liked ${numberTracker[number]} time`
        }
        likeSection.append(newLike)
    }
}
// function that adds the currentCounter number to the previously empty object numberTracker
// as a key, then assigns the value as the number of times that number was clicked
// the numberTracker[currentCounter] || 0 sets the value equal to the current number of likes
// (if there have been any, in which case the first expression would be true and the "OR" would
// quit) or to 0 if there have not been any clicks on that number yet
// adds one to the value upon every click event on the like button 
// and invokes renderLikes function each time the like button is clicked (which creates the
// new like and adds it to the like Section
// taken from Eric's solution posted in Slack
function addLike(){
    let currentCounter = counter.innerText
    numberTracker[currentCounter] = numberTracker[currentCounter]|| 0
    numberTracker[currentCounter] += 1
    renderLikes()
}

// function that defines behavior of the form submission
theForm.addEventListener("submit", function(event){
    event.preventDefault()
    let userInput = event.target["comment-input"].value

    let newComment = document.createElement("p")
    newComment.innerText = userInput
    commentList.appendChild(newComment)
})

let paused = false
function pauseButtonClick() {
    paused = !paused
    if (paused) {
        clearInterval(autoCounter)
        pauseButton.innerText = "resume"
        plusButton.disabled = true
        minusButton.disabled = true
        likeButton.disabled = true
    } else {
        autoCount()
        pauseButton.innerText = "pause"
        plusButton.disabled = false
        minusButton.disabled = false
        likeButton.disabled = false
    }
}

// // event listeners for button actions
plusButton.addEventListener("click", addToCounter)
minusButton.addEventListener("click", subtractFromCounter)
likeButton.addEventListener("click", addLike)
pauseButton.addEventListener("click", pauseButtonClick)



