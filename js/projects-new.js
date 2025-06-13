fetch('projects.json', {
    method: 'GET',
    mode:"no-cors" // or 'POST' if needed
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const itemList = document.getElementById('portfolio-list');
        const items = data.projects; // Access the items array
        const projectGrid = document.createElement('div')
        projectGrid.className = 'projects-grid'

        // Loop through the items and create div elements
        for (let i = 0; i < items.length; i++) {
            const projectCard = document.createElement('div')
            projectCard.className = 'project-card'

            // Youtube
            if(items[i]['youtube']) {
                let frame = document.createElement('iframe')
                frame.src = items[i].youtube
                frame.className = 'project-image'
                projectCard.appendChild(frame)
            } else {
                const image = document.createElement('img')
                image.className = 'project-image'
                image.src = items[i].image;
                projectCard.appendChild(image)
            }

            const projectInfo = document.createElement('div')
            projectInfo.className = 'project-info'
            

            const projectTitle = document.createElement('h3')
            projectTitle.textContent = items[i].title
            projectInfo.appendChild(projectTitle)

            const projectDescription = document.createElement('p')
            projectDescription.textContent = items[i].shortDescription
            projectInfo.appendChild(projectDescription)

            const techStack = document.createElement('div')
            techStack.className = 'tech-stack'
            techStack.textContent = items[i].technologyStack
            projectInfo.appendChild(techStack)

            if (items[i]['appstoreLink'] || items[i]['githubLink']) {

                const anchor = document.createElement('a')
                anchor.className = 'appstore-link'
                anchor.href = items[i]['appstoreLink'] ? items[i]['appstoreLink'] : items[i]['githubLink']
                anchor.target = "_blank";
                anchor.rel = "noopener noreferrer";
                

                const appStoreImage = document.createElement('img')
                appStoreImage.src = items[i]['appstoreLink'] ? 'images/svg/AppStore.svg' : 'images/Github_white.png'
                anchor.appendChild(appStoreImage)

                projectInfo.appendChild(anchor)
            }
            


            projectCard.appendChild(projectInfo)
            projectCard.onclick = () => showPopover(items[i]);
            projectGrid.appendChild(projectCard)


        }

        itemList.appendChild(projectGrid)

    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


    let selectedProject = null;

    function showPopover(project) {
        selectedProject = project;
        const popover = document.getElementById("project-popover");
        const content = document.getElementById("popover-project-content");
        content.innerHTML = ''
        content.appendChild(getProjectDetailElement(project))
        popover.style.display = "flex";

        document.body.style.overflow = "hidden";
        Array.from(document.getElementsByTagName('nav')).forEach(nav => {
            nav.style.display = "none"
        });
    }
    
    function closePopover() {
        selectedProject = null;
        document.getElementById("project-popover").style.display = "none";
        document.body.style.overflow = "auto";
        Array.from(document.getElementsByTagName('nav')).forEach(nav => {
            nav.style.display = "block"
        });
    }

      // Optional: Close modal on outside click
  window.onclick = function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
      if (e.target === modal) {
        modal.style.display = "none";
        closePopover()
      }
    });
  }

  function getProjectDetailElement(project) {
    // Card
    const cardPortfoliio = document.createElement('div');
    cardPortfoliio.className = 'card-portfolio' 
    // Youtube
    if(project['youtube']) {
        let frame = document.createElement('iframe')
        frame.src = project.youtube
        frame.className = 'image-view'
        cardPortfoliio.appendChild(frame)
    } else {
        // Image
        const img = document.createElement('img');
        img.src = project.image;
        img.className = 'image-view'
        cardPortfoliio.appendChild(img)
    }
    
    // card content
    const cardContent = document.createElement('div')
    cardContent.className = "card-content"
    cardPortfoliio.appendChild(cardContent)
    // Title
    const title = document.createElement('h2')
    title.className = "card-title-portfolio"
    title.textContent = project.title
    cardContent.appendChild(title)
    // Description
    const description = document.createElement('p')
    description.className = 'card-description'
    description.innerHTML = project.description
    cardContent.appendChild(description)

    // App Store
    if(project['appstoreLink']) {
        let anchorTag = document.createElement('a')
        anchorTag.href = project.appstoreLink
        anchorTag.target = "_blank";
        anchorTag.rel = "noopener noreferrer";   
        
        const appStoreImg = document.createElement('img')
        appStoreImg.src = 'images/svg/AppStore.svg'
        appStoreImg.className = 'appStore'

        anchorTag.appendChild(appStoreImg)
        cardContent.appendChild(anchorTag)
    }

    if(project['githubLink']) {
        let anchorTag = document.createElement('a')
        anchorTag.href = project.githubLink
        anchorTag.target = "_blank";
        anchorTag.rel = "noopener noreferrer";
        
        const appStoreImg = document.createElement('img')
        appStoreImg.src = 'images/github_black.png'
        appStoreImg.className = 'appStore'

        anchorTag.appendChild(appStoreImg)
        cardContent.appendChild(anchorTag)
    }

    return cardPortfoliio

}