const blogContainer = document.getElementById('blogContainer');
if (blogContainer) {
    let blogPosts = JSON.parse(localStorage.getItem('jurassic_blog_posts')) || [
        {
            id: 1,
            title: "Apex Predator: The Truth About Tyrannosaurus Rex",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTybY0XIfrT_zIYb703zWBMy59-Nxfj2X6YwKjLvLcmYA&s=10",
            content: "The T-Rex remains the undisputed king of prehistoric lizards. With a bite force exceeding 12,800 pounds, it could crush thick bone effortlessly. Recent paleontology studies also suggest they had keen binocular vision.",
            comments: [
                { author: "Dr. Grant", text: "Fascinating creature! The skull structure is pristine." }
            ]
        },
        {
            id: 2,
            title: "Spinosaurus: The Giant River Hunter",
            image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?q=80&w=800&auto=format&fit=crop",
            content: "Longer and heavier than the T-Rex, the Spinosaurus possessed a massive sail and paddle-like tail, proving it spent most of its life hunting giant prehistoric fish in rivers.",
            comments: [
                { author: "Sarah", text: "I love learning about semi-aquatic dinosaurs!" }
            ]
        },
        {
            id: 3,
            title: "Triceratops: Armor of the Cretaceous",
            image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
            content: "With a skull taking up nearly a third of its entire body length and three defensive horns, the Triceratops stood its ground against the fiercest predators of its time.",
            comments: []
        }
    ];

    function renderBlogPosts() {
        blogContainer.innerHTML = '';
        blogPosts.forEach((post, index) => {
            let postDiv = document.createElement('div');
            postDiv.className = 'blog-post';

            let commentsHtml = '';
            post.comments.forEach(c => {
                commentsHtml += `<div class="comment-item"><strong>${c.author}:</strong> ${c.text}</div>`;
            });

            postDiv.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="blog-img">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <div style="margin-top: 15px; border-top: 1px solid rgba(212, 175, 55, 0.2); padding-top: 10px;">
                    <p style="color: var(--accent-gold); font-size: 0.9rem; margin-bottom: 5px;">Comments (${post.comments.length}):</p>
                    ${commentsHtml.length > 0 ? commentsHtml : '<p style="color: var(--text-muted); font-size: 0.9rem;">No comments yet. Be the first!</p>'}
                    
                    <div class="comment-input-group">
                        <input type="text" id="blog-author-${index}" placeholder="Your name" style="margin-bottom:0; flex:1;">
                        <input type="text" id="blog-text-${index}" placeholder="Write a comment..." style="margin-bottom:0; flex:2;">
                        <button onclick="addBlogComment(${index})" style="padding: 5px 15px;">Post</button>
                    </div>
                </div>
            `;
            blogContainer.appendChild(postDiv);
        });
    }

    window.addBlogComment = function(postIndex) {
        const authorInput = document.getElementById(`blog-author-${postIndex}`);
        const textInput = document.getElementById(`blog-text-${postIndex}`);

        if (!authorInput.value || !textInput.value) {
            alert('Please fill out both your name and comment.');
            return;
        }

        blogPosts[postIndex].comments.push({ author: authorInput.value, text: textInput.value });
        localStorage.setItem('jurassic_blog_posts', JSON.stringify(blogPosts));
        renderBlogPosts();
    }

    renderBlogPosts();
}

const postForm = document.getElementById('postForm');
if (postForm) {
    let posts = JSON.parse(localStorage.getItem('jurassic_community_posts')) || [
        { id: 1, author: "Visitor Mark", content: "The fossil displays in the main hall are breathtaking!", comments: [{ author: "Staff", text: "Thanks for visiting Mark!" }] }
    ];

    const postsContainer = document.getElementById('postsContainer');

    function renderCommunityPosts() {
        postsContainer.innerHTML = '';
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p style="color:var(--text-muted);">No posts yet.</p>';
            return;
        }

        posts.forEach((post, index) => {
            let postDiv = document.createElement('div');
            postDiv.className = 'blog-post';
            
            let commentsHtml = '';
            post.comments.forEach(c => {
                commentsHtml += `<div class="comment-item"><strong>${c.author}:</strong> ${c.text}</div>`;
            });

            postDiv.innerHTML = `
                <p><strong>${post.author}</strong></p>
                <p>${post.content}</p>
                <div style="margin-top: 15px; border-top: 1px solid rgba(212, 175, 55, 0.2); padding-top: 10px;">
                    <p style="color: var(--accent-gold); font-size: 0.9rem; margin-bottom: 5px;">Comments:</p>
                    ${commentsHtml}
                    <div class="comment-input-group">
                        <input type="text" id="comm-author-${index}" placeholder="Your name" style="margin-bottom:0; flex:1;">
                        <input type="text" id="comm-text-${index}" placeholder="Write a comment..." style="margin-bottom:0; flex:2;">
                        <button onclick="addCommunityComment(${index})" style="padding: 5px 15px;">Reply</button>
                    </div>
                </div>
            `;
            postsContainer.appendChild(postDiv);
        });
    }

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const author = document.getElementById('authorName').value;
        const content = document.getElementById('postContent').value;

        posts.unshift({ id: Date.now(), author, content, comments: [] });
        localStorage.setItem('jurassic_community_posts', JSON.stringify(posts));
        
        postForm.reset();
        renderCommunityPosts();
    });

    window.addCommunityComment = function(postIndex) {
        const authorInput = document.getElementById(`comm-author-${postIndex}`);
        const textInput = document.getElementById(`comm-text-${postIndex}`);
        
        if (!authorInput.value || !textInput.value) {
            alert('Please enter both your name and comment text.');
            return;
        }

        posts[postIndex].comments.push({ author: authorInput.value, text: textInput.value });
        localStorage.setItem('jurassic_community_posts', JSON.stringify(posts));
        renderCommunityPosts();
    }

    renderCommunityPosts();
}
