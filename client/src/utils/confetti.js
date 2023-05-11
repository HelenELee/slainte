import JSConfetti from 'js-confetti';

export function addConfetti() {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
        confettiColors: [
            '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
          ],
        confettiRadius: 6,
        confettiNumber: 500,
    });
}
