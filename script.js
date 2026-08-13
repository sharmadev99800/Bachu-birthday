/* =========================================================
   RIYA / BACHAA — BIRTHDAY UNIVERSE
   FIXED SCRIPT
   ========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================================
   SECRET UNLOCK
   ========================================================= */

const secretScreen = $("#secretScreen");
const realWebsite = $("#realWebsite");
const secretInput = $("#secretInput");
const unlockBtn = $("#unlockBtn");
const secretError = $("#secretError");

function unlockWebsite() {

    const value = secretInput.value
        .toLowerCase()
        .replace(/[^0-9a-z]/g, "");

    const acceptedPasswords = [
        "21april2026",
        "21042026",
        "21april",
        "2104"
    ];

    if (acceptedPasswords.includes(value)) {

        secretScreen.classList.add("hide");

        realWebsite.classList.add("unlocked");

        document.body.classList.remove("locked");

        setTimeout(() => {
            secretScreen.style.display = "none";
        }, 1000);

        /*
         Start the website animations after unlocking.
        */
        startWebsite();

    } else {

        secretError.textContent =
            "Hmm... that's not the date. we fell in love Try again, Bachaa ♡";

        secretInput.style.borderColor =
            "#d99be0";

        secretInput.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-8px)" },
                { transform: "translateX(8px)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(0)" }
            ],
            {
                duration: 350
            }
        );
    }
}


if (unlockBtn) {

    unlockBtn.addEventListener(
        "click",
        unlockWebsite
    );

}


if (secretInput) {

    secretInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {
                unlockWebsite();
            }

        }
    );

}


/* =========================================================
   WEBSITE START
   ========================================================= */

function startWebsite() {

    /*
       Scroll reveal
    */

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    $$(".reveal").forEach(element => {

        revealObserver.observe(element);

    });


    /*
       Start star animation
    */

    startStars();

}


/* =========================================================
   MUSIC
   ========================================================= */

const music = $("#bgMusic");
const musicBtn = $("#musicBtn");

let musicStarted = false;


if (musicBtn && music) {

    musicBtn.addEventListener(
        "click",
        async () => {

            try {

                if (music.paused) {

                    await music.play();

                    musicStarted = true;

                    musicBtn.textContent = "Ⅱ";

                } else {

                    music.pause();

                    musicBtn.textContent = "♫";

                }

            } catch (error) {

                alert(
                    "Put your song here:\n\n" +
                    "assets/music/song.mp3"
                );

            }

        }
    );

}


function tryStartMusic() {

    if (!music || musicStarted) {
        return;
    }

    music.play()
        .then(() => {

            musicStarted = true;

            if (musicBtn) {
                musicBtn.textContent = "Ⅱ";
            }

        })
        .catch(() => {});

}


/* =========================================================
   MENU
   ========================================================= */

const menuBtn = $("#menuBtn");
const sideNav = $("#sideNav");


if (menuBtn && sideNav) {

    menuBtn.addEventListener(
        "click",
        () => {

            sideNav.classList.toggle("open");

        }
    );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

$$("[data-target]").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const target =
                document.getElementById(
                    button.dataset.target
                );

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

            if (sideNav) {
                sideNav.classList.remove("open");
            }

            tryStartMusic();

        }
    );

});


/* =========================================================
   CLOSE MENU
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        if (!sideNav || !menuBtn) {
            return;
        }

        if (
            sideNav.classList.contains("open") &&
            !sideNav.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            sideNav.classList.remove("open");

        }

    }
);


/* =========================================================
   CURSOR GLOW
   ========================================================= */

const cursorGlow = $(".cursor-glow");


if (
    cursorGlow &&
    window.matchMedia("(pointer:fine)").matches
) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;


    window.addEventListener(
        "pointermove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

        },
        {
            passive: true
        }
    );


    function animateGlow() {

        glowX += (mouseX - glowX) * .12;
        glowY += (mouseY - glowY) * .12;

        cursorGlow.style.left =
            `${glowX}px`;

        cursorGlow.style.top =
            `${glowY}px`;

        requestAnimationFrame(
            animateGlow
        );

    }

    animateGlow();

}


/* =========================================================
   STAR FIELD
   ========================================================= */

function startStars() {

    const canvas = $("#stars");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let stars = [];

    let width = window.innerWidth;
    let height = window.innerHeight;


    function resizeStars() {

        width = window.innerWidth;
        height = window.innerHeight;

        const ratio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        canvas.width =
            width * ratio;

        canvas.height =
            height * ratio;

        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";

        ctx.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );

        createStars();

    }


    function createStars() {

        const amount =
            Math.min(
                220,
                Math.floor(width / 5)
            );

        stars =
            Array.from(
                { length: amount },
                () => ({

                    x:
                        Math.random() * width,

                    y:
                        Math.random() * height,

                    radius:
                        Math.random() * 1.3 + .2,

                    alpha:
                        Math.random(),

                    speed:
                        Math.random() * .012 + .002,

                    drift:
                        Math.random() * .15 - .075

                })
            );

    }


    function drawStars() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        stars.forEach(star => {

            star.alpha += star.speed;

            star.x += star.drift;

            if (star.x < -10)
                star.x = width + 10;

            if (star.x > width + 10)
                star.x = -10;

            const glow =
                .25 +
                (
                    Math.sin(
                        star.alpha * 4
                    ) + 1
                ) * .25;

            ctx.globalAlpha = glow;

            ctx.fillStyle = "#ffffff";

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );

            ctx.fill();

        });

        ctx.globalAlpha = 1;

        requestAnimationFrame(
            drawStars
        );

    }


    window.addEventListener(
        "resize",
        resizeStars
    );

    resizeStars();

    drawStars();

}


/* =========================================================
   LETTER
   ========================================================= */

const openLetter = $("#openLetter");
const paperCover = $(".paper-cover");


if (openLetter && paperCover) {

    openLetter.addEventListener(
        "click",
        () => {

            paperCover.classList.add("open");

            createTinySparkles(
                window.innerWidth / 2,
                window.innerHeight / 2,
                20
            );

            tryStartMusic();

        }
    );

}


/* =========================================================
   PRIVATE VIDEO
   ========================================================= */

const privateVideo =
    document.querySelector(
        ".private-box video"
    );


if (privateVideo) {

    privateVideo.addEventListener(
        "play",
        () => {

            if (
                music &&
                !music.paused
            ) {

                music.pause();

                if (musicBtn) {
                    musicBtn.textContent = "♫";
                }

            }

        }
    );

}

function createVoiceWaveform() {

    // Don't create it twice
    if (document.querySelector(".birthday-waveform")) {
        return;
    }

    const voicePlayer = document.querySelector(".voice-player");

    if (!voicePlayer) return;

    const waveform = document.createElement("div");

    waveform.className = "birthday-waveform";

    for (let i = 0; i < 32; i++) {

        const bar = document.createElement("span");

        bar.style.setProperty(
            "--delay",
            `${i * 0.04}s`
        );

        bar.style.setProperty(
            "--height",
            `${12 + Math.random() * 38}px`
        );

        waveform.appendChild(bar);
    }

    voicePlayer.appendChild(waveform);
}
/* =========================================================
   WISH BUTTON
   ========================================================= */

const wishBtn = $("#wishBtn");
const finalMessage = $("#finalMessage");
const fireworks = $("#fireworks");


if (wishBtn) {

    wishBtn.addEventListener("click", async () => {

        // Show final message
        if (finalMessage) {
            finalMessage.classList.add("show");
        }

        // 🌌 Darken the universe
        document.body.classList.add("voice-ending-mode");

        // 🎵 Fade out Paaro
        if (music) {

            const fadeDuration = 1800;
            const startVolume = music.volume;
            const startTime = Date.now();

            const fade = () => {

                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / fadeDuration, 1);

                music.volume = startVolume * (1 - progress);

                if (progress < 1) {
                    requestAnimationFrame(fade);
                } else {
                    music.pause();
                    music.currentTime = 0;
                    music.volume = startVolume;
                }
            };

            fade();
        }

        // ✨ Wait for Paaro to fade before voice starts
        setTimeout(() => {

            const voice = document.querySelector("#birthdayVoice");

            if (!voice) {
                console.error("birthdayVoice audio not found.");
                return;
            }

            // 🎙️ Show voice section
            const voiceMessage = document.querySelector(".voice-message");

            if (voiceMessage) {
                voiceMessage.classList.add("show");
            }

            // Create beautiful waveform
            createVoiceWaveform();
const voicePlayBtn = document.querySelector("#voicePlayBtn");

if (voicePlayBtn) {
    voicePlayBtn.addEventListener("click", () => {

        if (voice.paused) {
            voice.currentTime = 0;
            voice.play();

            voicePlayBtn.textContent = "❚❚ Pause";
            voicePlayBtn.classList.add("playing");

        } else {
            voice.pause();

            voicePlayBtn.textContent = "▶ Play";
            voicePlayBtn.classList.remove("playing");
        }

    });

    voice.addEventListener("ended", () => {
        voicePlayBtn.textContent = "▶ Play";
        voicePlayBtn.classList.remove("playing");
    });
}


            // 🎆 Fireworks ONLY after recording finishes
            voice.onended = () => {

                setTimeout(() => {

                    createFireworks(
                        window.innerWidth / 2,
                        window.innerHeight * .52
                    );

                }, 700);

            };

        }, 1900);

    });

}


/* =========================================================
   FIREWORKS
   ========================================================= */

function createFireworks(centerX, centerY) {

    const amount = 120;

    for (let i = 0; i < amount; i++) {

        const spark =
            document.createElement("i");

        spark.className = "spark";

        spark.style.left =
            `${centerX}px`;

        spark.style.top =
            `${centerY}px`;

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            100 +
            Math.random() * 500;

        spark.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        spark.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );

        const size =
            2 +
            Math.random() * 5;

        spark.style.width =
            `${size}px`;

        spark.style.height =
            `${size}px`;

        spark.style.animationDelay =
            `${Math.random() * .25}s`;

        if (fireworks) {

            fireworks.appendChild(
                spark
            );

        }

        setTimeout(
            () => spark.remove(),
            2000
        );

    }

}


/* =========================================================
   SMALL SPARKLES
   ========================================================= */

function createTinySparkles(
    centerX,
    centerY,
    amount
) {

    for (let i = 0; i < amount; i++) {

        const spark =
            document.createElement("i");

        spark.className = "spark";

        spark.style.left =
            `${centerX}px`;

        spark.style.top =
            `${centerY}px`;

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            30 +
            Math.random() * 130;

        spark.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        spark.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );

        if (fireworks) {

            fireworks.appendChild(
                spark
            );

        }

        setTimeout(
            () => spark.remove(),
            1700
        );

    }

}


/* =========================================================
   PHOTO 3D EFFECT
   ========================================================= */

if (
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    $$(".photo-card").forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    .5;

                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    .5;

                card.style.transform =
                    `
                    perspective(1000px)
                    rotateX(${y * -4}deg)
                    rotateY(${x * 5}deg)
                    translateY(-8px)
                    `;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    $$(".favourite").forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    .5;

                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    .5;

                card.style.transform =
                    `
                    perspective(900px)
                    rotateX(${y * -5}deg)
                    rotateY(${x * 6}deg)
                    translateY(-8px)
                    `;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}


/* =========================================================
   FLOATING JASMINE PETALS
   ========================================================= */

function createPetal() {

    if (
        window.innerWidth < 500 &&
        Math.random() > .35
    ) {
        return;
    }

    const petal =
        document.createElement("div");

    petal.innerHTML = "✿";

    petal.style.position = "fixed";

    petal.style.left =
        `${Math.random() * 100}%`;

    petal.style.top = "-30px";

    petal.style.zIndex = "1";

    petal.style.pointerEvents =
        "none";

    petal.style.color =
        "rgba(235,218,247,.7)";

    petal.style.fontSize =
        `${8 + Math.random() * 13}px`;

    petal.style.opacity =
        `${.25 + Math.random() * .5}`;

    document.body.appendChild(
        petal
    );

    const duration =
        7000 +
        Math.random() * 7000;

    const drift =
        Math.random() * 180 - 90;

    const rotation =
        Math.random() * 720 - 360;

    petal.animate(
        [
            {
                transform:
                    "translate(0,0) rotate(0deg)"
            },
            {
                transform:
                    `translate(${drift}px,105vh) rotate(${rotation}deg)`
            }
        ],
        {
            duration,
            easing: "linear"
        }
    );

    setTimeout(
        () => petal.remove(),
        duration
    );

}


setInterval(
    createPetal,
    1400
);


/* =========================================================
   INITIAL STATE
   ========================================================= */

document.body.classList.add(
    "locked"
);


console.log(
`
╔════════════════════════════════╗
║                                ║
║       FOR RIYA / BACHAA ♡      ║
║                                ║
║       21 APRIL 2026            ║
║                                ║
╚════════════════════════════════╝
`
);