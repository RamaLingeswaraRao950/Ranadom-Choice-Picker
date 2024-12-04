const style = document.createElement('style');
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

  * {
      box-sizing: border-box;
  }

  body {
      background-color: #2b88f0;
      font-family: 'Muli', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      overflow: hidden;
      margin: 0;    
  }

  h3 {
      color: #fff;
      margin: 10px 0 20px;
      text-align: center;
  }

  .container {
      width: 500px;
  }

  textarea {
      border: none;
      display: block;
      width: 100%;
      height: 100px;
      font-family: inherit;
      padding: 10px;
      margin: 0 0 20px;
      font-size: 16px;
  }

  .tag {
      background-color: #f0932b;
      color: #fff;
      border-radius: 50px;
      padding: 10px 20px;
      margin: 0 5px 10px 0;
      font-size: 14px;
      display: inline-block;
  }

  .tag.highlight {
      background-color: #273c75; 
  }
`;
document.head.appendChild(style);

const tagsEl = document.createElement('div');
tagsEl.id = 'tags';
tagsEl.className = 'container';
document.body.appendChild(tagsEl);

const textarea = document.createElement('textarea');
textarea.id = 'textarea';
document.body.prepend(textarea);

textarea.focus();

textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value);

    if (e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = '';
        }, 10);

        randomSelect();
    }
});

function createTags(input) {
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim());

    tagsEl.innerHTML = '';

    tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.innerText = tag;
        tagsEl.appendChild(tagEl);
    });
}

function randomSelect() {
    const times = 30;

    const interval = setInterval(() => {
        const randomTag = pickRandomTag();

        highlightTag(randomTag);

        setTimeout(() => {
            unHighlightTag(randomTag);
        }, 100);
    }, 100);

    setTimeout(() => {
        clearInterval(interval);

        setTimeout(() => {
            const randomTag = pickRandomTag();

            highlightTag(randomTag);
        }, 100);

    }, times * 100);
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
    tag.classList.add('highlight');
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight');
}