export function shuffleArray<T>(arr: Array<T>): void {
    let currentIndex = arr.length;

    while (currentIndex !== 0) {
        const randIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [arr[randIndex], arr[currentIndex]] =
        [arr[currentIndex], arr[randIndex]]
    }
} 