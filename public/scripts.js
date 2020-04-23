const currentPage = location.pathname
const menuItems = document.querySelectorAll("header a")

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}

if (currentPage.includes("members")) {
    document.body.style.backgroundImage = "url(https://images.pexels.com/photos/864939/pexels-photo-864939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)"
}
