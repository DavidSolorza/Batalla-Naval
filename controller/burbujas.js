document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < 30; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('burbujas');
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDuration = `${3 + Math.random() * 4}s`;
        bubble.style.width = bubble.style.height = `${5 + Math.random() * 15}px`;
        document.body.appendChild(bubble);
    }
});