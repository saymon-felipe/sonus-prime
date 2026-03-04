<template>
    <div class="hero-section">
        <svg style="width: 0; height: 0; position: absolute;" aria-hidden="true" focusable="false">
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
        </svg>
        <div :class="['hero-scale-wrapper', { 'background-mode': showSubtitle }]">
            <div class="hero-wrapper" ref="wrapperRef">
                <div class="hero-spark" ref="sparkRef"></div>
                <div class="hero-logo-group" ref="logoGroupRef">
                    <div class="hero-icon-container" ref="iconContainerRef"></div>
                    <div class="hero-letter-container" ref="letterContainerRef"></div>
                </div>
            </div>
        </div>
        <div class="hero-subtitle-container">
            <h1 :class="['hero-subtitle', { 'visible': showSubtitle }]">
                Elevando o Padrão Digital
            </h1>
            <p :class="['hero-subtitle-small', { 'visible': showSubtitle }]">
                Design. Code. Future.
            </p>
        </div>
    </div>
</template>

<script>
function easeOutElastic(t) {
    if (t === 0 || t === 1) return t;
    const c4 = (2 * Math.PI) / 3.2;
    return Math.pow(2, -9 * t) * Math.sin((t * 10 - 0.8) * c4) + 1;
}

function easeInkBrush(t) {
    const q = 1 - Math.pow(1 - t, 4);
    const e = easeOutElastic(t);
    return q * 0.82 + e * 0.18;
}

function smoothNoise(t, seed) {
    return (
        Math.sin(t * 3.1 + seed) * 0.5 +
        Math.sin(t * 7.3 + seed * 1.7) * 0.3 +
        Math.sin(t * 13.7 + seed * 2.3) * 0.2
    );
}

function smoothstep(a, b, t) {
    t = Math.max(0, Math.min(1, (t - a) / (b - a)));
    return t * t * (3 - 2 * t);
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

export default {
    name: 'HeroLogo',
    data() {
        return {
            showSubtitle: false,
            animationFrameId: null
        };
    },
    mounted() {
        Promise.all([
            fetch('/icon.svg').then((r) => r.text()),
            fetch('/letter.svg').then((r) => r.text()),
        ]).then(([iconSvg, letterSvg]) => {
            if (this.$refs.iconContainerRef) this.$refs.iconContainerRef.innerHTML = iconSvg;
            if (this.$refs.letterContainerRef) this.$refs.letterContainerRef.innerHTML = letterSvg;
            this.initAnimation();
        });
    },
    beforeUnmount() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    },
    methods: {
        handleMouseMove(e) {
            this.targetMouseX = e.clientX;
            this.targetMouseY = e.clientY;
        },
        initAnimation() {
            const wrapper = this.$refs.wrapperRef;
            const spark = this.$refs.sparkRef;
            const logoGroup = this.$refs.logoGroupRef;
            const iconContainer = this.$refs.iconContainerRef;
            const letterContainer = this.$refs.letterContainerRef;

            if (!wrapper || !spark || !logoGroup || !iconContainer || !letterContainer) return;

            const pathsIcon = Array.from(iconContainer.querySelectorAll('path'));
            const pathsLetter = Array.from(letterContainer.querySelectorAll('path'));

            this.targetMouseX = window.innerWidth / 2;
            this.targetMouseY = window.innerHeight / 2;
            let mouseX = this.targetMouseX;
            let mouseY = this.targetMouseY;

            document.addEventListener('mousemove', this.handleMouseMove);

            let hue = 0, time = 0, startTS = null, shifted = false, subtitleShown = false;
            const DRAW_EACH = 1800, STAGGER = 150, WAVE_RAMP = 2000;

            const sortedIcon = pathsIcon
                .map((p) => ({ path: p, cy: p.getBBox().y + p.getBBox().height / 2, type: 'icon' }))
                .sort((a, b) => a.cy - b.cy);

            const totalIconDrawEnd = (sortedIcon.length > 0 ? (sortedIcon.length - 1) * STAGGER : 0) + DRAW_EACH;
            const SHIFT_TIME = totalIconDrawEnd + 400;

            const sortedLetter = pathsLetter
                .map((p) => ({ path: p, cx: p.getBBox().x + p.getBBox().width / 2, type: 'letter' }))
                .sort((a, b) => a.cx - b.cx);

            const allPaths = [...sortedIcon, ...sortedLetter];

            const pathData = allPaths.map((item, i) => {
                const isIcon = item.type === 'icon';
                const path = item.path;
                const seed = Math.random() * 100;
                const drawDir = i % 2 === 0 ? 1 : -1;
                const jitter = (Math.random() - 0.5) * 80;

                let drawStart = isIcon
                    ? sortedIcon.indexOf(item) * STAGGER + jitter
                    : SHIFT_TIME + sortedLetter.indexOf(item) * (STAGGER * 0.6) + jitter;

                const drawEnd = drawStart + (isIcon ? DRAW_EACH : DRAW_EACH * 0.7);
                const stretchAmt = isIcon ? 0.03 + Math.random() * 0.05 : 0;
                const phase = Math.random() * Math.PI * 2;
                const ampMult = isIcon ? 1 : 0.15;
                const wAmpX = (3 + Math.random() * 5) * ampMult;
                const wAmpY = (2 + Math.random() * 4) * ampMult;
                const wFreq = 0.3 + Math.random() * 0.3;
                const wAmpRot = (0.4 + Math.random() * 0.7) * (isIcon ? 1 : 0.05);

                path.style.clipPath = drawDir === 1 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';

                return { path, isIcon, drawDir, drawStart, drawEnd, seed, stretchAmt, phase, wAmpX, wAmpY, wFreq, wAmpRot };
            });

            const tick = (ts) => {
                if (!startTS) startTS = ts;
                const elapsed = ts - startTS;

                if (elapsed > SHIFT_TIME && !shifted) {
                    logoGroup.classList.add('layout-final');
                    shifted = true;
                }

                if (elapsed > SHIFT_TIME + 1200 && !subtitleShown) {
                    subtitleShown = true;
                    this.showSubtitle = true;
                }

                time += 0.012;
                hue = (hue + 0.15) % 360;
                mouseX = lerp(mouseX, this.targetMouseX, 0.05);
                mouseY = lerp(mouseY, this.targetMouseY, 0.05);

                const rect = wrapper.getBoundingClientRect();
                if (rect) {
                    const cxPx = rect.left + rect.width / 2;
                    const cyPx = rect.top + rect.height / 2;
                    const mDX = (mouseX - cxPx) / (window.innerWidth / 2);
                    const mDY = (mouseY - cyPx) / (window.innerHeight / 2);

                    wrapper.style.transform = `rotateX(${-mDY * 10}deg) rotateY(${mDX * 10}deg)`;

                    if (spark) {
                        spark.style.opacity = (smoothstep(0, totalIconDrawEnd * 0.4, elapsed) * 0.8).toString();
                        spark.style.transform = `translate(calc(-50% + ${mDX * 40}px), calc(-50% + ${mDY * 30}px)) translateZ(-50px)`;
                        spark.style.background = `radial-gradient(circle, hsla(${hue}, 90%, 65%, 0.8) 0%, hsla(${hue + 40}, 80%, 50%, 0.2) 40%, transparent 70%)`;
                    }

                    const globalWBlend = smoothstep(totalIconDrawEnd, totalIconDrawEnd + WAVE_RAMP, elapsed);

                    pathData.forEach((data) => {
                        const { path, isIcon, drawDir, drawStart, drawEnd, seed, stretchAmt, phase, wAmpX, wAmpY, wFreq, wAmpRot } = data;
                        const rawT = Math.max(0, Math.min(1, (elapsed - drawStart) / (drawEnd - drawStart)));
                        if (rawT <= 0) return;

                        const noisedT = Math.max(0, Math.min(1, rawT + smoothNoise(rawT * 8, seed) * (0.018 * (1 - rawT))));
                        const ep = easeInkBrush(noisedT);
                        const edgeWaver = smoothNoise(ep * 6, seed + 50) * 1.6 * (1 - ep);
                        const hiddenPct = Math.max(0, 100 - ep * 100 + edgeWaver);

                        path.style.clipPath = drawDir === 1 ? `inset(0 ${hiddenPct.toFixed(2)}% 0 0)` : `inset(0 0 0 ${hiddenPct.toFixed(2)}%)`;

                        const wBlend = Math.max(smoothstep(0, DRAW_EACH * 0.7, Math.max(0, elapsed - drawStart)), globalWBlend);
                        const drawingBlend = (1 - ep) * (1 - ep);
                        const stretchX = 1 + drawDir * stretchAmt * drawingBlend;
                        const stretchY = 1 - stretchAmt * 0.35 * drawingBlend;

                        const wX = Math.cos(time * wFreq + phase) * wAmpX * wBlend;
                        const wY = Math.sin(time * wFreq * 0.78 + phase + 1.1) * wAmpY * wBlend;
                        const wR = Math.cos(time * 0.45 + phase + 2.4) * wAmpRot * wBlend;
                        const breath = Math.sin(time * 0.85 + phase) * (isIcon ? 0.018 : 0.005) * wBlend;

                        const mStr = wBlend * 0.2;
                        const mouseMult = isIcon ? 1 : 0.2;
                        const mX = mDX * 15 * mStr * mouseMult;
                        const mY = mDY * 10 * mStr * mouseMult;
                        const mR = (mDX * Math.cos(phase) + mDY * Math.sin(phase)) * 2 * mStr * mouseMult;

                        path.style.transform = `translate(${wX + mX}px, ${wY + mY}px) scale(${stretchX * (1 + breath)}, ${stretchY * (1 - breath * 0.5)}) rotate(${drawDir * (isIcon ? 1.4 : 0) * drawingBlend + wR + mR}deg)`;
                        path.style.filter = `brightness(${1 + (Math.abs(mDX) + Math.abs(mDY)) * 0.4})`;
                    });
                }
                this.animationFrameId = requestAnimationFrame(tick);
            };
            this.animationFrameId = requestAnimationFrame(tick);
        }
    }
};
</script>
<style scoped>
.hero-scale-wrapper {
    transform: scale(1.2) translateY(0);
    transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.5s ease;
    z-index: 2;
}

.hero-scale-wrapper.background-mode {
    transform: scale(1.2) translateY(-15vh);
}

@media (max-width: 1024px) {
    .hero-scale-wrapper {
        transform: scale(0.9) translateY(0);
    }

    .hero-scale-wrapper.background-mode {
        transform: scale(0.9) translateY(-12vh);
    }
}

@media (max-width: 768px) {
    .hero-scale-wrapper {
        transform: scale(0.7) translateY(0);
    }

    .hero-scale-wrapper.background-mode {
        transform: scale(0.7) translateY(-20vh);
    }
}
</style>