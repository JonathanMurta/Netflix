const js    = (el) => document.querySelector(el);
const jsAll = (el) => document.querySelectorAll(el);

const Netflix = {}
let primary   = 0

Netflix.images =
{
    "0": "avengers",
    "1": "barracabeijo2",
    "2": "billions",
    "3": "blacklist",
    "4": "blindspot",
    "5": "freshprinceofbelair",
    "6": "friends",
    "7": "harrypotter",
    "8": "hearth",
    "9": "lastman",
    "10": "mib",
    "11": "mindhunter",
    "12": "modernfamily",
    "13": "parker",
    "14": "peakyblinders",
    "15": "suits",
    "16": "thesinner",
    "17": "visavis"
}

Netflix.slideMovies =
{
    "again":
    {
        previous: {},
        show: {},
        next: {}
    },
    "high":
    {
        previous: {},
        show: {},
        next: {}
    },
    "favority":
    {
        previous: {},
        show: {},
        next: {}
    },
    "mylist":
    {
        previous: {},
        show: {},
        next: {}
    }
}

jsAll("section.container-profiles section").forEach((element) =>
{
    element.addEventListener("click", (e) =>
    {
        js(".a-profiles").style.opacity = 0
        setTimeout(() =>
        {
            js(".a-profiles").style.display = "none"
        }, 400);
        js(".img-config img").setAttribute("src", element.children[0].getAttribute("src"))
    })
})

jsAll("section.a-video section").forEach((element) =>
{
    var classElement = element.getAttribute("class").split(" ")

    for(images in Netflix.images)
    {
        if(parseInt(images) <= 5)
            Netflix.slideMovies[classElement[1]].show[images] = Netflix.images[images]
        else if (parseInt(images) <= 11)
            Netflix.slideMovies[classElement[1]].next[images] = Netflix.images[images]
    }
})

jsAll(".video-arrow-right").forEach((element) =>
{
    element.addEventListener("click", (e) =>
    {
        let elementParentClass  = element.parentNode.getAttribute("class").split(" ")[1]

        Netflix.MovementSlide("right", elementParentClass)
    })
})

jsAll(".video-arrow-left").forEach((element) =>
{
    element.addEventListener("click", (e) =>
    {
        let elementParentClass  = element.parentNode.getAttribute("class").split(" ")[1]

        Netflix.MovementSlide("left", elementParentClass)
    })
})

Netflix.CreateElementHtml = () =>
{
    for(category in Netflix.slideMovies)
    {
        jsAll(`.a-video .${category} .video-animation-translate`).forEach((element, count = 0) =>
        {
            for(typeMovies in Netflix.slideMovies[category])
            {
                if(typeMovies == "show")
                {
                    for(elements in Netflix.slideMovies[category][typeMovies])
                    {
                        var elementCreate = document.createElement("div")
                        elementCreate.classList.add(`video-item-${count}`)
                        elementCreate.style.cssText = `background: url(images/${Netflix.slideMovies[category][typeMovies][elements]}.png) center center no-repeat; background-size: contain;`
                        count++
                        element.append(elementCreate)
                    }
                }
                else if(typeMovies == "next")
                {
                    for(elements in Netflix.slideMovies[category][typeMovies])
                    {
                        var elementCreate = document.createElement("div")
                        elementCreate.classList.add(`video-item-right`)
                        elementCreate.style.cssText = `background: url(images/${Netflix.slideMovies[category][typeMovies][elements]}.png) center center no-repeat; background-size: contain;`
                        element.append(elementCreate)
                    }
                }
            }
        })
    }
}

Netflix.CreateElementHtml()

Netflix.MovementSlide = (action, elementParentClass) =>
{
    if(action == "right")
    {
        if(Netflix.slideMovies[elementParentClass] && Netflix.slideMovies[elementParentClass].next)
        {
            if(Netflix.slideMovies[elementParentClass].next && Object.keys(Netflix.slideMovies[elementParentClass].next).length > 0)
            {
                let lastElementNext = 0,
                    typeAnimation   = 1,
                    breakWhile = false

                Object.assign(Netflix.slideMovies[elementParentClass].previous = {}, Netflix.slideMovies[elementParentClass].show)
                Netflix.slideMovies[elementParentClass].show = {}

                for(count in Netflix.slideMovies[elementParentClass].next)
                {
                    if (Object.keys(Netflix.slideMovies[elementParentClass].show).length <= 6)
                    {
                        Netflix.slideMovies[elementParentClass].show[count] = Netflix.slideMovies[elementParentClass].next[count]
                        delete Netflix.slideMovies[elementParentClass].next[count]
                    }
                }

                while(Object.keys(Netflix.slideMovies[elementParentClass].next).length <= 5 && !breakWhile)
                {
                    if (lastElementNext == 0)
                        lastElementNext = Object.keys(Netflix.slideMovies[elementParentClass].show)[Object.keys(Netflix.slideMovies[elementParentClass].show).length - 1]

                    lastElementNext++
                    if (!lastElementNext)
                        typeAnimation = 0

                    if (Netflix.images[lastElementNext])
                        Netflix.slideMovies[elementParentClass].next[lastElementNext] = Netflix.images[lastElementNext]
                    else
                        breakWhile = true
                }

                Netflix.AlterElementAnimation(elementParentClass, "right", typeAnimation)
            }
        }
    }
    else if(action == "left")
    {
        if(Netflix.slideMovies[elementParentClass] && Netflix.slideMovies[elementParentClass].previous)
        {
            if(Netflix.slideMovies[elementParentClass].previous && Object.keys(Netflix.slideMovies[elementParentClass].previous).length > 0)
            {
                let typeAnimation = 1
                Object.assign(Netflix.slideMovies[elementParentClass].next = {}, Netflix.slideMovies[elementParentClass].show)
                Netflix.slideMovies[elementParentClass].show = {}

                for (count in Netflix.slideMovies[elementParentClass].previous)
                {
                    if (Object.keys(Netflix.slideMovies[elementParentClass].show).length <= 6)
                    {
                        Netflix.slideMovies[elementParentClass].show[count] = Netflix.slideMovies[elementParentClass].previous[count]
                        delete Netflix.slideMovies[elementParentClass].previous[count]
                    }
                }

                let FirstElementPrevious = Object.keys(Netflix.slideMovies[elementParentClass].show)[0],
                    breakWhile = false

                while(Object.keys(Netflix.slideMovies[elementParentClass].previous).length <= 5 && !breakWhile)
                {
                    FirstElementPrevious--

                    if(!FirstElementPrevious)
                        typeAnimation = 0

                    if (Netflix.images[FirstElementPrevious])
                        Netflix.slideMovies[elementParentClass].previous[FirstElementPrevious] = Netflix.images[FirstElementPrevious]
                    else
                        breakWhile = true
                }

                Netflix.AlterElementAnimation(elementParentClass, "left", typeAnimation)
            }
        }
    }
}

Netflix.AlterElementAnimation = (category, side, typeAnimation) =>
{
    let count = 0;

    if(side == "right")
    {
        setTimeout(() =>{js(`.a-video .${category} .video-animation-translate`).style.cssText = "transition: none; transform: translate3d(0%, 0px, 0px);"}, 0);
        setTimeout(() =>{js(`.a-video .${category} .video-animation-translate`).style.cssText = "transition: 0.4s ease all; transform: translate3d(-100.4%, 0px, 0px);"}, 50);
    }
    else if(side == "left")
    {
        if(typeAnimation == 1)
        {
            setTimeout(() => { js(`.a-video .${category} .video-animation-translate`).style.cssText = "transition: 0.4s ease all; transform: translate3d(0, 0px, 0px);" }, 50);
        }
        else
        {
            setTimeout(() => { js(`.a-video .${category} .video-animation-translate`).style.cssText = "transition: none; transform: translate3d(-200.4%, 0px, 0px);" }, 0);
            setTimeout(() => { js(`.a-video .${category} .video-animation-translate`).style.cssText = "transition: 0.4s ease all; transform: translate3d(-100.4%, 0px, 0px);" }, 50);
        }
    }

    jsAll(`.a-video .${category} .video-animation-translate div`).forEach((element) =>
    {
        element.remove()
    })

    for(typeMovies in Netflix.slideMovies[category])
    {
        if(typeMovies == "previous")
        {
            for(elements in Netflix.slideMovies[category][typeMovies])
            {
                var elementCreate = document.createElement("div")
                elementCreate.classList.add(`video-item-left`)
                elementCreate.style.cssText = `background: url(images/${Netflix.slideMovies[category][typeMovies][elements]}.png) center center no-repeat; background-size: contain;`
                js(`.a-video .${category} .video-animation-translate`).appendChild(elementCreate)
            }
        }
        else if(typeMovies == "show")
        {
            for(elements in Netflix.slideMovies[category][typeMovies])
            {
                
                var elementCreate = document.createElement("div")
                elementCreate.classList.add(`video-item-${count}`)
                elementCreate.style.cssText = `background: url(images/${Netflix.slideMovies[category][typeMovies][elements]}.png) center center no-repeat; background-size: contain;`
                count++
                js(`.a-video .${category} .video-animation-translate`).appendChild(elementCreate)
            }
        }
        else if(typeMovies == "next")
        {
            for(elements in Netflix.slideMovies[category][typeMovies])
            {
                var elementCreate = document.createElement("div")
                elementCreate.classList.add(`video-item-right`)
                elementCreate.style.cssText = `background: url(images/${Netflix.slideMovies[category][typeMovies][elements]}.png) center center no-repeat; background-size: contain;`
                js(`.a-video .${category} .video-animation-translate`).appendChild(elementCreate)
            }
        }
    }
}

