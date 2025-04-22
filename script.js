/*
Welcome to the Question Viewer App!

Your task is to implement the following functions:

1. fetchRandomQuestion(): This function is already implemented. It fetches a random question from the API and displays it.

2. startQuestionRotation(): Implement the logic to start rotating questions.
   - Call fetchRandomQuestion() initially to show the first question.
   - Set up an interval to fetch a new question every few seconds.

3. stopQuestions(): Implement the logic to stop the question rotation.
   - Clear the interval.
   - Update the UI to show that questions have stopped.

4. Add event listeners when the DOM is fully loaded:
   - Set up the stop button functionality.

Remember:
- Handle any errors and edge cases in your implementation.
- Use the questionRotationInterval variable to store the interval.
- Update the UI appropriately when starting and stopping the rotation.

Good luck! You've got this!
*/

// Fetch and display a random question
function fetchRandomQuestion() {
  if (isStopped) return; // Don't fetch if stopped

  fetch("https://the-trivia-api.com/api/questions?limit=1")
      .then(response => response.json())
      .then(data => {
          if (!isStopped) { // Only update UI if not stopped
              const question = data[0].question;
              document.querySelector('.question-container p.question').innerHTML = question;
          }
      })
      .catch(error => console.error('Error fetching question:', error));
}

// Start rotating questions
function startQuestionRotation() {
  isStopped = false;
  fetchRandomQuestion(); // Show first question immediately
  return setInterval(fetchRandomQuestion, 5000); // New question every 5 seconds
}

let questionRotationInterval;
let isStopped = false;

// Stop question rotation
function stopQuestions() {
  isStopped = true;
  clearInterval(questionRotationInterval);
  const stopButton = document.querySelector('.stop-button');
  stopButton.textContent = 'Stopped';
  stopButton.classList.add('stopped');
  stopButton.disabled = true;
  document.querySelector('.question-container p.question').innerHTML = 'Questions stopped.';
}

// Add event listeners when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  const stopButton = document.querySelector('.stop-button');
  if (stopButton) {
      stopButton.addEventListener('click', stopQuestions);
  } else {
      console.error('Stop button not found in the DOM');
  }

  questionRotationInterval = startQuestionRotation();

});

