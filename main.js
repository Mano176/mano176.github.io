const githubURL = "https://raw.githubusercontent.com/Mano176/"
const repos = ["sudoku_flutter_app", "wonderwall"]

async function loadRepos() {
    const md = window.markdownit();
    const parent = document.getElementById("content")
    const parser = new DOMParser();

    for (let i = 0; i < repos.length; i++) {
        const section = document.createElement("section")
        section.id = repos[i]
        section.innerHTML = i==0? "<h1 id='projects' style='align-self: center'>Projects</h1>" : ""
        const markdown = await (await fetch(githubURL+repos[i]+"/master/README.md")).text()
        section.innerHTML += md.render("#"+markdown.split("[//]: <> (description_end)")[0])

        const imagesDiv = document.createElement("div")
        imagesDiv.classList.add("screenshotContainer")
        var images = markdown.split("[//]: <> (images_start)")[1].split("[//]: <> (images_end)")[0]
        images = images.replaceAll("src=\"", "src=\""+githubURL+repos[i]+"/main/")
        images = images.replaceAll(/width="\d*"/g, "")
        images = parser.parseFromString(images, "text/html").getElementsByTagName("img")
        // elements automatically get deleted from images (see: https://stackoverflow.com/questions/15562484/strange-behavior-when-iterating-over-htmlcollection-from-getelementsbyclassname)
        while (images.length) {
            const image = images[0]
            image.classList.add("screenshot")
            imagesDiv.appendChild(image)
        }

        section.innerHTML += imagesDiv.outerHTML

        section.classList.add("section")
        section.classList.add("githubelement")
        section.classList.add(i % 2 == 0 ? "left" : "right")
        parent.appendChild(section)
    }
}

function replaceAge() {
    const today = new Date();
    const birthDate = new Date("2001-06-17");
    var age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.getElementById("agePlaceholder").innerHTML = age;
}

function initBackground() {
    const backgroundDiv = document.getElementById("background")
    for (var i = 0; i < 200; i++) {
        const snowflake = document.createElement("div")

        snowflake.style.setProperty("--size", Math.random()*0.5 + "vw")
        snowflake.style.setProperty("--left-ini", Math.random() * 20 - 10+"vw")
        snowflake.style.setProperty("--left-end", Math.random() * 20 - 10+"vw")
        snowflake.style.left = Math.random() * 100 + "vw";
        snowflake.style.animation = "snowfall " + (Math.random() * 50 + 5) + "s linear infinite";
        snowflake.style.animationDelay = -Math.random() * 200 + "s";

        snowflake.classList.add("snowflake")
        backgroundDiv.appendChild(snowflake)
    }
}

function scrollFunction() {
    const scrollToTopButton = document.getElementById("scrollToTopButton");
    const content = document.getElementById("content");
    if (content.scrollTop > 500) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
}

window.addEventListener("resize", () => {
    console.log(document.documentElement.clientWidth, document.documentElement.clientHeight);
    if (document.documentElement.clientWidth < document.documentElement.clientHeight) {
        document.body.classList.add("mobile")
    } else {
        document.body.classList.remove("mobile")
    }
});