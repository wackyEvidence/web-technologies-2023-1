const postHeaderSection = document.getElementById('post-header');
const postCommentsSection = document.getElementById('post-comments');
const id = new URLSearchParams(window.location.search).get('id');

async function getPostData() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Could not get post: ${error}`);
    }
}

async function getPostCommentsData() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Could not get post comments: ${error}`);
    }
}

async function renderPostDetails() {
    const postData = await getPostData();
    const postComments = await getPostCommentsData();
    postHeaderSection.insertAdjacentHTML('beforeend', renderPostData(postData));
    postComments.forEach(e => {
        postCommentsSection.insertAdjacentHTML('beforeend', renderPostComment(e));
    });
}

function renderPostData(postData) {
    return `
        <h1>${postData.title}</h1>
        <p>${postData.body}</p>
    `;
}

function renderPostComment(postComment) {
    return `
        <hr>
        <p>${postComment.body}</p>
        <p>by ${postComment.email}</p>
    `;
}

renderPostDetails();