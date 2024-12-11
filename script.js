document.addEventListener('DOMContentLoaded', () => {
    let pile = 20;
    let currentPlayer = 1;

    const pileElement = document.getElementById('pile');
    const currentPlayerElement = document.getElementById('currentPlayer');
    const objectsToRemoveInput = document.getElementById('objectsToRemove');
    const rangeLabel = document.getElementById('rangeLabel');
    const removeButton = document.getElementById('removeButton');
    const resetButton = document.getElementById('resetButton');
    const messageElement = document.getElementById('message');
    const winnerModal = document.getElementById('winnerModal');
    const winnerMessage = document.getElementById('winnerMessage');
    const closeModal = document.getElementById('closeModal');
    const progressElement = document.getElementById('progress');

    function updateProgress() {
        progressElement.style.width = (pile / 20 * 100) + '%';
    }

    objectsToRemoveInput.addEventListener('input', () => {
        rangeLabel.textContent = objectsToRemoveInput.value;
    });

    removeButton.addEventListener('click', () => {
        const objectsToRemove = parseInt(objectsToRemoveInput.value);

        // Reset message
        messageElement.textContent = '';

        if (objectsToRemove > pile) {
            messageElement.textContent = "Not enough objects in the pile. Try again.";
            return;
        }

        pile -= objectsToRemove;
        pileElement.textContent = pile;
        updateProgress();

        if (pile === 0) {
            winnerMessage.textContent = `Player ${currentPlayer} wins!`;
            winnerModal.style.display = 'flex';
            removeButton.disabled = true;
            objectsToRemoveInput.disabled = true;
            return;
        }

        currentPlayer = (currentPlayer === 1) ? 2 : 1;
        currentPlayerElement.textContent = `Player ${currentPlayer}'s turn`;

        objectsToRemoveInput.value = 1;
        rangeLabel.textContent = '1';
    });

    resetButton.addEventListener('click', () => {
        pile = 20;
        currentPlayer = 1;
        pileElement.textContent = pile;
        currentPlayerElement.textContent = `Player ${currentPlayer}'s turn`;
        messageElement.textContent = '';
        objectsToRemoveInput.value = 1;
        rangeLabel.textContent = '1';
        objectsToRemoveInput.disabled = false;
        removeButton.disabled = false;
        updateProgress();
    });

    closeModal.addEventListener('click', () => {
        winnerModal.style.display = 'none';
        resetButton.click();
    });

    // Initial progress update
    updateProgress();
});
