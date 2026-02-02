
// Number Counter Animation
document.addEventListener('DOMContentLoaded', () => 
{
    const counters = document.querySelectorAll('.count');

    counters.forEach(counter => 
    {
        const el = counter;
        const plus = el.querySelector('.plus');
        const target = Number(el.getAttribute('data-target') ?? 0);
        const duration = Math.random() * 1000 + 2000;
        const startTime = performance.now();

        const easeOutQuad = (t) => t * (2 - t);

        const interpolateColor = (progress) =>
        {
            const r = Math.round(255 * (1 - progress));
            const g = Math.round(0 + (255 - 0) * progress);
            const b = Math.round(255 * 7 * progress * progress * (1 - progress));
            return `rgb(${r}, ${g}, ${b})`;
        }

        const updateCount = (currentTime) => 
        {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuad(progress);

            const currentCount = Math.floor(target * easedProgress);
            el.firstChild.nodeValue = currentCount.toLocaleString();

            el.style.color = interpolateColor(easedProgress);

            if (progress < 1) 
            {
                requestAnimationFrame(updateCount);
            }
            else 
            {
                plus.textContent = '+';
                plus.classList.add('visible');
            }
        };

    requestAnimationFrame(updateCount);
    });
});


// Video Array to randomize
const videos = [
    {
        thumbnail: 'thumbnails/video1.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=Ud-tnIM72zg',
        title: 'Somebody Forgot To Change Their Wallpaper...',
        views: '1,400,000+'
    },
    {
        thumbnail: 'thumbnails/video2.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=TViJCA0N80Q',
        title: 'I Forced My Australian Friend To SHOOT GUNS...',
        views: '450,000+'
    },
    {
        thumbnail: 'thumbnails/video3.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=4yPYFi_lOdU',
        title: 'Getting Vulnerable With Dr. K (@HealthyGamerGG)',
        views: '360,000+'
    },
    {
        thumbnail: 'thumbnails/video4.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=K0i9hxpvF6M&pp=0gcJCZEKAYcqIYzv',
        title: 'ExtraEmily Reacts To Agent Shipping Clips',
        views: '350,000+'
    },
    {
        thumbnail: 'thumbnails/video5.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=H4lYeX9RVmA',
        title: 'I Made Him UNCOMFORTABLE...',
        views: '235,000+'
    },
    {
        thumbnail: 'thumbnails/video6.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=5dJcMajEI1s',
        title: 'I Forced Streamers To Sing...',
        views: '230,000+'
    },
    {
        thumbnail: 'thumbnails/video7.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=ob9Mb0J4Zes',
        title: 'They EXPOSED Me...',
        views: '170,000+'
    },
    {
        thumbnail: 'thumbnails/video8.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=XZ7LltI-Qwg',
        title: 'wii ping pong but the ball gets faster after every hit',
        views: '20,000+'
    },
    {
        thumbnail: 'thumbnails/video9.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=RYxCofnKbHw',
        title: 'Nicro Gets All Stamps In Golf',
        views: '5,000+'
    },
    {
        thumbnail: 'thumbnails/video10.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=5-Ik7rtkia8',
        title: 'Unused Data and Weird Regional DIfferences | Wii Sports Facts and Glitches',
        views: '65,000+'
    },
    {
        thumbnail: 'thumbnails/video11.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=31jLFqJt9j0&pp=0gcJCZEKAYcqIYzv',
        title: 'ExtraEmily\'s Real Voice Slips Again',
        views: '1,100,000+'
    },
    {
        thumbnail: 'thumbnails/video12.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=dR9trnagxfA',
        title: 'ExtraEmily Interviews PirateSoftware',
        views: '760,000+'
    },
    {
        thumbnail: 'thumbnails/video13.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=ReiEjTn8SOg',
        title: 'I Forced My Australian Friend To Eat American Fast Food',
        views: '145,000+'
    },
    {
        thumbnail: 'thumbnails/video14.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=690jWUAQ6NQ',
        title: 'Answering EVERY Question...',
        views: '145,000+'
    },
    {
        thumbnail: 'thumbnails/video15.jpg',
        videoUrl: 'https://www.youtube.com/watch?v=dj_67OorLr8',
        title: 'We Ordered EVERYTHING On The Menu feat. @Emiru | Michelin Monday',
        views: '140,000+'
    },
]

// Fisher-Yates Shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Dynamically display the video cards
document.addEventListener('DOMContentLoaded', () => 
{
    const gridTop = document.querySelector('.top-videos');
    const gridExtra = document.querySelector('.extra-videos');

    const shuffledVideos = shuffleArray(videos);

    const topVideos = shuffledVideos.slice(0,4);
    const extraVideos = shuffledVideos.slice(4);

    function populateGrid(grid, videoArray)
    {
        grid.innerHTML = '';

        videoArray.forEach(video =>
        {
            const item = document.createElement('a');
            item.className = 'grid-item';
            item.href = video.videoUrl;
            item.target = '_blank';
            item.rel = 'noopener noreferrer';

            item.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="overlay">
                    <p class="video-views">Views: ${video.views} views</p>
                </div>
            `;

            grid.appendChild(item);
        });

        const items = grid.querySelectorAll('.grid-item');
        items.forEach((item, index) =>
        {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            setTimeout(() => 
            {
                item.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
                item.style.opacity = 1;
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    populateGrid(gridTop, topVideos);
    populateGrid(gridExtra, extraVideos);
    
});